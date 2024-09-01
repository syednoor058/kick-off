import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function NewCat() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatImg, setNewCatImg] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_API}/api/categories`
        );
        setCategories(data.categories);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching categories!");
      }
    };

    fetchCategories();
  }, []);

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setNewCatName(category.name);
    setPreview(`/api/category/photo/${category._id}`);
    setIsEditPopupOpen(true);
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setIsDeletePopupOpen(true);
  };

  const handleUpdateCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newCatName);
      if (newCatImg) {
        formData.append("photo", newCatImg);
      }

      await axios.put(`/api/category/${selectedCategory._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Category updated successfully!");
      setIsEditPopupOpen(false);
      // Refresh the categories list after updating
      const { data } = await axios.get("/api/categories");
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
      toast.error("Error updating category!");
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await axios.delete(`/api/category/${selectedCategory._id}`);
      toast.success("Category deleted successfully!");
      setIsDeletePopupOpen(false);
      // Refresh the categories list after deleting
      const { data } = await axios.get("/api/categories");
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
      toast.error("Error deleting category!");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setNewCatImg(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/3 px-4 py-2">Name</th>
            <th className="w-1/3 px-4 py-2">Photo</th>
            <th className="w-1/3 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td className="border px-4 py-2">{category.name}</td>
              <td className="border px-4 py-2">
                <img
                  src={`/api/category/photo/${category._id}`}
                  alt={category.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
                  onClick={() => handleEditClick(category)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  onClick={() => handleDeleteClick(category)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Popup */}
      {isEditPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded shadow-md w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Category</h2>
            <input
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
            />
            <input
              className="w-full p-2 border border-gray-300 rounded mb-4"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            {preview && (
              <div className="mb-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-40 object-cover"
                />
              </div>
            )}
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

      {/* Delete Popup */}
      {isDeletePopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded shadow-md w-1/3">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete this category?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsDeletePopupOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDeleteCategory}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
