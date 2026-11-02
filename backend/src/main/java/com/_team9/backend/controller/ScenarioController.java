package com._team9.backend.controller;
import com._team9.backend.entity.Choice;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import com._team9.backend.entity.Scenario;
import com._team9.backend.repository.ScenarioRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ScenarioController {

    private final ScenarioRepository scenarioRepository;

    public ScenarioController(ScenarioRepository scenarioRepository) {
        this.scenarioRepository = scenarioRepository;
    }

    @GetMapping("/api/scenarios")
    public List<Scenario> getAllScenarios() {
        return scenarioRepository.findAll();
    }

    // teehee umm receives a selected answer and checks it against the backend....
    @Transactional(readOnly = true)
    @PostMapping("/api/scenarios/{scenarioId}/submit")
    public SubmissionResult submitAnswer(
            @PathVariable Long scenarioId,
            @RequestBody SubmissionRequest request) {

        Scenario scenario = scenarioRepository.findById(scenarioId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Scenario not found"));

        if (request.choiceId() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Choice ID is required");
        }

        // uhh make sure the choice belongs to this scenario.
        Choice selectedChoice = scenario.getChoices().stream()
                .filter(choice -> choice.getId().equals(request.choiceId()))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "Invalid choice for this scenario"));

        return new SubmissionResult(
                selectedChoice.isSafe(),
                selectedChoice.getFeedback()
        );
    }

    public record SubmissionRequest(Long choiceId) {}

    public record SubmissionResult(boolean safe, String feedback) {}
}