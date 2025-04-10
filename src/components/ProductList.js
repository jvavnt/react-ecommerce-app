// src/components/ProductList.js
import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : {};
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const updatedCart = {
        ...prev,
        [product.id]: prev[product.id]
          ? { ...prev[product.id], qty: prev[product.id].qty + 1 }
          : { ...product, qty: 1 },
      };
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const changeQty = (id, delta) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[id].qty + delta <= 0) {
        delete updated[id];
      } else {
        updated[id].qty += delta;
      }
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="product-page">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 20px",
        }}
      >
        <h3>
          Welcome, {JSON.parse(localStorage.getItem("user"))?.name || "User"}
        </h3>

        <div style={{ display: "flex", gap: "30px" }}>
          <h3
            onClick={() => navigate("/cart")}
            style={{ cursor: "pointer", color: "blue" }}
          >
            🛒 View Cart
          </h3>

          <h3
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("cart");
              navigate("/login");
            }}
            style={{ cursor: "pointer", color: "red" }}
          >
            🔓 Logout
          </h3>
        </div>
      </div>

      <h2>Product View</h2>
      <div className="products-container">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h4>{product.title}</h4>
            <p>₹ {product.price}</p>

            {cart[product.id] ? (
              <div className="qty-control">
                <button onClick={() => changeQty(product.id, -1)}>-</button>
                <span>{cart[product.id].qty}</span>
                <button onClick={() => changeQty(product.id, 1)}>+</button>
              </div>
            ) : (
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
