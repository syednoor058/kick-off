/* eslint-disable react/prop-types */
// import React from 'react'
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import { useContext, useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import RelatedProducts from "../relatedProducts/RelatedProducts";
import "./product_details.css";

export default function ProductDetails(props) {
  const [largeImg, setLargeImg] = useState(props.item.photo[0]);
  const [size, setSize] = useState("");
  useEffect(() => setLargeImg(props.item.photo[0]), [props.item.photo]);
  const { addToCart, products } = useContext(ProductContext);
  const [relatedProducts, setRelatedProducts] = useState({});

  // Effect to load related products on mount
  useEffect(() => {
    const getRelatedProducts = (item) => {
      const targetKeys = item.name.toLowerCase().split(" ");
      // const targetCategory = item.category._id;
      const productList = products.filter((product) => {
        if (product.name.toLowerCase() === item.name.toLowerCase()) {
          return false;
        }
        return targetKeys.some((key) =>
          product.name.toLowerCase().includes(key)
        );
      });

      setRelatedProducts(productList);
    };

    getRelatedProducts(props.item);

    // getRelatedProducts(props.item);

    // // Check if there's already related product data in localStorage
    // const storedRelatedProducts = localStorage.getItem("relatedProducts");

    // if (storedRelatedProducts) {
    //   setRelatedProducts(JSON.parse(storedRelatedProducts));
    // } else {
    //   // Get related products and save them to state and localStorage
    //   getRelatedProducts(props.item.name);
    //   const related = localStorage.getItem("relatedProducts");
    //   setRelatedProducts(JSON.parse(related));
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.item]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="w-full h-full px-5 sm:px-10 md:px-10 lg:px-20 pt-10 md:pt-20 flex flex-col gap-10 md:gap-20">
        <div className="flex flex-row gap-3 sm:gap-5 -mb-4 md:-mb-12">
          <Link
            to="/"
            className="flex justify-center items-center gap-2 leading-3 text-xs sm:text-sm"
          >
            <span className="flex justify-center items-end">
              <FaHome />
            </span>
            Home
          </Link>
          <div className="flex justify-center items-center">
            <MdKeyboardArrowRight />
          </div>
          <div className="flex justify-center text-xs sm:text-sm items-center leading-3">
            {props.item.name}
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-[60%] flex flex-row gap-5">
            <div className="w-[25%] md:w-[15%]">
              <div className="w-full flex flex-col gap-5">
                {props.item.photo.map((itemImg, index) => (
                  <div
                    className="w-full aspect-square overflow-hidden rounded shadow-lg"
                    key={index}
                  >
                    <img
                      className="w-full h-full object-cover cursor-pointer"
                      src={itemImg}
                      onClick={() => setLargeImg(itemImg)}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[75%] md:w-[85%] aspect-square rounded">
              <img
                src={largeImg}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
          </div>
          <div className="w-full md:w-[40%]">
            <div className="w-full flex flex-col gap-5 md:gap-7">
              <div className="w-full flex flex-col gap-4 md:gap-5">
                <div className="text-2xl sm:text-3xl md:text-2xl lg:text-4xl font-bold uppercase">
                  {props.item.name}
                </div>
                <div className="flex flex-col gap-2 md:gap-3 text-sm text-gray-700 capitalize">
                  <div>Product ID: {props.item._id}</div>
                  <div className="capitalize">
                    Type: {props.item.productType}
                  </div>
                  <div className="capitalize">
                    Category: {props.item.category.name}
                  </div>
                  {props.item.isAvailable == 1 ? (
                    <div className="uppercase font-medium">In Stock</div>
                  ) : (
                    <div className="font-medium text-red-500 uppercase">
                      Stock Out
                    </div>
                  )}
                </div>
                <div className="text-xl capitalize">
                  Price:{" "}
                  <span className="font-semibold uppercase">
                    {props.item.price} BDT
                  </span>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <div className="capitalize">Size Availavle:</div>
                <div className="w-full flex flex-row gap-3">
                  {props.item.size.map((propSize, index) => (
                    <div
                      key={index}
                      className={`w-10 flex justify-center items-center aspect-square uppercase cursor-pointer rounded-full  text-sm ${
                        size === propSize
                          ? "bg-secondaryColor text-primaryColor"
                          : "bg-gray-200 text-secondaryColor"
                      }`}
                      onClick={() => setSize(propSize)}
                    >
                      {propSize}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2 capitalize text-sm">
                  <span className="flex justify-center items-center">
                    <StraightenOutlinedIcon />
                  </span>
                  Size Measurement
                </div>
                <div className="flex flex-row gap-2 capitalize text-sm">
                  <span className="flex justify-center items-center">
                    <LocalShippingOutlinedIcon />
                  </span>
                  Shipping cost: 200 BDT
                </div>
              </div>
              <div className="flex flex-row gap-5">
                <div className="w-[80%] flex flex-col gap-3">
                  {props.item.isAvailable == 1 ? (
                    <Link
                      to={size && "/cart"}
                      className="w-full flex justify-center items-center px-5 py-3 bg-secondaryColor rounded-sm hover:bg-primaryColor hover:border hover:border-secondaryColor uppercase text-primaryColor hover:text-secondaryColor cursor-pointer"
                      onClick={() => addToCart(props.item._id, size)}
                    >
                      Add to cart
                    </Link>
                  ) : (
                    <button
                      className="w-full flex justify-center items-center px-5 py-3 bg-gray-400 rounded-sm  uppercase text-primaryColor cursor-not-allowed"
                      disabled
                    >
                      Add to cart
                    </button>
                  )}
                </div>
                <div className="w-[20%] flex justify-center items-center">
                  <FavoriteIcon
                    fontSize="large"
                    className="p-2 rounded-full border border-secondaryColor"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-7">
          <div className="text-2xl font-semibold uppercase">Description</div>
          <div className="text-sm md:text-base product-description">
            <div dangerouslySetInnerHTML={{ __html: props.item.desc }} />
          </div>
        </div>
        <div>
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </div>
  );
}
