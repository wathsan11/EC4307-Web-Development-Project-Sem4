import React, { useState } from "react";
import axios from "axios";

const ArtistRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/artists/addArtist", formData)
      .then((res) => {
        alert("Artist registered successfully!");
        setFormData({ name: "", email: "", password: "" });
      })
      .catch((err) => {
        console.error("Registration failed:", err);
        alert("Registration failed!");
      });
  };

  return (
    <div>
      <h2>Register as Artist</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Artist Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Artist Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Artist Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default ArtistRegister;
