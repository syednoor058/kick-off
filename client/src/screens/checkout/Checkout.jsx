// import React from 'react'
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bKash from "../../assets/bkash.webp";
import nagad from "../../assets/nagad.webp";
import QR from "../../assets/qr.jpg";
import CheckoutList from "../../components/checkOutList/CheckoutList";
import { AuthContext } from "../../context/AuthContext";
import { ProductContext } from "../../context/ProductContext";

export default function Checkout() {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [payment, setPayment] = useState("bkash");
  const { cartItem, cartTotalAmount, deliveryCharge } =
    useContext(ProductContext);
  const { auth } = useContext(AuthContext);
  const [product, setProduct] = useState([]);
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [appartment, setAppartment] = useState("N/A");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendAccNum, setSendAccNum] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const submitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (termsChecked) {
        const user = auth.user?._id;

        const response = await axios.post(
          `${import.meta.env.VITE_APP_API}/api/place-order`,
          {
            product,
            email,
            region,
            firstName,
            lastName,
            address,
            appartment,
            city,
            postalCode,
            phoneNumber,
            payment,
            sendAccNum,
            transactionId,
            user,
          },
          {
            headers: {
              Authorization: `${auth?.token}`,
            },
            user: auth.user,
          }
        );

        if (response.data.success) {
          setPopup(true);
          toast.success("Order is placed!");
          setLoading(false);
        } else {
          toast.error(response.data.message);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (cartItem) {
      setProduct(cartItem);
    }
  }, [cartItem]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <svg
          aria-hidden="true"
          className="w-12 h-12 text-secondaryColor animate-spin dark:text-gray-300 fill-secondaryColor"
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
    <div className="w-full h-full relative">
      {popup && (
        <div className="w-full h-full fixed bg-secondaryColor bg-opacity-75 backdrop-blur-[2px] flex justify-center items-center z-[100000] bottom-0 top-0">
          <div className="w-[60%] p-3 md:p-5 bg-primaryColor flex flex-col gap-2 md:gap-3 items-center">
            <div
              className="w-full flex justify-end cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="text-red-600">
                <CancelSharpIcon fontSize="large" />
              </div>
            </div>
            <div className="w-20 aspect-square rounded-full bg-green-600 text-primaryColor flex justify-center items-center text-6xl">
              <TiTick />
            </div>
            <div className="uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold flex justify-center">
              Congratulations!
            </div>
            <div className="uppercase text-xs sm:text-sm lg:text-base text-center text-gray-500">
              Your order has been placed. Please, wait for the seller
              confirmation!
            </div>
            <div className="uppercase text-center font-semibold text-xl">
              Thank you!
            </div>
          </div>
        </div>
      )}
      {cartItem.length > 0 ? (
        <div className="w-full h-full flex flex-col-reverse gap-7 lg:gap-0 lg:flex-row mt-[104px]">
          <div className=" w-full lg:w-[55%] px-4 sm:px-6 md:px-10 py-10 md:py-20">
            <form
              className="w-full flex flex-col gap-5 lg:gap-7"
              onSubmit={submitOrder}
            >
              <div className="w-full flex flex-col gap-2">
                <div className="text-xl font-medium">Contact</div>
                <input
                  className="w-full px-3 lg:px-5 text-xs sm:text-sm lg:text-base py-2 lg:py-3 rounded-sm border border-gray-300 outline-none "
                  placeholder="Enter email address *"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="font-medium flex flex-col gap-2">
                <div className="text-xl">Buyer Details</div>
                <div className="font-normal flex flex-col gap-2">
                  <select
                    id="countries"
                    className="border border-gray-300 rounded-sm block w-full outline-none px-3 lg:px-5 text-xs sm:text-sm lg:text-base py-2 lg:py-3"
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    <option
                      defaultValue={"Choose your region *"}
                      className="text-gray-300 disabled:"
                    >
                      Choose your region *
                    </option>
                    <option value="khulna">Khulna</option>
                    <option value="dhaka">Dhaka</option>
                    <option value="sylhet">Sylhet</option>
                    <option value="rangpur">Rangpur</option>
                    <option value="rajshahi">Rajshahi</option>
                    <option value="chittagong">Chittagong</option>
                    <option value="barisal">Barisal</option>
                  </select>
                  <div className="w-full flex flex-row gap-2">
                    <input
                      className="w-[50%] px-3 lg:px-5 text-xs sm:text-sm lg:text-base py-2 lg:py-3 rounded-sm outline-none border border-gray-300"
                      placeholder="First name *"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    <input
                      className="w-[50%] px-3 lg:px-5 text-xs sm:text-sm lg:text-base py-2 lg:py-3 rounded-sm outline-none border border-gray-300"
                      placeholder="Last name *"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                  <input
                    className="w-full px-3 lg:px-5 text-xs sm:text-sm lg:text-base py-2 lg:py-3 rounded-sm outline-none border border-gray-300"
                    placeholder="Address *"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                  <input
                    className="w-full px-3 lg:px-5 text-xs sm:text-sm lg:text-base py-2 lg:py-3 rounded-sm outline-none border border-gray-300"
                    placeholder="Appartment, suite, etc. (Optional)"
                    value={appartment}
                    onChange={(e) => setAppartment(e.target.value)}
                  />
                  <div className="w-full flex flex-row gap-2">
                    <input
                      className="w-[50%] px-3 lg:px-5 text-xs sm:text-sm lg:text-base py-2 lg:py-3 rounded-sm outline-none border border-gray-300"
                      placeholder="City *"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                    <input
                      className="w-[50%] px-3 lg:px-5 text-xs sm:text-sm lg:text-base py-2 lg:py-3 rounded-sm outline-none border border-gray-300"
                      placeholder="Postal code (Optional)"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 lg:px-5 text-xs sm:text-sm lg:text-base py-2 lg:py-3 rounded-sm outline-none border border-gray-300"
                    placeholder="Phone number *"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                    <div className="rounded-sm p-5 flex flex-col gap-5 bg-pink-600 text-primaryColor">
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
                          {[0, 1, 4, 0, 0, 0, 2, 0, 0, 3, 6].map(
                            (num, index) => (
                              <div
                                className="w-8 sm:w-10 aspect-square rounded-sm flex justify-center items-center bg-primaryColor text-secondaryColor text-base sm:text-xl"
                                key={index}
                              >
                                {num}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-sm p-5 flex flex-col gap-5 bg-orange-500 text-primaryColor">
                      <div className="w-full flex justify-center items-center px-5 py-2 bg-primaryColor">
                        <img className="w-[25%]" src={nagad} alt="" />
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="uppercase font-semibold">
                          Account number:
                        </div>
                        <div className="w-full grid grid-cols-11 gap-2">
                          {[0, 1, 4, 0, 0, 0, 2, 0, 0, 3, 6].map(
                            (num, index) => (
                              <div
                                className="w-8 sm:w-10 aspect-square rounded-sm flex justify-center items-center bg-primaryColor text-secondaryColor text-base sm:text-xl"
                                key={index}
                              >
                                {num}
                              </div>
                            )
                          )}
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
                type="text"
                value={sendAccNum}
                onChange={(e) => setSendAccNum(e.target.value)}
              />
              <input
                className="w-full px-3 lg:px-5 text-xs sm:text-sm lg:text-base py-2 lg:py-3 rounded-sm outline-none border border-gray-300"
                placeholder="Transaction ID *"
                required
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
              />
              <div className="flex flex-row gap-2">
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  onChange={() => setTermsChecked(!termsChecked)}
                  required
                />
                <div>
                  I have read the{" "}
                  <span className="text-red-500 font-semibold">
                    Payment Terms and Conditions
                  </span>{" "}
                  and I agree.{" "}
                </div>
              </div>

              <div>
                <button
                  className="text-lg w-full px-2 flex justify-center items-center bg-accentColor rounded-sm py-3 text-primaryColor"
                  type="submit"
                >
                  Confirm Order
                </button>
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
    </div>
  );
}
