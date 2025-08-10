import React from "react";

export default function PaintingCard({ painting }) {
  const imageSrc = painting.artUrl
    ? painting.artUrl
    : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div style={styles.card}>
      <img src={imageSrc} alt={painting.artName} style={styles.image} />
      <div style={styles.content}>
        <h3>{painting.artName}</h3>
        <p><strong>Artist:</strong> {painting.artistName || "Unknown"}</p>
        <p><strong>Price:</strong> ${painting.price?.toFixed(2) ?? "N/A"}</p>
        <p><strong>Status:</strong> {painting.status}</p>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: 8,
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    width: 250,
    margin: 10,
  },
  image: {
    width: "100%",
    height: 180,
    objectFit: "cover",
  },
  content: {
    padding: 15,
  },
};
