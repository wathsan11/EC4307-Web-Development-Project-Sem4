import React, { useState, useEffect } from "react";
import axios from "axios";
import PaintingCardSp from "../components/PaintingCardSp";
import { useNavigate } from "react-router-dom";

const UploadPainting = () => {
  const [formData, setFormData] = useState({
    artName: "",
    price: "",
    status: "",
    artistId: "",
    artUrl: "",
  });

  const [paintings, setPaintings] = useState([]);
  const [artistName, setArtistName] = useState("");
  const [errorArtists, setErrorArtists] = useState(null);

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [paintingToUpdate, setPaintingToUpdate] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    artName: "",
    price: "",
    status: "",
    artUrl: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loggedArtist = localStorage.getItem("loggedArtist");
    if (loggedArtist) {
      const artist = JSON.parse(loggedArtist);
      const id = artist.id || artist.artistId || artist.ArtistId || artist.ArtistID;
      setFormData((prev) => ({ ...prev, artistId: id }));
      setArtistName(artist.name || artist.artistName || "Unknown Artist");
      fetchPaintings(id);
    } else {
      setErrorArtists("No logged-in artist found. Please login first.");
    }
  }, []);

  const fetchPaintings = (artistId) => {
    axios
      .get(`http://localhost:8080/api/paintings/byArtist/${artistId}`)
      .then((res) => setPaintings(res.data))
      .catch((err) => {
        console.error("Failed to fetch paintings:", err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.artName || !formData.price || !formData.status || !formData.artistId || !formData.artUrl) {
      alert("Please fill all fields.");
      return;
    }
    axios
      .post("http://localhost:8080/api/paintings/upload", null, {
        params: { ...formData },
      })
      .then(() => {
        alert("Painting uploaded successfully!");
        setFormData((prev) => ({ ...prev, artName: "", price: "", status: "", artUrl: "" }));
        fetchPaintings(formData.artistId);
      })
      .catch((err) => {
        console.error("Upload failed:", err);
        alert("Upload failed!");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedArtist");
    navigate("/");
  };

  const openUpdateModal = (painting) => {
    setPaintingToUpdate(painting);
    setUpdateForm({
      artName: painting.artName,
      price: painting.price,
      status: painting.status,
      artUrl: painting.artUrl,
    });
    setUpdateModalOpen(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/api/paintings/${paintingToUpdate.artId}`, null, {
        params: {
          ...updateForm,
          artistId: formData.artistId,
        },
      })
      .then(() => {
        alert("Painting updated successfully");
        setUpdateModalOpen(false);
        setPaintingToUpdate(null);
        fetchPaintings(formData.artistId);
      })
      .catch((err) => {
        console.error("Update failed:", err);
        alert("Update failed");
      });
  };

  const handleDelete = (artId) => {
    if (window.confirm("Are you sure you want to delete this painting?")) {
      axios
        .delete(`http://localhost:8080/api/paintings/${artId}`)
        .then(() => {
          alert("Painting deleted");
          fetchPaintings(formData.artistId);
        })
        .catch((err) => {
          console.error("Delete failed:", err);
          alert("Delete failed");
        });
    }
  };

  if (errorArtists) {
    return <p style={{ color: "red", textAlign: "center", marginTop: 30 }}>{errorArtists}</p>;
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <h2 style={{ color: "#333" }}>Post a Painting</h2>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: "600",
            fontSize: 14,
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
          title="Logout"
        >
          Logout
        </button>
      </header>

      {/* Upload Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
          marginBottom: 40,
          backgroundColor: "#f9f9f9",
          padding: 20,
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <input
          type="text"
          name="artName"
          placeholder="Art Name"
          value={formData.artName}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          style={inputStyle}
          required
          min="0"
          step="0.01"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          style={inputStyle}
          required
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="AVAILABLE">Available</option>
          <option value="SOLD">Sold</option>
          <option value="RESERVED">Reserved</option>
        </select>

        <div style={{ fontSize: 16 }}>
          <label style={{ fontWeight: "600" }}>Artist: </label>
          <span style={{ fontWeight: "700", color: "#555" }}>{artistName}</span>
        </div>

        <input
          type="text"
          name="artUrl"
          placeholder="Image URL"
          value={formData.artUrl}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        {formData.artUrl && (
          <div
            style={{
              marginTop: 15,
              textAlign: "center",
              borderRadius: 6,
              overflow: "hidden",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <img
              alt="Preview"
              src={
                formData.artUrl.startsWith("http") || formData.artUrl.startsWith("data:")
                  ? formData.artUrl
                  : `data:image/jpeg;base64,${formData.artUrl}`
              }
              style={{ maxWidth: "100%", maxHeight: 250, objectFit: "contain" }}
            />
          </div>
        )}

        <button
          type="submit"
          style={{
            backgroundColor: "#27ae60",
            color: "white",
            border: "none",
            padding: "12px 20px",
            fontWeight: "700",
            fontSize: 16,
            borderRadius: 6,
            cursor: "pointer",
            marginTop: 10,
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1e8449")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#27ae60")}
        >
          Upload
        </button>
      </form>

      {/* Paintings List */}
      <h3 style={{ color: "#444", marginBottom: 15 }}>Your Paintings</h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          justifyContent: paintings.length === 0 ? "center" : "flex-start",
          minHeight: 150,
          paddingBottom: 30,
          borderBottom: "1px solid #ddd",
          marginBottom: 30,
        }}
      >
        {paintings.length === 0 ? (
          <p style={{ fontStyle: "italic", color: "#999" }}>You have no paintings yet.</p>
        ) : (
          paintings.map((painting) => (
            <PaintingCardSp
              key={painting.artId}
              painting={painting}
              onDelete={handleDelete}
              onUpdate={openUpdateModal}
            />
          ))
        )}
      </div>

      {/* Update Modal */}
      {updateModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h3 style={{ marginBottom: 20, color: "#333" }}>Update Painting</h3>
            <form onSubmit={handleUpdateSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
              <input
                type="text"
                name="artName"
                placeholder="Art Name"
                value={updateForm.artName}
                onChange={handleUpdateChange}
                style={inputStyle}
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={updateForm.price}
                onChange={handleUpdateChange}
                style={inputStyle}
                required
                min="0"
                step="0.01"
              />
              <select
                name="status"
                value={updateForm.status}
                onChange={handleUpdateChange}
                style={inputStyle}
                required
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="AVAILABLE">Available</option>
                <option value="SOLD">Sold</option>
                <option value="RESERVED">Reserved</option>
              </select>
              <input
                type="text"
                name="artUrl"
                placeholder="Image URL or Base64"
                value={updateForm.artUrl}
                onChange={handleUpdateChange}
                style={inputStyle}
                required
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  type="button"
                  onClick={() => setUpdateModalOpen(false)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: 6,
                    border: "1px solid #999",
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#27ae60",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontWeight: "700",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1e8449")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#27ae60")}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: 16,
  outline: "none",
  transition: "border-color 0.2s",
};

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: "white",
  padding: 30,
  borderRadius: 8,
  width: 400,
  boxShadow: "0 2px 15px rgba(0,0,0,0.25)",
};

export default UploadPainting;
