// import React from 'react'
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

export default function Footer() {
  return (
    <>
      <div className="w-full h-full p-20 bg-secondaryAccentColor flex flex-row justify-between text-primaryColor items-center">
        <div className="flex flex-row gap-16">
          <div className="flex flex-col gap-2">
            <div className="font-bold uppercase text-xl">Information</div>
            <div className="">About Kick-Off</div>
            <div>Customer Service</div>
            <div>Contact Us</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-bold uppercase text-xl">Policies</div>
            <div className="">Delivery Policy</div>
            <div>Exchange policy</div>
            <div>Privacy Policy</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-bold uppercase text-xl">Customer Services</div>
            <div className="">(+880)1400020036</div>
            <div>(+880)1782734573</div>
            <div>SUNDAY - THURSDAY (09:00 AM - 11:00 PM)</div>
          </div>
        </div>
        <div className="flex flex-row gap-16">
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
      <div className="w-full py-5 text-center text-sm text-primaryColor bg-secondaryAccentColor">
        © 2024. All rights reserved by Syed Shaeduzzaman Noor
      </div>
    </>
  );
}
