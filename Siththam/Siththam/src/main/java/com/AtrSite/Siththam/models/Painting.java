package com.AtrSite.Siththam.models;

import jakarta.persistence.*;

@Entity
@Table(name = "PAINTINGS")
public class Painting {

    public enum Status {
        AVAILABLE,
        SOLD,
        RESERVED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ArtId")
    private int artId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ArtistId", referencedColumnName = "Id", nullable = true)
    private Artist artist;

    @Column(name = "ArtName", nullable = false)
    private String artName;

    @Column(name = "ArtUrl", length = 500)
    private String artUrl;

    @Column(name = "Price", nullable = false)
    private double price;

    @Enumerated(EnumType.STRING)
    @Column(name = "Status")
    private Status status = Status.AVAILABLE;

    public Painting() {}

    // Getters and setters
    public int getArtId() { return artId; }
    public void setArtId(int artId) { this.artId = artId; }

    public Artist getArtist() { return artist; }
    public void setArtist(Artist artist) { this.artist = artist; }

    public String getArtName() { return artName; }
    public void setArtName(String artName) { this.artName = artName; }

    public String getArtUrl() { return artUrl; }
    public void setArtUrl(String artUrl) { this.artUrl = artUrl; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
}
