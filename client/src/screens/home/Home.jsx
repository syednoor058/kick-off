// import React from 'react'
import Feature from "../../components/feature/Feature";
import Footer from "../../components/footer/Footer";
import Hero from "../../components/hero/Hero";
import Navbar from "../../components/navbar/Navbar";

export default function Home() {
  return (
    <div className="w-full h-full overflow-hidden">
      <Navbar />
      <Hero />
      <Feature />
      <Footer />
    </div>
  );
}
