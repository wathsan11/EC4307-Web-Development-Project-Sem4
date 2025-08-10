import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const linkStyle = (path) => ({
    color: location.pathname === path ? "#61dafb" : "white",
    textDecoration: "none",
    fontWeight: "bold",
    marginRight: 15,
  });

  return (
    <nav style={navStyle}>
      <div style={leftLinksStyle}>
        <Link to="/" style={linkStyle("/")}>Home</Link>
        <Link to="/gallery" style={linkStyle("/gallery")}>Gallery</Link>
        <Link to="/about" style={linkStyle("/about")}>About</Link>
      </div>
      <div style={rightLinkStyle}>
        <Link to="/login" style={linkStyle("/login")}>Login</Link>
      </div>
    </nav>
  );
}

const navStyle = {
  padding: "10px 20px",
  backgroundColor: "#282c34",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",  // push left and right sections apart
};

const leftLinksStyle = {
  display: "flex",
  alignItems: "center",
};

const rightLinkStyle = {
  display: "flex",
  alignItems: "center",
};
