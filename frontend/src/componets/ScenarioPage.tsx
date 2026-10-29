/*
  CyberSense Reusable Scenario Page

  Displays cybersecurity training scenarios using one reusable page layout.
  Scenario titles, messages, response choices, and human-factor choices
  come from the scenario data library instead of being permanently hard-coded.
  User selections are currently stored only in React state.
  No scenario results are permanently saved because the backend/database
  has not been connected yet.
  React Router is used to move between CyberSense pages.
  multiple issues because we have no library when pulling figma design tempkate came 
  to im trying to get rid of that but realistically 
  the scenario page and analtic page need the backend set up to
  be proparly display frontednd wise
  we have no libary
  working on tempoary navigation...tearss
*/




import { useState } from 'react';
import type { Scenario } from '../types/scenario'
import { useNavigate } from 'react-router-dom'; 

interface ScenarioPageProps {
  scenario: Scenario;
  /** Called when the user clicks "Back to Scenario Library". Falls back to an <a> href when omitted. */
  onBack?: () => void;
  /** Active nav item label. Defaults to "Training". */
  activeNav?: string;
}

const NAV_ITEMS = ['Dashboard', 'Training', 'Classes', 'Forum', 'Profile', 'Progress', 'Admin'];

export default function ScenarioPage({ scenario, onBack, activeNav = 'Training' }: ScenarioPageProps) {
    const navigate = useNavigate()
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const [selectedFactors, setSelectedFactors] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  function toggleFactor(id: string) {
    setSelectedFactors((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function handleSubmit() {
    if (!selectedResponse) return;
    setSubmitted(true);
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
        className="relative z-10 flex items-center justify-between h-[72px] px-14 bg-white border-b border-[#a7a7a3] shrink-0"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#e5e5e2] border border-[#202020] rounded-[3px] shrink-0" />
          <span className="font-bold text-[#202020] text-base leading-none">CyberSense</span>
        </div>
        <div className="flex items-center gap-2">
          {NAV_ITEMS.map((item) => {
            const active = item === activeNav;
            return (
              <button
                key={item}
                onClick={() => {
  if (item === 'Dashboard') navigate('/dashboard')
  if (item === 'Training') navigate('/training/account-that-couldnt-wait')
  }}
                className={`px-4 py-2.5 rounded-[3px] text-sm border leading-none transition-colors ${
                  active
                    ? 'bg-[#d3d3cf] border-[#a7a7a3] font-bold text-[#202020]'
                    : 'bg-white border-white font-medium text-[#202020] hover:bg-[#f0f0ed]'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Page Content */}
      <main className="relative z-10 flex-1 flex flex-col gap-6 px-14 py-9 pb-10 min-h-0">
        {/* Scenario Header Panel */}
        <div className="backdrop-blur-[9px] bg-[rgba(7,26,44,0.75)] border border-[rgba(241,93,85,0.2)] rounded-[3px] shadow-[0px_12px_24px_0px_rgba(0,0,0,0.2)] p-6 flex flex-col gap-4 shrink-0">
          {/* Header Top */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2 text-[#0effd3]">
              <p className="text-xs uppercase tracking-wide font-semibold opacity-80">
                CyberSense / {scenario.scenarioType}
              </p>
              <h1 className="text-[28px] font-bold leading-tight">{scenario.scenarioType}</h1>
              <p className="text-sm font-normal opacity-80 max-w-2xl">{scenario.description}</p>
            </div>
            <div className="flex flex-col items-end gap-2.5 shrink-0">
              <div className="bg-[rgba(34,197,94,0.07)] border border-[rgba(34,197,94,0.25)] rounded-[3px] px-3 py-2">
                <span className="text-[#0effd3] text-xs font-semibold whitespace-nowrap">
                  Scenario
                </span>
              </div>
              {onBack ? (
                <button
                  onClick={onBack}
                  className="text-[#0effd3] text-[13px] font-semibold hover:underline whitespace-nowrap"
                >
                  Back to Scenario Library
                </button>
              ) : (
                <a
                  href="/scenarios"
                  className="text-[#0effd3] text-[13px] font-semibold hover:underline whitespace-nowrap"
                >
                  Back to Scenario Library
                </a>
              )}
            </div>
          </div>

          {/* Scenario Details */}
          <div className="flex items-center gap-3">
            <div className="flex-1 flex flex-col gap-1 text-[#0effd3] min-w-0">
              <h2 className="text-2xl font-bold leading-tight">{scenario.title}</h2>
              <p className="text-[13px] font-normal opacity-80">
                {scenario.message.simulationType} · Review the message, choose a response, and explain the human factors that influenced your decision.
              </p>
            </div>
            {scenario.tags.length > 0 && (
              <div className="flex items-center gap-2 shrink-0">
                {scenario.tags.map((tag) => (
                  <div
                    key={tag}
                    className="bg-[rgba(34,197,94,0.07)] border border-[rgba(34,197,94,0.25)] rounded-[3px] px-2.5 py-1.5"
                  >
                    <span className="text-[#0effd3] text-xs font-semibold">{tag}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Two-column content */}
        <div className="flex-1 flex gap-5 min-h-0">
          {/* Message Column */}
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="backdrop-blur-[9px] bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.4)] rounded-[3px] shadow-[0px_12px_24px_0px_rgba(0,0,0,0.2)] p-6 flex flex-col gap-4 flex-1">
              {/* Message Header */}
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold uppercase text-[#00ffc8] opacity-92">
                  Simulated Message
                </span>
                <span className="text-base font-semibold text-[#00ffc8] opacity-92">
                  {scenario.message.simulationType}
                </span>
              </div>

              {/* Email / Message Preview */}
              <div className="backdrop-blur-[7px] bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.25)] rounded-[3px] shadow-[0px_8px_16px_0px_rgba(0,0,0,0.12)] p-5 flex flex-col gap-4">
                {/* Message metadata */}
                <div className="flex items-start justify-between text-[#00ffc8] text-base">
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
                <div className="flex flex-col text-[#00ffc8] text-base opacity-92">
                  {scenario.message.body.map((line, i) => (
                    <p key={i} className="font-normal leading-[26px]">
                      {line}
                    </p>
                  ))}
                  {scenario.message.highlightedLink && (
                    <p className="font-bold leading-[26px] break-all">
                      {scenario.message.highlightedLink}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Response Column */}
          <div className="w-[430px] shrink-0 flex flex-col gap-5 h-full">
            {/* What Would You Do */}
            <div className="backdrop-blur-[9px] bg-[rgba(7,26,44,0.75)] border border-[rgba(255,255,255,0.4)] rounded-[3px] shadow-[0px_12px_24px_0px_rgba(0,0,0,0.2)] p-5 flex flex-col gap-4 shrink-0">
              <div className="flex flex-col gap-1 text-[#00ffc8]">
                <h3 className="text-xl font-bold uppercase opacity-92">What Would You Do?</h3>
                <p className="text-[13px] font-normal opacity-92">
                  Choose the action you would take in response to this message.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {scenario.responseOptions.map((option) => {
                  const isSelected = selectedResponse === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSelectedResponse(option.id);
                        setSubmitted(false);
                      }}
                      className={`flex items-center gap-3 p-3.5 rounded-[3px] border text-left w-full transition-colors ${
                        isSelected
                          ? 'bg-[rgba(0,255,200,0.12)] border-[rgba(0,255,200,0.6)]'
                          : 'bg-[rgba(255,255,255,0.08)] border-[rgba(255,255,255,0.25)] hover:bg-[rgba(255,255,255,0.12)]'
                      }`}
                    >
                      <div
                        className={`w-[18px] h-[18px] rounded-[9px] border-2 border-[#00ffc8] shrink-0 flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-[#00ffc8]' : 'bg-[rgba(255,255,255,0.08)]'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-[#071a2c]" />}
                      </div>
                      <span className="flex-1 font-semibold text-[14px] text-[#00ffc8] opacity-92 leading-normal">
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {submitted ? (
                <div className="bg-[rgba(0,255,200,0.12)] border border-[rgba(0,255,200,0.4)] rounded-[3px] px-5 py-3">
                  <p className="font-bold text-[#00ffc8] text-sm">Response submitted.</p>
                </div>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!selectedResponse}
                  className="bg-[#00ffc8] text-[#071a2c] font-bold text-[14px] px-[22px] py-[13px] rounded-[3px] leading-none transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:opacity-90 w-fit"
                >
                  Submit Response
                </button>
              )}
            </div>

            {/* Human Factors */}
            <div className="backdrop-blur-[9px] bg-[rgba(7,26,44,0.75)] border border-[rgba(255,255,255,0.4)] rounded-[3px] shadow-[0px_12px_24px_0px_rgba(0,0,0,0.2)] p-5 flex flex-col gap-3.5 flex-1">
              <div className="flex flex-col gap-1 text-[#00ffc8]">
                <h3 className="text-xl font-bold uppercase opacity-92 leading-tight">
                  Why Did You Trust or Distrust This Interaction?
                </h3>
                <p className="text-[13px] font-normal opacity-92">
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
                    >
                      <div
                        className={`w-[18px] h-[18px] rounded-[3px] border-2 border-[#00ffc8] shrink-0 flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-[#00ffc8]' : 'bg-[rgba(255,255,255,0.08)]'
                        }`}
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
                      <span className="flex-1 font-semibold text-[14px] text-[#00ffc8] opacity-92 leading-normal">
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
