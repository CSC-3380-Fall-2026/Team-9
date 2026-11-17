
package com._team9.backend.service;

import com._team9.backend.entity.Choice;
import com._team9.backend.entity.Scenario;
import com._team9.backend.entity.ScenarioAttempt;
import com._team9.backend.entity.User;
import com._team9.backend.repository.ScenarioAttemptRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Saves completed CyberSense scenario attempts.
 *
 * Each attempt records the user, scenario,
 * selected answer, and whether the answer was safe.
 *
 * Thy user MUST be veerified to  come from verified authentication
 * when this service is connected to the API.
 */
@Service
public class ScenarioAttemptService {

    private final ScenarioAttemptRepository attemptRepository;

    public ScenarioAttemptService(
        ScenarioAttemptRepository attemptRepository
    ) {
        this.attemptRepository = attemptRepository;
    }

    @Transactional
    public ScenarioAttempt saveAttempt(
        User user,
        Scenario scenario,
        Choice selectedChoice
    ) {
        ScenarioAttempt attempt = new ScenarioAttempt(
            user,
            scenario,
            selectedChoice,
            selectedChoice.isSafe()
        );

        return attemptRepository.save(attempt);
    }
}