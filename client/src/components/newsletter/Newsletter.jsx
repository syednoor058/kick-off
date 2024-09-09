// import React from 'react'
import newsletterImg from "../../assets/newsletterImage.webp";

export default function Newsletter() {
  return (
    <div className="">
      <div className="px-5 sm:px-7 md:px-10 lg:px-10 text-primaryColor bg-accentColor flex flex-row gap-10 ">
        <div className="w-[60%] py-5 sm:py-10 flex flex-col gap-3 justify-center">
          <div className="text-xs lg:text-sm uppercase">
            10% Discount on your first order!
          </div>
          <div className="text-xl leading-5 sm:text-2xl sm:leading-7 lg:text-4xl font-bold">
            Join our newsletter and get more offer
          </div>
          <div className="text-xs lg:text-base">
            Join our email subscription now to get updates on promotions and
            coupons.
          </div>
          <div className="flex flex-row gap-3">
            <input
              className="w-[70%] text-xs sm:text-sm md:text-base border-none outline-none bg-gray-100 rounded-sm px-2 py-2 md:px-5 md:py-5"
              placeholder="Your Email Address"
            />
            <div className="w-[30%] h-full text-xs sm:text-sm md:text-base bg-secondaryColor rounded-sm uppercase flex justify-center items-center px-2 py-2 md:px-5 md:py-5">
              Subscribe
            </div>
          </div>
        </div>
        <div className="w-[40%] flex items-end">
          <div className="w-full aspect-square">
            <img
              className="w-full h-full object-cover object-left-bottom"
              src={newsletterImg}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
