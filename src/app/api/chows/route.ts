import { CC_API_BASE_URL } from "../consts";
import {
  getAndValidateTokenFromCookies,
  getMessageFromApiError,
} from "../helpers";

interface IImageFormatDetails {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: string | null;
  url: string;
}

interface IImageData {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    thumbnail: IImageFormatDetails;
    large: IImageFormatDetails;
    medium: IImageFormatDetails;
    small: IImageFormatDetails;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown | null;
  createdAt: string;
  updatedAt: string;
}

interface IChow {
  id: number;
  Description: string;
  Image: { data: IImageData };
  Title: string;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
}

interface ICache {
  data: IChow[];
  expiry: number | null;
}

const CACHE_DURATION = 300 * 1000; // in ms - 5 mins

// In-memory cache. TODO: use some other caching strategy for chows
let cache: ICache = { data: [], expiry: null };

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
    if (cache.data.length && (cache.expiry ?? 0) > Date.now()) {
      return Response.json(cache.data[dataIdx]);
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

    // Flatten Strapi's response data
    const flattenedData = (
      data as { id: number; attributes: Record<string, unknown> }[]
    ).map((chow) => ({
      id: chow.id,
      ...chow.attributes,
    }));

    cache = {
      data: flattenedData as IChow[],
      expiry: Date.now() + CACHE_DURATION,
    };

    return Response.json(flattenedData[dataIdx]);
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
