
package com._team9.backend.repository;

import com._team9.backend.entity.ScenarioAttempt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * mmkay this handles database access for completed training attempts.
 *
 *  this will retrieve a user's attempts in order from
 * newest to oldest for progress tracking yayyy UwU
 */
public interface ScenarioAttemptRepository
        extends JpaRepository<ScenarioAttempt, Long> {

    List<ScenarioAttempt> findByUser_IdOrderBySubmittedAtDesc(
        Long userId
    );
}