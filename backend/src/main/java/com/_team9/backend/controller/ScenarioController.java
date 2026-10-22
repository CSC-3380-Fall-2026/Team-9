package com._team9.backend.controller;

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
}