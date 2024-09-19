/* eslint-disable react/prop-types */
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

export default function CartList(props) {
  const { deleteCartItem } = useContext(ProductContext);
  return (
    <div className="w-full flex flex-row gap-3 md:gap-5 p-3 border rounded">
      <div className="w-[10%] break-all flex items-center justify-center text-clip">
        {props.index}
      </div>
      <div className="w-[55%] flex flex-row gap-3 md:gap-5 items-center md:text-sm font-medium">
        <img
          className="w-16 h-16 object-cover rounded-sm"
          src={props.cart.product.photo?.[0]}
          alt=""
        />
        {props.cart.product.name}
      </div>
      <div className="w-[10%] flex items-center justify-center md:text-sm">
        {props.cart.size}
      </div>
      <div className="w-[10%] flex flex-row gap-0 md:gap-2 items-center justify-center md:text-sm">
        {props.cart.quantity}
      </div>
      <div className="w-[10%] flex items-center justify-center md:text-sm">
        {props.cart.product.price * props.cart.quantity}
      </div>
      <div
        className="w-[5%] flex justify-center items-center cursor-pointer"
        onClick={() => deleteCartItem(props.cart.product._id, props.cart.size)}
      >
        <DeleteIcon />
      </div>
    </div>
  );
}
