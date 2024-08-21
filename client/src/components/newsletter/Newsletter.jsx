// import React from 'react'
import newsletterImg from "../../assets/newsletterImage.png";

export default function Newsletter() {
  return (
    <div className="ps-20 text-primaryColor bg-accentColor flex flex-row justify-between">
      <div className="w-[50%] py-20 flex flex-col gap-3">
        <div className="uppercase">10% Discount on your first order!</div>
        <div className="text-4xl font-bold">
          Join our newsletter and get more offer
        </div>
        <div>
          Join our email subscription now to get updates on promotions and
          coupons.
        </div>
        <div className="flex flex-row gap-3">
          <input
            className="w-[800px] border-none outline-none bg-gray-100 rounded px-5 py-5"
            placeholder="Your Email Address"
          />
          <div className="w-full h-full bg-secondaryColor rounded uppercase flex justify-center items-center">
            Subscribe
          </div>
        </div>
      </div>
      <div className="w-[33%] h-full">
        <img
          className="w-full h-full object-cover"
          src={newsletterImg}
          alt=""
        />
      </div>
    </div>
  );
}
