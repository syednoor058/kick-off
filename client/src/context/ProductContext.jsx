/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
// import { products } from "../assets/products/productsDetails";
// import { useNavigate } from "react-router-dom";

export const ProductContext = createContext();

const ProductContextProvider = (props) => {
  // const navigate = useNavigate();
  const [deleteCartLoading, setDeleteCartLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const { auth } = useContext(AuthContext);
  const currency = "BDT";
  const deliveryCharge = 120;
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState({});
  const [carausols, setCarausols] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(true);
  const [carLoading, setCarLoading] = useState(false);

  const cartItemData = localStorage.getItem("cartItem");

  const getRelatedProducts = (item) => {
    const targetKeys = item.name.toLowerCase().split(" ");
    // const targetCategory = item.category._id;
    const productList = products.filter((product) => {
      if (product.name.toLowerCase() === item.name.toLowerCase()) {
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
    localStorage.setItem("cartItem", JSON.stringify(cartData));
  };

  const addToCart = async (itemId, size, quantity) => {
    setCartLoading(true);
    if (!auth.user) {
      setCartLoading(false);
      toast.error("Login first before adding products!");
      return;
    }

    if (!size) {
      setCartLoading(false);
      toast.error("Please select product size!");
      return;
    }

    if (!(quantity > 0)) {
      setCartItem(false);
      toast.error("Quantity must be atleast 1!");
      return;
    }

    const res = await axios.post(
      `${import.meta.env.VITE_APP_API}/api/v1/auth/cart/${auth?.user?._id}`,
      { productId: itemId, size, quantity },
      {
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `${auth?.token}`,
        },
        user: auth.user,
      }
    );

    if (res.data.success) {
      toast.success("Product is added to cart!");
      setCartItem(res.data.cart);
      // navigate("/cart");
      setCartLoading(false);
    } else {
      toast.error("Error addding product to cart!");
      setCartLoading(false);
    }
  };

  const deleteCartItem = async (productId, size) => {
    setDeleteCartLoading(true);
    if (!auth.user) {
      setDeleteCartLoading(false);
      toast.error("Login first before adding products!");
      return;
    }

    const res = await axios.post(
      `${import.meta.env.VITE_APP_API}/api/v1/auth/cart_delete/${
        auth?.user?._id
      }`,
      { productId, size },
      {
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `${auth?.token}`,
        },
        user: auth.user,
      }
    );

    if (res.data.success) {
      toast.success("Product is removed from cart!");
      setCartItem(res.data.cart);
      // navigate("/cart");
      setDeleteCartLoading(false);
    } else {
      toast.error("Error removing product from cart!");
      setDeleteCartLoading(false);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    cartItem.map((cartItemData) => (totalCount += cartItemData.quantity));

    return totalCount;
  };

  const cartTotalAmount = () => {
    let total = 0;
    if (cartItem.length > 0) {
      cartItem.map(
        (cartItemData) =>
          (total += cartItemData.product.price * cartItemData.quantity)
      );
    }
    return total;
  };

  const value = {
    products,
    cartItemData,
    currency,
    deliveryCharge,
    cartItem,
    addToCart,
    getCartCount,
    updateQuantity,
    cartTotalAmount,
    relatedProducts,
    getRelatedProducts,
    categories,
    cartLoading,
    deleteCartItem,
    categoryLoading,
    productLoading,
    order,
    orderLoading,
    deleteCartLoading,
    carLoading,
    carausols,
  };

  //Fetch carausol from API
  const fetchCarausols = async () => {
    setCarLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/get-carausol`
      );
      if (res.data.carausols.length > 0) {
        setCarausols(res.data.carausols);
      }
      setCarLoading(false);
    } catch (error) {
      setCarLoading(false);
      console.log(error);
      // toast.error("Error fetching carausels!");
    }
  };

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/get-product`
      );
      if (response.data.success) {
        setProducts(response.data.products);
        setProductLoading(false);
      } else {
        toast.error("Something went wrong!");
        setProductLoading(false);
      }
    } catch (err) {
      console.log(err);
      setProductLoading(false);
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/categories`
      );

      if (response.data.success) {
        setCategories(response.data.categories);
        setCategoryLoading(false);
      } else {
        toast.error("Something went wrong!");
        setCategoryLoading(false);
      }
    } catch (err) {
      console.log(err);
      setCategoryLoading(false);
    }
  };

  const fetchCartItem = async () => {
    // const cartData = localStorage.getItem("cartItem");
    // setCartItem(JSON.parse(cartData));
    setCartLoading(true);
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API}/api/v1/auth/cart/${auth?.user?._id}`,
      {
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `${auth?.token}`,
        },
        user: auth.user,
      }
    );

    if (res.data.success) {
      setCartItem(res.data.cart);
      setCartLoading(false);
    } else {
      setCartLoading(false);
    }
  };

  const fetchOrder = async () => {
    setOrderLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/get-order`,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `${auth?.token}`,
          },
          user: auth.user,
        }
      );

      if (res.data.success) {
        setOrder(res.data.order);
        setOrderLoading(false);
      } else {
        // toast.error(res.data.message);
        setOrderLoading(false);
      }
    } catch (error) {
      console.log(error);
      setOrderLoading(false);
      toast.error("Something went wrong fetching order!");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchCarausols();

    if (!auth.user) {
      setCartItem([]);
    }

    if (auth.user) {
      fetchCartItem();
      fetchOrder();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user]);

  return (
    <ProductContext.Provider value={value}>
      {/* {loading && (
        <div className="w-full h-screen top-0 bottom-0 absolute flex justify-center items-center bg-primaryColor bg-opacity-80 z-[150]">
          <svg
            aria-hidden="true"
            className="w-16 h-16 text-secondaryColor animate-spin dark:text-gray-300 fill-secondaryColor"
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
      )} */}
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
