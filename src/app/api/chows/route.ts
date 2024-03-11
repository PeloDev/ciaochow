import { IChow } from "@/app/types";
import { CC_API_BASE_URL } from "../consts";
import {
  getAndValidateTokenFromCookies,
  getMessageFromApiError,
} from "../helpers";

interface ICache {
  data: IChow[];
  expiry: number | null;
}

const CACHE_DURATION = 300 * 1000; // in ms - 5 mins

// In-memory cache. TODO: use some other caching strategy for chows
let cache: ICache = { data: [], expiry: null };

function flattenData(
  data: {
    id: number;
    attributes: Omit<IChow, "id"> & {
      Image: {
        data: {
          id: number;
          attributes: Omit<IChow["Image"]["data"][number], "id">;
        }[];
      };
    };
  }[]
): IChow[] {
  return data.map((chow) => ({
    id: chow.id,
    ...chow.attributes,
    Image: {
      data: chow.attributes.Image.data.map(
        // TODO: simplify this
        (imgData: {
          id: number;
          attributes: Omit<IChow["Image"]["data"][number], "id">;
        }) => ({
          id: imgData.id,
          ...imgData.attributes,
        })
      ),
    },
  }));
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    let itemNumber = 1;
    const itemNumberStr = url.searchParams.get("itemNo");
    if (
      itemNumberStr &&
      typeof itemNumberStr === "string" &&
      !isNaN(+itemNumberStr) &&
      !isNaN(parseFloat(itemNumberStr))
    ) {
      itemNumber = Number(itemNumberStr);
    }

    const tokenOrResponse = getAndValidateTokenFromCookies();
    if (tokenOrResponse instanceof Response) {
      return tokenOrResponse;
    }

    const token = tokenOrResponse;

    const dataIdx = itemNumber > 0 ? itemNumber - 1 : 0;

    const hasNext = dataIdx + 1 < cache.data.length;
    const hasPrev = dataIdx > 0;
    if (cache.data.length && (cache.expiry ?? 0) > Date.now()) {
      if (!cache.data?.[dataIdx]) {
        throw new Error("No more chow.");
      }
      return Response.json({
        hasNext,
        hasPrev,
        chow: cache.data[dataIdx],
      });
    }

    const res = await fetch(`${CC_API_BASE_URL}/chows?populate=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseJson = await res.json();

    if (responseJson.error) {
      throw responseJson.error;
    }

    // TODO: use meta for pagination
    const { data, meta } = responseJson;

    if (!data?.[dataIdx]) {
      throw new Error("No more chow.");
    }

    // Flatten Strapi's response data
    const flattenedData = flattenData(data);

    cache = {
      data: flattenedData as IChow[],
      expiry: Date.now() + CACHE_DURATION,
    };

    return Response.json({ hasNext, hasPrev, chow: flattenedData[dataIdx] });
  } catch (error: any) {
    // TODO: use logging library
    console.error("Get Chows error", JSON.stringify(error, null, 2));
    const errorMessage = getMessageFromApiError(error);

    return new Response(`Error: ${JSON.stringify(errorMessage)}`, {
      status: error.status ?? 500,
      statusText: error.name ?? "Unknown error",
    });
  }
}
