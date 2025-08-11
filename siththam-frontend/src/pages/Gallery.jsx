import React, { useEffect, useState } from "react";
import PaintingCard from "../components/PaintingCard"; 
import axios from "axios";

const Gallery = () => {
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/paintings/getAll")
      .then((res) => {
        setPaintings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch paintings");
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) return <p>Loading paintings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ maxWidth: 1100, margin: "10px auto", padding: "0 10px" }}>
      <h2 style={{ textAlign: "center", marginBottom: 30, color: "#333" }}>Gallery</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {paintings.map((painting) => (
          <PaintingCard key={painting.artId} painting={painting} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
