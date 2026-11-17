
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
  "rounded-[3px] border border-white/80 bg-[rgba(7,26,44,0.75)] p-5 shadow-[0_0_5px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_45px_var(--cyber-accent)]";

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
      className="min-h-screen text-[var(--cyber-accent)]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 8, 20, 0.4), rgba(0, 8, 20, 0.5)), url("/assets/47d8c.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-none border-2 border-white/90 bg-white/15 px-6 py-4 text-white font-semibold backdrop-blur-2xl shadow-[inset_0_0_12px_rgba(255,255,255,0.12),0_0_8px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/25 hover:shadow-[0_0_18px_3px_var(--cyber-accent),0_0_35px_var(--cyber-accent)]">
        <Link to="/" className="cyber-display text-base font-bold text-[var(--cyber-accent)] transition-all duration-300 hover:drop-shadow-[0_0_15px_var(--cyber-accent)]">
          CyberSense
        </Link>

        <nav className="flex flex-wrap gap-3 text-sm">
         <Link
  to="/dashboard"
  className="rounded-none border-2 border-[var(--cyber-accent)] bg-[rgba(7,26,44,0.85)] px-4 py-2 font-semibold text-[var(--cyber-accent)] shadow-[0_0_8px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:bg-[rgba(7,26,44,0.65)] hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_40px_var(--cyber-accent)]"
>
  Dashboard
</Link>
        <Link
  to="/training"
  className="rounded-none border-2 border-[var(--cyber-accent)] bg-[rgba(7,26,44,0.85)] px-4 py-2 font-['Orbitron'] text-sm font-semibold text-[var(--cyber-accent)] shadow-[0_0_8px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:bg-[rgba(7,26,44,0.65)] hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_40px_var(--cyber-accent)]"
>
            Training
          </Link>
         <span
  aria-current="page"
  className="rounded-none border-2 border-[var(--cyber-accent)] bg-[rgba(7,26,44,0.85)] px-4 py-2 font-semibold text-[var(--cyber-accent)] shadow-[0_0_12px_2px_var(--cyber-accent)]"
>
  Progress
</span>
        </nav>
      </header>

      <div className="mx-auto max-w-[1450px] space-y-6 p-6">
        <section className={panel}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase cyber-section-title">
                CyberSense / User Analytics
              </p>
     <h1 className="mt-2 text-3xl font-bold cyber-display cyber-neon-text">
                Progress &amp; Analytics
              </h1>
                           <p
  className="mt-1 text-base"
 style={{
  color: "#ffffff",
  fontFamily: '"Exo 2", sans-serif',
  fontWeight: 500,
  fontSize: "15px",
  lineHeight: 1.6,
  letterSpacing: "0.01em",
}}
>
                Track your cybersecurity training and identify the social
                engineering techniques that affect you most.
              </p>
            </div>

            
<Link
  to="/training"
  className="cyber-section-title inline-flex items-center gap-2 text-sm hover:underline"
>
  <span aria-hidden="true">←</span>
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
            <h2 className="text-xl font-bold text-[var(--cyber-accent)]">
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
             <h2 className="text-xl font-bold cyber-section-title">
                  Overall Progress Summary
                </h2>
                         <p
  className="mt-1 text-base"
 style={{
  color: "#ffffff",
  fontFamily: '"Exo 2", sans-serif',
  fontWeight: 500,
  fontSize: "15px",
  lineHeight: 1.6,
  letterSpacing: "0.01em",
}}
>
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
                      <p className="text-xs text-[var(--cyber-accent)]">{item.label}</p>
                      <p className="mt-2 text-3xl font-bold text-[var(--cyber-accent)]">
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
                   <h2 className="text-xl font-bold cyber-section-title">
                  Human-Factor Performance
                </h2>
                                        <p
  className="mt-1 text-base"
 style={{
  color: "#ffffff",
  fontFamily: '"Exo 2", sans-serif',
  fontWeight: 500,
  fontSize: "15px",
  lineHeight: 1.6,
  letterSpacing: "0.01em",
}}
>
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
                        <div className="mb-2 flex justify-between gap-3 text-sm font-semibold text-[var(--cyber-accent)]">
                     <span className="font-semibold cyber-section-title">
               {formatFactor(factor.humanFactor)}
                 </span>
                        </div>

                       <div className="h-2 rounded-full bg-white/20">
                         <div
  className="h-full rounded-full bg-[var(--cyber-accent)] cyber-neon-bar"
  style={{ width: `${performance}%` }}
/>
                        </div>

                                               <p
  className="mt-1 text-base"
 style={{
  color: "#ffffff",
  fontFamily: '"Exo 2", sans-serif',
  fontWeight: 500,
  fontSize: "15px",
  lineHeight: 1.6,
  letterSpacing: "0.01em",
}}
>
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
                <h2 className="text-xl font-bold cyber-section-title">
                  Scenario Type Performance
                </h2>
                                       <p
  className="mt-1 text-base"
 style={{
  color: "#ffffff",
  fontFamily: '"Exo 2", sans-serif',
  fontWeight: 500,
  fontSize: "15px",
  lineHeight: 1.6,
  letterSpacing: "0.01em",
}}
>
                  Performance by scenario type will appear once
                  that analytics endpoint is connected.
                </p>
              </section>

              <section className={panel}>
                <h2 className="text-xl font-bold cyber-section-title">
                  Recent Scenario Results
                </h2>
                                       <p
  className="mt-1 text-base"
 style={{
  color: "#ffffff",
  fontFamily: '"Exo 2", sans-serif',
  fontWeight: 500,
  fontSize: "15px",
  lineHeight: 1.6,
  letterSpacing: "0.01em",
}}
>
                  Your recent training history will appear here
                  after the history API is implemented.
                </p>
              </section>

          
<Link
  to="/training"
  className="block rounded border-2 border-[var(--cyber-accent)] px-5 py-3 text-center text-base font-semibold text-white shadow-[0_0_12px_2px_var(--cyber-accent),0_0_24px_var(--cyber-accent)] transition-all duration-300 hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_40px_var(--cyber-accent)]"
  style={{
  fontFamily: '"Orbitron", sans-serif',
    backgroundColor: "#102a40",
    backgroundImage: `
      repeating-linear-gradient(
        135deg,
        rgba(255,255,255,0.06) 0px,
        rgba(255,255,255,0.06) 1px,
        transparent 1px,
        transparent 18px
      ),
      radial-gradient(
        ellipse at top,
        color-mix(in srgb, var(--cyber-accent) 28%, transparent),
        transparent 75%
      )
    `,
  }}
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