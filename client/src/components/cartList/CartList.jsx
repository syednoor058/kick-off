/* eslint-disable react/prop-types */
// import React from 'react'
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

export default function CartList(props) {
  const { updateQuantity } = useContext(ProductContext);

  const additionHandler = () => {
    updateQuantity(props.cart._id, props.cart.size, props.cart.quantity + 1);
  };

  const subtractionHandler = () => {
    if (props.cart.quantity > 1) {
      updateQuantity(props.cart._id, props.cart.size, props.cart.quantity - 1);
    }
  };

  return (
    <div className="w-full flex flex-row gap-3 md:gap-5 p-3 border rounded">
      <div className="w-[10%] flex items-center justify-center">
        {props.item._id}
      </div>
      <div className="w-[55%] flex flex-row gap-3 md:gap-5">
        <img className="w-16 h-16" src={props.item.image[0]} alt="" />
        {props.item.name}
      </div>
      <div className="w-[10%] flex items-center justify-center">
        {props.cart.size}
      </div>
      <div className="w-[10%] flex flex-row gap-0 md:gap-2 items-center justify-center">
        <div
          className="cursor-pointer p-2"
          onClick={() => subtractionHandler()}
        >
          <RemoveIcon fontSize="inherit" />
        </div>
        {props.cart.quantity}
        <div className="cursor-pointer p-2" onClick={() => additionHandler()}>
          <AddIcon fontSize="inherit" />
        </div>
      </div>
      <div className="w-[10%] flex items-center justify-center">
        {props.item.price * props.cart.quantity}
      </div>
      <div
        className="w-[5%] flex justify-center items-center cursor-pointer"
        onClick={() => updateQuantity(props.item._id, props.cart.size, 0)}
      >
        <DeleteIcon />
      </div>
    </div>
  );
}
