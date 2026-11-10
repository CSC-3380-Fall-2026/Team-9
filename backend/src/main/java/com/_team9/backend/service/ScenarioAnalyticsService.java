
package com._team9.backend.service;

import com._team9.backend.entity.ScenarioAttempt;
import com._team9.backend.repository.ScenarioAttemptRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;

/**
 * Calculates CyberSense training statistics using saved
 * scenario attempts for individual users.
 */
@Service
public class ScenarioAnalyticsService {

    private final ScenarioAttemptRepository attemptRepository;

    public ScenarioAnalyticsService(
        ScenarioAttemptRepository attemptRepository
    ) {
        this.attemptRepository = attemptRepository;
    }

    /**
     * Calculates the total attempts, safe answers,
     * unsafe answers, and safe-response percentage.
     */
    @Transactional(readOnly = true)
    public ProgressSummary getProgressSummary(Long userId) {

        List<ScenarioAttempt> attempts =
            attemptRepository.findByUser_IdOrderBySubmittedAtDesc(userId);

        long totalAttempts = attempts.size();

        long safeAnswers = attempts.stream()
            .filter(ScenarioAttempt::isSafe)
            .count();

        long unsafeAnswers = totalAttempts - safeAnswers;

        long safePercentage = totalAttempts == 0
            ? 0
            : Math.round((safeAnswers * 100.0) / totalAttempts);

        return new ProgressSummary(
            totalAttempts,
            safeAnswers,
            unsafeAnswers,
            safePercentage
        );
    }

    /**
     * Calculates how often unsafe responses occur
     * in scenarios involving each human factor.
     *
     * A scenario with multiple factors contributes
     * to each applicable category.
     */
    @Transactional(readOnly = true)
    public List<HumanFactorSummary> getHumanFactorSummary(Long userId) {

        List<ScenarioAttempt> attempts =
            attemptRepository.findByUser_IdOrderBySubmittedAtDesc(userId);

        Map<String, long[]> factorCounts = new LinkedHashMap<>();

        for (ScenarioAttempt attempt : attempts) {

            List<String> factors =
                attempt.getScenario().getHumanFactors();

            if (factors == null) {
                continue;
            }

            for (String factor : new LinkedHashSet<>(factors)) {

                if (factor == null || factor.isBlank()) {
                    continue;
                }

                long[] counts = factorCounts.computeIfAbsent(
                    factor,
                    key -> new long[2]
                );

                counts[0]++;

                if (!attempt.isSafe()) {
                    counts[1]++;
                }
            }
        }

        return factorCounts.entrySet().stream()
            .map(entry -> {

                long total = entry.getValue()[0];
                long unsafe = entry.getValue()[1];

                long percentage =
                    Math.round((unsafe * 100.0) / total);

                return new HumanFactorSummary(
                    entry.getKey(),
                    total,
                    unsafe,
                    percentage
                );
            })
            .toList();
    }

    public record ProgressSummary(
        long totalAttempts,
        long safeAnswers,
        long unsafeAnswers,
        long safeResponsePercentage
    ) {}

    public record HumanFactorSummary(
        String humanFactor,
        long totalAttempts,
        long unsafeAnswers,
        long susceptibilityPercentage
    ) {}
}