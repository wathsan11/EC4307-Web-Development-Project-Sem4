import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadPainting = () => {
  const [formData, setFormData] = useState({
    artName: "",
    price: "",
    status: "",
    artistId: "",
    artUrl: ""
  });

  const [artistName, setArtistName] = useState(""); // For displaying logged artist's name
  const [errorArtists, setErrorArtists] = useState(null);

  useEffect(() => {
    // Get logged artist from localStorage
    const loggedArtist = localStorage.getItem("loggedArtist");
    if (loggedArtist) {
      const artist = JSON.parse(loggedArtist);
      setFormData(prev => ({ ...prev, artistId: artist.id || artist.artistId || artist.ArtistId || artist.ArtistID }));
      setArtistName(artist.name || artist.artistName || "Unknown Artist");
    } else {
      setErrorArtists("No logged-in artist found. Please login first.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.artName ||
      !formData.price ||
      !formData.status ||
      !formData.artistId ||
      !formData.artUrl
    ) {
      alert("Please fill all fields.");
      return;
    }

    axios
      .post("http://localhost:8080/api/paintings/upload", null, {
        params: {
          artistId: formData.artistId,
          artName: formData.artName,
          price: formData.price,
          status: formData.status,
          artUrl: formData.artUrl
        }
      })
      .then(() => {
        alert("Painting uploaded successfully!");
        setFormData({
          artName: "",
          price: "",
          status: "",
          artistId: formData.artistId, // keep the same artistId after upload
          artUrl: ""
        });
      })
      .catch((err) => {
        console.error("Upload failed:", err);
        alert("Upload failed!");
      });
  };

  if (errorArtists) {
    return <p style={{ color: "red" }}>{errorArtists}</p>;
  }

  return (
    <div>
      <h2>Upload Painting</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="artName"
          placeholder="Art Name"
          value={formData.artName}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="">Select Status</option>
          <option value="AVAILABLE">Available</option>
          <option value="SOLD">Sold</option>
          <option value="RESERVED">Reserved</option>
        </select>

        {/* Show logged artist name */}
        <div style={{ marginBottom: "15px" }}>
          <label>Artist: </label>
          <strong>{artistName}</strong>
        </div>

        <input
          type="text"
          name="artUrl"
          placeholder="Image URL"
          value={formData.artUrl}
          onChange={handleChange}
          required
        />

        {formData.artUrl && (
          <div style={{ margin: "10px 0" }}>
            <img
              alt="Preview"
              src={formData.artUrl}
              style={{ maxWidth: "200px" }}
            />
          </div>
        )}

        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadPainting;
