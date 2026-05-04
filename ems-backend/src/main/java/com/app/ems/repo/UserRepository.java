package com.app.ems.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.ems.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	    //finder method to find user by email
    	Optional<User> findByEmail(String email);
}
