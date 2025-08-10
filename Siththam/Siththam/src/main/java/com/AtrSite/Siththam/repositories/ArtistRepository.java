package com.AtrSite.Siththam.repositories;

import com.AtrSite.Siththam.models.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ArtistRepository extends JpaRepository<Artist,Integer> {
    Optional<Artist> findByEmail(String email);
}
