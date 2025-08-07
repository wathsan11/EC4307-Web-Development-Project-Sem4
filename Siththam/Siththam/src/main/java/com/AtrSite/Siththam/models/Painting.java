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
    @JoinColumn(name = "ArtistId",referencedColumnName = "Id",nullable = true)
    private Artist artist;

    @Column(name = "ArtName",nullable = false)
    private String artName;

    @Lob
    @Column(name = "ArtImage")
    private byte[] artImage;

    @Column(name = "Price")
    private double price;

    @Enumerated(EnumType.STRING)
    @Column(name = "Status")
    private Status status = Status.AVAILABLE;

    public Painting(){};

    public Painting(int artId, Artist artist, String artName, byte[] artImage, double price, Status status) {
        this.artId = artId;
        this.artist = artist;
        this.artName = artName;
        this.artImage = artImage;
        this.price = price;
        this.status = status;
    }

    public int getArtId() {
        return artId;
    }

    public void setArtId(int artId) {
        this.artId = artId;
    }

    public Artist getArtist() {
        return artist;
    }

    public void setArtist(Artist artist) {
        this.artist = artist;
    }

    public String getArtName() {
        return artName;
    }

    public void setArtName(String artName) {
        this.artName = artName;
    }

    public byte[] getArtImage() {
        return artImage;
    }

    public void setArtImage(byte[] artImage) {
        this.artImage = artImage;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
