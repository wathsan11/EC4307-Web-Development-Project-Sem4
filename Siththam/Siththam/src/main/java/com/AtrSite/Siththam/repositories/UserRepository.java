package com.AtrSite.Siththam.repositories;

import com.AtrSite.Siththam.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> {

}
