/**
 * CyberSense Scenario Service
 *
 * Handles communication between the React frontend and
 * the Spring Boot backend.
 *
 * Responsibilities:
 *  Fetch available training scenarios from /api/scenarios.
 *  Translate backend scenario data into the format
 *   expected by the frontend ScenarioPage component.
 *  Convert backend choices into selectable response options.
 *  Format scenario messages and human-factor categories.
 *  Send selected answers to the backend for evaluation.
 *  Return safe/unsafe results and feedback to the frontend.
 *
 * This service separates backend data handling from the UI,
 * allowing the frontend design to remain reusable.
 *
 * Completed responses are not yet saved to user accounts.
 * Persistent progress tracking and analytics will be
 * implemented separately.
 */

import { getCsrfToken } from "./csrfService";
import type { Scenario } from '../types/scenario'

export type BackendChoice = {
  id: number
  text: string
  safe: boolean
  feedback: string
}

export type BackendScenario = {
  id: number
  type: string
  title: string
  message: string
  choices: BackendChoice[]
  warningSigns: string[]
  humanFactors: string[]
}

const SCENARIO_API_URL = '/api/scenarios'

export async function getScenarios(): Promise<BackendScenario[]> {
  const response = await fetch(SCENARIO_API_URL)

  if (!response.ok) {
    throw new Error(`Failed to load scenarios: ${response.status}`)
  }

  return response.json()
}


// Translates Pape's backend format into the format ScenarioPage expects.
export function convertBackendScenario(
  backendScenario: BackendScenario
): Scenario {
  const lines = backendScenario.message.split('\n')

  const fromLine =
    lines.find((line) => line.startsWith('From:')) ?? 'From: Unknown'

  const subjectLine =
    lines.find((line) => line.startsWith('Subject:')) ??
    'Subject: Security Alert'

  const bodyLines = lines.filter(
    (line) =>
      line.trim() !== '' &&
      !line.startsWith('From:') &&
      !line.startsWith('Subject:')
  )

  return {
    id: String(backendScenario.id),

    title: backendScenario.title,

    scenarioType:
      backendScenario.type === 'phishing_email'
        ? 'Email Simulation'
        : backendScenario.type,

    description:
      'Review the scenario carefully and choose the safest response.',

    tags: backendScenario.humanFactors,

    message: {
      from: fromLine.replace('From:', '').trim(),
      subject: subjectLine.replace('Subject:', '').trim(),
      body: bodyLines,
      simulationType: 'Email Simulation',
    },

    responseOptions: backendScenario.choices.map((choice) => ({
      id: String(choice.id),
      label: choice.text,
    })),

    humanFactors: backendScenario.humanFactors.map((factor, index) => ({
      id: `factor-${index + 1}`,
      label: factor,
    })),
  }
}


// Gets the requested scenario from the backend and translates it.
export async function getScenarioForTraining(
  scenarioId?: string
): Promise<Scenario | undefined> {
  const scenarios = await getScenarios()

  if (scenarios.length === 0) {
    return undefined
  }

  const numericId = Number(scenarioId)

  const backendScenario = Number.isNaN(numericId)
    ? scenarios[0]
    : scenarios.find((scenario) => scenario.id === numericId) ?? scenarios[0]

  return convertBackendScenario(backendScenario)
}

/**
 * Result returned by the backend after checking a scenario answer.
 */
export interface ScenarioSubmissionResult {
  safe: boolean
  feedback: string
}

/**
 * sooooo this sends the selected answer to Spring Boot for evaluation.
 * papes backend determines whether the answer is safe teehee.
 */

export async function submitScenarioAnswer(
  scenarioId: string,
  choiceId: string
): Promise<ScenarioSubmissionResult> {

  // Get the security token before submitting an answer.
  const csrf = await getCsrfToken();

  const response = await fetch(
    `/api/scenarios/${scenarioId}/submit`,
    {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        [csrf.headerName]: csrf.token,
      },
      body: JSON.stringify({
        choiceId: Number(choiceId),
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to submit scenario answer: ${response.status}`
    );
  }

  return response.json();
}