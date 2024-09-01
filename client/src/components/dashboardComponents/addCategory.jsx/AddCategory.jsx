// import React from 'react'

import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import CategoryTable from "./CategoryTable";

export default function AddCategory() {
  const { auth } = useContext(AuthContext);
  const [catName, setCatName] = useState("");
  const [catImg, setCatImg] = useState(null);
  const [preview, setPreview] = useState(null);
  const handleCategoryUpload = async () => {
    if (!catImg || !catName) {
      toast.error("Please fill out all the fields.");
      return;
    }
    const formData = new FormData();
    formData.append("name", catName);
    formData.append("photo", catImg);
    console.log(formData);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/create-category`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${auth?.token}`,
          },
          user: auth.user,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setCatImg(file);
    setPreview(URL.createObjectURL(file));
  };
  return (
    <div className="p-20 flex flex-col gap-20">
      <div className="flex flex-row gap-5">
        <div className="w-[70%] flex flex-col gap-10">
          <div className="text-xl uppercase">Add a new product category.</div>
          <div className="w-full flex flex-col gap-5">
            <div>
              <input
                className="w-[80%] outline-none rounded-sm px-3 py-2 border"
                placeholder="Enter category name *"
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>Choose an image for the category *</div>
              <input
                className="w-[80%] outline-none rounded-sm px-3 py-2 border"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                required
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
        <div className="w-[25%] flex flex-col gap-5">
          <div className="w-full text-center uppercase">Category Preview</div>
          {preview ? (
            <div className="w-full aspect-square rounded bg-secondaryColor relative shadow-md group overflow-hidden">
              <img
                className="w-full h-full object-cover rounded group-hover:scale-[1.1] duration-300"
                src={preview}
                alt={catName}
              />
              <div className="w-full font-medium text-center text-lg absolute bottom-0 pt-16 pb-5 px-5 text-primaryColor bg-gradient-to-t from-secondaryColor to-transparent rounded leading-5 capitalize">
                {catName}
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center items-center aspect-square border border-gray-400 border-dashed rounded-sm top-0 bottom-0">
              <div className="text-gray-400 p-8 text-center">
                Category will be displayed here
              </div>
            </div>
          )}
        </div>
      </div>
      <CategoryTable />
    </div>
  );
}
