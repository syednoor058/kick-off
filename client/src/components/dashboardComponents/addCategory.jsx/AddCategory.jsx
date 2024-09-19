// import React from 'react'

import axios from "axios";
import { useContext, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { toast } from "react-toastify";
import imgSkeleton from "../../../assets/img_skeleton.png";
import { AuthContext } from "../../../context/AuthContext";
import CategoryTable from "./CategoryTable";

export default function AddCategory() {
  const { auth } = useContext(AuthContext);
  const [isSpinner, setIsSpinner] = useState(false);
  const [catName, setCatName] = useState("");
  const [catImg, setCatImg] = useState(null);
  const [preview, setPreview] = useState(null);

  const reloadPage = () => {
    window.location.reload();
  };

  const handleCategoryUpload = async () => {
    setIsSpinner(true);
    if (!catName) {
      setIsSpinner(false);
      toast.error("Category name is required!");
      return;
    }
    if (!catImg) {
      setIsSpinner(false);
      toast.error("Category image is required!");
      return;
    }
    const file = catImg;

    if (catImg.size > 1000000) {
      toast.error("Image file is too big!");
      setIsSpinner(false);
      return;
    }
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "category_pic_preset");
    data.append("cloud_name", `${import.meta.env.VITE_APP_CLOUD_NAME}`);
    const resPhoto = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_APP_CLOUD_NAME
      }/image/upload`,
      data
    );
    // console.log(res.data.url);
    const categoryData = new FormData();
    categoryData.append("name", catName?.toLowerCase());
    categoryData.append("photo", resPhoto?.data.url);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/create-category`,
        categoryData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${auth?.token}`,
          },
        }
      );
      if (res.data.success) {
        setIsSpinner(false);
        reloadPage();
        toast.success(res.data.message);
      } else {
        setIsSpinner(false);
        toast.error(res.data.message);
      }
    } catch (error) {
      setIsSpinner(false);
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
    <div className="p-10 flex flex-col gap-20">
      <div className="flex flex-row gap-5 relative">
        {isSpinner && (
          <div className="w-full h-full flex flex-col gap-5 justify-center items-center absolute backdrop-blur-[3px] z-[200] bg-primaryColor bg-opacity-80">
            <svg
              aria-hidden="true"
              className="w-16 h-16 text-secondaryColor animate-spin dark:text-gray-300 fill-secondaryColor"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}
        <div className="w-[70%] flex flex-col gap-10">
          <div className="text-xl uppercase">Add a new product category</div>
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
              <label
                htmlFor="catPhotoUpload"
                className="w-32 h-32 flex flex-col gap-2 justify-center items-center uppercase text-gray-500 font-semibold p-5 text-center border border-dashed border-gray-400 leading-4 cursor-pointer rounded text-sm"
              >
                <span className="text-gray-300 text-3xl">
                  <IoIosAddCircle />
                </span>
                Upload Photo
              </label>
              <input
                id="catPhotoUpload"
                className="w-[80%] outline-none rounded-sm px-3 py-2 border hidden"
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
            <div className="w-full aspect-[16/5] rounded bg-secondaryColor relative shadow-md group overflow-hidden">
              <img
                className="w-full h-full object-cover rounded group-hover:scale-[1.1] duration-300"
                src={preview}
                alt={catName}
              />
              <div className="w-full font-medium text-center text-lg absolute bottom-0 top-0 p-5 flex justify-center items-center text-primaryColor bg-accentColor bg-opacity-70 rounded leading-5 capitalize">
                {catName}
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center items-center aspect-square rounded-sm top-0 bottom-0 relative">
              <img
                className="w-full h-full object-cover scale-[1.1]"
                src={imgSkeleton}
                alt=""
              />
              <div className="w-full p-10 absolute bg-gradient-to-t from-secondaryColor to-transparent bottom-0 text-center text-primaryColor">
                Category Name
              </div>
            </div>
          )}
        </div>
      </div>
      <CategoryTable />
    </div>
  );
}
