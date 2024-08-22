// import React from 'react'
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

export default function Footer() {
  return (
    <>
      <div className="w-full h-full px-5 sm:px-10 md:px-16 lg:px-20 py-10 md:py-20 bg-secondaryAccentColor flex flex-col lg:flex-row gap-10 lg:justify-between lg:gap-0 text-primaryColor items-center">
        <div className="flex flex-row gap-6 md:gap-10 lg:gap-16">
          <div className="flex flex-col gap-2">
            <div className="font-medium uppercase text-lg md:text-xl">
              Information
            </div>
            <div className="text-xs md:text-base">About Kick-Off</div>
            <div className="text-xs md:text-base">Customer Service</div>
            <div className="text-xs md:text-base">Contact Us</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-medium uppercase text-lg md:text-xl">
              Policies
            </div>
            <div className="text-xs md:text-base">Delivery Policy</div>
            <div className="text-xs md:text-base">Exchange policy</div>
            <div className="text-xs md:text-base">Privacy Policy</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-medium uppercase text-lg md:text-xl">
              Customer Services
            </div>
            <div className="text-xs md:text-base">+(880)1400020036</div>
            <div className="text-xs md:text-base">+(880)1782734573</div>
            <div className="text-xs md:text-base">
              SUNDAY - THURSDAY (09:00 AM - 11:00 PM)
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-6 md:gap-10">
          <div className="text-3xl">
            <FaFacebookF />
          </div>
          <div className="text-3xl">
            <RiInstagramFill />
          </div>
          <div className="text-3xl">
            <FaYoutube />
          </div>
        </div>
      </div>
      <div className="w-full pb-5 text-center text-sm text-gray-300 bg-secondaryAccentColor">
        © 2024. All rights reserved by Syed Shaeduzzaman Noor
      </div>
    </>
  );
}
