/*
  CyberSense Dashboard

  Integrates the CyberSense Dashboard design from Figma.
   Displays empty/default progress states until real user data is available.
  Uses React Router for navigation between frontend pages.
   Training links currently open the test scenario while the Scenario Library
    and backend functionality are still being developed.
    its really bad rn tbh cuz we need back end connection everything
    is temporary for now but you can go between the the landing and dashb oard by pressing
    login
*/

import { logout } from "../services/authService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

const bgImage = "/assets/47d8c.png";

const navLinks = [
  "Dashboard",
  "Training",
  "Classes",
  "Forum",
  "Profile",
  "Progress",
  "Admin",
];

const humanFactorCategories = [
  { label: "Authority" },
  { label: "Urgency" },
  { label: "Familiarity" },
  { label: "Reciprocity" },
  { label: "Institutional Trust" },
];

const explorLinks = [
  [{ label: "Training / Scenario Library" }, { label: "Progress & Analytics" }],
  [{ label: "Classes" }, { label: "Forum" }],
  [
    { label: "Account & Settings" },
    { label: "Admin Center", badge: "Admin only" },
  ],
];

export default function Dashboard() {
  const [username, setUsername] = useState<string | null>(null);
  const [progress, setProgress] = useState<ProgressSummary | null>(null);
const [factors, setFactors] = useState<HumanFactorSummary[]>([]);
const [analyticsLoading, setAnalyticsLoading] = useState(true);
const [analyticsError, setAnalyticsError] = useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "same-origin",
        });

        if (!response.ok) return;

        const user = await response.json();
        setUsername(user.username);
      } catch (error) {
        console.error("Unable to load user information:", error);
      }
    }

    loadUser();
  }, []);
  useEffect(() => {
  const controller = new AbortController();

  async function loadAnalytics() {
    try {
      const [progressResponse, factorsResponse] = await Promise.all([
        fetch("/api/analytics/progress", {
          signal: controller.signal,
        }),
        fetch("/api/analytics/human-factors", {
          signal: controller.signal,
        }),
      ]);

      if (!progressResponse.ok || !factorsResponse.ok) {
        throw new Error("Unable to load analytics.");
      }

      const progressData: ProgressSummary = await progressResponse.json();
      const factorData: HumanFactorSummary[] = await factorsResponse.json();

      if (!controller.signal.aborted) {
        setProgress(progressData);
        setFactors(factorData);
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        setAnalyticsError(
          error instanceof Error ? error.message : "Something went wrong."
        );
      }
    } finally {
      if (!controller.signal.aborted) {
        setAnalyticsLoading(false);
      }
    }
  }

  loadAnalytics();

  return () => controller.abort();
}, []);
const factorPerformance = factors.map((factor) => ({
  label: factor.humanFactor
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase()),
  percentage: Math.max(
    0,
    Math.min(100, 100 - factor.susceptibilityPercentage)
  ),
  attempts: factor.totalAttempts,
}));
  const navigate = useNavigate();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  async function handleLogout() {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    setLogoutError("");

    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      setLogoutError(
        error instanceof Error ? error.message : "Unable to log out.",
      );
    } finally {
      setIsLoggingOut(false);
    }
  }
  return (
    <div
      className="flex flex-col items-start relative min-h-screen w-full"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <img
          alt=""
          className="absolute max-w-none object-cover size-full"
          src={bgImage}
        />
        <div className="absolute bg-black/35 inset-0" />
      </div>

      {/* Top Navigation */}
      <div 
className="relative z-10 flex w-full shrink-0 flex-col items-start gap-3 rounded-none border-2 border-white/90 bg-white/15 px-4 py-3 text-white font-semibold backdrop-blur-2xl shadow-[inset_0_0_12px_rgba(255,255,255,0.12),0_0_8px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/25 hover:shadow-[0_0_18px_3px_var(--cyber-accent),0_0_35px_var(--cyber-accent)] sm:px-6 xl:min-h-[72px] xl:flex-row xl:items-center xl:justify-between xl:gap-0 xl:px-14 xl:py-0">
        <button
          type="button"
          onClick={() => navigate("/")}
          
          aria-label="Return to login"
        >
          <div/>
          <p className="cyber-display text-base font-bold text-[var(--cyber-accent)] whitespace-nowrap transition-all duration-300 hover:drop-shadow-[0_0_15px_var(--cyber-accent)]">
            CyberSense
          </p>
        </button>
        <div className="flex flex-wrap gap-2 items-center min-w-0">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => {
                if (link === "Dashboard") navigate("/dashboard");
                if (link === "Training") navigate("/training");
                //if (link === "Classes") navigate("/classes");
                //if (link === "Forum") navigate("/forum");
                if (link === "Profile") navigate("/account");
                if (link === "Progress") navigate("/analytics");
                //if (link === "Admin") navigate("/admin");
              }}
             className="flex shrink-0 cursor-pointer items-center rounded-none border-2 border-[var(--cyber-accent)] bg-[rgba(7,26,44,0.85)] px-4 py-2 font-semibold text-[var(--cyber-accent)] shadow-[0_0_8px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:bg-[rgba(7,26,44,0.65)] hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_40px_var(--cyber-accent)]"
            >
              <span className="text-sm whitespace-nowrap">{link}</span>
            </button>
          ))}
          {username && (
            <span
              className="max-w-[180px] truncate rounded-[3px] border border-white/80 bg-[rgba(7,26,44,0.75)] px-3 py-2.5 text-sm font-semibold text-white shadow-[0_0_5px_var(--cyber-accent)]"
              title={username}
            >
              Welcome, {username}!
            </span>
          )}
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="cursor-pointer rounded-none border-2 border-[var(--cyber-accent)] bg-[rgba(7,26,44,0.85)] px-4 py-2.5 font-['Orbitron'] text-sm font-semibold text-[var(--cyber-accent)] shadow-[0_0_8px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_40px_var(--cyber-accent)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoggingOut ? "Logging Out..." : "Log Out"}
          </button>

          {logoutError && (
            <p role="alert" className="text-sm text-red-600">
              {logoutError}
            </p>
          )}
        </div>
      </div>

      {/* Dashboard Body */}
      <div className="flex flex-col flex-1 gap-6 items-start pb-[38px] pt-[34px] px-14 relative w-full">
        {/* Welcome Section */}
        <div
          className="border border-white flex flex-col gap-5 items-start overflow-clip px-7 py-6 relative rounded-[3px] shrink-0 w-full shadow-[0_0_5px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_45px_var(--cyber-accent)]"
          style={{ background: "rgba(7,26,44,0.75)" }}
        >
          <div className="flex flex-col gap-2 items-start">
            <p className="font-bold text-[var(--cyber-accent)] text-xs uppercase tracking-wide">
              Dashboard / Learning overview
            </p>
       <p className="font-bold text-[28px] leading-tight cyber-main-title">
              Welcome back, {username ?? "user"}!
            </p>
            <p className="cyber-body-text">
              Continue building the human skills that help you recognize and
              respond to social engineering.
            </p>
          </div>
       
           <button
           type="button"
             onClick={() => navigate("/training")}
             className="cyber-dashboard-tile flex items-center px-[22px] py-[13px] rounded-[3px] cursor-pointer"
             >
            <span className="font-bold text-white text-sm whitespace-nowrap">
              Continue Training →
            </span>
            
          </button>
        </div>

        {/* Dashboard Content */}
       <div className="flex flex-col lg:flex-row flex-1 gap-5 items-stretch w-full min-w-0">
          {/* Left Column */}
        <div className="flex flex-col gap-5 items-stretch w-full min-w-0 lg:flex-1">
            {/* Progress Summary */}
            <div
              className="border border-white flex flex-col gap-4 items-start overflow-clip p-5 relative rounded-[3px] shrink-0 w-full shadow-[0_0_5px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_45px_var(--cyber-accent)]"
              style={{ background: "rgba(7,26,44,0.75)" }}
            >
              <div className="flex items-center justify-between w-full text-[var(--cyber-accent)]">
            
