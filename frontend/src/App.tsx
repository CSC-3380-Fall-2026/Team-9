/**
 * teehee
 * CyberSense Application Routing
 *
 * uhhh manages navigation between the main pages of CyberSense
 * using React Router.
 *
 * Current routes include:
 * - Landing/Login page
 * - Dashboard
 * - Scenario Library
 * - Individual training scenarios
 *
 * TrainingScenario retrieves scenario data from the Spring Boot
 * backend using scenarioService.ts.
 *
 * The component handles loading, errors, and missing scenarios
 * before displaying the reusable ScenarioPage component.
 *
 * Additional pages, authentication, and progress tracking
 * will be integrated as those features are developed.
 *
 * Pape, 2024-06-05
 * added import for CreateAccount page and route for it
 * 
 */
import { getScenarioForTraining } from "./services/scenarioService";
import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingLogin from "./pages/LandingLogin";
import Dashboard from "./pages/Dashboard";
import ScenarioLibrary from "./pages/ScenarioLibrary";
import ScenarioPage from "./components/ScenarioPage";
import CreateAccount from "./pages/CreateAccount";
import ProgressAnalytics from "./pages/ProgressAnalytics";
import ForumPage from "./pages/ForumPage";
import NewThreadPage from "./pages/NewThreadPage";
import ThreadPage from "./pages/ThreadPage";

import type { Scenario } from "./types/scenario";

// Loads a scenario from the Spring Boot backend
function TrainingScenario() {
  const { scenarioId } = useParams<{ scenarioId: string }>();

  const [scenario, setScenario] = useState<Scenario | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getScenarioForTraining(scenarioId)
      .then((loadedScenario) => {
        setScenario(loadedScenario);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load scenario.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [scenarioId]);

  if (loading) {
    return <div>Loading scenario...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!scenario) {
    return <div>Scenario not found.</div>;
  }

  return <ScenarioPage scenario={scenario} />;
}

export default function App() {
  return (
  
<Routes>
  {/* Public pages */}
  <Route path="/" element={<LandingLogin />} />
  <Route path="/CreateAccount" element={<CreateAccount />} />
  <Route path="/forum" element={<ForumPage />} />


  {/* Pages that require login */}
  <Route element={<ProtectedRoute />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/training" element={<ScenarioLibrary />} />
    <Route path="/forum/:id" element={<ThreadPage />} />
    <Route
      path="/training/:scenarioId"
      element={<TrainingScenario />}
    />
    <Route path="/analytics" element={<ProgressAnalytics />} />
    <Route path="/forum/new" element={<NewThreadPage />} />
  
  </Route>
</Routes>

  );
}
