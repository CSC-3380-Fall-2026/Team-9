
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getScenarios } from '../services/scenarioService'

// teehee this uses the backend scenario type returned by our existing service.
type BackendScenarios = Awaited<ReturnType<typeof getScenarios>>

export default function ScenarioLibrary() {
  const navigate = useNavigate()
  const [scenarios, setScenarios] = useState<BackendScenarios>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // uhh retrieve scenarios from Spring Boot when the library opens.
  useEffect(() => {
    let active = true

    getScenarios()
      .then((data) => {
        if (active) setScenarios(data)
      })
      .catch(() => {
        if (active) setError('Unable to load scenarios.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#071a2c] text-[#00ffc8] p-10">
      <button
        onClick={() => navigate('/dashboard')}
        className="mb-8 text-sm hover:underline"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-4xl font-bold mb-3">
        Scenario Library
      </h1>

      <p className="text-white/70 mb-10">
        Explore social engineering scenarios and test your awareness.
      </p>

      {loading && <p>Loading scenarios...</p>}

      {error && <p role="alert">{error}</p>}

      {!loading && !error && scenarios.length === 0 && (
        <p>No scenarios are currently available.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => navigate(`/training/${scenario.id}`)}
            className="text-left bg-[#102c40] border border-[#00ffc8]/40 rounded-lg p-6 hover:border-[#00ffc8] transition-colors"
          >
            <h2 className="text-xl font-bold mb-3">
              {scenario.title}
            </h2>

            <p className="text-white/70 text-sm mb-5">
              {scenario.type.replaceAll('_', ' ')}
            </p>

            <span className="font-semibold">
              Start Scenario →
            </span>
          </button>
        ))}
      </div>
    </main>
  )
}