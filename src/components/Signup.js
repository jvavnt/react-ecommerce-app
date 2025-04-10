// src/components/Signup.js
import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

const countries = {
  India: {
    Haryana: ["Gurugram", "Faridabad"],
    Punjab: ["Amritsar", "Ludhiana"],
  },
  USA: {
    California: ["Los Angeles", "San Diego"],
    Texas: ["Dallas", "Austin"],
  },
};
const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    state: "",
    city: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email.includes("@")) newErrors.email = "Valid email required";
    if (form.password.length < 6)
      newErrors.password = "Password must be 6+ characters";
    if (!form.country) newErrors.country = "Select country";
    if (!form.state) newErrors.state = "Select state";
    if (!form.city) newErrors.city = "Select city";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      localStorage.setItem("user", JSON.stringify(form));
      navigate("/login");
    }
  };

  const states = form.country ? Object.keys(countries[form.country]) : [];
  const cities =
    form.country && form.state ? countries[form.country][form.state] : [];

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <div className="error">{errors.name}</div>

        <input name="email" placeholder="Email" onChange={handleChange} />
        <div className="error">{errors.email}</div>

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <div className="error">{errors.password}</div>

        <select name="country" onChange={handleChange}>
          <option value="">Select Country</option>
          {Object.keys(countries).map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <div className="error">{errors.country}</div>

        <select name="state" onChange={handleChange}>
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <div className="error">{errors.state}</div>

        <select name="city" onChange={handleChange}>
          <option value="">Select City</option>
          {cities.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <div className="error">{errors.city}</div>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
