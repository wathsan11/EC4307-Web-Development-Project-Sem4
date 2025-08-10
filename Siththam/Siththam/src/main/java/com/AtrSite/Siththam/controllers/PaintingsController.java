package com.AtrSite.Siththam.controllers;

import com.AtrSite.Siththam.models.Artist;
import com.AtrSite.Siththam.models.Painting;
import com.AtrSite.Siththam.repositories.ArtistRepository;
import com.AtrSite.Siththam.repositories.PaintingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.AtrSite.Siththam.dto.PaintingDTO;
import java.util.List;


import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/paintings")
public class PaintingsController {

    @Autowired
    private PaintingsRepository paintingRepository;

    @Autowired
    private ArtistRepository artistRepository;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadPainting(
            @RequestParam int artistId,
            @RequestParam String artName,
            @RequestParam double price,
            @RequestParam(required = false) String status,
            @RequestParam String artUrl
    ) {
        if (artName == null || artName.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("ArtName is required");
        }
        if (artUrl == null || artUrl.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("ArtUrl is required");
        }

        Optional<Artist> artistOpt = artistRepository.findById(artistId);
        if (artistOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Artist not found");
        }

        Painting.Status paintingStatus = Painting.Status.AVAILABLE;
        if (status != null && !status.trim().isEmpty()) {
            try {
                paintingStatus = Painting.Status.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body("Invalid status value");
            }
        }

        Painting painting = new Painting();
        painting.setArtist(artistOpt.get());
        painting.setArtName(artName.trim());
        painting.setPrice(price);
        painting.setStatus(paintingStatus);
        painting.setArtUrl(artUrl.trim());

        paintingRepository.save(painting);
        return ResponseEntity.status(HttpStatus.CREATED).body("Painting uploaded successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPainting(@PathVariable int id) {
        Optional<Painting> painting = paintingRepository.findById(id);
        return painting.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Painting not found"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePainting(@PathVariable int id,
                                            @RequestParam(required = false) String artName,
                                            @RequestParam(required = false) Double price,
                                            @RequestParam(required = false) String status,
                                            @RequestParam(required = false) String artUrl,
                                            @RequestParam(required = false) Integer artistId) {

        Optional<Painting> paintingOpt = paintingRepository.findById(id);
        if (paintingOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Painting not found");
        }
        Painting painting = paintingOpt.get();

        if (artName != null) painting.setArtName(artName);
        if (price != null) painting.setPrice(price);
        if (status != null) {
            try {
                painting.setStatus(Painting.Status.valueOf(status.toUpperCase()));
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body("Invalid status value");
            }
        }
        if (artUrl != null) painting.setArtUrl(artUrl);
        if (artistId != null) {
            Optional<Artist> artistOpt = artistRepository.findById(artistId);
            if (artistOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Artist not found");
            }
            painting.setArtist(artistOpt.get());
        }

        paintingRepository.save(painting);
        return ResponseEntity.ok("Painting updated successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePainting(@PathVariable int id) {
        if (!paintingRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Painting not found");
        }
        paintingRepository.deleteById(id);
        return ResponseEntity.ok("Painting deleted successfully");
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllPaintings() {
        List<PaintingDTO> dtos = paintingRepository.findAll()
                .stream()
                .map(p -> {
                    PaintingDTO dto = new PaintingDTO();
                    dto.setArtId(p.getArtId());
                    dto.setArtName(p.getArtName());
                    dto.setArtistName(p.getArtist().getName());
                    dto.setArtUrl(p.getArtUrl());
                    dto.setPrice(p.getPrice());
                    dto.setStatus(p.getStatus());
                    return dto;
                })
                .toList();

        return ResponseEntity.ok(dtos);
    }


}
