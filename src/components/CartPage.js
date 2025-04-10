// src/components/CartPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

export default function CartPage() {
  const [cart, setCart] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || {};
    setCart(storedCart);
  }, []);

  const updateQty = (id, delta) => {
    const updated = { ...cart };
    if (updated[id].qty + delta <= 0) {
      delete updated[id];
    } else {
      updated[id].qty += delta;
    }
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = Object.values(cart).reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {Object.keys(cart).length === 0 ? (
        <p>
          Cart is empty. Go to{" "}
          <span className="link" onClick={() => navigate("/products")}>
            Products
          </span>
          .
        </p>
      ) : (
        <>
          {Object.values(cart).map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div>
                <h4>{item.title}</h4>
                <p>₹ {item.price}</p>
                <div className="qty-buttons">
                  <button onClick={() => updateQty(item.id, -1)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)}>+</button>
                </div>
              </div>
            </div>
          ))}
          <h3>Total: ₹ {total.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
}
