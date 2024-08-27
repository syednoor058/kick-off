import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import ProductContextProvider from "./context/ProductContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProductContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ProductContextProvider>
  </StrictMode>
);
