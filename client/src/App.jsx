import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../src/components/navbar/Navbar";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Cart from "./screens/cart/Cart";
import Checkout from "./screens/checkout/Checkout";
import Collection from "./screens/collection/Collection";
import Home from "./screens/home/Home";
import LoginSignup from "./screens/loginSignup/LoginSignup";
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
        <div className="w-full"></div>
        <div className="w-full pt-[112px]">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/collection" element={<Collection />} />
            <Route
              exact
              path="/product/:productId"
              element={<ProductDetail />}
            />
            <Route exact path="/login" element={<LoginSignup />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/checkout" element={<Checkout />} />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
