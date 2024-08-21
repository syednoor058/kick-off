// import React from 'react'
import Feature from "../../components/feature/Feature";
import Hero from "../../components/hero/Hero";

import Newsletter from "../../components/newsletter/Newsletter";
import Products from "../../components/products/Products";

export default function Home() {
  return (
    <div className="w-full h-full overflow-hidden">
      <Hero />
      <Feature />
      <Newsletter />
      <Products />
    </div>
  );
}
