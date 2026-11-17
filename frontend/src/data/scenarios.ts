import type { Scenario } from '../types/scenario'

// Local scenario library.
// More scenarios can be added to this array later.
export const scenarios: Scenario[] = [
  {
    id: 'account-that-couldnt-wait',
    title: "The Account That Couldn't Wait",
    scenarioType: 'Interactive Scenario',
    description:
      'Read the message carefully, decide what you would do, and explain why you trusted or distrusted the interaction.',
    tags: ['Email', 'Finance'],

    message: {
      simulationType: 'Email simulation',
      from: 'finance-support@northstarcorp.com',
      subject: 'Urgent: Vendor account update required',

      body: [
        'Teehee yall this part will change i just havent figured out how yet',
        
      ],

      highlightedLink:
        'https://secure-portal-update.northstarcorp.com/verify-account',
    },

    responseOptions: [
      {
        id: 'open-link',
        label: 'Open the link and update the account',
      },
      {
        id: 'reply-info',
        label: 'Reply to the email to ask for more information',
      },
      {
        id: 'forward-security',
        label: 'Forward the message to the security team',
      },
      {
        id: 'ignore',
        label: 'Ignore the message and do nothing',
      },
    ],

    humanFactors: [
      { id: 'authority', label: 'Authority' },
      { id: 'urgency', label: 'Urgency' },
      { id: 'familiarity', label: 'Familiarity' },
      { id: 'reciprocity', label: 'Reciprocity' },
      { id: 'social-proof', label: 'Social Proof' },
      { id: 'institutional-trust', label: 'Institutional Trust' },
    ],
  },
]

// Finds the scenario that matches the scenario ID in the URL.
export function getScenarioById(id: string): Scenario | undefined {
  return scenarios.find((scenario) => scenario.id === id)
}