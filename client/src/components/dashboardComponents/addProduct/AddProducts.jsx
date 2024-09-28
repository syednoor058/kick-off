import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import imgSkeleton from "../../../assets/img_skeleton.png";
import { AuthContext } from "../../../context/AuthContext";
import ProductList from "./ProductList";

export default function AddProducts() {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: ["#000000", "#E53935"] }], // Color and background color
      ["bold", "italic", "underline"], // Text styling options
      [{ list: "ordered" }, { list: "bullet" }], // List options
      ["link"], // Link option
    ],
  };

  const formats = [
    "header",
    "color",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
  ];
  const [isSpiner, setIsSpiner] = useState(false);
  const { auth } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [price, setPrice] = useState();
  const [photos, setPhotos] = useState([]);
  const [desc, setDesc] = useState("");
  // const [photosUrl, setPhotosUrl] = useState([]);

  const reloadPage = () => {
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSpiner(true);

    try {
      //upload images to cloudinary
      let photosUploadUrl = await Promise.all(
        photos.map(async (photo) => {
          if (photo.file.size > 1000000) {
            toast.error("Image file is too big!");
            return;
          }
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

      // console.log(photosUploadUrl);

      const formData = new FormData();
      formData.append("name", productName);
      formData.append("productType", productType);
      formData.append("desc", desc);
      formData.append("price", price);
      formData.append("category", selectedCategory);
      formData.append("size", selectedSizes);
      formData.append("photo", photosUploadUrl);

      // Send the POST request
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/create-product`,
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
        reloadPage();
        toast.success("Product created successfully!");
        // Clear the form
        setProductName("");
        setProductType("");
        setDesc("");
        setSelectedSizes([]);
        setSelectedCategory("");
        setPrice(0);
        setPhotos([]);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred while creating the product.");
      setIsSpiner(false);
    }
  };

  const handleDeletePhoto = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    // console.log(files);
    if (photos.length + files.length > 4) {
      toast.error("Maximum 4 photos can be uploaded!");
      return;
    }

    const newPhotos = files.map((file) => ({
      url: URL.createObjectURL(file),
      file: file,
    }));
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleSizeChange = (e) => {
    const value = e.target.value;
    setSelectedSizes((prevState) =>
      prevState.includes(value)
        ? prevState.filter((size) => size !== value)
        : [...prevState, value]
    );
  };
  useEffect(() => {
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
        toast.error("Something went wrong!");
      }
    };

    fetchCategories();
  }, []);
  return (
    <>
      {isSpiner && (
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
          <div className="w-full text-center uppercase font-medium text-2xl">
            Listing product . . .
          </div>
        </div>
      )}
      <div className="flex flex-col gap-10 px-5 lg:px-10 py-10">
        <div className="text-xl uppercase">List a new Product</div>
        <div className="w-full flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-[70%]">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-sm outline-none"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name *"
                required
              />
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-sm outline-none"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                placeholder="Enter product type (optional)"
              />
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-sm outline-none"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter product price *"
                required
              />

              <div className="flex flex-col gap-3">
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
                        checked={selectedSizes.includes(size)}
                        onChange={handleSizeChange}
                        className="mr-1 cursor-pointer"
                      />
                      {size}
                    </label>
                  ))}
                </div>
              </div>
              <div className="w-full flex flex-col gap-3">
                <label className="block text-gray-700">Category *</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-sm outline-none capitalize"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  required
                >
                  <option value="" disabled>
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
              <div className="grid grid-cols-4 gap-5">
                {photos.length < 4 && (
                  <div>
                    <label
                      htmlFor="upload"
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
                      id="upload"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="mt-2 p-2 border rounded w-full hidden"
                    />
                  </div>
                )}

                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={photo.url}
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
              </div>
              <div className="flex flex-col gap-3">
                <label className="block text-gray-700">Description *</label>
                <ReactQuill
                  theme="snow"
                  formats={formats}
                  modules={modules}
                  value={desc}
                  onChange={setDesc}
                  className="h-60 text-secondaryColor"
                />
              </div>

              <div className="flex justify-end mt-10">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-sm"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
          <div className="w-[50%] md:w-[30%]">
            <div className="w-full text-center uppercase pb-10 font-medium">
              Product Preview
            </div>
            <div className="w-full flex flex-col gap-5">
              {photos[0]?.url ? (
                <div className="w-full aspect-square rounded-sm">
                  <img
                    src={photos[0].url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full aspect-square flex justify-center items-center rounded-sm">
                  <img
                    className="w-full h-full object-cover"
                    src={imgSkeleton}
                    alt=""
                  />
                </div>
              )}
              <div className="flex flex-col gap-1">
                {productName ? (
                  <div className="w-full text-center uppercase font-bold leading-none">
                    {productName}
                  </div>
                ) : (
                  <div className="w-full text-center uppercase font-bold leading-none">
                    Product Title
                  </div>
                )}
                {price ? (
                  <div className="w-full text-center">Price: {price} BDT</div>
                ) : (
                  <div className="w-full text-center">Price: Product Price</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <ProductList />
      </div>
    </>
  );
}
