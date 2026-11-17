
package com._team9.backend.entity;

import jakarta.persistence.*;
import java.time.Instant;

/**
 * umm stores a completed CyberSense training attempt.UwU
 *
 * Each attempt records the user, scenario, selected
 * choice, safety result, and submission time.
 *
 * rn the records will support progress tracking
 * and human-factor analytics.
 */
@Entity
@Table(name = "scenario_attempts")
public class ScenarioAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // User who completed the scenario.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Scenario that was completed.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "scenario_id", nullable = false)
    private Scenario scenario;

    // Answer selected by the user.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "choice_id", nullable = false)
    private Choice choice;

    // Whether the selected response was safe.
    @Column(nullable = false)
    private boolean safe;

    // When the attempt was submitted.
    @Column(name = "submitted_at", nullable = false, updatable = false)
    private Instant submittedAt;

    public ScenarioAttempt() {}

    public ScenarioAttempt(
        User user,
        Scenario scenario,
        Choice choice,
        boolean safe
    ) {
        this.user = user;
        this.scenario = scenario;
        this.choice = choice;
        this.safe = safe;
    }

    @PrePersist
    public void setSubmissionTime() {
        if (submittedAt == null) {
            submittedAt = Instant.now();
        }
    }

    public Long getId() { return id; }
    public User getUser() { return user; }
    public Scenario getScenario() { return scenario; }
    public Choice getChoice() { return choice; }
    public boolean isSafe() { return safe; }
    public Instant getSubmittedAt() { return submittedAt; }
}