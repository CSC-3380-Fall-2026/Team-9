export interface ScenarioMessage {
  from: string;
  subject: string;
  body: string[];
  highlightedLink?: string;
  simulationType: string;
}

export interface ResponseOption {
  id: string;
  label: string;
}

export interface HumanFactor {
  id: string;
  label: string;
}

export interface Scenario {
  id: string;
  title: string;
  scenarioType: string;
  description: string;
  tags: string[];
  message: ScenarioMessage;
  responseOptions: ResponseOption[];
  humanFactors: HumanFactor[];
}
