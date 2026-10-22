/*
  CyberSense Application Routes
The hub tehee
 Controls which page is displayed for each URL.
 Loads Landing/Login and Dashboard pages.
  Uses the scenario ID in the URL to find the correct scenario
 and sends that scenario data to the reusable ScenarioPage component.
*/


import { Routes, Route, useParams } from 'react-router-dom'
import LandingLogin from './pages/LandingLogin'
import Dashboard from './pages/Dashboard'
import ScenarioPage from './componets/ScenarioPage'
import { getScenarioById } from './data/scenarios'
// Loads the correct scenario based on the scenario ID in the URL.
function TrainingScenario() {
  const { scenarioId } = useParams<{ scenarioId: string }>()
  const scenario = scenarioId ? getScenarioById(scenarioId) : undefined

  if (!scenario) {
    return <div>Scenario not found.</div>
  }

  return <ScenarioPage scenario={scenario} />
}
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
  path="/training/:scenarioId"
  element={<TrainingScenario />}
/>
    </Routes>
  )
}