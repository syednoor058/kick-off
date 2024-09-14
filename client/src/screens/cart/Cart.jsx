// import React from 'react'

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartList from "../../components/cartList/CartList";
import LatestProducts from "../../components/products/LatestProducts";
import Products from "../../components/products/Products";
import { ProductContext } from "../../context/ProductContext";

export default function Cart() {
  const { products, cartItem, cartTotalAmount } = useContext(ProductContext);
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // const cartItemData = localStorage.getItem("cartItem")
    const tempData = [];
    for (const itemId in cartItem) {
      for (const itemSize in cartItem[itemId]) {
        if (cartItem[itemId][itemSize] > 0) {
          tempData.push({
            _id: itemId,
            size: itemSize,
            quantity: cartItem[itemId][itemSize],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (products.length > 0) {
      setIsLoading(false);
    }
  }, [products.length]);
  if (isLoading) {
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
    <div className="min-h-screen  py-10 md:py-20 flex flex-col gap-10 md:gap-20 mt-[104px]">
      {cartData.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-10 md:gap-5 lg:gap-10 px-2 sm:px-5 md:px-10 lg:px-20">
          <div className="w-full md:w-[70%] text-[10px] sm:text-xs flex flex-col gap-5 ">
            <div className="w-full flex flex-row gap-5 uppercase font-medium p-3 bg-gray-200 rounded">
              <div className="w-[10%] flex items-center justify-center">ID</div>
              <div className="w-[55%]">Product</div>
              <div className="w-[10%] flex items-center justify-center">
                Size
              </div>
              <div className="w-[10%] flex items-center justify-center">
                Quantity
              </div>
              <div className="w-[10%] flex items-center justify-center">
                Price
              </div>
              <div className="w-[5%]"></div>
            </div>
            {cartData.map((item, index) => {
              const product = products.find((x) => x._id === item._id);
              if (product && item.quantity > 0) {
                return <CartList key={index} item={product} cart={item} />;
              } else {
                return null;
              }
            })}
          </div>
          <div className="w-full md:w-[30%] flex flex-col gap-3 text-sm">
            <div className="p-3 uppercase border-b-2">Order summary</div>
            <div className="px-3 py-8 border rounded flex flex-row justify-between items-center">
              <div className="uppercase font-medium">Total:</div>
              <div className="text-xl font-bold uppercase">
                {cartTotalAmount()} BDT
              </div>
            </div>
            <div className="text-xs text-gray-400">
              Tax included and shipping calculated at checkout
            </div>
            <Link
              to="/checkout"
              className="p-3 bg-secondaryColor rounded-sm text-primaryColor text-center uppercase text-base md:text-lg hover:bg-transparent hover:border border-secondaryColor hover:text-secondaryColor cursor-pointer duration-300"
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/collection"
              className="p-3 hover:bg-secondaryColor rounded-sm hover:text-primaryColor text-center uppercase text-base md:text-lg border border-secondaryColor cursor-pointer duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className=" w-full px-10 py-20 md:px-20 flex items-center justify-center text-center text-2xl sm:text-3xl md:text-4xl lg:text-6xl uppercase font-medium text-gray-300">
          No product in your cart!
        </div>
      )}
      <div className="w-full flex flex-col gap-10 md:gap-20">
        <Products />
        <LatestProducts />
      </div>
    </div>
  );
}
