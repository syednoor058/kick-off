// import React from 'react'

import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "../../components/products/ProductDetails";
import Products from "../../components/products/Products";
import { ProductContext } from "../../context/ProductContext";

export default function ProductDetail() {
  const { productId } = useParams();
  const { products } = useContext(ProductContext);
  const product = products.filter((item) => item._id === productId);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full flex flex-col gap-10 md:gap-20 pb-10 md:pb-20 mt-[104px]">
      <ProductDetails item={product[0]} />
      <Products />
    </div>
  );
}
