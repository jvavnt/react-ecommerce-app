// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login.js";
// import ProductList from "./components/ProductList";
import Resetpassword from "./components/Resetpassword";
import Signup from "./components/Signup.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/products" element={<ProductList />} /> */}
        <Route path="/reset" element={<Resetpassword />} />
      </Routes>
    </Router>
  );
}

export default App;
