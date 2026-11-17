

package com._team9.backend.controller;

import com._team9.backend.entity.User;
import com._team9.backend.repository.UserRepository;
import com._team9.backend.service.ScenarioAnalyticsService;

import java.security.Principal;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

/**
 * Provides progress and human-factor analytics
 * for the currently authenticated user.
 */
@RestController
@RequestMapping("/api/analytics")
public class ScenarioAnalyticsController {

    private final ScenarioAnalyticsService analyticsService;
    private final UserRepository userRepository;

    public ScenarioAnalyticsController(
            ScenarioAnalyticsService analyticsService,
            UserRepository userRepository) {

        this.analyticsService = analyticsService;
        this.userRepository = userRepository;
    }

    // Get the user from verified authentication, not a browser-supplied ID.
    private Long getCurrentUserId(Principal principal) {

        if (principal == null) {
            throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED, "Login required"
            );
        }

        User user = userRepository.findByEmail(principal.getName())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.UNAUTHORIZED, "User not found"
            ));

        return user.getId();
    }

    // Return the user's overall training statistics.
    @GetMapping("/progress")
    public ScenarioAnalyticsService.ProgressSummary getProgress(
            Principal principal) {

        return analyticsService.getProgressSummary(
            getCurrentUserId(principal)
        );
    }

    // Return susceptibility percentages by human factor.
    @GetMapping("/human-factors")
    public java.util.List<ScenarioAnalyticsService.HumanFactorSummary>
            getHumanFactors(Principal principal) {

        return analyticsService.getHumanFactorSummary(
            getCurrentUserId(principal)
        );
    }
}