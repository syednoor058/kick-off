// import React from 'react'

import { useEffect } from "react";
import UnderConstruction from "../../components/underConstruction/UnderConstruction";

export default function MyOrder() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full h-full mt-[104px]">
      <div className="w-full h-full px-7 py-14 lg:px-20 lg:py-20 flex justify-center items-center">
        <UnderConstruction />
      </div>
    </div>
  );
}
