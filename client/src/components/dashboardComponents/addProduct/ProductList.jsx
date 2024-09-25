// import React from 'react'
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";

export default function ProductList() {
  const { auth } = useContext(AuthContext);
  // const [deletePhoto, setDeletePhoto] = useState([]);
  const [isDeleteSpinner, setIsDeleteSpinner] = useState(false);
  const [isSpiner, setIsSpiner] = useState(false);
  const [isAvailable, setIsAvailable] = useState();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(true);
  const [newProductName, setNewProductName] = useState("");
  const [newSelectedCategory, setNewSelectedCategory] = useState("");
  const [newProductType, setNewProductType] = useState("");
  const [newSelectedSizes, setNewSelectedSizes] = useState([]);
  const [newPrice, setNewPrice] = useState();
  const [newPhotos, setNewPhotos] = useState([]);
  const [newPhotoUpload, setNewPhotoUpload] = useState([]);
  const [newDesc, setNewDesc] = useState("");
  const [editableProduct, setEditableProduct] = useState();
  const [deleteProduct, setDeleteProduct] = useState();
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const reloadPage = () => {
    window.location.reload();
  };

  const submitDelete = async () => {
    setIsDeleteSpinner(true);
    const res = await axios.delete(
      `${import.meta.env.VITE_APP_API}/api/delete-product/${deleteProduct._id}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${auth?.token}`,
        },
        user: auth.user,
      }
    );
    if (res) {
      setIsDeleteSpinner(false);
    }
    if (res.data.success) {
      setIsDeletePopupOpen(false);
      await reloadPage();
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  };

  const handleDelete = (product) => {
    setDeleteProduct(product);
    setIsDeletePopupOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSpiner(true);

    try {
      //check if there is any oversized photo
      const isFileTooBig = newPhotoUpload.some(
        (photo) => photo.file.size > 1000000
      );

      if (isFileTooBig) {
        toast.error("Image file is too big!");
        setIsSpiner(false);
        return; // Exit the function early if a file is too big
      }

      //upload images to cloudinary
      let photosUploadUrl = await Promise.all(
        newPhotoUpload.map(async (photo) => {
          const data = new FormData();
          data.append("file", photo.file);
          data.append("upload_preset", "kickoff_product_image");
          data.append("cloud_name", `${import.meta.env.VITE_APP_CLOUD_NAME}`);
          const resPhoto = await axios.post(
            `https://api.cloudinary.com/v1_1/${
              import.meta.env.VITE_APP_CLOUD_NAME
            }/image/upload`,
            data
          );
          // console.log(resPhoto);
          return resPhoto.data.url;
          // setPhotosUrl((prevUrl) => [...prevUrl, resPhoto.data.url]);
        })
      );

      if (!Array.isArray(photosUploadUrl)) {
        photosUploadUrl = [photosUploadUrl];
      }

      const combinedPhotos = [...newPhotos, ...photosUploadUrl];
      // setNewPhotos(combinedPhotos);

      // console.log(photosUploadUrl);
      // console.log(newPhotos);
      // console.log(combinedPhotos);

      if (combinedPhotos.length < 1) {
        toast.error("Atleast one photo is required");
        setIsSpiner(false);
        return;
      }

      // console.log(newSelectedCategory);

      const formData = new FormData();
      formData.append("name", newProductName);
      formData.append("productType", newProductType);
      formData.append("desc", newDesc);
      formData.append("price", newPrice);
      formData.append("category", newSelectedCategory);
      formData.append("size", newSelectedSizes);
      formData.append("photo", combinedPhotos);
      formData.append("isAvailable", isAvailable);

      // Send the PUT request
      const res = await axios.put(
        `${import.meta.env.VITE_APP_API}/api/update-product/${
          editableProduct._id
        }`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${auth?.token}`,
          },
          user: auth.user,
        }
      );

      if (res) {
        setIsSpiner(false);
      }

      if (res.data.success) {
        setIsEditPopupOpen(false);
        reloadPage();
        toast.success("Product updated successfully!");
        // Clear the form
        setNewProductName("");
        setNewProductType("");
        setNewDesc("");
        setNewSelectedSizes([]);
        setNewSelectedCategory("");
        setNewPrice(0);
        setNewPhotos([]);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred while creating the product.");
      setIsSpiner(false);
    }
  };

  const handleEdit = (product) => {
    setEditableProduct(product);
    setNewProductName(product.name);
    setNewSelectedCategory(product.category._id);
    setNewProductType(product.productType);
    setNewSelectedSizes(product.size);
    setNewPhotos(product.photo);
    setNewPrice(product.price);
    setNewDesc(product.desc);
    setIsAvailable(product.isAvailable);
    setIsEditPopupOpen(true);
  };

  const handleDeletePhoto = (index) => {
    // setDeletePhoto((prevDltPhotos) => [
    //   ...prevDltPhotos,
    //   newPhotos.filter((_, i) => i === index),
    // ]);
    setNewPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handleDeleteUploadPhoto = (index) => {
    setNewPhotoUpload((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handlePhotoUpload = (e) => {
    const files2 = Array.from(e.target.files);
    // console.log(files);
    if (newPhotos.length + files2.length > 4) {
      toast.error("Maximum 4 photos can be uploaded!");
      return;
    }

    const newNewPhotos = files2.map((file) => ({
      url: URL.createObjectURL(file),
      file: file,
    }));
    setNewPhotoUpload((prevPhotos) => [...prevPhotos, ...newNewPhotos]);
  };

  const handleSizeChange = (e) => {
    const value = e.target.value;
    setNewSelectedSizes((prevState) =>
      prevState.includes(value)
        ? prevState.filter((size) => size !== value)
        : [...prevState, value]
    );
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
    // Fetch all products
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API}/api/get-product`
        );

        if (res.data.success) {
          setProducts(res.data.products);
          setProductLoading(false);
        } else {
          toast.error(res.data.message);
          setProductLoading(false);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error fetching categories!");
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="-ml-2 sm:ml-0">
      <table className="min-w-full table-fixed bg-primaryColor border text-xs md:text-base">
        <thead>
          <tr className="w-full bg-gray-300 text-secondaryColor uppercase font-normal">
            <th className="w-[5%] md:w-[10%]  py-2 px-4 border-b">Index</th>
            <th className="w-[20%]  py-2 px-4 border-b">Photo</th>
            <th className="w-[40%] md:w-[35%]  py-2 px-4 border-b">Product</th>
            <th className="w-[35%]  py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="w-full h-full">
          {productLoading ? (
            <tr>
              <td colSpan="4" className="py-20 text-center">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 text-secondaryColor animate-spin dark:text-gray-300 fill-secondaryColor mx-auto"
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
              </td>
            </tr>
          ) : (
            <>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr key={product._id} className="border-b">
                    <td className="w-[5%] md:w-[10%] py-2 px-4">
                      <div className="w-full h-full flex justify-center items-center">
                        {index + 1}
                      </div>
                    </td>
                    <td className="w-[20%] lg:w-[10%] py-2 px-4 justify-center items-center">
                      <div className="w-full md:w-[60%] aspect-square flex justify-center items-center overflow-hidden">
                        <img
                          src={product.photo[0]}
                          alt={product.name}
                          className="object-cover rounded"
                        />
                      </div>
                    </td>
                    <td className="w-[40%]  py-2 px-4 text-center capitalize">
                      {product.name}
                    </td>

                    <td className="w-[35%]  py-2 px-4">
                      {/* You can add Edit/Delete buttons here */}
                      <div className="w-full flex flex-row gap-3 md:gap-10 justify-center items-center">
                        <button
                          className="text-blue-500 flex justify-center items-end leading-none"
                          onClick={() => handleEdit(product)}
                        >
                          <span className="px-1">
                            <EditIcon fontSize="inherit" />
                          </span>
                          Edit
                        </button>
                        <button
                          className="text-red-500 flex justify-center items-end leading-none"
                          onClick={() => handleDelete(product)}
                        >
                          <span className="px-1">
                            <DeleteIcon fontSize="inherit" />
                          </span>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-20 px-10 text-center" colSpan="4">
                    No product found.
                  </td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
      {isEditPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-[2px]">
          {isSpiner && (
            <div className="w-full h-full absolute z-[100] backdrop-blur-[3px] flex justify-center items-center bg-secondaryColor bg-opacity-50">
              <svg
                aria-hidden="true"
                className="w-10 h-10 text-secondaryColor animate-spin dark:text-gray-300 fill-secondaryColor mx-auto"
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
          <div className="w-[90%] h-[80%] overflow-y-auto bg-primaryColor p-3 sm:p-10 flex flex-col gap-10 ">
            <div className="text-xl uppercase">Update Product Details</div>
            <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-0">
              <div className="w-full md:w-[70%] text-sm md:text-=base">
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-sm outline-none"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    placeholder="Enter product name *"
                    required
                  />
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-sm outline-none"
                    value={newProductType}
                    onChange={(e) => setNewProductType(e.target.value)}
                    placeholder="Enter product type (optional)"
                  />
                  <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                    <input
                      type="number"
                      className="w-full md:w-[50%] p-2 border border-gray-300 rounded-sm outline-none"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="Enter product price *"
                      required
                    />
                    <div className="md:w-[50%] flex flex-col gap-3">
                      <label className="block text-gray-700">Size *</label>
                      <div className="flex gap-5">
                        {["S", "M", "L", "XL", "2XL", "3XL"].map((size) => (
                          <label
                            key={size}
                            className="flex items-end justify-center leading-3"
                          >
                            <input
                              type="checkbox"
                              value={size}
                              checked={newSelectedSizes.includes(size)}
                              onChange={handleSizeChange}
                              className="mr-1 cursor-pointer"
                            />
                            {size}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row gap-10">
                    <div className="w-[50%] flex flex-col gap-3">
                      <label className="block text-gray-700">Category *</label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-sm outline-none capitalize"
                        value={newSelectedCategory}
                        onChange={(e) => setNewSelectedCategory(e.target.value)}
                        required
                      >
                        <option value="" disabled selected>
                          Select a category
                        </option>
                        {categories.map((category) => (
                          <option
                            key={category._id}
                            value={category._id}
                            className="capitalize"
                          >
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-[50%] flex flex-col gap-3">
                      <label className="block text-gray-700">
                        Availability
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-sm outline-none"
                        value={isAvailable}
                        onChange={(e) => setIsAvailable(e.target.value)}
                      >
                        <option value={1}>In Stock</option>
                        <option value={0}>Sold Out</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-5">
                    {newPhotos.length + newPhotoUpload.length < 4 && (
                      <div>
                        <label
                          htmlFor="uploadEdit"
                          className="text-gray-700 text-center w-full h-full aspect-square flex flex-col gap-1 justify-center items-center border border-gray-500 border-dashed rounded uppercase font-medium cursor-pointer"
                        >
                          <div className="text-gray-400">
                            <AddCircleRoundedIcon fontSize="large" />
                          </div>
                          <div className="text-gray-400 text-sm px-5 leading-4">
                            Upload Photos
                          </div>
                        </label>
                        <input
                          type="file"
                          id="uploadEdit"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="mt-2 p-2 border rounded w-full hidden"
                        />
                      </div>
                    )}

                    {newPhotos.map((photo, index) => (
                      <div
                        key={index}
                        className="relative w-full aspect-square"
                      >
                        <img
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-full object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeletePhoto(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-primaryColor rounded-full p-1"
                        >
                          <ClearSharpIcon />
                        </button>
                      </div>
                    ))}
                    {newPhotoUpload.map((photo, index) => (
                      <div
                        key={index}
                        className="relative w-full aspect-square"
                      >
                        <img
                          src={photo.url}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-full object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteUploadPhoto(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-primaryColor rounded-full p-1"
                        >
                          <ClearSharpIcon />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="block text-gray-700">Description *</label>
                    <ReactQuill
                      theme="snow"
                      value={newDesc}
                      onChange={setNewDesc}
                      className="h-60"
                    />
                  </div>
                  <div className="flex flex-row justify-center gap-8 mt-14 md:mt-10">
                    <button
                      className="uppercase px-8 py-3 rounded-sm bg-blue-500 text-primaryColor"
                      onClick={() => setIsEditPopupOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="uppercase px-8 py-3 rounded-sm bg-green-500 text-primaryColor"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
              <div className="w-[50%] md:w-[25%] rounded flex flex-col gap-6">
                <div className="uppercase text-center">Preview</div>
                <div className="flex flex-col gap-3">
                  <div className="w-full aspect-square rounded-sm relative">
                    <div
                      className={`w-full h-full absolute ${
                        isAvailable == 0 && "bg-secondaryColor"
                      } bg-opacity-70 z-[60]`}
                    >
                      {isAvailable == 1 ? (
                        <div className="inline-block uppercase px-2 py-2 rounded-sm bg-secondaryColor text-primaryColor text-xs text-center mt-5">
                          In Stock
                        </div>
                      ) : (
                        <div className=" inline-block uppercase px-2 py-2 rounded-sm bg-primaryColor text-secondaryColor text-xs text-center mt-5">
                          Stock Out
                        </div>
                      )}
                    </div>
                    <img
                      className="w-full aspect-square object-cover rounded-sm"
                      src={newPhotos[0]}
                      alt=""
                    />
                  </div>
                  <div className="px-3 uppercase font-semibold text-lg text-center leading-5">
                    {newProductName}
                  </div>
                  <div className="px-3 pb-3 text-center">
                    Price: {newPrice} BDT
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isDeletePopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-[2px]">
          {isDeleteSpinner && (
            <div className="w-full h-full absolute z-[100] backdrop-blur-[3px] flex justify-center items-center bg-primaryColor bg-opacity-70">
              <svg
                aria-hidden="true"
                className="w-10 h-10 text-secondaryColor animate-spin dark:text-gray-300 fill-secondaryColor mx-auto"
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
          <div className="p-10 bg-primaryColor flex flex-col gap-5">
            <div className="text-lg font-medium">
              Do you really want to delete this product?
            </div>
            <div className="w-full flex flex-row gap-10 justify-center items-center">
              <button
                className="uppercase px-8 py-3 rounded-sm bg-blue-500 text-primaryColor"
                onClick={() => setIsDeletePopupOpen(false)}
              >
                Cancel
              </button>
              <button
                className="uppercase px-8 py-3 rounded-sm bg-red-500 text-primaryColor"
                onClick={() => submitDelete()}
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
