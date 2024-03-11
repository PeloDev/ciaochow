// Ref: https://flowbite.com/docs/components/carousel/
"use client";

import { useState } from "react";

interface IProps {
  images: { name: string; Component: JSX.Element }[];
}
export default function Carousel({ images }: IProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const onNextImage = () => {
    if (selectedIdx + 1 >= images.length) {
      setSelectedIdx(0);
    } else {
      setSelectedIdx(selectedIdx + 1);
    }
  };

  const onPrevImage = () => {
    if (selectedIdx <= 0) {
      setSelectedIdx(images.length - 1);
    } else {
      setSelectedIdx(selectedIdx - 1);
    }
  };

  const onSelectImageIdx = (idx: number) => {
    if (idx < images.length && idx >= 0) {
      setSelectedIdx(idx);
    }
  };

  return (
    <div
      id="default-carousel"
      className="relative w-full h-full"
      data-carousel="slide"
    >
      {/*<!-- Carousel wrapper -->*/}
      <div className="relative h-full overflow-hidden">
        {images.map((img, idx) => {
          const isSelected = idx === selectedIdx;
          return (
            <div
              key={`${img.name}-slide`}
              className={`${
                isSelected ? "" : "hidden "
              }duration-700 ease-in-out`}
              data-carousel-item
            >
              {/* className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" */}
              {img.Component}
            </div>
          );
        })}
      </div>
      {/*<!-- Slider indicators -->*/}
      <div className="absolute z-50 flex gap-[6px] justify-center -translate-x-1/2 bottom-12 left-1/2 rtl:space-x-reverse">
        {images.map((img, idx) => {
          const isSelected = idx === selectedIdx;
          return (
            <button
              key={`${img.name}-slide-button`}
              type="button"
              className={`w-2 h-2 rounded-full${
                isSelected ? " bg-white" : " bg-ccTextGray"
              }`}
              aria-current={isSelected}
              aria-label={`Slide ${idx + 1} (${img.name})`}
              data-carousel-slide-to={idx}
              onClick={() => onSelectImageIdx(idx)}
            ></button>
          );
        })}
      </div>
      {/*<!-- Slider controls -->*/}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
        onClick={onPrevImage}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30  group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
        onClick={onNextImage}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30  group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}
