// import React from 'react'
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CheckoutList from "../../components/checkOutList/CheckoutList";
import { ProductContext } from "../../context/ProductContext";

export default function Checkout() {
  const { products, cartItem, cartTotalAmount, deliveryCharge } =
    useContext(ProductContext);
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
    <>
      {cartData.length > 0 ? (
        <div className="w-full h-full flex flex-col-reverse gap-7 lg:gap-0 lg:flex-row mt-[104px]">
          <div className=" w-full lg:w-[55%] px-4 sm:px-6 md:px-10 py-10 md:py-20">
            <form className="w-full flex flex-col gap-7">
              <div className="w-full flex flex-col gap-2">
                <div className="text-xl font-medium">Contact</div>
                <input
                  className="w-full px-5 py-3 rounded-sm border border-gray-300 outline-none"
                  placeholder="Enter email address"
                />
              </div>
              <div className="font-medium flex flex-col gap-2">
                <div className="text-xl">Delivery</div>
                <div className="font-normal flex flex-col gap-2">
                  <select
                    id="countries"
                    className="text-base border border-gray-300 rounded-sm block w-full px-5 py-3 outline-none"
                  >
                    <option
                      defaultValue={"Choose your city/region"}
                      className="text-gray-300 disabled:"
                    >
                      Choose your city/region
                    </option>
                    <option value="khu">Khulna</option>
                    <option value="dhk">Dhaka</option>
                    <option value="syl">Sylhet</option>
                    <option value="rng">Rangpur</option>
                    <option value="raj">Rajshahi</option>
                    <option value="chg">Chittagong</option>
                    <option value="bar">Barisal</option>
                  </select>
                  <div className="w-full flex flex-row gap-2">
                    <input
                      className="w-[50%] px-5 py-3 rounded-sm outline-none border border-gray-300"
                      placeholder="First name"
                    />
                    <input
                      className="w-[50%] px-5 py-3 rounded-sm outline-none border border-gray-300"
                      placeholder="Last name"
                    />
                  </div>
                  <input
                    className="w-full px-5 py-3 rounded-sm outline-none border border-gray-300"
                    placeholder="Address"
                  />
                  <input
                    className="w-full px-5 py-3 rounded-sm outline-none border border-gray-300"
                    placeholder="Appartment, suite, etc. (Optional)"
                  />
                  <div className="w-full flex flex-row gap-2">
                    <input
                      className="w-[50%] px-5 py-3 rounded-sm outline-none border border-gray-300"
                      placeholder="City"
                    />
                    <input
                      className="w-[50%] px-5 py-3 rounded-sm outline-none border border-gray-300"
                      placeholder="Postal code (Optional)"
                    />
                  </div>
                  <input
                    className="w-full px-5 py-3 rounded-sm outline-none border border-gray-300"
                    placeholder="Phone number"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <div className="text-xl font-medium">Shipping Type</div>
                <div>
                  <input
                    className="w-full px-5 py-3 rounded-sm outline-none border border-gray-300"
                    placeholder="Standard Shipping"
                    disabled
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <div className="text-xl font-medium">Payment</div>
                <div>
                  <input
                    className="w-full px-5 py-3 rounded-sm outline-none border border-gray-300"
                    placeholder="Cash On Delivery"
                    disabled
                  />
                </div>
              </div>
              <div>
                <Link
                  className="text-lg w-full px-2 flex justify-center items-center bg-accentColor rounded-sm py-3 text-primaryColor"
                  to="/"
                >
                  Confirm Order
                </Link>
              </div>
            </form>
          </div>
          <div className=" w-full lg:w-[45%] bg-gray-200 px-4 sm:px-6 md:px-10 py-10 md:py-20 flex flex-col gap-16">
            <div className="w-full flex flex-col gap-5">
              {cartData.map((item, index) => {
                const product = products.find((x) => x._id === item._id);
                if (item.quantity > 0) {
                  return (
                    <CheckoutList key={index} item={product} cart={item} />
                  );
                }
              })}
            </div>

            <div className="w-full flex flex-col gap-10">
              <div className="text-sm w-full flex flex-col gap-2 text-gray-600">
                <div className="w-full flex flex-row gap-10 justify-between">
                  <div>Subtotal</div>
                  <div>{cartTotalAmount()} BDT</div>
                </div>
                <div className="w-full flex flex-row gap-10 justify-between">
                  <div>Shipping Cost</div>
                  <div>{deliveryCharge} BDT</div>
                </div>
                <div className="w-full flex flex-row gap-10 justify-between">
                  <div>Taxes (Included 15%)</div>
                  <div>{cartTotalAmount() * (15 / 100)} BDT</div>
                </div>
              </div>
              <div className="w-full flex flex-row gap-10 justify-between">
                <div className="text-lg font-semibold">Total</div>
                <div className="font-bold text-xl">
                  {cartTotalAmount() +
                    deliveryCharge +
                    cartTotalAmount() * (15 / 100)}{" "}
                  BDT
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full px-10 py-20 md:px-20 flex items-center justify-center text-center text-2xl sm:text-3xl md:text-4xl lg:text-6xl uppercase font-medium text-gray-300">
          No product added in cart to checkout
        </div>
      )}
    </>
  );
}
