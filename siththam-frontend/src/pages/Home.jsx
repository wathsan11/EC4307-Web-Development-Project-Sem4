import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/gallery"); 
  };

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: "#f5f5f5",
          borderRadius: 12,
          padding: 40,
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginBottom: 40,
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: 20, color: "#333" }}>
          Welcome to the Art Gallery
        </h1>
        <p style={{ fontSize: "1.25rem", color: "#666", maxWidth: 600, margin: "0 auto" }}>
          Discover beautiful paintings by talented artists from around the world. Explore diverse styles, unique expressions, and find the perfect masterpiece for your collection.
        </p>
      </section>

      {/* Features Section */}
      <section style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
        <FeatureCard
          title="Curated Collections"
          description="Explore handpicked collections showcasing the finest artworks."
          icon="🎨"
        />
        <FeatureCard
          title="Artist Spotlights"
          description="Get to know the inspiring artists behind the masterpieces."
          icon="👩‍🎨"
        />
        <FeatureCard
          title="Curated Exhibitions"
          description="Explore specially curated exhibitions showcasing unique artistic styles."
          icon="🖼️"
        />
        <FeatureCard
          title="Community Events"
          description="Join exhibitions, workshops, and art events near you."
          icon="📅"
        />
      </section>

      {/* Call to Action */}
      <section style={{ marginTop: 50, textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: 15, color: "#333" }}>
          Start Exploring Now
        </h2>
        <p style={{ fontSize: "1rem", color: "#666", marginBottom: 30 }}>
          Browse our gallery or sign up to become an artist and showcase your work.
        </p>
        <button
          style={{
            padding: "12px 30px",
            fontSize: "1rem",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
          onClick={handleExploreClick}
        >
          Explore Gallery
        </button>
      </section>
    </div>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div
      style={{
        flex: "1 1 200px",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
        minWidth: 200,
      }}
    >
      <div style={{ fontSize: 40, marginBottom: 15 }}>{icon}</div>
      <h3 style={{ marginBottom: 10, color: "#222" }}>{title}</h3>
      <p style={{ color: "#555", fontSize: "0.95rem" }}>{description}</p>
    </div>
  );
}
