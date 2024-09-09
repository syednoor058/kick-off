// import React from 'react'
import underConstructionImg from "../../assets/under_construction.webp";

export default function UnderConstruction() {
  return (
    <div className="w-full h-full flex flex-col gap-7 items-center">
      <div className="w-[30%] aspect-square">
        <img
          className="w-full h-full object-cover"
          src={underConstructionImg}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-4xl uppercase font-medium text-center">
          The developers are cooking something special!
        </div>
        <div className="text-lg text-center text-gray-400">
          Please stay with us to get served. Your patience is much obliged.
        </div>
      </div>
    </div>
  );
}
