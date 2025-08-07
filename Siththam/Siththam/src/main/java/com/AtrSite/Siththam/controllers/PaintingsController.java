package com.AtrSite.Siththam.controllers;

import com.AtrSite.Siththam.models.Artist;
import com.AtrSite.Siththam.models.Painting;
import com.AtrSite.Siththam.repositories.ArtistRepository;
import com.AtrSite.Siththam.repositories.PaintingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/paintings")
public class PaintingsController {

    @Autowired
    private PaintingsRepository paintingRepository;

    @Autowired
    private ArtistRepository artistRepository;

    // 1. Upload new painting (Artist must exist)
    @PostMapping("/upload")
    public ResponseEntity<?> uploadPainting(@RequestBody Painting painting) {
        if (painting.getArtist() == null || painting.getArtist().getId() == 0) {
            return ResponseEntity.badRequest().body("Artist ID is required");
        }

        Optional<Artist> artistOpt = artistRepository.findById(painting.getArtist().getId());
        if (artistOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Artist not found");
        }

        painting.setArtist(artistOpt.get());
        Painting saved = paintingRepository.save(painting);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    // 2. Get all paintings
    @GetMapping("/getAll")
    public ResponseEntity<List<Painting>> getAllPaintings() {
        return ResponseEntity.ok(paintingRepository.findAll());
    }

    // 3. Get painting by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getPaintingById(@PathVariable int id) {
        Optional<Painting> painting = paintingRepository.findById(id);
        if (painting.isPresent()) {
            return ResponseEntity.ok(painting.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Painting not found");
        }
    }

    // 4. Update painting
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updatePainting(@PathVariable int id, @RequestBody Painting updateData) {
        Optional<Painting> optionalPainting = paintingRepository.findById(id);

        if (optionalPainting.isPresent()) {
            Painting painting = optionalPainting.get();
            painting.setArtName(updateData.getArtName());
            painting.setArtImage(updateData.getArtImage());
            painting.setPrice(updateData.getPrice());
            painting.setStatus(updateData.getStatus());

            paintingRepository.save(painting);
            return ResponseEntity.ok("Painting updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Painting not found");
        }
    }

    // 5. Delete painting
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePainting(@PathVariable int id) {
        if (!paintingRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Painting not found");
        }

        paintingRepository.deleteById(id);
        return ResponseEntity.ok("Painting deleted successfully");
    }
}

