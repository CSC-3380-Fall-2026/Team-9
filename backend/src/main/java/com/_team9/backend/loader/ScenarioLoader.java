
package com._team9.backend.loader;

import com._team9.backend.entity.Choice;
import com._team9.backend.entity.Scenario;
import com._team9.backend.repository.ScenarioRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.Objects;

@Component
public class ScenarioLoader implements CommandLineRunner {

    private final ScenarioRepository scenarioRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ScenarioLoader(ScenarioRepository scenarioRepository) {
        this.scenarioRepository = scenarioRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        // Automatically find every JSON scenario file
        PathMatchingResourcePatternResolver resolver =
                new PathMatchingResourcePatternResolver();

        Resource[] files = resolver.getResources(
                "classpath*:scenarios/*.json"
        );

        for (Resource file : files) {

            try (InputStream in = file.getInputStream()) {

                Scenario scenario =
                        objectMapper.readValue(in, Scenario.class);

                // Connect each choice to its scenario
                for (Choice choice : scenario.getChoices()) {
                    choice.setScenario(scenario);
                }

                // Check whether this scenario already exists
                boolean alreadyExists = scenarioRepository.findAll()
                        .stream()
                        .anyMatch(existing ->
                                Objects.equals(
                                        existing.getTitle(),
                                        scenario.getTitle()
                                )
                        );

                if (alreadyExists) {
                    System.out.println(
                            "Already exists: " + scenario.getTitle()
                    );
                    continue;
                }

                // Save new scenario
                scenarioRepository.save(scenario);

                System.out.println(
                        "Loaded scenario: " + scenario.getTitle()
                );
            }
        }
    }
}
