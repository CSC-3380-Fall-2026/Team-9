package com._team9.backend.loader;

import com._team9.backend.entity.Choice;
import com._team9.backend.entity.Scenario;
import com._team9.backend.repository.ScenarioRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;

@Component
public class ScenarioLoader implements CommandLineRunner {

    private final ScenarioRepository scenarioRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ScenarioLoader(ScenarioRepository scenarioRepository) {
        this.scenarioRepository = scenarioRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // don't reload if scenarios are already in the database
        if (scenarioRepository.count() > 0) {
            System.out.println("Scenarios already loaded, skipping template load.");
            return;
        }

        try (InputStream in = new ClassPathResource("scenarios/template.json").getInputStream()) {
            Scenario scenario = objectMapper.readValue(in, Scenario.class);

            // JSON can't set this back-reference on its own, has to be done manually
            for (Choice choice : scenario.getChoices()) {
                choice.setScenario(scenario);
            }

            scenarioRepository.save(scenario);
            System.out.println("Loaded template scenario: " + scenario.getTitle());
        }
    }
}