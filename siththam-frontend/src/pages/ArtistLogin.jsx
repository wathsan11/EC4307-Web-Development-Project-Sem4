import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ArtistLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8080/artists/login",
        formData
      );
      const artist = response.data;

      setMessage(`Welcome back, ${artist.name}!`);

      localStorage.setItem("loggedArtist", JSON.stringify(artist));

      navigate("/upload");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data || "Login failed");
      } else {
        setMessage("Server error");
      }
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>🎨 Artist Login</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
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
            Login
          </button>
        </form>

        {message && <p style={messageStyle}>{message}</p>}

        <button onClick={handleRegisterRedirect} style={linkBtnStyle}>
          Create an Account
        </button>

        <button
          onClick={() => navigate("/")}
          style={{ ...submitBtnStyle, backgroundColor: "#555", marginTop: 15 }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

const containerStyle = {
  maxWidth: 400,
  margin: "60px auto",
  padding: 20,
  borderRadius: 8,
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  backgroundColor: "#fff",
};

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: 30,
  color: "#333",
};

const formStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 15,
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

const messageStyle = {
  marginTop: 15,
  textAlign: "center",
  color: "#27ae60",
  fontWeight: "bold",
};

const linkBtnStyle = {
  background: "none",
  border: "none",
  color: "#3498db",
  textDecoration: "underline",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "bold",
  marginTop: 20,
};

export default ArtistLogin;
