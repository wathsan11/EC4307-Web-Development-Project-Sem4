import React from "react";

export default function About() {
  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#333" }}>
      
      <h1 style={{ textAlign: "center", marginBottom: 30, fontSize: "2.5rem" }}>About Us</h1>
      
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: "1.8rem", color: "#4caf50", marginBottom: 15 }}>Our Mission</h2>
        <p style={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
          Our mission is to create a vibrant community where artists can showcase their talents and art lovers can discover and appreciate beautiful, unique artworks. We believe art connects people and inspires creativity, and we strive to make art accessible to everyone.
        </p>
      </section>
      
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: "1.8rem", color: "#4caf50", marginBottom: 15 }}>Our Team</h2>
        <p style={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
          We are a passionate group of art enthusiasts, developers, and curators dedicated to supporting local artists and fostering artistic expression. Our team works tirelessly to ensure a smooth experience for both artists and visitors.
        </p>
      </section>
      
      <section>
        <h2 style={{ fontSize: "1.8rem", color: "#4caf50", marginBottom: 15 }}>Contact Us</h2>
        <p style={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
          Have questions or want to collaborate? Reach out to us!
        </p>
        <ul style={{ listStyle: "none", paddingLeft: 0, fontSize: "1.1rem" }}>
          <li><strong>Email:</strong> contact@artgallery.com</li>
          <li><strong>Phone:</strong> +1 (555) 123-4567</li>
          <li><strong>Address:</strong> 123 Art Street, Creativity City, 45678</li>
        </ul>
      </section>
      
    </div>
  );
}
