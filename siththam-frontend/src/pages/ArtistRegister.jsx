import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const ArtistRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    

    axios
      .post("http://localhost:8080/artists/addArtist", formData)
      .then(() => {
        alert("Artist registered successfully!");
        setFormData({ name: "", email: "", password: "" });
      })
      .catch((err) => {
        console.error("Registration failed:", err);
        alert("Registration failed!");
      });
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "60px auto",
        padding: 20,
        borderRadius: 8,
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 30, color: "#333" }}>
        Create Your Artist Account
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 15 }}
      >
        <input
          type="text"
          name="name"
          placeholder="Artist Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <button type="submit" style={submitBtnStyle}>
          Register
        </button>
      </form>
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: 20,
          width: "100%",
          padding: "10px",
          border: "none",
          borderRadius: 6,
          backgroundColor: "#555",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
      >
        Back to Home
      </button>
    </div>
  );
};

const inputStyle = {
  padding: "12px 15px",
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: "1rem",
  outline: "none",
  transition: "border-color 0.3s",
};

const submitBtnStyle = {
  backgroundColor: "#4caf50",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "1rem",
};

export default ArtistRegister;
