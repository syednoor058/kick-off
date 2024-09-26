// import React from 'react'
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import { ProductContext } from "../../../context/ProductContext";

export default function Banners() {
  const [newPhotos, setNewPhotos] = useState([]);
  const [newPhotoUpload, setNewPhotoUpload] = useState([]);
  const { carausols, carLoading } = useContext(ProductContext);
  const { auth } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    // console.log(files);

    const newNewPhotos = files.map((file) => ({
      url: URL.createObjectURL(file),
      file: file,
    }));
    setNewPhotoUpload((prevPhotos) => [...prevPhotos, ...newNewPhotos]);
  };

  const handleDeletePhoto = (index) => {
    setNewPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handleDeleteUploadPhoto = (index) => {
    setNewPhotoUpload((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      //check if there is any oversized photo
      const isFileTooBig = newPhotoUpload.some(
        (photo) => photo.file.size > 1000000
      );

      if (isFileTooBig) {
        toast.error("Image file is too big!");
        setLoader(false);
        return; // Exit the function early if a file is too big
      }

      //upload images to cloudinary
      let photosUploadUrl = await Promise.all(
        newPhotoUpload.map(async (photo) => {
          const data = new FormData();
          data.append("file", photo.file);
          data.append("upload_preset", "banners-upload-preset");
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
      console.log(combinedPhotos);

      if (combinedPhotos.length < 1) {
        toast.error("Atleast one photo is required");
        setLoader(false);
        return;
      }

      // console.log(newSelectedCategory);

      if (carausols.length > 0) {
        const carausolId = carausols[0]._id;

        // Send the PUT request
        const res = await axios.put(
          `${import.meta.env.VITE_APP_API}/api/update-carausol`,
          { carausolId, url: combinedPhotos },
          {
            headers: {
              // "Content-Type": "multipart/form-data",
              Authorization: `${auth?.token}`,
            },
            user: auth.user,
          }
        );

        if (res) {
          setLoader(false);
        }

        if (res.data.success) {
          toast.success("Image updated successfully!");
          // Clear the form
          setNewPhotoUpload([]);
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await axios.post(
          `${import.meta.env.VITE_APP_API}/api/upload-carausol`,
          { url: combinedPhotos },
          {
            headers: {
              // "Content-Type": "multipart/form-data",
              Authorization: `${auth?.token}`,
            },
            user: auth.user,
          }
        );

        if (res) {
          setLoader(false);
        }

        if (res.data.success) {
          toast.success("Image is uploaded successfully!");
          // Clear the form
          setNewPhotoUpload([]);
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred while uploading the image.");
      setLoader(false);
    }
  };

  useEffect(() => {
    if (carausols.length > 0) {
      setNewPhotos(carausols[0].url);
    }
  }, [carausols]);

  if (loader || carLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
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
    );
  }

  return (
    <div className="w-full flex flex-col gap-10 p-3 md:p-6 lg:p-10">
      <div className="flex flex-col gap-5">
        <div className="uppercase text-2xl font-semibold">Carausels</div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="uploadEdit"
              className="text-gray-700 text-center w-32 aspect-square flex flex-col gap-1 justify-center items-center border border-gray-500 border-dashed rounded uppercase font-medium cursor-pointer"
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

          <div className="grid grid-cols-2 gap-5">
            {newPhotoUpload.map((photo, index) => (
              <div key={index} className="relative w-full aspect-video">
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

          <button
            className="w-24 flex justify-center items-center cursor-pointer uppercase px-3 py-2 rounded-sm bg-secondaryColor text-primaryColor font-medium"
            type="submit"
          >
            Upload
          </button>
          <div className="grid grid-cols-2 gap-5">
            {newPhotos.map((photo, index) => (
              <div key={index} className="relative w-full aspect-video">
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
          </div>
        </form>
      </div>

      <div></div>
    </div>
  );
}
