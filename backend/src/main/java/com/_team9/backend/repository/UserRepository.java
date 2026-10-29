package com._team9.backend.repository;

import com._team9.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Database for User objects.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    // Returns an empty Optional if no user has that email.
    Optional<User> findByEmail(String email);
}
