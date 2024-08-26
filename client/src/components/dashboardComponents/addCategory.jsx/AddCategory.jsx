// import React from 'react'

import { useState } from "react";

export default function AddCategory() {
  const [catImg, setCatImg] = useState();
  const handleCategoryUpload = () => {
    console.log(catImg);
  };
  return (
    <div className="p-20 flex flex-col gap-10">
      <div className="text-xl uppercase">Add a new product category.</div>
      <div className="w-full flex flex-col gap-5">
        <div>
          <input
            className="w-[70%] outline-none rounded-sm px-3 py-2 border"
            placeholder="Enter category name *"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>Choose an image for the category *</div>
          <input
            className="w-[70%] outline-none rounded-sm px-3 py-2 border"
            type="file"
            onChange={(e) => setCatImg(e.target.files[0])}
          />
        </div>
        <div className="flex">
          <button
            className="uppercase px-5 py-2 rounded-sm bg-secondaryColor text-primaryColor hover:border hover:border-secondaryColor hover:text-secondaryColor hover:bg-transparent duration-300"
            onClick={handleCategoryUpload}
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
}
