// import React from 'react'
import { useEffect } from "react";
import Feature from "../../components/feature/Feature";
import Hero from "../../components/hero/Hero";

import Newsletter from "../../components/newsletter/Newsletter";
import LatestProducts from "../../components/products/LatestProducts";
import Products from "../../components/products/Products";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full h-full flex flex-col gap-10 md:gap-20 overflow-hidden pb-10 md:pb-20">
      <Hero />
      <Feature />
      <Products />
      <Newsletter />
      <LatestProducts />
    </div>
  );
}
