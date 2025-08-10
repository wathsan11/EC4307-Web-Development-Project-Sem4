package com.AtrSite.Siththam.repositories;

import com.AtrSite.Siththam.models.Painting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaintingsRepository extends JpaRepository<Painting, Integer> {
}
