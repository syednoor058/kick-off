// import React from 'react'
import FeatureCard from "./FeatureCard";

export default function Feature() {
  return (
    <div className="w-full h-full p-20 flex flex-col gap-8 items-center">
      <div className="w-full font-bold uppercase text-center text-4xl">
        Top Categories
      </div>
      <div className="w-full grid grid-cols-4 gap-5">
        <FeatureCard
          image="https://e0.365dm.com/23/05/1600x900/skysports-liverpool-salah-mo_6144407.jpg?20230505081723"
          title="Club Football Jersey"
        />
        <FeatureCard
          image="https://agenda.ge/uploads/files/francenationalteam-adjaratextile.jpg"
          title="National Team Jersey"
        />
        <FeatureCard
          image="https://swaz.co.uk/wp-content/uploads/2024/04/swaz-website-kitdesigns-stroke.webp"
          title="Custom Football Jersey"
        />
        <FeatureCard
          image="https://m.media-amazon.com/images/I/81BRQG4otJL._AC_SL1500_.jpg"
          title="Football Boots"
        />
      </div>
    </div>
  );
}
