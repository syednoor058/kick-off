/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { products } from "../assets/products/productsDetails";

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
  const currency = "BDT";
  const deliveryCharge = 200;

  const [cartItem, setCartItem] = useState({});
  const [relatedProducts, setRelatedProducts] = useState({});

  const getRelatedProducts = (itemName) => {
    const targetKeys = itemName.toLowerCase().split(" ");
    const productList = products.filter((product) => {
      if (product.name.toLowerCase() === itemName.toLowerCase()) {
        return false;
      }
      return targetKeys.some((key) => product.name.toLowerCase().includes(key));
    });

    setRelatedProducts(productList);
    localStorage.setItem("relatedProducts", JSON.stringify(productList));
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);
  };

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItem);

    if (size === "") {
      toast.error("Select product size!");
      return;
    }

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    toast.success("Product added to cart!");
    setCartItem(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item];
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    }
    return totalCount;
  };

  const cartTotalAmount = () => {
    let total = 0;
    for (const item in cartItem) {
      const product = products.find((info) => info._id === item);
      for (const size in cartItem[item]) {
        total += product.price * cartItem[item][size];
      }
    }
    return total;
  };

  const value = {
    products,
    currency,
    deliveryCharge,
    cartItem,
    addToCart,
    getCartCount,
    updateQuantity,
    cartTotalAmount,
    relatedProducts,
    getRelatedProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
