/* eslint-disable react/prop-types */
// import React from 'react'
import { useEffect, useState } from "react";
// import { ProductContext } from "../../context/ProductContext";
import ProductCard from "../products/ProductCard";

export default function RelatedProducts(props) {
  //   const { relatedProducts } = useContext(ProductContext);
  const [topRelatedProducts, setTopRelatedProducts] = useState({});

  useEffect(() => {
    if (props.products.length > 0) {
      setTopRelatedProducts(props.products.slice(0, 8));
    }
  }, [props.products]);

  return (
    <div className="w-full h-full flex flex-col gap-5 md:gap-8 items-center">
      <div className="w-full font-bold uppercase text-center text-2xl sm:text-3xl md:text-4xl">
        Related Products
      </div>
      {topRelatedProducts.length > 0 ? (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7 justify-center place-items-center">
          {topRelatedProducts.map((item, index) => (
            <ProductCard
              key={index}
              id={item._id}
              image={item.image[0]}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      ) : (
        <div className=" w-full flex items-center justify-center text-center text-2xl sm:text-3xl md:text-4xl lg:text-6xl uppercase font-medium text-gray-300 leading-none px-20 py-20">
          No related product found!
        </div>
      )}
    </div>
  );
}
