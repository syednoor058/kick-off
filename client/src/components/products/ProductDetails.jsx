/* eslint-disable react/prop-types */
// import React from 'react'
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import RelatedProducts from "../relatedProducts/RelatedProducts";

export default function ProductDetails(props) {
  const [largeImg, setLargeImg] = useState(props.item.image[0]);
  const [size, setSize] = useState("");
  useEffect(() => setLargeImg(props.item.image[0]), [props.item.image]);
  const { addToCart, getRelatedProducts } = useContext(ProductContext);
  const [relatedProducts, setRelatedProducts] = useState({});

  // Effect to load related products on mount
  useEffect(() => {
    // Check if there's already related product data in localStorage
    const storedRelatedProducts = localStorage.getItem("relatedProducts");

    if (storedRelatedProducts) {
      setRelatedProducts(JSON.parse(storedRelatedProducts));
    } else {
      // Get related products and save them to state and localStorage
      getRelatedProducts(props.item.name);
      const related = localStorage.getItem("relatedProducts");
      setRelatedProducts(JSON.parse(related));
    }
  }, [getRelatedProducts, props.item.name]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [relatedProducts]);

  return (
    <div>
      <div className="w-full h-full px-5 sm:px-10 md:px-10 lg:px-20 pt-10 md:pt-20 flex flex-col gap-10 md:gap-20">
        <div className="w-full flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-[60%] flex flex-row gap-5">
            <div className="w-[25%] md:w-[15%]">
              <div className="w-full flex flex-col gap-5">
                {props.item.image.map((itemImg, index) => (
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
                  <div>Type: {props.item.type}</div>
                  <div>Category: {props.item.category}</div>
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
                <div className="w-full flex flex-row gap-5">
                  {props.item.sizes.map((propSize, index) => (
                    <div
                      key={index}
                      className={`uppercase cursor-pointer py-2 px-5 rounded-full  text-sm ${
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
                  <Link
                    to={size && "/cart"}
                    className="w-full flex justify-center items-center px-5 py-3 bg-secondaryColor rounded hover:bg-primaryColor hover:border hover:border-secondaryColor uppercase text-primaryColor hover:text-secondaryColor cursor-pointer"
                    onClick={() => addToCart(props.item._id, size)}
                  >
                    Add to cart
                  </Link>
                </div>
                <div className="w-[20%] flex justify-center">
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
          <div className="text-sm md:text-base">
            {props.item.description} Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Esse tempore, eos illo excepturi atque soluta
            delectus quisquam tempora temporibus fuga quidem commodi nam? Ipsa
            dolor, laborum quae quis eum voluptatibus voluptas aspernatur fugit
            soluta quos laboriosam sequi id dolorum voluptatum velit fugiat,
            accusamus doloribus omnis, ullam voluptate perspiciatis! Sint
            maiores iure doloremque obcaecati! Odit vitae voluptatum fuga
            tempora numquam magnam nesciunt similique. Sapiente ex corrupti
            reiciendis unde culpa sit voluptatibus odio inventore, maiores
            suscipit ullam labore doloremque repellat iusto, tenetur quis
            obcaecati adipisci alias! Veritatis, magnam consectetur, nemo quae
            omnis dolores atque sequi enim provident officiis iure nam vitae
            beatae ab suscipit ipsum nulla vero? Dolores vel veritatis placeat
            quisquam laboriosam praesentium cupiditate. Sequi unde ex alias,
            excepturi vero reiciendis dolor nihil animi repudiandae cumque non
            fuga? Odio quae accusantium sequi, in dicta, iusto nobis id
            inventore esse consequuntur ipsa numquam. Doloremque optio tempora
            labore et libero sit beatae temporibus quaerat nesciunt harum
            voluptates sed sunt blanditiis cum molestiae earum vel ea placeat
            perferendis, quis ipsam qui at quod omnis. Distinctio delectus
            cupiditate fugit quia nobis itaque culpa incidunt illum minima
            exercitationem. Ab repellat accusamus minima in consequatur nemo
            laboriosam mollitia fuga, nisi vero, temporibus laborum, neque natus
            error quam soluta suscipit voluptas. Iusto dignissimos ea nostrum
            eum, eaque dolorum, iure labore voluptas nobis natus nemo ullam odit
            nesciunt earum excepturi nihil in vel obcaecati voluptates cum
            aperiam debitis assumenda quasi quas! Libero eveniet asperiores
            totam harum obcaecati sit consequatur assumenda perferendis. Dolor
            incidunt, odit animi sit consequuntur, repudiandae nam iusto
            molestiae qui fuga laudantium sint aliquam dolorum omnis. Excepturi
            fugiat placeat ipsum perspiciatis officia. Libero unde
            exercitationem, aliquid eligendi autem non molestias quae earum
            laboriosam maxime est dolores quaerat ad harum ratione reprehenderit
            voluptatem porro obcaecati aliquam quam at dolorem? Voluptates harum
            labore delectus repudiandae perferendis corrupti, culpa ratione.
          </div>
        </div>
        <div>
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </div>
  );
}