<p className="font-bold text-xl cyber-section-title">
  Progress summary
</p>
                <button
                  onClick={() => navigate("/training")}
                className="font-semibold text-xs hover:underline cursor-pointer cyber-section-title"
                >
                  View training →
                </button>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-4 items-start w-full min-w-0">
                <div className="flex flex-col gap-1 items-start shrink-0 w-[132px] text-[var(--cyber-accent)]">
          <p className="font-bold text-2xl cyber-stat-glow">
              {progress && progress.totalAttempts > 0
              ? `${progress.safeResponsePercentage}%`
                  : "—"}
         </p>
       <p className="cyber-body-text">Safe response rate</p>
                </div>
                <div className="flex flex-col gap-1 items-start shrink-0 w-[132px] text-[var(--cyber-accent)]">
                <p className="font-bold text-2xl cyber-stat-glow">
           {progress && progress.totalAttempts > 0
            ? `${progress.safeAnswers} / ${progress.totalAttempts}`
               : "—"}
            </p>
          <p className="cyber-body-text">Safe responses / attempts</p>
                </div>
                <div className="flex flex-col gap-1 items-start shrink-0 w-[132px] text-[var(--cyber-accent)]">
                 <p className="font-bold text-2xl cyber-stat-glow">
             {progress && progress.totalAttempts > 0
              ? progress.unsafeAnswers
                          : "—"}
                        </p>
              <p className="cyber-body-text">Unsafe responses</p>
                </div>
                <div className="flex flex-1 flex-col gap-1.5 items-start min-w-0">
                  <div className="flex items-center justify-between w-full text-xs cyber-section-title">
                    <span>Safe response rate</span>
             <span>
           {progress && progress.totalAttempts > 0
              ? `${progress.safeAnswers} of ${progress.totalAttempts}`
              : "—"}
             </span>
                  </div>
                  <div
                    className="w-full h-3 rounded-sm overflow-hidden"
                    style={{ background: "rgba(7,26,44,0.75)" }}
                  >
                    <div
                 className="h-3 bg-[var(--cyber-accent)] cyber-neon-bar transition-all duration-500"
                style={{
               width: `${
                  progress && progress.totalAttempts > 0
               ? Math.max(0, Math.min(100, progress.safeResponsePercentage))
                   : 0
                    }%`,
                      }}
                   />
                  </div>
                </div>
              </div>
            </div>

            {/* Human-factor Performance */}
            <div
              className="border border-white flex flex-col gap-3.5 items-start overflow-clip p-5 relative rounded-[3px] shrink-0 w-full shadow-[0_0_5px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_45px_var(--cyber-accent)]"
              style={{ background: "rgba(7,26,44,0.75)" }}
            >
              <div className="flex items-center justify-between w-full text-[var(--cyber-accent)]">
            <p className="font-bold text-xl cyber-section-title">
  Human-factor performance
