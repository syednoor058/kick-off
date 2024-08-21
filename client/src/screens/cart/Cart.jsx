// import React from 'react'
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
import { useContext, useEffect, useState } from "react";
import CartList from "../../components/cartList/CartList";
import { ProductContext } from "../../context/ProductContext";

export default function Cart() {
  const { products, cartItem, cartTotalAmount } = useContext(ProductContext);
  const [cartData, setCartData] = useState([]);

  // const [addItem, setAddItem] = useState(0);
  // const [total, setTotal] = useState(0);

  // useEffect(() => {
  //   let tempTotal = 0;
  //   cartData.map((item) => {
  //     tempTotal +=
  //       products.find((productItem) => productItem._id === item._id).price *
  //       (item.quantity + addItem);
  //   });
  //   setTotal(tempTotal);
  // }, [addItem, cartData, products]);

  // const additionHandler = () => {
  //   setAddItem(addItem + 1);
  // };
  // const subtractionHandler = () => {
  //   if (addItem > 0) {
  //     setAddItem(addItem - 1);
  //   }
  // };

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
  return (
    <div className="min-h-screen p-20">
      {cartData.length > 0 ? (
        <div className="flex flex-row gap-10">
          <div className="w-[70%] text-sm flex flex-col gap-5">
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
                return (
                  // <div
                  //   key={index}
                  //   className="w-full flex flex-row gap-5 p-3 border rounded"
                  // >
                  //   <div className="w-[10%] flex items-center justify-center">
                  //     {item._id}
                  //   </div>
                  //   <div className="w-[60%] flex flex-row gap-2">
                  //     <img
                  //       className="w-16"
                  //       src={
                  //         products.find(
                  //           (productItem) => productItem._id === item._id
                  //         ).image[0]
                  //       }
                  //       alt=""
                  //     />
                  //     {
                  //       products.find((filterItem) => filterItem._id === item._id)
                  //         .name
                  //     }
                  //   </div>
                  //   <div className="w-[10%] flex items-center justify-center">
                  //     {item.size}
                  //   </div>
                  //   <div className="w-[10%] flex flex-row gap-3 items-center justify-center">
                  //     <div
                  //       className="cursor-pointer p-2"
                  //       onClick={() => subtractionHandler()}
                  //     >
                  //       <RemoveIcon fontSize="inherit" />
                  //     </div>
                  //     {item.quantity + addItem}
                  //     <div
                  //       className="cursor-pointer p-2"
                  //       onClick={() => additionHandler()}
                  //     >
                  //       <AddIcon fontSize="inherit" />
                  //     </div>
                  //   </div>
                  //   <div className="w-[10%] flex items-center justify-center">
                  //     {products.find((filterItem) => filterItem._id === item._id)
                  //       .price *
                  //       (item.quantity + addItem)}
                  //   </div>
                  // </div>
                  <CartList key={index} item={product} cart={item} />
                );
              }
            })}
          </div>
          <div className="w-[30%] flex flex-col gap-3 text-sm">
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
            <div className="p-3 bg-secondaryColor rounded-sm text-primaryColor text-center uppercase text-lg hover:bg-transparent hover:border border-secondaryColor hover:text-secondaryColor cursor-pointer duration-300">
              Proceed to Checkout
            </div>
            <div className="p-3 hover:bg-secondaryColor rounded-sm hover:text-primaryColor text-center uppercase text-lg border border-secondaryColor cursor-pointer duration-300">
              Continue Shopping
            </div>
          </div>
        </div>
      ) : (
        <div className=" w-full flex items-center justify-center text-center text-6xl uppercase font-medium text-gray-300 leading-none">
          No product in your cart!
        </div>
      )}
    </div>
  );
}
