// import React from 'react'
import { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import bKash from "../../assets/bkash.webp";
import nagad from "../../assets/nagad.webp";
import QR from "../../assets/qr.png";
import CheckoutList from "../../components/checkOutList/CheckoutList";
import { ProductContext } from "../../context/ProductContext";

export default function Checkout() {
  const [payment, setPayment] = useState("bkash");
  const { cartItem, cartTotalAmount, deliveryCharge } =
    useContext(ProductContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {cartItem.length > 0 ? (
        <div className="w-full h-full flex flex-col-reverse gap-7 lg:gap-0 lg:flex-row mt-[104px]">
          <div className=" w-full lg:w-[55%] px-4 sm:px-6 md:px-10 py-10 md:py-20">
            <form className="w-full flex flex-col gap-5 lg:gap-7">
              <div className="w-full flex flex-col gap-2">
                <div className="text-xl font-medium">Contact</div>
                <input
                  className="w-full px-3 lg:px-5 text-xs sm:text-sm lg:text-base py-2 lg:py-3 rounded-sm border border-gray-300 outline-none "
                  placeholder="Enter email address *"
                  type="email"
                  required
                />
              </div>
              <div className="font-medium flex flex-col gap-2">
                <div className="text-xl">Buyer Details</div>
                <div className="font-normal flex flex-col gap-2">
                  <select
                    id="countries"
                    className="border border-gray-300 rounded-sm block w-full outline-none px-3 lg:px-5 text-xs sm:text-sm lg:text-base py-2 lg:py-3"
                  >
                    <option
                      defaultValue={"Choose your region *"}
                      className="text-gray-300 disabled:"
                    >
                      Choose your region *
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
                      className="w-[50%] px-3 lg:px-5 text-xs sm:text-sm lg:text-base py-2 lg:py-3 rounded-sm outline-none border border-gray-300"
                      placeholder="First name *"
                      type="text"
                      required
                    />
                    <input
                      className="w-[50%] px-3 lg:px-5 text-xs sm:text-sm lg:text-base py-2 lg:py-3 rounded-sm outline-none border border-gray-300"
                      placeholder="Last name *"
                      type="text"
                      required
                    />
                  </div>
                  <input
                    className="w-full px-3 lg:px-5 text-xs sm:text-sm lg:text-base py-2 lg:py-3 rounded-sm outline-none border border-gray-300"
                    placeholder="Address *"
                    type="text"
                    required
                  />
                  <input
                    className="w-full px-3 lg:px-5 text-xs sm:text-sm lg:text-base py-2 lg:py-3 rounded-sm outline-none border border-gray-300"
                    placeholder="Appartment, suite, etc. (Optional)"
                  />
                  <div className="w-full flex flex-row gap-2">
                    <input
                      className="w-[50%] px-3 lg:px-5 text-xs sm:text-sm lg:text-base py-2 lg:py-3 rounded-sm outline-none border border-gray-300"
                      placeholder="City *"
                      type="text"
                      required
                    />
                    <input
                      className="w-[50%] px-3 lg:px-5 text-xs sm:text-sm lg:text-base py-2 lg:py-3 rounded-sm outline-none border border-gray-300"
                      placeholder="Postal code (Optional)"
                    />
                  </div>
                  <input
                    className="w-full px-3 lg:px-5 text-xs sm:text-sm lg:text-base py-2 lg:py-3 rounded-sm outline-none border border-gray-300"
                    placeholder="Phone number *"
                    required
                  />
                </div>
              </div>
              {/* <div className="w-full flex flex-col gap-2">
                <div className="text-xl font-medium">Shipping Type</div>
                <div>
                  <input
                    className="w-full px-3 lg:px-5 text-xs sm:text-sm lg:text-base py-2 lg:py-3 rounded-sm outline-none border border-gray-300"
                    placeholder="Standard Shipping"
                    disabled
                  />
                </div>
              </div> */}
              <div className="w-full flex flex-col gap-2">
                <div className="text-xl font-medium">Payment</div>
                <div className="flex flex-row gap-5">
                  {/* <input
                    className="w-full px-3 lg:px-5 text-xs sm:text-sm lg:text-base py-2 lg:py-3 rounded-sm outline-none border border-gray-300"
                    placeholder="Cash On Delivery"
                    disabled
                  /> */}
                  <label className="flex flex-row gap-3 items-center cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="bkash"
                      checked={payment === "bkash"}
                      onChange={(e) => setPayment(e.target.value)}
                    />
                    <span className="w-[50%]">
                      <img src={bKash} alt="" />
                    </span>
                  </label>
                  <label className="flex flex-row gap-3 items-center cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="nagad"
                      checked={payment === "nagad"}
                      onChange={(e) => setPayment(e.target.value)}
                    />
                    <span className="w-[50%]">
                      <img src={nagad} alt="" />
                    </span>
                  </label>
                </div>
                <div>
                  {payment === "bkash" ? (
                    <div className="rounded-sm p-5 flex flex-col gap-5 bg-pink-500 text-primaryColor">
                      <div className="w-full flex justify-center items-center px-5 py-2 bg-primaryColor">
                        <img className="w-[25%]" src={bKash} alt="" />
                      </div>
                      <div className="flex flex-row gap-10 items-center">
                        <div className="w-[45%] bg-primaryColor rounded-sm">
                          <img
                            className="w-full h-full rounded-sm"
                            src={QR}
                            alt=""
                          />
                        </div>
                        <div className="w-[55%] text-xl sm:text-2xl font-semibold text-center">
                          Scan the QR code to send money.
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="uppercase font-semibold">
                          Account number:
                        </div>
                        <div className="w-full grid grid-cols-11 gap-2">
                          {[
                            0,
                            1,
                            7,
                            "*",
                            "*",
                            "*",
                            "*",
                            "*",
                            "*",
                            "*",
                            "*",
                          ].map((num, index) => (
                            <div
                              className="w-8 sm:w-10 aspect-square rounded-sm flex justify-center items-center bg-primaryColor text-secondaryColor text-base sm:text-xl"
                              key={index}
                            >
                              {num}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-sm p-5 flex flex-col gap-5 bg-orange-500 text-primaryColor">
                      <div className="w-full flex justify-center items-center px-5 py-2 bg-primaryColor">
                        <img className="w-[25%]" src={nagad} alt="" />
                      </div>
                      <div className="flex flex-row gap-10 items-center">
                        <div className="w-[45%] bg-primaryColor rounded-sm">
                          <img
                            className="w-full h-full rounded-sm"
                            src={QR}
                            alt=""
                          />
                        </div>
                        <div className="w-[55%] text-xl sm:text-2xl font-semibold text-center">
                          Scan the QR code to send money.
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="uppercase font-semibold">
                          Account number:
                        </div>
                        <div className="w-full grid grid-cols-11 gap-2">
                          {[
                            0,
                            1,
                            7,
                            "*",
                            "*",
                            "*",
                            "*",
                            "*",
                            "*",
                            "*",
                            "*",
                          ].map((num, index) => (
                            <div
                              className="w-8 sm:w-10 aspect-square rounded-sm flex justify-center items-center bg-primaryColor text-secondaryColor text-base sm:text-xl"
                              key={index}
                            >
                              {num}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-5 text-gray-400 pt-10">
                  <div className="font-semibold text-red-500">
                    Payment Terms and Conditions
                  </div>
                  <div className="flex flex-col gap-2 text-xs sm:text-sm">
                    <div>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Itaque consequatur suscipit repudiandae, praesentium,
                      sequi cum accusantium voluptates sunt facilis consequuntur
                      laborum?
                    </div>
                    <div>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Itaque consequatur suscipit repudiandae, praesentium,
                      sequi cum accusantium voluptates sunt facilis consequuntur
                      laborum?
                    </div>
                    <div>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Itaque consequatur suscipit repudiandae, praesentium,
                      sequi cum accusantium voluptates sunt facilis consequuntur
                      laborum?
                    </div>
                    <div>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Itaque consequatur suscipit repudiandae, praesentium,
                      sequi cum accusantium voluptates sunt facilis consequuntur
                      laborum?
                    </div>
                    <div>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Itaque consequatur suscipit repudiandae, praesentium,
                      sequi cum accusantium voluptates sunt facilis consequuntur
                      laborum?
                    </div>
                  </div>
                </div>
              </div>
              <input
                className="w-full px-3 lg:px-5 text-xs sm:text-sm lg:text-base py-2 lg:py-3 rounded-sm outline-none border border-gray-300"
                placeholder="Sender's account number *"
                required
              />
              <input
                className="w-full px-3 lg:px-5 text-xs sm:text-sm lg:text-base py-2 lg:py-3 rounded-sm outline-none border border-gray-300"
                placeholder="Transaction ID *"
                required
              />
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
              {cartItem.map((item, index) => {
                if (item.quantity > 0) {
                  return <CheckoutList key={index} cart={item} />;
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
