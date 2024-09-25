// import React from 'react'

import { useEffect, useState } from "react";
// import UnderConstruction from "../../components/underConstruction/UnderConstruction";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ProductContext } from "../../context/ProductContext";

export default function MyOrder() {
  const [userOrder, setUserOrder] = useState([]);
  const { order } = useContext(ProductContext);
  const { auth } = useContext(AuthContext);

  const myOrder = () => {
    const newOrder = order.filter((o) => o.user._id === auth?.user?._id);
    setUserOrder(newOrder);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (order && auth?.user) {
      myOrder();
      console.log(userOrder);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.user, order]);

  return (
    <div className="w-full min-h-screen mt-[104px]">
      <div className="px-3 sm:px-10 md:px-16 lg:px-20 py-10 lg:py-20 flex flex-col gap-5 lg:gap-10">
        <div className="w-ful text-center uppercase text-2xl sm:text-3xl md:text-4xl font-semibold">
          My orders
        </div>
        {userOrder.length > 0 ? (
          <div className="flex flex-col gap-5 lg:gap-7">
            {userOrder.map((o, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 text-xs md:text-sm p-3 sm:p-5 border rounded-sm border-dashed border-secondaryColor"
              >
                <div className="font-semibold text-base">
                  Buyer&apos;s Details
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    Name: {o.buyer.firstName} {o.buyer.lastName}
                  </div>
                  <div>Email: {o.buyer.email}</div>
                  <div className="capitalize">Address: {o.buyer.address}</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-5 gap-y-2">
                    <div>Appartment/House No: {o.buyer.appartment}</div>
                    <div className="capitalize">City: {o.buyer.city}</div>
                    <div>Postal Code: {o.buyer.postalCode}</div>
                    <div>Phone: +880{o.buyer.phoneNumber}</div>
                    <div className="capitalize">Region: {o.buyer.region}</div>
                  </div>
                </div>
                <div className="font-semibold text-base">Payment</div>
                <div className="flex flex-col gap-2">
                  <div className="capitalize">
                    Payment Method: {o.buyer.payment}
                  </div>
                  <div>
                    Sender&apos;s Account Number: +880
                    {o.buyer.sendAccNum}
                  </div>
                  <div>Transaction ID: {o.buyer.transactionId}</div>
                </div>
                <div className="font-semibold text-base">Products</div>
                <div className="flex flex-col gap-2">
                  {o.product.map((p, index) => (
                    <div key={index} className="flex flex-row gap-3 md:gap-0">
                      <div className="w-[5%]">{index + 1}</div>
                      <div className="w-[50%]">{p.product.name}</div>
                      <div className="w-[20%]">{p.product.productType}</div>
                      <div className="w-[5%]">{p.size}</div>
                      <div className="w-[10%]">{p.quantity}</div>
                      <div className="w-[10%]">
                        {p.product.price * p.quantity} BDT
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-7">
                  <div>Total: {o.buyer.total} BDT (incld. delivery charge)</div>
                  <div>Paid: {o.buyer.amount} BDT</div>
                  <div>Due: {o.buyer.total - o.buyer.amount} BDT</div>
                </div>
                <div className="w-full flex flex-row gap-10 pt-5 items-center justify-between">
                  <div className="uppercase text-sm md:text-xl font-semibold flex gap-5 items-center">
                    <div
                      className={`px-3 py-2 rounded-sm ${
                        o.progress === "Order in review" && "bg-yellow-400"
                      } ${
                        o.progress === "Order in progress" && "bg-cyan-400"
                      } ${o.progress === "Shipped" && "bg-blue-400"} ${
                        o.progress === "Received" && "bg-green-400"
                      } ${
                        o.progress === "Canceled" && "bg-red-400"
                      } text-primaryColor`}
                    >
                      {o.progress}
                    </div>
                  </div>
                </div>
                <div className="capitalize">Comment: {o.feedback}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-screen text-2xl sm:text-3xl md:text-4xl uppercase font-semibold text-gray-400 flex justify-center items-center">
            You haven&apos;t placed any order yet!
          </div>
        )}
      </div>
    </div>
  );
}
