// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/Login.js";
import ProductList from "./components/ProductList";
import Signup from "./components/Signup.js";
import CartPage from "./components/CartPage.js";
import ResetPassword from "./components/ResetPassword.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/products"
          element={
            localStorage.getItem("user") ? (
              <ProductList />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/reset" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
