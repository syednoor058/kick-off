// import React from 'react'
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import ProductCard from "./ProductCard";

export default function LatestProducts() {
  const { products } = useContext(ProductContext);
  const [latestProducts, setLatestProducts] = useState([]);
  useEffect(() => {
    setLatestProducts(products.slice(0, 8));
  }, [products]);

  return (
    <div className="w-full h-full flex flex-col gap-8 items-center">
      <div className="w-full font-bold uppercase text-center text-4xl">
        Latest Products
      </div>
      <div className="w-full px-5 sm:px-10 md:px-16 lg:px-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7 justify-center place-items-center">
        {latestProducts.map((item, index) => (
          <ProductCard
            key={index}
            id={item._id}
            image={item.image[0]}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}
