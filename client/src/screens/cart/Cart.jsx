// import React from 'react'

import { useContext, useEffect, useState } from "react";
import CartList from "../../components/cartList/CartList";
import LatestProducts from "../../components/products/LatestProducts";
import Products from "../../components/products/Products";
import { ProductContext } from "../../context/ProductContext";

export default function Cart() {
  const { products, cartItem, cartTotalAmount } = useContext(ProductContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
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
  }, []);
  return (
    <div className="min-h-screen  py-10 md:py-20 flex flex-col gap-10 md:gap-20">
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
              if (item.quantity > 0) {
                return <CartList key={index} item={product} cart={item} />;
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
            <div className="p-3 bg-secondaryColor rounded-sm text-primaryColor text-center uppercase text-base md:text-lg hover:bg-transparent hover:border border-secondaryColor hover:text-secondaryColor cursor-pointer duration-300">
              Proceed to Checkout
            </div>
            <div className="p-3 hover:bg-secondaryColor rounded-sm hover:text-primaryColor text-center uppercase text-base md:text-lg border border-secondaryColor cursor-pointer duration-300">
              Continue Shopping
            </div>
          </div>
        </div>
      ) : (
        <div className=" w-full px-10 py-20 md:px-20 flex items-center justify-center text-center text-2xl sm:text-3xl md:text-4xl lg:text-6xl uppercase font-medium text-gray-300 leading-none">
          No product in your cart!
        </div>
      )}
      <div className="w-full flex flex-col">
        <Products />
        <LatestProducts />
      </div>
    </div>
  );
}
