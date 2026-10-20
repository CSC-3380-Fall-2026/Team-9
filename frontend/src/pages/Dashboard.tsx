
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




import { useNavigate } from 'react-router-dom' 

const bgImage = "/assets/47d8c.png";

const navLinks = ["Dashboard", "Training", "Classes", "Forum", "Profile", "Progress", "Admin"];

const humanFactorCategories = [
  { label: "Authority" },
  { label: "Urgency" },
  { label: "Familiarity" },
  { label: "Reciprocity" },
  { label: "Institutional Trust" },
];

const explorLinks = [
  [
    { label: "Training / Scenario Library" },
    { label: "Progress & Analytics" },
  ],
  [
    { label: "Classes" },
    { label: "Forum" },
  ],
  [
    { label: "Account & Settings" },
    { label: "Admin Center", badge: "Admin only" },
  ],
];

export default function Dashboard() {
  const navigate =useNavigate() 
  return (
    <div className="flex flex-col items-start relative min-h-screen w-full" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={bgImage} />
        <div className="absolute bg-black/35 inset-0" />
      </div>

      {/* Top Navigation */}
      <div className="bg-white border-b border-[#a7a7a3] flex h-[72px] items-center justify-between overflow-clip px-14 relative shrink-0 w-full z-10">
        <div className="flex gap-3 items-center shrink-0">
          <div className="bg-[#e5e5e2] border border-[#202020] rounded-[3px] shrink-0 size-8" />
          <p className="font-bold text-[#202020] text-base whitespace-nowrap">CyberSense</p>
        </div>
        <div className="flex gap-2 items-center shrink-0">
          {navLinks.map((link) => (
            <button
              key={link}
                onClick={() => {
                if (link === 'Dashboard') navigate('/dashboard')
              if (link === 'Training') navigate('/training/account-that-couldnt-wait')
              }}

              className={`flex flex-col items-start overflow-clip px-4 py-2.5 rounded-[3px] shrink-0 border transition-colors cursor-pointer ${
                link === "Dashboard"
                  ? "bg-[#d3d3cf] border-[#a7a7a3] font-bold text-[#202020]"
                  : "bg-white border-white font-medium text-[#202020] hover:bg-[#f0f0ee]"
              }`}
            >
              <span className="text-sm whitespace-nowrap">{link}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Body */}
      <div className="flex flex-col flex-1 gap-6 items-start pb-[38px] pt-[34px] px-14 relative w-full">

        {/* Welcome Section */}
        <div
          className="border border-white flex flex-col gap-5 items-start overflow-clip px-7 py-6 relative rounded-[3px] shrink-0 w-full"
          style={{ background: "rgba(7,26,44,0.75)" }}
        >
          <div className="flex flex-col gap-2 items-start">
            <p className="font-bold text-[#0effd3] text-xs uppercase tracking-wide">Dashboard / Learning overview</p>
            <p className="font-bold text-[#00ffc8] text-[28px] leading-tight">Welcome back, user</p>
            <p className="text-[#00ffc8] text-sm">
              Continue building the human skills that help you recognize and respond to social engineering.
            </p>
          </div>
          <button className="bg-[#363636] flex items-center overflow-clip px-[22px] py-[13px] rounded-[3px] shrink-0 hover:bg-[#4a4a4a] transition-colors cursor-pointer">
            <span className="font-bold text-white text-sm whitespace-nowrap">Continue Training →</span>
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="flex flex-1 gap-5 items-start w-full">

          {/* Left Column */}
          <div className="flex flex-col gap-5 items-start shrink-0 w-[730px]">

            {/* Progress Summary */}
            <div
              className="border border-white flex flex-col gap-4 items-start overflow-clip p-5 relative rounded-[3px] shrink-0 w-full"
              style={{ background: "rgba(7,26,44,0.75)" }}
            >
              <div className="flex items-center justify-between w-full text-[#00ffc8]">
                <p className="font-bold text-xl">Progress summary</p>
                <button className="font-semibold text-xs hover:underline cursor-pointer text-[#00ffc8]">View training →</button>
              </div>
              <div className="flex gap-8 items-center w-full">
                <div className="flex flex-col gap-1 items-start shrink-0 w-[132px] text-[#00ffc8]">
                  <p className="font-bold text-2xl">0%</p>
                  <p className="text-xs">Overall progress</p>
                </div>
                <div className="flex flex-col gap-1 items-start shrink-0 w-[132px] text-[#00ffc8]">
                  <p className="font-bold text-2xl">0 / 18</p>
                  <p className="text-xs">Modules complete</p>
                </div>
                <div className="flex flex-col gap-1 items-start shrink-0 w-[132px] text-[#00ffc8]">
                  <p className="font-bold text-2xl">0 days</p>
                  <p className="text-xs">Learning streak</p>
                </div>
                <div className="flex flex-1 flex-col gap-1.5 items-start min-w-0">
                  <div className="flex items-center justify-between w-full text-[#00ffc8] text-xs">
                    <span>Training progress</span>
                    <span>0 of 6</span>
                  </div>
                  <div className="w-full h-3 rounded-sm overflow-hidden" style={{ background: "rgba(7,26,44,0.75)" }}>
                    <div className="bg-[#00ffc8] h-3 w-0" />
                  </div>
                </div>
              </div>
            </div>

            {/* Human-factor Performance */}
            <div
              className="border border-white flex flex-col gap-3.5 items-start overflow-clip p-5 relative rounded-[3px] shrink-0 w-full"
              style={{ background: "rgba(7,26,44,0.75)" }}
            >
              <div className="flex items-center justify-between w-full text-[#00ffc8]">
                <p className="font-bold text-xl">Human-factor performance</p>
                <p className="font-semibold text-xs">Based on recent scenarios</p>
              </div>

              {/* No data state */}
              <div className="flex flex-col gap-3.5 w-full">
                {humanFactorCategories.map(({ label }) => (
                  <div key={label} className="flex gap-3.5 items-center h-7 w-full">
                    <p className="text-[#00ffc8] text-sm w-[142px] shrink-0">{label}</p>
                    <div className="flex-1 h-2.5 rounded-sm overflow-hidden min-w-0" style={{ background: "rgba(7,26,44,0.75)", border: "1px solid rgba(0,255,200,0.15)" }}>
                      <div className="bg-[#00ffc8] h-2.5 w-0" />
                    </div>
                    <p className="font-bold text-[#00ffc8] text-xs text-right w-[38px] shrink-0">—</p>
                  </div>
                ))}
                <p className="text-[#00ffc8]/60 text-xs mt-1">No data yet — complete scenarios to see your performance.</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5 items-start shrink-0 w-[430px]">

            {/* Recent Scenarios */}
            <div
              className="border border-white flex flex-col gap-3.5 items-start overflow-clip p-5 relative rounded-[3px] shrink-0 w-full"
              style={{ background: "rgba(7,26,44,0.75)" }}
            >
              <div className="flex items-center justify-between w-full text-[#00ffc8]">
                <p className="font-bold text-xl">Recent scenarios</p>
                <button className="font-semibold text-xs hover:underline cursor-pointer text-[#00ffc8]">View all →</button>
              </div>
              {/* Empty state */}
              <div className="flex flex-col items-center justify-center w-full py-8 gap-2">
                <p className="text-[#00ffc8]/60 text-sm text-center">No recent scenarios yet</p>
                <p className="text-[#00ffc8]/40 text-xs text-center">Start training to see your scenario history here.</p>
              </div>
            </div>

            {/* Explore CyberSense */}
            <div className="flex flex-col gap-3 items-start flex-1 w-full">
              <p className="font-bold text-[#00ffc8] text-xl whitespace-nowrap">Explore CyberSense</p>
              <div className="flex flex-col gap-3 flex-1 w-full">
                {explorLinks.map((row, rowIdx) => (
                  <div key={rowIdx} className="flex gap-3 h-[110px] items-start w-full">
                    {row.map(({ label, badge }) => (
                      <button
                        key={label}
                        className="border border-white flex gap-2.5 h-[110px] items-center overflow-clip px-3.5 py-[18px] relative rounded-[3px] shrink-0 w-[209px] hover:bg-[rgba(0,255,200,0.05)] transition-colors cursor-pointer text-left"
                        style={{ background: "rgba(7,26,44,0.75)" }}
                      >
                        <div className="flex flex-1 flex-col gap-1 items-start min-w-0">
                          <p className="font-bold text-[#00ffc8] text-base w-full">{label}</p>
                        </div>
                        {badge && (
                          <div
                            className="border border-white flex items-center overflow-clip px-2.5 py-1.5 rounded-[3px] shrink-0"
                            style={{ background: "rgba(7,26,44,0.75)" }}
                          >
                            <p className="font-bold text-[#00ffc8] text-[11px] whitespace-nowrap">{badge}</p>
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
