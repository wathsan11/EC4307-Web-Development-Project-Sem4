import React from "react";

const PaintingCardSp = ({ painting, onDelete, onUpdate }) => {
  
  const imageSrc = painting.artUrl
    ? painting.artUrl.startsWith("http") || painting.artUrl.startsWith("data:")
      ? painting.artUrl
      : `data:image/jpeg;base64,${painting.artUrl}`
    : "https://via.placeholder.com/250x200?text=No+Image";

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        width: "23%",        
        minWidth: "220px",    
        margin: "10px 1%",    
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <img
        src={imageSrc}
        alt={painting.artName}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <div style={{ padding: "10px", flexGrow: 1 }}>
        <h3>{painting.artName}</h3>
        <p>By {painting.artistName}</p>
        <p style={{ fontWeight: "bold" }}>${painting.price?.toFixed(2)}</p>
        <p>Status: {painting.status}</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "10px",
          borderTop: "1px solid #eee",
        }}
      >
        <button
          style={{
            backgroundColor: "#ff4d4f",
            color: "white",
            border: "none",
            padding: "6px 12px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
          onClick={() => onDelete(painting.artId)}
        >
          Delete
        </button>
        <button
          style={{
            backgroundColor: "#1890ff",
            color: "white",
            border: "none",
            padding: "6px 12px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
          onClick={() => onUpdate(painting)}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default PaintingCardSp;
