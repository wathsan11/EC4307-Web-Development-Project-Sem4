package com.AtrSite.Siththam.dto;

public class PaintingResponseDTO {
    private int artId;
    private String artName;
    private String artUrl; // Or Base64 string if storing image in DB
    private double price;
    private String status;
    private int artistId;

    // Constructors
    public PaintingResponseDTO() {}

    public PaintingResponseDTO(int artId, String artName, String artUrl, double price, String status, int artistId) {
        this.artId = artId;
        this.artName = artName;
        this.artUrl = artUrl;
        this.price = price;
        this.status = status;
        this.artistId = artistId;
    }

    // Getters & Setters
    public int getArtId() { return artId; }
    public void setArtId(int artId) { this.artId = artId; }

    public String getArtName() { return artName; }
    public void setArtName(String artName) { this.artName = artName; }

    public String getArtUrl() { return artUrl; }
    public void setArtUrl(String artUrl) { this.artUrl = artUrl; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public int getArtistId() { return artistId; }
    public void setArtistId(int artistId) { this.artistId = artistId; }
}
