// import React from "react";
// import UnderConstruction from "../../underConstruction/UnderConstruction";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import { ProductContext } from "../../../context/ProductContext";

export default function Order() {
  const { auth } = useContext(AuthContext);
  const { order, orderLoading } = useContext(ProductContext);
  const [orderInReview, setOrderInReview] = useState(0);
  const [orderInProgress, setOrderInProgress] = useState(0);
  const [shipped, setShipped] = useState(0);
  const [received, setreceived] = useState(0);
  const [canceled, setCanceled] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentOrder, setCurrentOrder] = useState("pending");
  const [editOrder, setEditOrder] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [orderProgress, setOrderProgress] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  const orderTypeSorting = () => {
    setLoading(true);
    let orderReview = 0;
    let orderProgress = 0;
    let orderShipped = 0;
    let orderreceived = 0;
    let orderCanceled = 0;
    if (order) {
      order.map((item) => {
        if (item.progress == "Order in review") {
          orderReview += 1;
        }
        if (item.progress == "Order in progress") {
          orderProgress += 1;
        }
        if (item.progress == "Shipped") {
          orderShipped += 1;
        }
        if (item.progress == "Received") {
          orderreceived += 1;
        }
        if (item.progress == "Canceled") {
          orderCanceled += 1;
        }
      });

      setOrderInReview(orderReview);
      setOrderInProgress(orderProgress);
      setShipped(orderShipped);
      setreceived(orderreceived);
      setCanceled(orderCanceled);
    }
    setLoading(false);
  };

  const handleEditPopup = (order) => {
    setOrderProgress(order.progress);
    setEditOrder(true);
  };

  const updateOrder = async (e, orderID, orderProgress, feedback) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_APP_API}/api/edit-order/${orderID}`,
        { orderProgress, feedback },
        {
          headers: {
            Authorization: `${auth?.token}`,
          },
          user: auth.user,
        }
      );

      if (res.data.success) {
        setUpdateLoading(false);
        setEditOrder(false);
        setOrderProgress("");
        toast.success("Order status updated successfully!");
      }
    } catch (error) {
      setUpdateLoading(false);
      console.log(error);
      toast.error("Error while updating order!");
    }
  };

  useEffect(() => {
    if (order) {
      orderTypeSorting();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  if (orderLoading || loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <svg
          aria-hidden="true"
          className="w-14 h-14 text-secondaryColor animate-spin dark:text-gray-400 fill-secondaryColor"
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

  if (order.length < 1) {
    return (
      <div className="w-full h-screen uppercase text-3xl md:text-4xl lg:text-6xl px-10 py-20 flex justify-center items-center bg-gray-200 font-semibold text-gray-400">
        No orders found!
      </div>
    );
  }

  return (
    <div className="w-full h-full px-5 bg-gray-200 pb-10 flex flex-col gap-10">
      <div className="w-full h-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-5 bg-gray-200 text-primaryColor">
        <div
          className="w-full aspect-square p-5 flex justify-center items-center flex-col gap-3 bg-yellow-400 rounded-sm cursor-pointer"
          onClick={() => setCurrentOrder("pending")}
        >
          <div className="text-6xl font-semibold">{orderInReview}</div>
          <div className="text-center leading-none">Orders in pending</div>
        </div>
        <div
          className="w-full aspect-square p-5 flex justify-center items-center flex-col gap-3 bg-cyan-400 rounded-sm cursor-pointer"
          onClick={() => setCurrentOrder("progress")}
        >
          <div className="text-6xl font-semibold">{orderInProgress}</div>
          <div className="text-center leading-none">Orders in progress</div>
        </div>
        <div
          className="w-full aspect-square p-5 flex justify-center items-center flex-col gap-3 bg-blue-400 rounded-sm cursor-pointer"
          onClick={() => setCurrentOrder("shipped")}
        >
          <div className="text-6xl font-semibold">{shipped}</div>
          <div className="text-center leading-none">Orders are shipped</div>
        </div>
        <div
          className="w-full aspect-square p-5 flex justify-center items-center flex-col gap-3 bg-green-400 rounded-sm cursor-pointer"
          onClick={() => setCurrentOrder("received")}
        >
          <div className="text-6xl font-semibold">{received}</div>
          <div className="text-center leading-none">Orders are received</div>
        </div>
        <div
          className="w-full aspect-square p-5 flex justify-center items-center flex-col gap-3 bg-red-400 rounded-sm cursor-pointer"
          onClick={() => setCurrentOrder("canceled")}
        >
          <div className="text-6xl font-semibold">{canceled}</div>
          <div className="text-center leading-none">Orders are canceled</div>
        </div>
      </div>

      {order && (
        <div>
          {currentOrder == "pending" && (
            <div>
              {orderInReview > 0 ? (
                <div className="flex flex-col gap-5">
                  <div className="uppercase text-xl font-semibold">
                    Orders in pending
                  </div>
                  {order.map(
                    (o, index) =>
                      o.progress == "Order in review" && (
                        <div
                          key={index}
                          className="flex flex-col gap-3 text-xs md:text-sm p-5 border rounded-sm border-dashed border-secondaryColor"
                        >
                          <div className="font-semibold text-base">
                            Buyer&apos;s Details
                          </div>
                          <div className="flex flex-col gap-2">
                            <div>
                              Name: {o.buyer.firstName} {o.buyer.lastName}
                            </div>
                            <div>Email: {o.buyer.email}</div>
                            <div className="capitalize">
                              Address: {o.buyer.address}
                            </div>
                            <div className="grid grid-cols-3 md:grid-cols-5 gap-x-5 gap-y-2">
                              <div>
                                Appartment/House No: {o.buyer.appartment}
                              </div>
                              <div className="capitalize">
                                City: {o.buyer.city}
                              </div>
                              <div>Postal Code: {o.buyer.postalCode}</div>
                              <div>Phone: +880{o.buyer.phoneNumber}</div>
                              <div className="capitalize">
                                Region: {o.buyer.region}
                              </div>
                            </div>
                          </div>
                          <div className="font-semibold text-base">Payment</div>
                          <div className="flex flex-col gap-2">
                            <div className="capitalize">
                              Paymet Method: {o.buyer.payment}
                            </div>
                            <div>
                              Sender&apos;s Account Number: +880
                              {o.buyer.sendAccNum}
                            </div>
                            <div>Transaction ID: {o.buyer.transactionId}</div>
                          </div>
                          <div className="font-semibold text-base">
                            Products
                          </div>
                          <div className="flex flex-col gap-2">
                            {o.product.map((p, index) => (
                              <div
                                key={index}
                                className="flex flex-row gap-3 md:gap-0"
                              >
                                <div className="w-[5%]">{index + 1}</div>
                                <div className="w-[50%]">{p.product.name}</div>
                                <div className="w-[20%]">
                                  {p.product.productType}
                                </div>
                                <div className="w-[5%]">{p.size}</div>
                                <div className="w-[10%]">{p.quantity}</div>
                                <div className="w-[10%]">
                                  {p.product.price * p.quantity} BDT
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-7">
                            <div>Total: {o.buyer.total} BDT</div>
                            <div>Paid: {o.buyer.amount} BDT</div>
                            <div>Due: {o.buyer.total - o.buyer.amount} BDT</div>
                          </div>
                          <div className="w-full flex flex-row gap-10 pt-5 items-center justify-between">
                            <div className="uppercase text-sm md:text-xl font-semibold flex gap-5 items-center">
                              <div>Status:</div>{" "}
                              <div className="px-3 py-2 rounded-sm bg-yellow-400 text-primaryColor">
                                {o.progress}
                              </div>
                            </div>
                            <div className="flex flex-row gap-2 items-center cursor-pointer">
                              <EditIcon fontSize="small" />
                              <div onClick={() => handleEditPopup(o)}>
                                Edit Order Status
                              </div>
                            </div>
                          </div>
                          <div className="capitalize">
                            Comment: {o.feedback}
                          </div>
                          {editOrder && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-[2px]">
                              <div className="w-[90%] sm:w-[80%] md:w-[60%] p-5 bg-primaryColor rounded-sm flex flex-col gap-5 relative">
                                {updateLoading && (
                                  <div className="w-full h-full top-0 bottom- 0 absolute flex justify-center items-center bg-primaryColor">
                                    <svg
                                      aria-hidden="true"
                                      className="w-12 h-12 text-secondaryColor animate-spin dark:text-gray-400 fill-secondaryColor"
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
                                <div className="text-xl uppercase">
                                  Set Order status
                                </div>
                                <form
                                  className="flex flex-col gap-3"
                                  onSubmit={(e) => {
                                    if (orderProgress == "") {
                                      updateOrder(
                                        e,
                                        o._id,
                                        o.progress,
                                        feedback
                                      );
                                    } else {
                                      updateOrder(
                                        e,
                                        o._id,
                                        orderProgress,
                                        feedback
                                      );
                                    }
                                  }}
                                >
                                  <div className="w-[50%] flex flex-col gap-3">
                                    <label className="block text-gray-700">
                                      Status
                                    </label>
                                    <select
                                      className="w-full p-2 border border-gray-300 rounded-sm outline-none"
                                      value={orderProgress}
                                      defaultValue={o.progress}
                                      onChange={(e) =>
                                        setOrderProgress(e.target.value)
                                      }
                                    >
                                      <option value="Order in review">
                                        Order in review
                                      </option>
                                      <option value="Order in progress">
                                        Order in progress
                                      </option>
                                      <option value="Shipped">Shipped</option>
                                      <option value="Received">Received</option>
                                      <option value="Canceled">Canceled</option>
                                    </select>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    <label className="block text-gray-700">
                                      Comment
                                    </label>
                                    <textarea
                                      type="text"
                                      value={feedback}
                                      onChange={(e) =>
                                        setFeedback(e.target.value)
                                      }
                                      className="rounded-sm outline-none border p-3"
                                      rows={6}
                                    ></textarea>
                                  </div>
                                  <div className="flex flex-row gap-5">
                                    <div
                                      onClick={() => {
                                        setEditOrder(false);
                                        setOrderProgress("");
                                      }}
                                      className="px-5 py-2 rounded-sm bg-gray-500 text-primaryColor cursor-pointer"
                                    >
                                      Cancel
                                    </div>
                                    <button
                                      type="submit"
                                      className={`px-5 py-2 rounded-sm  text-primaryColor ${
                                        orderProgress == "" && feedback == ""
                                          ? "cursor-not-allowed bg-green-300"
                                          : "cursor-pointer bg-green-500"
                                      }`}
                                      disabled={
                                        orderProgress == "" && feedback == ""
                                      }
                                    >
                                      Save
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                  )}
                </div>
              ) : (
                <div className="w-full py-20 flex justify-center items-center px-5 uppercase font-semibold text-gray-400 text-2xl sm:text-3xl md:text-4xl">
                  No order in pending!
                </div>
              )}
            </div>
          )}
          {currentOrder == "progress" && (
            <div>
              {orderInProgress > 0 ? (
                <div className="flex flex-col gap-5">
                  <div className="uppercase text-xl font-semibold">
                    Orders in progress
                  </div>
                  {order.map(
                    (o, index) =>
                      o.progress == "Order in progress" && (
                        <div
                          key={index}
                          className="flex flex-col gap-3 text-xs md:text-sm p-5 border rounded-sm border-dashed border-secondaryColor"
                        >
                          <div className="font-semibold text-base">
                            Buyer&apos;s Details
                          </div>
                          <div className="flex flex-col gap-2">
                            <div>
                              Name: {o.buyer.firstName} {o.buyer.lastName}
                            </div>
                            <div>Email: {o.buyer.email}</div>
                            <div className="capitalize">
                              Address: {o.buyer.address}
                            </div>
                            <div className="grid grid-cols-3 md:grid-cols-5 gap-x-5 gap-y-2">
                              <div>
                                Appartment/House No: {o.buyer.appartment}
                              </div>
                              <div className="capitalize">
                                City: {o.buyer.city}
                              </div>
                              <div>Postal Code: {o.buyer.postalCode}</div>
                              <div>Phone: +880{o.buyer.phoneNumber}</div>
                              <div className="capitalize">
                                Region: {o.buyer.region}
                              </div>
                            </div>
                          </div>
                          <div className="font-semibold text-base">Payment</div>
                          <div className="flex flex-col gap-2">
                            <div className="capitalize">
                              Paymet Method: {o.buyer.payment}
                            </div>
                            <div>
                              Sender&apos;s Account Number: +880
                              {o.buyer.sendAccNum}
                            </div>
                            <div>Transaction ID: {o.buyer.transactionId}</div>
                          </div>
                          <div className="font-semibold text-base">
                            Products
                          </div>
                          <div className="flex flex-col gap-2">
                            {o.product.map((p, index) => (
                              <div
                                key={index}
                                className="flex flex-row gap-3 md:gap-0"
                              >
                                <div className="w-[5%]">{index + 1}</div>
                                <div className="w-[50%]">{p.product.name}</div>
                                <div className="w-[20%]">
                                  {p.product.productType}
                                </div>
                                <div className="w-[5%]">{p.size}</div>
                                <div className="w-[10%]">{p.quantity}</div>
                                <div className="w-[10%]">
                                  {p.product.price * p.quantity} BDT
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-7">
                            <div>Total: {o.buyer.total} BDT</div>
                            <div>Paid: {o.buyer.amount} BDT</div>
                            <div>Due: {o.buyer.total - o.buyer.amount} BDT</div>
                          </div>
                          <div className="w-full flex flex-row gap-10 pt-5 items-center justify-between">
                            <div className="uppercase text-sm md:text-xl font-semibold flex gap-5 items-center">
                              <div>Status:</div>{" "}
                              <div className="px-3 py-2 rounded-sm bg-cyan-400 text-primaryColor">
                                {o.progress}
                              </div>
                            </div>
                            <div className="flex flex-row gap-2 items-center cursor-pointer">
                              <EditIcon fontSize="small" />
                              <div onClick={() => handleEditPopup(o)}>
                                Edit Order Status
                              </div>
                            </div>
                          </div>
                          <div className="capitalize">
                            Comment: {o.feedback}
                          </div>
                          {editOrder && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-[2px]">
                              <div className="w-[90%] sm:w-[80%] md:w-[60%] p-5 bg-primaryColor rounded-sm flex flex-col gap-5 relative">
                                {updateLoading && (
                                  <div className="w-full h-full top-0 bottom- 0 absolute flex justify-center items-center bg-primaryColor">
                                    <svg
                                      aria-hidden="true"
                                      className="w-12 h-12 text-secondaryColor animate-spin dark:text-gray-400 fill-secondaryColor"
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
                                <div className="text-xl uppercase">
                                  Set Order status
                                </div>
                                <form
                                  className="flex flex-col gap-3"
                                  onSubmit={(e) => {
                                    if (orderProgress == "") {
                                      setOrderProgress(o.progress);
                                    }
                                    updateOrder(
                                      e,
                                      o._id,
                                      orderProgress,
                                      feedback
                                    );
                                  }}
                                >
                                  <div className="w-[50%] flex flex-col gap-3">
                                    <label className="block text-gray-700">
                                      Status
                                    </label>
                                    <select
                                      className="w-full p-2 border border-gray-300 rounded-sm outline-none"
                                      value={orderProgress}
                                      defaultValue={o.progress}
                                      onChange={(e) =>
                                        setOrderProgress(e.target.value)
                                      }
                                    >
                                      <option value="Order in review">
                                        Order in review
                                      </option>
                                      <option value="Order in progress">
                                        Order in progress
                                      </option>
                                      <option value="Shipped">Shipped</option>
                                      <option value="Received">Received</option>
                                      <option value="Canceled">Canceled</option>
                                    </select>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    <label className="block text-gray-700">
                                      Comment
                                    </label>
                                    <textarea
                                      type="text"
                                      value={feedback}
                                      onChange={(e) =>
                                        setFeedback(e.target.value)
                                      }
                                      className="rounded-sm outline-none border p-3"
                                      rows={6}
                                    ></textarea>
                                  </div>
                                  <div className="flex flex-row gap-5">
                                    <div
                                      onClick={() => {
                                        setEditOrder(false);
                                        setOrderProgress("");
                                      }}
                                      className="px-5 py-2 rounded-sm bg-gray-500 text-primaryColor cursor-pointer"
                                    >
                                      Cancel
                                    </div>
                                    <button
                                      type="submit"
                                      className={`px-5 py-2 rounded-sm  text-primaryColor ${
                                        orderProgress == "" && feedback == ""
                                          ? "cursor-not-allowed bg-green-300"
                                          : "cursor-pointer bg-green-500"
                                      }`}
                                      disabled={
                                        orderProgress == "" && feedback == ""
                                      }
                                    >
                                      Save
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                  )}
                </div>
              ) : (
                <div className="w-full py-20 flex justify-center items-center px-5 uppercase font-semibold text-gray-400 text-2xl sm:text-3xl md:text-4xl">
                  No order in progress!
                </div>
              )}
            </div>
          )}
          {currentOrder == "shipped" && (
            <div>
              {shipped > 0 ? (
                <div className="flex flex-col gap-5">
                  <div className="uppercase text-xl font-semibold">
                    Orders in shipping
                  </div>
                  {order.map(
                    (o, index) =>
                      o.progress == "Shipped" && (
                        <div
                          key={index}
                          className="flex flex-col gap-3 text-xs md:text-sm p-5 border rounded-sm border-dashed border-secondaryColor"
                        >
                          <div className="font-semibold text-base">
                            Buyer&apos;s Details
                          </div>
                          <div className="flex flex-col gap-2">
                            <div>
                              Name: {o.buyer.firstName} {o.buyer.lastName}
                            </div>
                            <div>Email: {o.buyer.email}</div>
                            <div className="capitalize">
                              Address: {o.buyer.address}
                            </div>
                            <div className="grid grid-cols-3 md:grid-cols-5 gap-x-5 gap-y-2">
                              <div>
                                Appartment/House No: {o.buyer.appartment}
                              </div>
                              <div className="capitalize">
                                City: {o.buyer.city}
                              </div>
                              <div>Postal Code: {o.buyer.postalCode}</div>
                              <div>Phone: +880{o.buyer.phoneNumber}</div>
                              <div className="capitalize">
                                Region: {o.buyer.region}
                              </div>
                            </div>
                          </div>
                          <div className="font-semibold text-base">Payment</div>
                          <div className="flex flex-col gap-2">
                            <div className="capitalize">
                              Paymet Method: {o.buyer.payment}
                            </div>
                            <div>
                              Sender&apos;s Account Number: +880
                              {o.buyer.sendAccNum}
                            </div>
                            <div>Transaction ID: {o.buyer.transactionId}</div>
                          </div>
                          <div className="font-semibold text-base">
                            Products
                          </div>
                          <div className="flex flex-col gap-2">
                            {o.product.map((p, index) => (
                              <div
                                key={index}
                                className="flex flex-row gap-3 md:gap-0"
                              >
                                <div className="w-[5%]">{index + 1}</div>
                                <div className="w-[50%]">{p.product.name}</div>
                                <div className="w-[20%]">
                                  {p.product.productType}
                                </div>
                                <div className="w-[5%]">{p.size}</div>
                                <div className="w-[10%]">{p.quantity}</div>
                                <div className="w-[10%]">
                                  {p.product.price * p.quantity} BDT
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-7">
                            <div>Total: {o.buyer.total} BDT</div>
                            <div>Paid: {o.buyer.amount} BDT</div>
                            <div>Due: {o.buyer.total - o.buyer.amount} BDT</div>
                          </div>
                          <div className="w-full flex flex-row gap-10 pt-5 items-center justify-between">
                            <div className="uppercase text-sm md:text-xl font-semibold flex gap-5 items-center">
                              <div>Status:</div>{" "}
                              <div className="px-3 py-2 rounded-sm bg-blue-400 text-primaryColor">
                                {o.progress}
                              </div>
                            </div>
                            <div className="flex flex-row gap-2 items-center cursor-pointer">
                              <EditIcon fontSize="small" />
                              <div onClick={() => handleEditPopup(o)}>
                                Edit Order Status
                              </div>
                            </div>
                          </div>
                          <div className="capitalize">
                            Comment: {o.feedback}
                          </div>
                          {editOrder && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-[2px]">
                              <div className="w-[90%] sm:w-[80%] md:w-[60%] p-5 bg-primaryColor rounded-sm flex flex-col gap-5 relative">
                                {updateLoading && (
                                  <div className="w-full h-full top-0 bottom- 0 absolute flex justify-center items-center bg-primaryColor">
                                    <svg
                                      aria-hidden="true"
                                      className="w-12 h-12 text-secondaryColor animate-spin dark:text-gray-400 fill-secondaryColor"
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
                                <div className="text-xl uppercase">
                                  Set Order status
                                </div>
                                <form
                                  onSubmit={(e) => {
                                    if (orderProgress == "") {
                                      updateOrder(
                                        e,
                                        o._id,
                                        o.progress,
                                        feedback
                                      );
                                    } else {
                                      updateOrder(
                                        e,
                                        o._id,
                                        orderProgress,
                                        feedback
                                      );
                                    }
                                  }}
                                  className="flex flex-col gap-3"
                                >
                                  <div className="w-[50%] flex flex-col gap-3">
                                    <label className="block text-gray-700">
                                      Status
                                    </label>
                                    <select
                                      className="w-full p-2 border border-gray-300 rounded-sm outline-none"
                                      value={orderProgress}
                                      defaultValue={o.progress}
                                      onChange={(e) =>
                                        setOrderProgress(e.target.value)
                                      }
                                    >
                                      <option value="Order in review">
                                        Order in review
                                      </option>
                                      <option value="Order in progress">
                                        Order in progress
                                      </option>
                                      <option value="Shipped">Shipped</option>
                                      <option value="Received">Received</option>
                                      <option value="Canceled">Canceled</option>
                                    </select>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    <label className="block text-gray-700">
                                      Comment
                                    </label>
                                    <textarea
                                      type="text"
                                      value={feedback}
                                      onChange={(e) =>
                                        setFeedback(e.target.value)
                                      }
                                      className="rounded-sm outline-none border p-3"
                                      rows={4}
                                    ></textarea>
                                  </div>
                                  <div className="flex flex-row gap-5">
                                    <div
                                      onClick={() => {
                                        setEditOrder(false);
                                        setOrderProgress("");
                                      }}
                                      className="px-5 py-2 rounded-sm bg-gray-500 text-primaryColor cursor-pointer"
                                    >
                                      Cancel
                                    </div>
                                    <button
                                      type="submit"
                                      className={`px-5 py-2 rounded-sm  text-primaryColor ${
                                        orderProgress == "" && feedback == ""
                                          ? "cursor-not-allowed bg-green-300"
                                          : "cursor-pointer bg-green-500"
                                      }`}
                                      disabled={
                                        orderProgress == "" && feedback == ""
                                      }
                                    >
                                      Save
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                  )}
                </div>
              ) : (
                <div className="w-full py-20 flex justify-center items-center px-5 uppercase font-semibold text-gray-400 text-2xl sm:text-3xl md:text-4xl">
                  No order in shipping!
                </div>
              )}
            </div>
          )}
          {currentOrder == "received" && (
            <div>
              {received > 0 ? (
                <div className="flex flex-col gap-5">
                  <div className="uppercase text-xl font-semibold">
                    Received orders
                  </div>
                  {order.map(
                    (o, index) =>
                      o.progress == "Received" && (
                        <div
                          key={index}
                          className="flex flex-col gap-3 text-xs md:text-sm p-5 border rounded-sm border-dashed border-secondaryColor"
                        >
                          <div className="font-semibold text-base">
                            Buyer&apos;s Details
                          </div>
                          <div className="flex flex-col gap-2">
                            <div>
                              Name: {o.buyer.firstName} {o.buyer.lastName}
                            </div>
                            <div>Email: {o.buyer.email}</div>
                            <div className="capitalize">
                              Address: {o.buyer.address}
                            </div>
                            <div className="grid grid-cols-3 md:grid-cols-5 gap-x-5 gap-y-2">
                              <div>
                                Appartment/House No: {o.buyer.appartment}
                              </div>
                              <div className="capitalize">
                                City: {o.buyer.city}
                              </div>
                              <div>Postal Code: {o.buyer.postalCode}</div>
                              <div>Phone: +880{o.buyer.phoneNumber}</div>
                              <div className="capitalize">
                                Region: {o.buyer.region}
                              </div>
                            </div>
                          </div>
                          <div className="font-semibold text-base">Payment</div>
                          <div className="flex flex-col gap-2">
                            <div className="capitalize">
                              Paymet Method: {o.buyer.payment}
                            </div>
                            <div>
                              Sender&apos;s Account Number: +880
                              {o.buyer.sendAccNum}
                            </div>
                            <div>Transaction ID: {o.buyer.transactionId}</div>
                          </div>
                          <div className="font-semibold text-base">
                            Products
                          </div>
                          <div className="flex flex-col gap-2">
                            {o.product.map((p, index) => (
                              <div
                                key={index}
                                className="flex flex-row gap-3 md:gap-0"
                              >
                                <div className="w-[5%]">{index + 1}</div>
                                <div className="w-[50%]">{p.product.name}</div>
                                <div className="w-[20%]">
                                  {p.product.productType}
                                </div>
                                <div className="w-[5%]">{p.size}</div>
                                <div className="w-[10%]">{p.quantity}</div>
                                <div className="w-[10%]">
                                  {p.product.price * p.quantity} BDT
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-7">
                            <div>Total: {o.buyer.total} BDT</div>
                            <div>Paid: {o.buyer.amount} BDT</div>
                            <div>Due: {o.buyer.total - o.buyer.amount} BDT</div>
                          </div>
                          <div className="w-full flex flex-row gap-10 pt-5 items-center justify-between">
                            <div className="uppercase text-sm md:text-xl font-semibold flex gap-5 items-center">
                              <div>Status:</div>{" "}
                              <div className="px-3 py-2 rounded-sm bg-green-400 text-primaryColor">
                                {o.progress}
                              </div>
                            </div>
                            <div className="flex flex-row gap-2 items-center cursor-pointer">
                              <EditIcon fontSize="small" />
                              <div onClick={() => handleEditPopup(o)}>
                                Edit Order Status
                              </div>
                            </div>
                          </div>
                          <div className="capitalize">
                            Comment: {o.feedback}
                          </div>
                          {editOrder && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-[2px]">
                              <div className="w-[90%] sm:w-[80%] md:w-[60%] p-5 bg-primaryColor rounded-sm flex flex-col gap-5 relative">
                                {updateLoading && (
                                  <div className="w-full h-full top-0 bottom- 0 absolute flex justify-center items-center bg-primaryColor">
                                    <svg
                                      aria-hidden="true"
                                      className="w-12 h-12 text-secondaryColor animate-spin dark:text-gray-400 fill-secondaryColor"
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
                                <div className="text-xl uppercase">
                                  Set Order status
                                </div>
                                <form
                                  className="flex flex-col gap-3"
                                  onSubmit={(e) => {
                                    if (orderProgress == "") {
                                      updateOrder(
                                        e,
                                        o._id,
                                        o.progress,
                                        feedback
                                      );
                                    } else {
                                      updateOrder(
                                        e,
                                        o._id,
                                        orderProgress,
                                        feedback
                                      );
                                    }
                                  }}
                                >
                                  <div className="w-[50%] flex flex-col gap-3">
                                    <label className="block text-gray-700">
                                      Status
                                    </label>
                                    <select
                                      className="w-full p-2 border border-gray-300 rounded-sm outline-none"
                                      value={orderProgress}
                                      defaultValue={o.progress}
                                      onChange={(e) =>
                                        setOrderProgress(e.target.value)
                                      }
                                    >
                                      <option value="Order in review">
                                        Order in review
                                      </option>
                                      <option value="Order in progress">
                                        Order in progress
                                      </option>
                                      <option value="Shipped">Shipped</option>
                                      <option value="Received">Received</option>
                                      <option value="Canceled">Canceled</option>
                                    </select>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    <label className="block text-gray-700">
                                      Comment
                                    </label>
                                    <textarea
                                      type="text"
                                      value={feedback}
                                      onChange={(e) =>
                                        setFeedback(e.target.value)
                                      }
                                      className="rounded-sm outline-none border p-3"
                                      rows={6}
                                    ></textarea>
                                  </div>
                                  <div className="flex flex-row gap-5">
                                    <div
                                      onClick={() => {
                                        setEditOrder(false);
                                        setOrderProgress("");
                                      }}
                                      className="px-5 py-2 rounded-sm bg-gray-500 text-primaryColor cursor-pointer"
                                    >
                                      Cancel
                                    </div>
                                    <button
                                      type="submit"
                                      className={`px-5 py-2 rounded-sm  text-primaryColor ${
                                        orderProgress == "" && feedback == ""
                                          ? "cursor-not-allowed bg-green-300"
                                          : "cursor-pointer bg-green-500"
                                      }`}
                                      disabled={
                                        orderProgress == "" && feedback == ""
                                      }
                                    >
                                      Save
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                  )}
                </div>
              ) : (
                <div className="w-full py-20 flex justify-center items-center px-5 uppercase font-semibold text-gray-400 text-2xl sm:text-3xl md:text-4xl">
                  No order is received!
                </div>
              )}
            </div>
          )}
          {currentOrder == "canceled" && (
            <div>
              {canceled > 0 ? (
                <div className="flex flex-col gap-5">
                  <div className="uppercase text-xl font-semibold">
                    Canceled orders
                  </div>
                  {order.map(
                    (o, index) =>
                      o.progress == "Canceled" && (
                        <div
                          key={index}
                          className="flex flex-col gap-3 text-xs md:text-sm p-5 border rounded-sm border-dashed border-secondaryColor"
                        >
                          <div className="font-semibold text-base">
                            Buyer&apos;s Details
                          </div>
                          <div className="flex flex-col gap-2">
                            <div>
                              Name: {o.buyer.firstName} {o.buyer.lastName}
                            </div>
                            <div>Email: {o.buyer.email}</div>
                            <div className="capitalize">
                              Address: {o.buyer.address}
                            </div>
                            <div className="grid grid-cols-3 md:grid-cols-5 gap-x-5 gap-y-2">
                              <div>
                                Appartment/House No: {o.buyer.appartment}
                              </div>
                              <div className="capitalize">
                                City: {o.buyer.city}
                              </div>
                              <div>Postal Code: {o.buyer.postalCode}</div>
                              <div>Phone: +880{o.buyer.phoneNumber}</div>
                              <div className="capitalize">
                                Region: {o.buyer.region}
                              </div>
                            </div>
                          </div>
                          <div className="font-semibold text-base">Payment</div>
                          <div className="flex flex-col gap-2">
                            <div className="capitalize">
                              Paymet Method: {o.buyer.payment}
                            </div>
                            <div>
                              Sender&apos;s Account Number: +880
                              {o.buyer.sendAccNum}
                            </div>
                            <div>Transaction ID: {o.buyer.transactionId}</div>
                          </div>
                          <div className="font-semibold text-base">
                            Products
                          </div>
                          <div className="flex flex-col gap-2">
                            {o.product.map((p, index) => (
                              <div
                                key={index}
                                className="flex flex-row gap-3 md:gap-0"
                              >
                                <div className="w-[5%]">{index + 1}</div>
                                <div className="w-[50%]">{p.product.name}</div>
                                <div className="w-[20%]">
                                  {p.product.productType}
                                </div>
                                <div className="w-[5%]">{p.size}</div>
                                <div className="w-[10%]">{p.quantity}</div>
                                <div className="w-[10%]">
                                  {p.product.price * p.quantity} BDT
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-7">
                            <div>Total: {o.buyer.total} BDT</div>
                            <div>Paid: 0 BDT</div>
                            <div>Due: 0 BDT</div>
                          </div>
                          <div className="w-full flex flex-row gap-10 pt-5 items-center justify-between">
                            <div className="uppercase text-sm md:text-xl font-semibold flex gap-5 items-center">
                              <div>Status:</div>{" "}
                              <div className="px-3 py-2 rounded-sm bg-red-400 text-primaryColor">
                                {o.progress}
                              </div>
                            </div>
                            <div className="flex flex-row gap-2 items-center cursor-pointer">
                              <EditIcon fontSize="small" />
                              <div onClick={() => handleEditPopup(o)}>
                                Edit Order Status
                              </div>
                            </div>
                          </div>
                          <div className="capitalize">
                            Comment: {o.feedback}
                          </div>
                          {editOrder && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-[2px]">
                              <div className="w-[90%] sm:w-[80%] md:w-[60%] p-5 bg-primaryColor rounded-sm flex flex-col gap-5 relative">
                                {updateLoading && (
                                  <div className="w-full h-full top-0 bottom- 0 absolute flex justify-center items-center bg-primaryColor">
                                    <svg
                                      aria-hidden="true"
                                      className="w-12 h-12 text-secondaryColor animate-spin dark:text-gray-400 fill-secondaryColor"
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
                                <div className="text-xl uppercase">
                                  Set Order status
                                </div>
                                <form
                                  className="flex flex-col gap-3"
                                  onSubmit={(e) => {
                                    if (orderProgress == "") {
                                      updateOrder(
                                        e,
                                        o._id,
                                        o.progress,
                                        feedback
                                      );
                                    } else {
                                      updateOrder(
                                        e,
                                        o._id,
                                        orderProgress,
                                        feedback
                                      );
                                    }
                                  }}
                                >
                                  <div className="w-[50%] flex flex-col gap-3">
                                    <label className="block text-gray-700">
                                      Status
                                    </label>
                                    <select
                                      className="w-full p-2 border border-gray-300 rounded-sm outline-none"
                                      value={orderProgress}
                                      defaultValue={o.progress}
                                      onChange={(e) =>
                                        setOrderProgress(e.target.value)
                                      }
                                    >
                                      <option value="Order in review">
                                        Order in review
                                      </option>
                                      <option value="Order in progress">
                                        Order in progress
                                      </option>
                                      <option value="Shipped">Shipped</option>
                                      <option value="Received">Received</option>
                                      <option value="Canceled">Canceled</option>
                                    </select>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    <label className="block text-gray-700">
                                      Comment
                                    </label>
                                    <textarea
                                      type="text"
                                      value={feedback}
                                      onChange={(e) =>
                                        setFeedback(e.target.value)
                                      }
                                      className="rounded-sm outline-none border p-3"
                                      rows={4}
                                    ></textarea>
                                  </div>
                                  <div className="flex flex-row gap-5">
                                    <div
                                      onClick={() => {
                                        setEditOrder(false);
                                        setOrderProgress("");
                                      }}
                                      className="px-5 py-2 rounded-sm bg-gray-500 text-primaryColor cursor-pointer"
                                    >
                                      Cancel
                                    </div>
                                    <button
                                      type="submit"
                                      className={`px-5 py-2 rounded-sm  text-primaryColor ${
                                        orderProgress == "" && feedback == ""
                                          ? "cursor-not-allowed bg-green-300"
                                          : "cursor-pointer bg-green-500"
                                      }`}
                                      disabled={
                                        orderProgress == "" && feedback == ""
                                      }
                                    >
                                      Save
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                  )}
                </div>
              ) : (
                <div className="w-full py-20 flex justify-center items-center px-5 uppercase font-semibold text-gray-400 text-2xl sm:text-3xl md:text-4xl">
                  No order has been canceled!
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
