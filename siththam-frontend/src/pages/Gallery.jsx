import React, { useEffect, useState } from "react";
import PaintingCard from "../components/PaintingCard"; // make sure path is correct
import axios from "axios";

const Gallery = () => {
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/paintings/getAll") // your backend URL
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
    <div>
      <h2>Gallery</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {paintings.map((painting) => (
          <PaintingCard key={painting.artId} painting={painting} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
