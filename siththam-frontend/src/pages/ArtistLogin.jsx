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

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <h2 style={styles.title}>🎨 Artist Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.buttonRow}>
            <button type="submit" style={styles.loginBtn}>
              Login
            </button>
            <button
              type="button"
              onClick={handleBackHome}
              style={styles.homeBtn}
            >
              Back to Home
            </button>
          </div>
        </form>

        {message && <p style={styles.message}>{message}</p>}

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button
            onClick={handleRegisterRedirect}
            style={styles.linkBtn}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #2c3e50, #3498db)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#2c3e50",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#34495e",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  buttonRow: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  loginBtn: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
  homeBtn: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#95a5a6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
  linkBtn: {
    background: "none",
    border: "none",
    color: "#3498db",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  message: {
    marginTop: "15px",
    textAlign: "center",
    color: "#27ae60",
    fontWeight: "bold",
  },
};

export default ArtistLogin;
