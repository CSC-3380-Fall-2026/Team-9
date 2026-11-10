
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ProgressSummary {
  totalAttempts: number;
  safeAnswers: number;
  unsafeAnswers: number;
  safeResponsePercentage: number;
}

interface HumanFactorSummary {
  humanFactor: string;
  totalAttempts: number;
  unsafeAnswers: number;
  susceptibilityPercentage: number;
}

const panel =
  "rounded border border-cyan-300/30 bg-[#071a2c]/85 p-5 shadow-xl backdrop-blur-md";

function formatFactor(name: string) {
  return name.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

export default function ProgressAnalytics() {
  const [progress, setProgress] = useState<ProgressSummary | null>(null);
  const [factors, setFactors] = useState<HumanFactorSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadAnalytics() {
      try {
        const [progressResponse, factorsResponse] = await Promise.all([
          fetch("/api/analytics/progress", { signal: controller.signal }),
          fetch("/api/analytics/human-factors", { signal: controller.signal })
        ]);

        if (progressResponse.status === 401 || factorsResponse.status === 401) {
          throw new Error("Personal analytics require working login authentication.");
        }

        if (!progressResponse.ok || !factorsResponse.ok) {
          throw new Error("Unable to load analytics from the backend.");
        }

        const progressData = await progressResponse.json();
        const factorData = await factorsResponse.json();

        if (!controller.signal.aborted) {
          setProgress(progressData);
          setFactors(factorData);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadAnalytics();
    return () => controller.abort();
  }, []);

  const hasData = progress !== null && progress.totalAttempts > 0;

  return (
    <main
      className="min-h-screen text-[#00ffc8]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 8, 20, 0.4), rgba(0, 8, 20, 0.5)), url("/assets/47d8c.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/30 bg-white/55 backdrop-blur-[9px] px-6 py-4 backdrop-blur-md">
        <Link to="/" className="font-bold text-[#071a2c]">
          CyberSense
        </Link>

        <nav className="flex flex-wrap gap-3 text-sm">
          <Link className="rounded bg-white px-4 py-2 text-black" to="/dashboard">
            Dashboard
          </Link>
          <Link className="rounded bg-white px-4 py-2 text-black" to="/training">
            Training
          </Link>
          <span className="rounded bg-[#d7d7d7] px-4 py-2 font-bold text-black">
            Progress
          </span>
        </nav>
      </header>

      <div className="mx-auto max-w-[1450px] space-y-6 p-6">
        <section className={panel}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase">
                CyberSense / User Analytics
              </p>
              <h1 className="mt-2 text-3xl font-bold">
                Progress &amp; Analytics
              </h1>
              <p className="mt-2 max-w-3xl text-white/70 text-sm">
                Track your cybersecurity training and identify the social
                engineering techniques that affect you most.
              </p>
            </div>

            <Link to="/training" className="text-sm font-bold hover:underline">
              Back to Scenario Library
            </Link>
          </div>
        </section>

        {loading && (
          <section className={panel}>
            Loading your analytics...
          </section>
        )}

        {error && (
          <section className={panel} role="alert">
            <h2 className="text-xl font-bold text-[#00ffc8]">
              Analytics unavailable
            </h2>
            <p className="mt-2 text-sm">{error}</p>
            <p className="mt-2 text-sm">
              Account authentication is still being integrated.
              We won't display made-up results.
            </p>
          </section>
        )}

       {!loading && (
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="space-y-5 lg:col-span-2">
              <section className={panel}>
                <h2 className="text-xl font-bold text-[#00ffc8]">
                  Overall Progress Summary
                </h2>
                <p className="mt-1 text-sm text-white/70">
                  Your recorded training performance.
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      label: "Attempts completed",
                  value: progress?.totalAttempts ?? "—"
                    },
                    {
                      label: "Safe response rate",
                      value: progress ? `${progress.safeResponsePercentage}%` : "—"
                    },
                    {
                      label: "Safe responses",
                    value: progress?.safeAnswers ?? "—"
                    }
                  ].map(item => (
                    <div
                      key={item.label}
                      className="rounded border border-white/30 bg-white/10 p-4"
                    >
                      <p className="text-xs text-[#00ffc8]">{item.label}</p>
                      <p className="mt-2 text-3xl font-bold text-[#00ffc8]">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                {!hasData && (
                  <p className="mt-4 text-sm text-white/70">
                    No completed attempts recorded yet.
                  </p>
                )}
              </section>

              <section className={panel}>
                <h2 className="text-xl font-bold text-[#00ffc8]">
                  Human-Factor Performance
                </h2>
                <p className="mt-1 text-sm text-white/70">
                  How often you recognize different influence techniques.
                </p>

                <div className="mt-4 space-y-3">
                  {factors.length === 0 && (
                    <p className="text-sm text-white/70">
                      Complete training scenarios to see your performance
                      by human factor.
                    </p>
                  )}

                  {factors.map(factor => {
                    const performance = Math.max(
                      0,
                      Math.min(100, 100 - factor.susceptibilityPercentage)
                    );

                    return (
                      <div
                        key={factor.humanFactor}
                        className="rounded border border-white/30 bg-white/10 p-3"
                      >
                        <div className="mb-2 flex justify-between gap-3 text-sm font-semibold text-[#00ffc8]">
                          <span>{formatFactor(factor.humanFactor)}</span>
                          <span>{performance}%</span>
                        </div>

                        <div className="h-2 overflow-hidden rounded bg-white/20">
                          <div
                            className="h-full bg-[#00ffc8]"
                            style={{ width: `${performance}%` }}
                          />
                        </div>

                        <p className="mt-2 text-xs text-white/70">
                          Based on {factor.totalAttempts} recorded attempts
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            <div className="space-y-5">
              <section className={panel}>
                <h2 className="text-xl font-bold text-[#00ffc8]">
                  Scenario Type Performance
                </h2>
                <p className="mt-3 text-sm text-white/70">
                  Performance by scenario type will appear once
                  that analytics endpoint is connected.
                </p>
              </section>

              <section className={panel}>
                <h2 className="text-xl font-bold text-[#00ffc8]">
                  Recent Scenario Results
                </h2>
                <p className="mt-3 text-sm text-white/70">
                  Your recent training history will appear here
                  after the history API is implemented.
                </p>
              </section>

              <Link
                to="/training"
                className="block rounded bg-white px-5 py-3 text-center font-bold text-black"
              >
                Continue Training
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}