import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const linkStyle = (path) => ({
    color: location.pathname === path ? "#61dafb" : "#ddd",
    textDecoration: "none",
    fontWeight: "600",
    marginRight: 25,
    padding: "8px 12px",
    borderRadius: 6,
    transition: "background-color 0.3s, color 0.3s",
  });

  return (
    <nav style={navStyle}>
      <div style={leftLinksStyle}>
        <StyledLink to="/" style={linkStyle("/")}>Home</StyledLink>
        <StyledLink to="/gallery" style={linkStyle("/gallery")}>Gallery</StyledLink>
        <StyledLink to="/about" style={linkStyle("/about")}>About</StyledLink>
      </div>
      <div style={rightLinkStyle}>
        <StyledLink to="/login" style={linkStyle("/login")}>Login</StyledLink>
      </div>
    </nav>
  );
}

function StyledLink({ to, style, children }) {
  const [hover, setHover] = React.useState(false);

  return (
    <Link
      to={to}
      style={{ 
        ...style, 
        ...(hover ? { backgroundColor: "#61dafb", color: "#282c34" } : {}) 
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </Link>
  );
}

const navStyle = {
  padding: "14px 30px",
  backgroundColor: "#20232a",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const leftLinksStyle = {
  display: "flex",
  alignItems: "center",
};

const rightLinkStyle = {
  display: "flex",
  alignItems: "center",
};
