// import React from 'react'
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import FeatureCard from "./FeatureCard";

export default function Feature() {
  const { categories } = useContext(ProductContext);
  return (
    <div className="w-full h-full px-5 sm:px-10 md:px-16 lg:px-20 flex flex-col gap-8 items-center">
      <div className="w-full font-bold uppercase text-center text-2xl  lg:text-4xl">
        All Categories
      </div>

      {categories.length > 0 ? (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-2 md:gap-3 place-items-center place-content-center">
          {categories.map((category, index) => (
            <FeatureCard
              key={index}
              title={category.name}
              image={category.photo}
            />
          ))}
        </div>
      ) : (
        <div className="w-full p-20 text-center text-gray-400 font-medium uppercase">
          No Categories Found!
        </div>
      )}
    </div>
  );
}
