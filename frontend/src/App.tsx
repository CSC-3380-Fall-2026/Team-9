/*
  CyberSense Application Routes
The hub tehee
 Controls which page is displayed for each URL.
 Loads Landing/Login and Dashboard pages.
  Uses the scenario ID in the URL to find the correct scenario
 and sends that scenario data to the reusable ScenarioPage component.


  Teehee now includes some backend stuff
  right it waits for the backend gets the translated verion
*/
import { getScenarioForTraining } from './services/scenarioService'
import { useEffect, useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'

import LandingLogin from './pages/LandingLogin'
import Dashboard from './pages/Dashboard'
import ScenarioLibrary from './pages/ScenarioLibrary'
import ScenarioPage from './components/ScenarioPage'



import type { Scenario } from './types/scenario'


// Loads a scenario from the Spring Boot backend
function TrainingScenario() {
  const { scenarioId } = useParams<{ scenarioId: string }>()

  const [scenario, setScenario] = useState<Scenario | undefined>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    getScenarioForTraining(scenarioId)
      .then((loadedScenario) => {
        setScenario(loadedScenario)
      })
      .catch((err) => {
        console.error(err)
        setError('Unable to load scenario.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [scenarioId])

  if (loading) {
    return <div>Loading scenario...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!scenario) {
    return <div>Scenario not found.</div>
  }

  return <ScenarioPage scenario={scenario} />
}


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingLogin />} />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />
      {/* this displays the scenario library using scenarios from the backend omggg.... */}
<Route
  path="/training"
  element={<ScenarioLibrary />}
/>

      <Route
        path="/training/:scenarioId"
        element={<TrainingScenario />}
      />
    </Routes>
  )
}