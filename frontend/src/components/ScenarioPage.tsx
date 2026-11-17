
/**
 * AHHHHHH teaaaaa we moving again
 * CyberSense Scenario Training Page
 *
 * Displays a social engineering scenario loaded from the backend
 * through the application's scenario service.
 *
 * Allows users to:
 * Read the simulated message.
 * Select how they would respond.
 *  Identify the human factors involved.
 *  Submit their answer for backend evaluation.
 * Receive feedback explaining whether their response was safe.
 *
 * This component will handle the training interface and answer feedback teehee
 * Saving completed attempts and calculating analytics are separate
 * features that still need to be implemented.
 * im finna do more but my head ass and knees hurt rn soooo godbless yall
 * also ima expand some of this stuff again cuz we losing the plot
 */


import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Scenario } from '../types/scenario'
import {
  getScenarios,
  submitScenarioAnswer,
  type ScenarioSubmissionResult
} from '../services/scenarioService'


interface ScenarioPageProps {
  scenario: Scenario;
  /** Called when the user clicks "Back to Scenario Library". Falls back to an <a> href when omitted. */
  onBack?: () => void;
  /** Active nav item label. Defaults to "Training". */
  activeNav?: string;
}

const NAV_ITEMS = ['Dashboard', 'Training', 'Forum', 'Profile', 'Progress'];

