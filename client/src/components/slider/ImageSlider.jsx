/* eslint-disable react/prop-types */
// import React from 'react'
import { useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

export default function ImageSlider({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="w-full h-full overflow-hidden relative">
      <div className="absolute top-[50%] left-5">
        <span
          className="p-2 text-2xl rounded-[50%] bg-primaryColor text-secondaryColor flex justify-center items-center cursor-pointer"
          onClick={goToPrevious}
        >
          <MdOutlineKeyboardArrowLeft />
        </span>
      </div>
      <div className="absolute top-[50%] right-5">
        <span
          className="p-2 text-2xl rounded-[50%] bg-primaryColor text-secondaryColor flex justify-center items-center cursor-pointer"
          onClick={goToNext}
        >
          <MdOutlineKeyboardArrowRight />
        </span>
      </div>
      <div className="w-full aspect-video rounded">
        <img
          className="w-full h-full object-cover"
          src={slides[currentIndex].url}
          alt=""
        />
      </div>
    </div>
  );
}
