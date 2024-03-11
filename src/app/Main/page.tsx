"use client";

import { useLazyGetChowQuery } from "@/lib/redux/api/api-slice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { heartSelected, heartUnselected } from "../assets/vectors";
import Carousel from "../components/Carousel";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { addRemoveFavourite } from "@/lib/redux/features/favourites-slice";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const CHOW_IMG_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

type ImageFormat = "thumbnail" | "small" | "medium" | "large";

function getAvailableImageUrlsDesc(
  imageFormats: Record<ImageFormat, { name: string; url: string }>
) {
  const formatsLargestToSmallest: ImageFormat[] = [
    "large",
    "medium",
    "small",
    "thumbnail",
  ];

  return formatsLargestToSmallest
    .filter((format) => imageFormats[format]?.url !== undefined)
    .map((format) => imageFormats[format]);
}

interface IProps {
  defaultTab?: "description" | "nutritionalFacts";
}

export default function Main({ defaultTab = "description" }: IProps) {
  const [chowImageUrls, setChowImageUrls] = useState<
    Record<ImageFormat, { name: string; url: string }>[]
  >([]);
  const [tab, setTab] = useState<IProps["defaultTab"]>(defaultTab);

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentChowId = searchParams.get("chow");

  const [getChow, { data, isLoading, isFetching, error }] =
    useLazyGetChowQuery();

  const dispatch = useAppDispatch();
  const favouriteChows = useAppSelector(
    (state) => state.favourites.favouriteChows
  );

  useEffect(() => {
    getChow({ itemNumber: Number(currentChowId) });
  }, [currentChowId]);

  useEffect(() => {
    if (!data?.chow) {
      return;
    }
    const { chow } = data;
    const chowImgFormats = chow.Image.data.map((img) => img.formats);
    const chowImageUrls = chowImgFormats.map((imgFormats) => {
      return Object.entries(imgFormats).reduce(
        (acc, [currKey, currImgData]) => {
          return {
            ...acc,
            [currKey]: {
              name: currImgData.name,
              url: `${CHOW_IMG_BASE_URL}${currImgData.url}`,
            },
          };
        },
        {} as Record<ImageFormat, { name: string; url: string }>
      );
    });
    setChowImageUrls(chowImageUrls);
    window.history.replaceState({}, "", `/main/${tab}?chow=${chow.id}`);
  }, [data]);

  useEffect(() => {
    if (data?.chow.id) {
      window.history.replaceState({}, "", `/main/${tab}?chow=${data.chow.id}`);
    }
  }, [tab, data?.chow.id]);

  useEffect(() => {
    if (error) {
      router.back();
    }
  }, [error]);

  const onSelectDescriptionTab = () => {
    if (tab !== "description") {
      setTab("description");
    }
  };

  const onSelectNutritionalFactsTab = () => {
    if (tab !== "nutritionalFacts") {
      setTab("nutritionalFacts");
    }
  };

  const onToggleFavouriteChow = (chowId: number) => {
    dispatch(addRemoveFavourite({ chowId }));
  };

  const onRefreshPage = () => {
    router.refresh();
  };

  if (error && currentChowId === "1") {
    return (
      <div className="flex flex-col justify-center items-center">
        <p>
          Something has gone wrong. Please select one of the following options:
        </p>
        <Link href="/main">Back to Main</Link>
        <button onClick={onRefreshPage}>Refresh</button>
        <Link href="/logout">Logout</Link>
      </div>
    );
  }

  if (
    isLoading ||
    isFetching ||
    !data?.chow ||
    chowImageUrls.length < data.chow?.Image.data.length
  ) {
    return <p>Loading...</p>;
  }

  const { chow, hasNext, hasPrev } = data;

  return (
    <div className="w-full flex-1 flex flex-col bg-[center_top_-44px] bg-white">
      <div className="flex flex-col min-h-[40vh] relative">
        <Carousel
          images={chowImageUrls.map((imageUrlData, idx) => {
            const availableImages = getAvailableImageUrlsDesc(imageUrlData);
            return {
              name: `${availableImages[0].name}-${idx + 1}`,
              Component: (
                <Image
                  loader={() => availableImages[0].url}
                  src={availableImages[0].url}
                  alt={`${availableImages[0].name}-${idx + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="min-h-[40vh]"
                  priority
                />
              ),
            };
          })}
        />
        <div className="absolute top-[50%] left-0 right-0 bottom-0 bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-transparent"></div>
      </div>
      <div className="flex flex-col relative rounded-t-[30px] top-[-30px] bg-white flex-1 py-[30px]">
        <div className="flex justify-between  px-[20px]">
          <p className="font-semibold text-[24px] text-ccBlack">{chow.Title}</p>
          <button
            className={`w-[30px] h-[30px] rounded-lg ${
              favouriteChows.includes(chow.id)
                ? "bg-[rgba(0,0,0,0.1)]"
                : "bg-[rgba(0,0,0,0.5)]"
            } flex items-center justify-center`}
            onClick={() => onToggleFavouriteChow(chow.id)}
          >
            <Image
              // TODO: fix selected svg
              src={
                favouriteChows.includes(chow.id)
                  ? heartSelected
                  : heartUnselected
              }
              alt="Favorite button icon"
              width={20}
              height={20}
              priority
            />
          </button>
        </div>
        <div className="flex justify-evenly items-center border-b h-[63px]">
          <div className="flex flex-col h-full justify-center relative">
            <button onClick={onSelectDescriptionTab}>
              <p
                className={`${
                  tab === "description" ? "text-ccGreenAlt" : "text-ccBlack"
                }`}
              >
                Description
              </p>
            </button>
            {tab === "description" && (
              <div className="absolute bottom-0 border-t-4 w-[100%] rounded-t-[20px] border-ccGreenAlt bg-ccGreenAlt"></div>
            )}
          </div>
          <div className="flex flex-col h-full justify-center relative">
            <button onClick={onSelectNutritionalFactsTab}>
              <p
                className={`${
                  tab === "nutritionalFacts"
                    ? "text-ccGreenAlt"
                    : "text-ccBlack"
                }`}
              >
                Nutritional facts
              </p>
            </button>
            {tab === "nutritionalFacts" && (
              <div className="absolute bottom-0 border-t-4 w-[100%] rounded-t-[20px] border-ccGreenAlt bg-ccGreenAlt"></div>
            )}
          </div>
        </div>
        <div className="py-9 px-7">
          <p className="text-ccTextGray text-[13px]">
            {tab === "description"
              ? chow.Description
              : "Nothing to display yet..."}
          </p>
        </div>
      </div>
      <div className="fixed left-0 right-0 bottom-0 p-6 bg-white rounded-[34px] drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)]">
        <Link
          href={`?chow=${chow.id + 1}`}
          className="w-full text-white justify-center flex mt-4 bg-ccGreen rounded-[10px] p-[16px] font-semibold text-[16px] shadow-lg"
          aria-disabled={!hasNext}
        >
          {favouriteChows.includes(chow.id) ? "" : "Nah! "}Find something else.
        </Link>
      </div>
    </div>
  );
}
