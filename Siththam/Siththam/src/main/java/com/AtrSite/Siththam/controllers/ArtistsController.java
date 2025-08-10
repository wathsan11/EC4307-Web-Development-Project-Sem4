package com.AtrSite.Siththam.controllers;

import com.AtrSite.Siththam.models.Artist;
import com.AtrSite.Siththam.repositories.ArtistRepository;
import org.hibernate.annotations.NotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/artists")
public class ArtistsController {

    @Autowired
    private ArtistRepository artistRepository;

    @GetMapping("/getAllArtists")
    public ResponseEntity<List<Artist>> getAllArtists()
    {
        return ResponseEntity.ok(artistRepository.findAll());
    }

    @PostMapping("/addArtist")
    public ResponseEntity<Artist> addArtist(@RequestBody Artist addArtist)
    {
        Artist saved = artistRepository.save(addArtist);
        return new ResponseEntity<>(saved,HttpStatus.CREATED);
    }

    //Get Artist by Id

    @GetMapping("/findArtist/{id}")
    public ResponseEntity<?> findArtist(@PathVariable int id)
    {
        if(id<0)
        {
            return ResponseEntity.badRequest().body("ID can not be less than zero");
        }

        Optional<Artist> artist = artistRepository.findById(id);

        if(artist.isPresent())
        {
            Artist foundArtist = artist.get();
            ResponseEntity<Artist> response = ResponseEntity.ok((foundArtist));
            return response;
        }
        else
        {
            ResponseEntity<String> notFoundArtist = ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Artist not found");
            return notFoundArtist;
        }
    }

    //Update Artist by Id
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateArtist(@PathVariable int id,@RequestBody Artist updateData)
    {
        Optional<Artist> optionalArtist = artistRepository.findById(id);

        if(optionalArtist.isPresent())
        {
            Artist artist = optionalArtist.get();
            artist.setName(updateData.getName());
            artist.setEmail(updateData.getEmail());
            artist.setPassword(updateData.getPassword());
            artistRepository.save(artist);
            return  ResponseEntity.ok("Artist updated successfully");
        }
        else
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Artist not found");
        }
    }

    @DeleteMapping("/deleteArtist/{id}")
    public ResponseEntity<?> deleteArtist(@PathVariable int id)
    {
        if(!artistRepository.existsById(id))
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Artist not found");
        }
        artistRepository.deleteById(id);
        return ResponseEntity.ok("Artist removed successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Artist loginData) {
        // Find artist by email (assuming you add findByEmail method in ArtistRepository)
        Optional<Artist> artistOpt = artistRepository.findByEmail(loginData.getEmail());

        if (artistOpt.isPresent()) {
            Artist artist = artistOpt.get();
            if (artist.getPassword().equals(loginData.getPassword())) {
                return ResponseEntity.ok(artist); // Successful login, return artist data
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Artist not found");
        }
    }


}
