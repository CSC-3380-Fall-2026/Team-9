package com._team9.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "choices")
public class Choice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String text;

    // true if this is the safe/correct choice
    @Column(nullable = false)
    private boolean safe;

    // shown back to the player after they pick this choice
    @Lob
    private String feedback;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "scenario_id")
    private Scenario scenario;

    public Choice() {}

    public Choice(String text, boolean safe, String feedback) {
        this.text = text;
        this.safe = safe;
        this.feedback = feedback;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public boolean isSafe() { return safe; }
    public void setSafe(boolean safe) { this.safe = safe; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }

    public Scenario getScenario() { return scenario; }
    public void setScenario(Scenario scenario) { this.scenario = scenario; }
}