/* eslint-disable react/prop-types */
// import React from 'react'

export default function CheckoutList(props) {
  return (
    <div className="w-full flex flex-row gap-5">
      <div className="w-[80%] flex flex-row gap-3">
        <div className="w-12 h-12 relative border border-gray-400">
          <div className="w-[40%] h-[40%] absolute text-primaryColor flex justify-center items-center rounded-full bg-red-600 -left-2 -top-2 text-xs md:text-sm">
            {props.cart.quantity}
          </div>
          <img
            className="h-full w-full object-cover"
            src={props.item.image[0]}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-sm">{props.item.name}</div>
          <div className="text-xs text-gray-600">
            {props.item.category} / {props.item.type} / {props.cart.size}
          </div>
        </div>
      </div>

      <div className="w-[20%] font-medium">
        {props.cart.quantity * props.item.price}{" "}
        <span className="font-normal text-sm text-gray-600">BDT</span>
      </div>
    </div>
  );
}
