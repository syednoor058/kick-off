import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";

// import React from 'react'

export default function CategoryTable() {
  const { auth } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCatName, setNewCatName] = useState();
  const [newCatImg, setNewCatImg] = useState(null);
  const [preview, setPreview] = useState();
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setNewCatImg(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdateCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newCatName);
      if (newCatImg) {
        formData.append("photo", newCatImg);
      }

      await axios.put(
        `${import.meta.env.VITE_APP_API}/api/category/${selectedCategory._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${auth?.token}`,
          },
        }
      );

      toast.success("Category updated successfully!");
      setIsEditPopupOpen(false);
      // Refresh the categories list after updating
      const { data } = await axios.get(
        "${import.meta.env.VITE_APP_API}/api/categories"
      );
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
      toast.error("Error updating category!");
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setNewCatName(category.name);
    setPreview(
      `${import.meta.env.VITE_APP_API}/api/category/photo/${category._id}`
    );
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
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error fetching categories!");
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
                      src={`${
                        import.meta.env.VITE_APP_API
                      }/api/category/photo/${category._id}`}
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
                    <button className="text-red-500 flex justify-center items-end leading-none">
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
              <td className="py-2 px-4 text-center" colSpan="4">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {isEditPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-[2px]">
          <div className="w-[60%] bg-white p-8 rounded shadow-md flex flex-col gap-5">
            <h2 className=" text-xl font-semibold uppercase">Edit Category</h2>
            <div className="flex flex-row gap-5">
              <div className="w-[80%] flex flex-col gap-5">
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                />
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </div>
              <div className="w-[20%]">
                {preview && (
                  <div className="w-full aspect-square">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsEditPopupOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleUpdateCategory}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
