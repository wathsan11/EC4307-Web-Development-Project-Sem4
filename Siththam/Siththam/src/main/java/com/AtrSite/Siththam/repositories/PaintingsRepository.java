package com.AtrSite.Siththam.repositories;

import java.util.List;

import com.AtrSite.Siththam.models.Painting;
import org.springframework.data.jpa.repository.JpaRepository;
import com.AtrSite.Siththam.models.Artist;


public interface PaintingsRepository extends JpaRepository<Painting, Integer> {
    List<Painting> findAllByArtist(Artist artist);
}
