package com._team9.backend.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "scenarios")
public class Scenario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // e.g. "phishing_email", "suspicious_text", "fake_login_page", "impersonation", "mfa_prompt"
    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String title;

    // the email/text/login page content the player actually sees
    @Lob
    @Column(nullable = false)
    private String message;

    @JsonManagedReference
    @OneToMany(mappedBy = "scenario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Choice> choices = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "scenario_warning_signs", joinColumns = @JoinColumn(name = "scenario_id"))
    @Column(name = "warning_sign")
    private List<String> warningSigns = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "scenario_human_factors", joinColumns = @JoinColumn(name = "scenario_id"))
    @Column(name = "human_factor")
    private List<String> humanFactors = new ArrayList<>();

    public Scenario() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public List<Choice> getChoices() { return choices; }
    public void setChoices(List<Choice> choices) { this.choices = choices; }

    public List<String> getWarningSigns() { return warningSigns; }
    public void setWarningSigns(List<String> warningSigns) { this.warningSigns = warningSigns; }

    public List<String> getHumanFactors() { return humanFactors; }
    public void setHumanFactors(List<String> humanFactors) { this.humanFactors = humanFactors; }

    // keeps both sides of the relationship in sync when you add a choice
    public void addChoice(Choice choice) {
        choices.add(choice);
        choice.setScenario(this);
    }
}