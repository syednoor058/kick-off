// import React from 'react'
import newsletterImg from "../../assets/newsletterImage.png";

export default function Newsletter() {
  return (
    <div className="">
      <div className="ps-5 sm:ps-10 md:ps-16 lg:ps-20 text-primaryColor bg-accentColor flex flex-row justify-between ">
        <div className="w-[60%] py-10 md:py-20 flex flex-col gap-3 justify-center">
          <div className="text-xs sm:text-base uppercase">
            10% Discount on your first order!
          </div>
          <div className="text-2xl leading-7 sm:text-3xl md:text-4xl font-bold">
            Join our newsletter and get more offer
          </div>
          <div className="text-xs sm:text-base">
            Join our email subscription now to get updates on promotions and
            coupons.
          </div>
          <div className="flex flex-row gap-3">
            <input
              className="w-[70%] text-xs sm:text-sm md:text-base border-none outline-none bg-gray-100 rounded px-2 py-2 md:px-5 md:py-5"
              placeholder="Your Email Address"
            />
            <div className="w-[30%] h-full text-xs sm:text-sm md:text-base bg-secondaryColor rounded uppercase flex justify-center items-center px-2 py-2 md:px-5 md:py-5">
              Subscribe
            </div>
          </div>
        </div>
        <div className="w-[35%] top-0 bottom-0">
          <img
            className="w-full h-full object-cover object-left-bottom"
            src={newsletterImg}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
