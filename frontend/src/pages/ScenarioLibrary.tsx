
/**
 * mmmmmkay this like buffer page i still have to make designs to but ya girl
 * aint feel like it and we need results rn lowkey.....
 * CyberSense Scenario Library
 *
 * uhhh displays the social engineering scenarios available for training.
 *
 * Features:
 * Retrieves available scenarios from the Spring Boot backend.
 * Displays scenario titles and types.
 * Allows users to select and start a scenario.
 * Provides navigation back to the Dashboard.
 *
 * Scenario data is loaded through scenarioService.ts rather
 * than being hardcoded into this page.
 *
 * When a user selects a scenario, React Router opens the
 * reusable ScenarioPage component using that scenario's ID.
 *
 * Future improvements will include scenario filtering,
 * difficulty levels, completion status, and category tags.
 * a bunch of bs
 */


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

<main
  className="min-h-screen p-6 md:p-10 text-[var(--cyber-accent)]"
  style={{
    backgroundImage:
      'linear-gradient(rgba(7,26,44,0.78), rgba(7,26,44,0.88)), url("/assets/scenario-bg.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  }}
>
      <button
        onClick={() => navigate('/dashboard')}
       

className="mb-8 inline-flex items-center text-sm font-semibold transition-all duration-300 hover:-translate-x-1 hover:drop-shadow-[0_0_8px_var(--cyber-accent)] hover:[text-shadow:0_0_8px_var(--cyber-accent),0_0_18px_var(--cyber-accent),0_0_32px_var(--cyber-accent)]"
      style={{
  fontFamily: '"Orbitron", sans-serif',
  color: "var(--cyber-accent)",
}}
      >
        ← Back to Dashboard
      </button>

    <h1
  className="text-4xl font-bold mb-3"
  style={{
    fontFamily: '"Orbitron", sans-serif',
    color: "var(--cyber-accent)",
  textShadow:
  "0 0 5px var(--cyber-accent), 0 0 14px var(--cyber-accent), 0 0 30px var(--cyber-accent), 0 0 48px color-mix(in srgb, var(--cyber-accent) 55%, transparent)",
  }}
>
        Scenario Library
      </h1>

     <p className="mb-10 text-base leading-relaxed cyber-body-text">
        Explore social engineering scenarios and test your awareness.
      </p>

      {loading && <p>Loading scenarios...</p>}

      {error && <p role="alert">{error}</p>}

      {!loading && !error && scenarios.length === 0 && (
        <p>No scenarios are currently available.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {scenarios.map((scenario, index) => (
          <button
            key={scenario.id}
            onClick={() => navigate(`/training/${scenario.id}`)}
     
className="group cyber-library-card-enter relative isolate overflow-hidden rounded-lg border-2 border-[var(--cyber-accent)] bg-[rgba(7,26,44,0.16)] p-6 text-left backdrop-blur-md shadow-[0_0_14px_1px_var(--cyber-accent)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_25px_4px_var(--cyber-accent),0_0_55px_var(--cyber-accent)] before:pointer-events-none before:absolute before:inset-y-0 before:-left-1/2 before:w-1/3 before:skew-x-[-20deg] before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-[600%]cyber-library-card-enter"
         
style={{
  animationDelay: `${index * 150}ms`,
}}
         >
           <h2
  className="text-xl font-bold mb-3"
  style={{
    fontFamily: '"Orbitron", sans-serif',
    color: "var(--cyber-accent)",
    textShadow:
      "0 0 4px color-mix(in srgb, var(--cyber-accent) 55%, transparent), 0 0 12px color-mix(in srgb, var(--cyber-accent) 25%, transparent)",
  }}
>
              {scenario.title}
            </h2>

        
<p
  className="mb-5 text-sm font-medium capitalize"
  style={{
    fontFamily: '"Exo 2", sans-serif',
    color: "rgba(255,255,255,0.9)",
    letterSpacing: "0.02em",
  }}
>
              {scenario.type.replaceAll('_', ' ')}
            </p>

           <span
  className="inline-block font-semibold text-[16px] transition-all duration-300 group-hover:translate-x-2 group-hover:drop-shadow-[0_0_12px_var(--cyber-accent)]"
  style={{
    fontFamily: '"Orbitron", sans-serif',
    color: "var(--cyber-accent)",
    textShadow:
      "0 0 6px color-mix(in srgb, var(--cyber-accent) 50%, transparent)",
  }}
>
              Start Scenario →
            </span>
          </button>
        ))}
      </div>
    </main>
  )
}