</p>
                <p className="font-semibold text-xs">
                  Based on recent scenarios
                </p>
              </div>

              {/* No data state */}
              <div className="flex flex-col gap-3.5 w-full">
              {factorPerformance.map(({ label, percentage }) => (
                  <div
                    key={label}
                    className="flex gap-3.5 items-center min-h-7 w-full py-2"
                  >
                  <p className="cyber-section-title text-sm leading-relaxed w-[210px] shrink-0">
                      {label}
                    </p>
                 <div className="flex-1 h-2 rounded-full bg-white/20 min-w-0">
                      <div
             className="h-full bg-[var(--cyber-accent)] cyber-neon-bar"
             style={{ width: `${percentage}%` }}
                     />
                    </div>
                    <p className="font-bold text-[var(--cyber-accent)] text-xs text-right w-[38px] shrink-0">
                     {Math.round(percentage)}%
                    </p>
                  </div>
                ))}
                <p className="cyber-body-text text-xs mt-1">
                  No data yet — complete scenarios to see your performance.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5 items-start shrink-0 w-[430px]">
            {/* Recent Scenarios */}
            <div
              className="border border-white flex flex-col gap-3.5 items-start overflow-clip p-5 relative rounded-[3px] shrink-0 w-full shadow-[0_0_5px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_45px_var(--cyber-accent)]"
              style={{ background: "rgba(7,26,44,0.75)" }}
            >
              <div className="flex items-center justify-between w-full text-[var(--cyber-accent)]">
          <p className="font-bold text-xl cyber-section-title">
  Recent scenarios
</p>
                <button className="font-semibold text-xs hover:underline cursor-pointer cyber-section-title">
                  View all →
                </button>
              </div>
              {/* Empty state */}
              <div className="flex flex-col items-center justify-center w-full py-8 gap-2">
                   <p className="cyber-body-text">
                  No recent scenarios yet
                </p>
                <p className="cyber-body-text">
                  Start training to see your scenario history here.
                </p>
              </div>
            </div>

            {/* Explore CyberSense */}
            <div className="flex flex-col gap-3 items-start flex-1 w-full">
             <p className="font-bold text-[var(--cyber-accent)] text-xl whitespace-nowrap cyber-section-title">
                Explore CyberSense
              </p>
              <div className="flex flex-col gap-3 flex-1 w-full">
                {explorLinks.map((row, rowIdx) => (
                  <div
                    key={rowIdx}
                    className="flex gap-3 h-[110px] items-start w-full"
                  >
                    {row.map(({ label, badge }) => (
                      <button
                        key={label}
                      
            onClick={() => {
                     if (label === "Training / Scenario Library") {
                        navigate("/training");
                       } else if (label === "Progress & Analytics") {
                        navigate("/analytics");
                   } else if (label === "Account & Settings") {
                   navigate("/account");
                        }
                          }}
                       
                   className="cyber-dashboard-tile flex gap-2.5 h-[110px] items-center px-3.5 py-[18px] relative rounded-[3px] shrink-0 w-[209px] cursor-pointer text-left transition-all duration-300 hover:-translate-y-1"
                        
                      >
                        <div className="flex flex-1 flex-col gap-1 items-start min-w-0">
                       <p className="font-semibold text-white text-base w-full">
                            {label}
                          </p>
                        </div>
                        {badge && (
                          <div
                            className="border border-white flex items-center overflow-clip px-2.5 py-1.5 rounded-[3px] shrink-0"
                            style={{ background: "rgba(7,26,44,0.75)" }}
                          >
                            <p className="font-bold text-[var(--cyber-accent)] text-[11px] whitespace-nowrap">
                              {badge}
                            </p>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
