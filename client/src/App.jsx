import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../src/components/navbar/Navbar";
import "./App.css";
import AddAdmin from "./components/dashboardComponents/addAdmin/AddAdmin";
import AddCategory from "./components/dashboardComponents/addCategory.jsx/AddCategory";
import AddProducts from "./components/dashboardComponents/addProduct/AddProducts";
import Message from "./components/dashboardComponents/message/Message";
import Order from "./components/dashboardComponents/order/Order";
import Overview from "./components/dashboardComponents/overview/Overview";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Cart from "./screens/cart/Cart";
import Checkout from "./screens/checkout/Checkout";
import Collection from "./screens/collection/Collection";
import Dashboard from "./screens/dashboard/Dashboard";
import Home from "./screens/home/Home";
import Login from "./screens/loginSignup/Login";
import LoginSignup from "./screens/loginSignup/LoginSignup";
import LoginSignupIndex from "./screens/loginSignup/LoginSignupIndex";
import Signup from "./screens/loginSignup/Signup";
import ProductDetail from "./screens/productDetail/ProductDetail";

function App() {
  return (
    <div className="w-full h-full overflow-hidden font-bodyFont relative">
      <BrowserRouter>
        <div className="w-full fixed z-[100000]">
          <Header />
          <Navbar />
          <ToastContainer />
        </div>
        <div className="w-full h-full">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/collection" element={<Collection />} />
            <Route
              exact
              path="/product/:productId"
              element={<ProductDetail />}
            />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/checkout" element={<Checkout />} />
            <Route exact path="/dashboard" element={<Dashboard />}>
              <Route index element={<Overview />} />
              <Route exact path="add-category" element={<AddCategory />} />
              <Route exact path="add-product" element={<AddProducts />} />
              <Route exact path="add-admin" element={<AddAdmin />} />
              <Route exact path="orders" element={<Order />} />
              <Route exact path="messages" element={<Message />} />
            </Route>
            <Route exact path="/account" element={<LoginSignup />}>
              <Route index element={<LoginSignupIndex />} />
              <Route path="register" element={<Signup />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
