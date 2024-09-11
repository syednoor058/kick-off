import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";

// import React from 'react'

export default function CategoryTable() {
  const { auth } = useContext(AuthContext);
  const [isSpinner, setIsSpinner] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCatName, setNewCatName] = useState();
  const [newCatImg, setNewCatImg] = useState();
  const [preview, setPreview] = useState();
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isEditingSpinner, setIsEditingSpinner] = useState(false);
  const [isDeleteSpinner, setIsDeleteSpinner] = useState(false);
  const [isDeletePopopen, setIsDeletePopopen] = useState(false);
  const [deleteCat, setDeleteCat] = useState();

  const reloadPage = () => {
    window.location.reload();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setNewCatImg(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDelete = (category) => {
    setIsDeletePopopen(true);
    setDeleteCat(category);
  };

  const submitDelete = async () => {
    try {
      setIsDeleteSpinner(true);
      const res = await axios.delete(
        `${import.meta.env.VITE_APP_API}/api/delete-category/${deleteCat._id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${auth?.token}`,
          },
        }
      );
      if (res.data.success) {
        toast.success("The category is deleted!");
        setIsDeleteSpinner(false);
        setIsDeletePopopen(false);
        reloadPage();
      } else {
        toast.error(res.data.message);
        setIsDeleteSpinner(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting the category!");
      setIsDeleteSpinner(false);
    }
  };

  const handleUpdateCategory = async () => {
    try {
      setIsEditingSpinner(true);

      let uploadPhotoUrl = preview;

      if (newCatImg) {
        if (newCatImg.size > 1000000) {
          toast.error("Image file is too big!");
          setIsEditingSpinner(false);
          return;
        }
        const file = newCatImg;

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
        uploadPhotoUrl = resPhoto.data.url;
      }

      console.log(newCatName);
      console.log(preview);

      const formData = new FormData();
      formData.append("name", newCatName.toLowerCase());
      formData.append("photo", uploadPhotoUrl);

      const res = await axios.put(
        `${import.meta.env.VITE_APP_API}/api/update-category/${
          selectedCategory._id
        }`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${auth?.token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Category updated successfully!");
        setIsEditPopupOpen(false);
        setIsEditingSpinner(false);
        reloadPage();
      } else {
        toast.error(res.data.message);
        setIsEditingSpinner(false);
      }

      // Refresh the categories list after updating
      // const resCategory = await axios.get(
      //   "${import.meta.env.VITE_APP_API}/api/categories"
      // );
      // setCategories(resCategory.data.categories);
    } catch (error) {
      console.log(error);
      toast.error("Error updating category!");
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setNewCatName(category.name);
    setPreview(category.photo);
    setIsEditPopupOpen(true);
  };
  useEffect(() => {
    // Fetch all categories
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API}/api/categories`
        );

        if (res.data.success) {
          setCategories(res.data.categories);
          setIsSpinner(false);
        } else {
          toast.error(res.data.message);
          setIsSpinner(false);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error fetching categories!");
        setIsSpinner(false);
      }
    };
    fetchCategories();
  }, []);
  return (
    <div>
      <table className="min-w-full table-fixed bg-primaryColor border">
        <thead>
          <tr className="w-full bg-gray-300 text-secondaryColor uppercase font-normal">
            <th className="w-[10%]  py-2 px-4 border-b">Index</th>
            <th className="w-[20%]  py-2 px-4 border-b">Photo</th>
            <th className="w-[35%]  py-2 px-4 border-b">Category</th>
            <th className="w-[35%]  py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <tr key={category._id} className="border-b">
                <td className="w-[10%] py-2 px-4">
                  <div className="w-full h-full flex justify-center items-center">
                    {index + 1}
                  </div>
                </td>
                <td className="w-[20%]  py-2 px-4 justify-center items-center">
                  <div className="flex justify-center items-center">
                    <img
                      src={category.photo}
                      alt={category.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </div>
                </td>
                <td className="w-[35%]  py-2 px-4 text-center capitalize">
                  {category.name}
                </td>

                <td className="w-[35%]  py-2 px-4">
                  {/* You can add Edit/Delete buttons here */}
                  <div className="w-full flex flex-row gap-10 justify-center items-center">
                    <button
                      className="text-blue-500 flex justify-center items-end leading-none"
                      onClick={() => handleEdit(category)}
                    >
                      <span className="px-1">
                        <EditIcon fontSize="small" />
                      </span>
                      Edit
                    </button>
                    <button
                      className="text-red-500 flex justify-center items-end leading-none"
                      onClick={() => handleDelete(category)}
                    >
                      <span className="px-1">
                        <DeleteIcon fontSize="small" />
                      </span>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-20 px-10 text-center relative" colSpan="4">
                {isSpinner && (
                  <div className="w-full h-full flex flex-col gap-5 justify-center items-center absolute backdrop-blur-[3px] z-[200] bg-primaryColor bg-opacity-80 -my-20 -mx-10">
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 text-secondaryColor animate-spin dark:text-gray-300 fill-secondaryColor"
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
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {isEditPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-[2px]">
          <div className="w-[60%] bg-white p-8 rounded shadow-md relative">
            {isEditingSpinner && (
              <div className="-m-8 w-full h-full flex flex-col gap-5 justify-center items-center absolute backdrop-blur-[3px] z-[200] bg-primaryColor bg-opacity-80">
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
            <div className="w-full flex flex-row justify-between">
              <div className="w-[60%] flex flex-col gap-5">
                <h2 className=" text-xl font-semibold uppercase">
                  Edit Category
                </h2>
                <div className="flex flex-row gap-5">
                  <div className="w-full flex flex-col gap-5">
                    <input
                      className="w-full p-2 border border-gray-300 rounded-sm capitalize"
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                    />
                    <div className="">Choose an image for the category *</div>
                    <label
                      htmlFor="editCategoryUpload"
                      className="w-32 h-32 flex flex-col gap-2 justify-center items-center uppercase text-gray-500 font-semibold p-5 text-center border border-dashed border-gray-400 leading-4 cursor-pointer rounded text-sm"
                    >
                      <span className="text-gray-300 text-3xl">
                        <IoIosAddCircle />
                      </span>
                      Upload Photo
                    </label>
                    <input
                      id="editCategoryUpload"
                      className="w-full p-2 border border-gray-300 rounded hidden"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-sm"
                    onClick={() => setIsEditPopupOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-sm"
                    onClick={handleUpdateCategory}
                  >
                    Update
                  </button>
                </div>
              </div>
              <div className="w-[35%] flex flex-col gap-5">
                <div className="uppercase text-center">Preview</div>
                <div className="w-full aspect-square relative">
                  <div className="text-center font-semibold capitalize p-10 bg-gradient-to-t from-secondaryColor to-transparent absolute bottom-0 right-0 left-0 text-primaryColor">
                    {selectedCategory.name}
                  </div>
                  <img
                    className="w-full aspect-square object-cover rounded-sm"
                    src={preview}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isDeletePopopen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-[2px]">
          <div className="p-10 flex flex-col gap-5 bg-primaryColor relative">
            {isDeleteSpinner && (
              <div className="-m-10 w-full h-full flex justify-center items-center absolute backdrop-blur-[3px] z-[200] bg-primaryColor bg-opacity-80">
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
            <div>Do you really want to delete this category?</div>
            <div className="flex flex-row justify-center gap-5">
              <button
                className="px-5 py-2 rounded-sm bg-gray-300 uppercase"
                onClick={() => setIsDeletePopopen(false)}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 rounded-sm bg-red-500 text-primaryColor uppercase"
                onClick={submitDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