export default function ScenarioPage({ scenario, onBack, activeNav = 'Training' }: ScenarioPageProps) {
    const navigate = useNavigate()
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const [selectedFactors, setSelectedFactors] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

const [submissionResult, setSubmissionResult] =
  useState<ScenarioSubmissionResult | null>(null);

const [submissionError, setSubmissionError] = useState<string | null>(null);
const [isSubmitting, setIsSubmitting] = useState(false);


const [isAdvancing, setIsAdvancing] = useState(false);

const messageText = [
  ...scenario.message.body,
  ...(scenario.message.highlightedLink
    ? [scenario.message.highlightedLink]
    : []),
].join("\n");

const [typedLength, setTypedLength] = useState(0);

useEffect(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setTypedLength(messageText.length);
    return;
  }

  setTypedLength(0);
  let index = 0;

  const interval = window.setInterval(() => {
    index = Math.min(index + 1, messageText.length);
    setTypedLength(index);

    if (index >= messageText.length) {
      window.clearInterval(interval);
    }
  }, 28);

  return () => window.clearInterval(interval);
}, [messageText]);

  function toggleFactor(id: string) {
    setSelectedFactors((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

async function handleSubmit() {
  if (!selectedResponse || isSubmitting) return;
  if (selectedFactors.size === 0) {
  setSubmissionError(
    "Please select at least one human factor before submitting."
  );
  return;
}

  setIsSubmitting(true);
  setSubmissionError(null);

  try {
    // Let Spring Boot evaluate the selected answer.
    const result = await submitScenarioAnswer(
      scenario.id,
      selectedResponse
    );

    setSubmissionResult(result);
    setSubmitted(true);
  } catch (error) {
    console.error('Unable to submit answer:', error);
    setSubmissionError('Unable to check your answer. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
}

async function handleNextScenario() {
  if (!submitted || !submissionResult || isAdvancing) return;

  try {
    const scenarios = await getScenarios();
    const currentIndex = scenarios.findIndex(
      (item) => String(item.id) === String(scenario.id)
    );

    const nextScenario =
      currentIndex >= 0 ? scenarios[currentIndex + 1] : undefined;

    const destination =
      currentIndex === -1
        ? "/training"
        : nextScenario
          ? `/training/${nextScenario.id}`
          : "/analytics";

    setIsAdvancing(true);
    window.setTimeout(() => navigate(destination), 450);
  } catch (error) {
    console.error("Unable to load next scenario:", error);
    setSubmissionError("Unable to load the next scenario. Please try again.");
  }
}
  return (
    <div className="flex flex-col min-h-screen relative" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      {/* Background */}
      <div aria-hidden className="fixed inset-0 pointer-events-none z-0">
        <img
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        src="/assets/scenario-bg.png"
        />
        <div className="absolute inset-0 bg-black/18" />
      </div>

      {/* Top Navigation */}
      <nav
      
className="relative z-10 flex w-full shrink-0 flex-col items-stretch gap-3 rounded-none border-2 border-white/90 bg-white/15 px-4 py-3 text-white font-semibold backdrop-blur-2xl shadow-[inset_0_0_12px_rgba(255,255,255,0.12),0_0_8px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/25 hover:shadow-[0_0_18px_3px_var(--cyber-accent),0_0_35px_var(--cyber-accent)] sm:px-6 lg:min-h-[72px] lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:px-14 lg:py-0"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <div className="flex items-center gap-3">
          <div/>
          <span className="cyber-display text-base font-bold text-[var(--cyber-accent)] transition-all duration-300 hover:drop-shadow-[0_0_15px_var(--cyber-accent)]">
  CyberSense
</span>
        </div>
     <div className="flex flex-wrap items-center justify-end gap-2 max-w-full">
        {NAV_ITEMS.map((item) => {
  const active = item === activeNav;

  return (
    <button
      key={item}
      onClick={() => {
        if (item === 'Dashboard') navigate('/dashboard');
        if (item === 'Training') navigate('/training');
        //if (item === 'Classes') navigate('/classes');
        if (item === 'Forum') navigate('/forum');
        //if (item === 'Profile') navigate('/profile');
        if (item === 'Progress') navigate('/analytics');
        //if (item === 'Admin') navigate('/admin');
      }}
    className={`rounded-none border-2 border-[var(--cyber-accent)] bg-[rgba(7,26,44,0.85)] px-4 py-2 font-['Orbitron'] text-sm font-semibold text-[var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:bg-[rgba(7,26,44,0.65)] hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_40px_var(--cyber-accent)] ${
  active
    ? "shadow-[0_0_12px_2px_var(--cyber-accent)]"
    : "shadow-[0_0_8px_var(--cyber-accent)]"
}`}
    >
      {item}
    </button>
  );
})}
        </div>
      </nav>

      {/* Page Content */}
     <main className="relative z-10 cyber-scenario-enter flex-1 flex flex-col gap-6 px-4 sm:px-6 lg:px-14 py-6 lg:py-9 pb-10 min-h-0" style={{
 
animation: isAdvancing
  ? "cyber-scenario-exit 0.45s ease-in both"
  : undefined,
}}>
        {/* Scenario Header Panel */}
        
<div
 className="flex flex-col gap-4 shrink-0 rounded-[3px] border border-white/80 bg-[rgba(7,26,44,0.75)] p-6 shadow-[0_0_5px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_45px_var(--cyber-accent)]"
  style={{ background: "rgba(7,26,44,0.75)" }}
>
          {/* Header Top */}
       <div className="flex flex-col items-start gap-4 lg:flex-row lg:justify-between">
          
<div className="flex flex-col gap-2 min-w-0">
  <p className="text-xs uppercase tracking-wide cyber-section-title">
    CyberSense / {scenario.scenarioType}
  </p>

  <h1 className="text-[28px] leading-tight cyber-main-title">
    {scenario.scenarioType}
  </h1>

  <p className="max-w-2xl cyber-body-text">
    {scenario.description}
  </p>
</div>
            <div className="flex flex-col items-end gap-2.5 shrink-0">
              <div className="bg-[rgba(34,197,94,0.07)] border border-[rgba(255,255,255,0.4)] rounded-[3px] px-3 py-2">
               <span className="cyber-section-title text-xs font-semibold whitespace-nowrap">
                  Scenario
                </span>
              </div>
              {onBack ? (
                <button
                  onClick={onBack}
                 className="cyber-section-title text-[13px] font-semibold hover:underline whitespace-nowrap"
                >
                  Back to Scenario Library
                </button>
              ) : (
                <a
                 href="/training"
         className="cyber-section-title text-[13px] font-semibold hover:underline whitespace-nowrap"
                >
                  Back to Scenario Library
                </a>
              )}
            </div>
          </div>

          {/* Scenario Details */}
     <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
          <div className="flex-1 flex flex-col gap-2 min-w-0">
  <h2 className="text-2xl font-bold leading-tight cyber-section-title">
    {scenario.title}
  </h2>

  <p className="cyber-body-text">
    {scenario.message.simulationType} · Review the message, choose a response, and explain the human factors that influenced your decision.
  </p>
</div>
            {scenario.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 min-w-0 max-w-full">
                {scenario.tags.map((tag) => (
                  <div
                    key={tag}
                    
              
className="rounded-[3px] border-2 border-[var(--cyber-accent)] bg-[#102a40]/80 px-3 py-2 shadow-[0_0_8px_1px_var(--cyber-accent),0_0_16px_var(--cyber-accent)] transition-all duration-300 hover:shadow-[0_0_15px_3px_var(--cyber-accent),0_0_30px_var(--cyber-accent)]"
                  >
                <span className="cyber-section-title text-xs font-semibold">
                 {tag}
                </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Two-column content */}
      <div className="flex flex-col lg:flex-row gap-5 min-h-0">
          {/* Message Column */}
          <div className="flex flex-1 flex-col gap-4 rounded-[3px] border border-white/80 bg-[rgba(7,26,44,0.75)] p-6 shadow-[0_0_5px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_45px_var(--cyber-accent)]">
     
<div
  className="border border-white flex flex-col gap-4 p-6 relative rounded-[3px] flex-1 cyber-panel-glow"
  style={{ background: "rgba(7,26,44,0.75)" }}
>
              {/* Message Header */}
              <div className="flex items-center justify-between">
             <h2 className="text-[28px] font-bold leading-tight cyber-main-title cyber-neon-text">
           Simulated Message
</h2>
             <span className="text-base font-semibold cyber-section-title">
                {scenario.message.simulationType}
              </span>
              </div>

              {/* Email / Message Preview */}
              
<div
  className="flex flex-col gap-4 shrink-0 rounded-[3px] border border-white/80 bg-[rgba(7,26,44,0.9)] p-6 shadow-[inset_0_0_12px_rgba(255,255,255,0.08)]"
  style={{ background: "rgba(7,26,44,0.55)" }}
>
                {/* Message metadata */}
                <div
  className="flex items-start justify-between gap-4 text-base"
  style={{
    fontFamily: '"Orbitron", sans-serif',
    color: "var(--cyber-accent)",
    fontWeight: 600,
    textShadow:
      "0 0 3px color-mix(in srgb, var(--cyber-accent) 35%, transparent)",
  }}
>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold opacity-92">From</span>
                    <span className="font-bold opacity-92">{scenario.message.from}</span>
                  </div>
                  <div className="flex flex-col gap-1 text-right">
                    <span className="font-semibold opacity-92">Subject</span>
                    <span className="font-bold opacity-92">{scenario.message.subject}</span>
                  </div>
                </div>

                <div className="h-px bg-[rgba(34,197,94,0.2)]" />

                {/* Body */}
              <div
            className="flex flex-col"
               style={{
              fontFamily: '"Orbitron", sans-serif',
              color: "var(--cyber-accent)",
              fontSize: "16px",
              lineHeight: 1.8,
              letterSpacing: "0.01em",
             textShadow: "0 0 2px color-mix(in srgb, var(--cyber-accent) 40%, transparent)",
                 }}
                 >
      <p className="font-normal leading-[26px] whitespace-pre-wrap break-words">
       {messageText.slice(0, typedLength)}
          {typedLength < messageText.length && (
            <span
            aria-hidden="true"
           className="inline-block ml-1 w-[2px] h-[1em] align-[-0.15em] animate-pulse"
          style={{ backgroundColor: "var(--cyber-accent)" }}
          />
               )}
             </p>
                </div>
              </div>
            </div>
          </div>

          {/* Response Column */}
          <div className="w-[430px] shrink-0 flex flex-col gap-5 h-full">
            {/* What Would You Do */}
           
<div
 className="flex flex-col gap-4 shrink-0 rounded-[3px] border border-white/80 bg-[rgba(7,26,44,0.75)] p-5 shadow-[0_0_5px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_45px_var(--cyber-accent)]"
  style={{ background: "rgba(7,26,44,0.75)" }}
>
             
<div className="flex flex-col gap-2">
  <h3 className="text-xl font-bold cyber-section-title">
    What Would You Do?
  </h3>

  <p className="cyber-body-text">
    Choose the action you would take in response to this message.
  </p>
</div>

           
<div className="flex flex-col gap-3">
  {scenario.responseOptions.map((option) => {
    const isSelected = selectedResponse === option.id;

    return (
      <button
        key={option.id}
        type="button"
        onClick={() => {
          if (isSubmitting) return;

          setSelectedResponse(option.id);
          setSubmitted(false);
          setSubmissionResult(null);
          setSubmissionError(null);
        }}
          className={`flex items-center gap-3 p-3.5 rounded-[3px] border-2 border-[var(--cyber-accent)] text-left w-full transition-all duration-300 ${
         isSelected
       ? "shadow-[0_0_12px_var(--cyber-accent),0_0_25px_var(--cyber-accent)]"
       : "shadow-[0_0_6px_var(--cyber-accent),0_0_12px_var(--cyber-accent)] hover:shadow-[0_0_15px_var(--cyber-accent),0_0_30px_var(--cyber-accent)]"
        }`}
    
      style={{
      backgroundColor: isSelected
    ? "rgba(7, 26, 44, 0.82)"
    : "rgba(7, 26, 44, 0.65)",
         }}
      >
                      <div
                 className={`w-[18px] h-[18px] rounded-full border-2 border-[var(--cyber-accent)] shrink-0 flex items-center justify-center transition-all duration-300 ${
               isSelected
            ? "bg-[var(--cyber-accent)] shadow-[0_0_8px_var(--cyber-accent),0_0_16px_var(--cyber-accent)]"
         : "bg-[color-mix(in_srgb,var(--cyber-accent)_25%,transparent)] shadow-[0_0_6px_var(--cyber-accent),0_0_12px_var(--cyber-accent)]"
                  }`}
                      >
                       {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
          
                       <span
                 className="flex-1 text-[14px] leading-relaxed"
                  style={{
                 fontFamily: '"Exo 2", sans-serif',
                 fontWeight: 700,
                 letterSpacing: "0.01em",
                  color: "#ffffff",
                  textShadow:
                  "0 0 3px rgba(255,255,255,0.45), 0 0 8px rgba(255,255,255,0.18)",
                           }}
                       >
  {option.label}
</span>
                    </button>
                  );
                })}
              </div>

              {submitted ? (
           
<div
  className="rounded-[3px] border px-5 py-4 transition-all duration-300"
 
style={{
  backgroundColor:
    "color-mix(in srgb, var(--cyber-accent) 10%, rgba(7,26,44,0.32))",
  borderColor: "var(--cyber-accent)",
  boxShadow: `
    0 0 8px var(--cyber-accent),
    0 0 24px color-mix(in srgb, var(--cyber-accent) 45%, transparent),
    inset 0 0 18px color-mix(in srgb, var(--cyber-accent) 12%, transparent)
  `,
  backdropFilter: "blur(14px) saturate(140%)",
  WebkitBackdropFilter: "blur(14px) saturate(140%)",
}}
>

<p
  className="text-base font-bold"
  style={{
    fontFamily: '"Orbitron", sans-serif',
    color: "var(--cyber-accent)",
    textShadow:
      "0 0 5px color-mix(in srgb, var(--cyber-accent) 40%, transparent)",
  }}
>
  {submissionResult?.safe ? 'Safe response' : 'Unsafe response'}
</p>


<p
  className="mt-2 text-[15px] leading-relaxed"
  style={{
    fontFamily: '"Orbitron", sans-serif',
    color: "var(--cyber-accent)",
    textShadow:
      "0 0 3px color-mix(in srgb, var(--cyber-accent) 30%, transparent)",
  }}
>
  {submissionResult?.feedback}
</p>
                </div>
              ) : (
              <button
  type="button"
  onClick={handleSubmit}
  disabled={!selectedResponse || isSubmitting || submitted}
  className="w-full rounded border-2 border-[var(--cyber-accent)] px-5 py-3 text-center text-base font-semibold text-white shadow-[0_0_12px_2px_var(--cyber-accent),0_0_24px_var(--cyber-accent)] transition-all duration-300 hover:enabled:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_40px_var(--cyber-accent)] disabled:opacity-40 disabled:cursor-not-allowed"
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
                  Submit Response
                </button>
              )}

{submitted && submissionResult && (

<button
  type="button"
  onClick={handleNextScenario}
  disabled={isAdvancing}
  className="mt-3 w-full px-5 py-4 rounded-[3px] border-2 font-bold text-center transition-all duration-300 hover:brightness-125 hover:drop-shadow-[0_0_22px_var(--cyber-accent)] disabled:opacity-50 disabled:cursor-not-allowed"
  style={{
    fontFamily: '"Orbitron", sans-serif',
    color: "var(--cyber-accent)",
    borderColor: "var(--cyber-accent)",
    backgroundColor: "rgba(7,26,44,0.82)",
    boxShadow:
      "0 0 8px color-mix(in srgb, var(--cyber-accent) 65%, transparent)",
  }}
>
    Next Scenario →
  </button>
)}

{submissionError && (
  <p role="alert" className="mt-2 text-sm text-red-300">
    {submissionError}
  </p>
)}
            </div>

            {/* Human Factors */}
           <div
className="flex flex-col gap-3.5 flex-1 rounded-[3px] border border-white/80 bg-[rgba(7,26,44,0.75)] p-5 shadow-[0_0_5px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_45px_var(--cyber-accent)]"
  style={{ background: "rgba(7,26,44,0.75)" }}
>
              <div className="flex flex-col gap-1 text-[#00ffc8]">
                <h3 
                className="text-xl font-bold leading-snug cyber-section-title">
                  Why Did You Trust or Distrust This Interaction?
                </h3>
                <p className="cyber-body-text">
                  Select the human factors that influenced your response.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                {scenario.humanFactors.map((factor) => {
                  const isChecked = selectedFactors.has(factor.id);
                  return (
                    <button
                      key={factor.id}
                      onClick={() => toggleFactor(factor.id)}
                      className={`flex items-center gap-3 px-3 py-1.5 rounded-[3px] border w-full text-left transition-colors ${
                        isChecked
                          ? 'bg-[rgba(0,255,200,0.12)] border-[rgba(0,255,200,0.6)]'
                          : 'bg-[rgba(255,255,255,0.08)] border-[rgba(255,255,255,0.25)] hover:bg-[rgba(255,255,255,0.12)]'
                      }`}
                      style={{
                  borderColor: "var(--cyber-accent)",
                   boxShadow:
                "0 0 5px var(--cyber-accent), 0 0 12px color-mix(in srgb, var(--cyber-accent) 45%, transparent)",
                    }}
                    >
                      <div
                        className={`w-[18px] h-[18px] rounded-[3px] border-2 border-[var(--cyber-accent)]shrink-0 flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-[var(--cyber-accent)]' : 'bg-[rgba(255,255,255,0.08)]'
                        }`}

                      style={{
                   borderColor: "var(--cyber-accent)",
                 boxShadow: "0 0 7px color-mix(in srgb, var(--cyber-accent) 45%, transparent)",
                        }}
                      >
                        {isChecked && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path
                              d="M1 4L3.5 6.5L9 1"
                              stroke="#071a2c"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                 <span
  className="flex-1 text-[14px] font-semibold leading-normal"
  style={{
    fontFamily: '"Orbitron", sans-serif',
    color: "var(--cyber-accent)",
    textShadow:
      "0 0 4px color-mix(in srgb, var(--cyber-accent) 40%, transparent)",
  }}
>
                        {factor.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
