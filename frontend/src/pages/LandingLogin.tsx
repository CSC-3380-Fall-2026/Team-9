/*
UPDATES ARE CONSTANT AND I ADD TO THIS
  CyberSense Landing / Login Page

  Okay so umm this page is based on the CyberSense interface designed in we did in Figma.
  Figma Make was used to generate an initial React implementation of
  the design(although with a few modifications cuz figma played but we still need to go in and add clikable
  tabs and i also think we should update some of the info i changed the about us in this section but honetly those can be separate tasks)
  , which was then integrated into the team's existing
  React + TypeScript + Vite frontend.
  oh i also installed tailwind(it was some bs sooo umm yeah) 
  so yall might need to as well it was the only way to intergrate it properly
  

  Right now this page currently includes: 
  CyberSense navigation/header
  Login form
  About CyberSense section
  Platform area cards(cant click on these need to add code for this)
  Responsive layout
  Figma-designed background and SVG assets

  The login form is currently frontend-only.so its absolutely useless lol but thats fine for now.
  Backend authentication and database functionality will be added later.
  teehee.

  okay so im adding navigation as well now cuz... we need it so ive modified the code again
  right now this should allow navigation between landing and dashboard page but this is temporary ofc 
  before actual backend is made.
  Okat teaaaa it works right now just have to press login obvi tho once backen 
  is added user will actuall have to type in passwords.
*/
import { useState, type FormEvent } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

const assetPathPrefix = "/assets";

// This the main area of CyberSense platform that is shown on the landing page.

const platformAreas = [
  {
    name: "Interactive Training",
    icon: `${assetPathPrefix}/83ad3.svg`,
  },
  {
    name: "Progress & Analytics",
    icon: `${assetPathPrefix}/e5a73.svg`,
  },
  {
    name: "Admin and Classes",
    icon: `${assetPathPrefix}/511a9.svg`,
  },
  {
    name: "Community Forum",
    icon: `${assetPathPrefix}/867c2.svg`,
  },
];
// Okay so this will allow this page to move between routes without reloading the site.
export default function LandingLogin() {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);
 

  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Only navigate after the backend verifies the credentials.
  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("username") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    setLoginError("");
    setIsLoggingIn(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setLoginError(
        error instanceof Error ? error.message : "Unable to log in.",
      );
    } finally {
      setIsLoggingIn(false);
    }
  }
  return (
    <main
  className={`relative flex min-h-dvh flex-col overflow-hidden bg-[#071a2c] ${
    showIntro
      ? ""
      : "[&>nav]:animate-[cyber-page-reveal_0.8s_ease-out_both] [&>section]:animate-[cyber-page-reveal_0.8s_ease-out_both]"
  }`}
>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <img
          alt=""
          className="absolute inset-0 size-full max-w-none object-cover"
          src={`${assetPathPrefix}/47d8c.png`}
        />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>
      {showIntro && (
  <div
  role="button"
  tabIndex={0}
  aria-label="Enter CyberSense"
  onClick={() => setShowIntro(false)}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setShowIntro(false);
    }
  }}
  className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-[#071a2c] bg-cover bg-center"
  style={{
    backgroundImage:
      'linear-gradient(rgba(7,26,44,0.75), rgba(7,26,44,0.75)), url("/assets/47d8c.png")',
  }}
>
    <h1
      className="cyber-main-title text-center text-[48px] sm:text-[76px]"
      style={{
        animation: "cyber-title-ignite 2.4s ease-out both",
      }}
    >
      CyberSense
    </h1>
  </div>
)}

      <nav className="relative z-10 flex h-[72px] shrink-0 items-center rounded-none border-2 border-white/90 bg-white/15 px-4 py-2 text-white font-semibold backdrop-blur-2xl shadow-[inset_0_0_12px_rgba(255,255,255,0.12),0_0_8px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/25 hover:shadow-[0_0_18px_3px_var(--cyber-accent),0_0_35px_var(--cyber-accent)]">
        <div>
          <span className="font-['Orbitron'] text-base font-bold text-[var(--cyber-accent)] transition-all duration-300 hover:drop-shadow-[0_0_15px_var(--cyber-accent)]">
            CyberSense
          </span>
        </div>
      </nav>

      <section className="relative flex min-h-[360px] shrink-0 items-start justify-center bg-[rgba(7,26,44,0.75)] px-6 pb-14 pt-[72px] text-center sm:px-10 lg:px-14">
        <div className="flex w-full max-w-[760px] flex-col items-center gap-4 text-[#00ffc8]">
        <h1 className="cyber-main-title text-[46px] sm:text-[56px] leading-tight">
          CyberSense
           </h1>
          <p className="font-['Orbitron'] text-xl text-white leading-normal font-semibold">
            Human-Centered Cybersecurity Training
          </p>
          <p
  className="cyber-body-text drop-shadow-[0_0_4px_rgba(255,255,255,0.35)]"
  style={{ fontSize: "18px" }}
>
            Learn how attackers use both technical tricks and human behavior to
            manipulate users, and how to recognize the warning signs before
            responding.
          </p>
        </div>
      </section>

      <section className="relative flex flex-1 bg-[rgba(7,26,44,0.75)] px-6 py-10 sm:px-10 lg:px-14">
        <div className="flex w-full items-start gap-6 max-lg:flex-col">
          <div className="w-[420px] shrink-0 max-lg:w-full">
            <form
              //after login is submitted sends user to dashboard teehee.
              className="flex w-full flex-col items-start gap-4 rounded-[3px] border border-white/90 bg-[rgba(7,26,44,0.75)] p-6 shadow-[0_0_5px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_45px_var(--cyber-accent)]"
              onSubmit={handleLogin}
            >
             <h2 className="text-2xl font-bold cyber-section-title drop-shadow-[0_0_4px_var(--cyber-accent)]">
                Log In
              </h2>
              {loginError && (
                <p role="alert" className="text-sm text-red-400">
                  {loginError}
                </p>
              )}

           <label className="flex w-full flex-col gap-2 text-sm font-semibold cyber-section-title">
                Email or Username
                <input
                  autoComplete="username"
                  className="h-12 w-full rounded-[3px] border border-white bg-[rgba(7,26,44,0.75)] p-[14px] cyber-body-text outline-none transition-all duration-300 hover:border-[var(--cyber-accent)] hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_40px_var(--cyber-accent)] focus:border-[var(--cyber-accent)] focus:shadow-[0_0_20px_3px_var(--cyber-accent)]"
                  name="username"
                  placeholder="Enter email or username"
                  type="text"
                />
              </label>

              <label className="flex w-full flex-col gap-2 text-sm font-semibold cyber-section-title">
                Password
                <input
                    autoComplete="current-password"
                   className="h-12 w-full rounded-[3px] border border-white bg-[rgba(7,26,44,0.75)] p-[14px] cyber-body-text outline-none transition-all duration-300 hover:border-[var(--cyber-accent)] hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_40px_var(--cyber-accent)] focus:border-[var(--cyber-accent)] focus:shadow-[0_0_20px_3px_var(--cyber-accent)]"
              name="password"
                placeholder="Enter password"
              type="password"
               />
              </label>

             <button
  className="block w-full cursor-pointer rounded border-2 border-[var(--cyber-accent)] px-5 py-3 text-center text-base font-semibold text-white shadow-[0_0_12px_2px_var(--cyber-accent),0_0_24px_var(--cyber-accent)] transition-all duration-300 hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_40px_var(--cyber-accent)]"
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
  type="submit"
  disabled={isLoggingIn}
>
                {isLoggingIn ? "Logging In..." : "Log In"}
              </button>

              <a
              className="text-sm font-semibold cyber-section-title transition-all duration-300 hover:underline hover:drop-shadow-[0_0_12px_var(--cyber-accent)] hover:[text-shadow:0_0_8px_var(--cyber-accent),0_0_18px_var(--cyber-accent),0_0_32px_var(--cyber-accent)]"
                href="#forgot-password"
              >
                Forgot Password?
              </a>

              <p className="flex gap-2 text-sm leading-normal text-[var(--cyber-accent)]">
                <span className="text-sm font-semibold cyber-section-title">
                  New user?
                </span>
                {/* changed this to a button and add onClick to navigate to create account page - Pape */}
                <span
                 className="text-sm font-semibold cyber-section-title transition-all duration-300 hover:underline hover:drop-shadow-[0_0_12px_var(--cyber-accent)] hover:[text-shadow:0_0_8px_var(--cyber-accent),0_0_18px_var(--cyber-accent),0_0_32px_var(--cyber-accent)]"
                  onClick={() => navigate("/CreateAccount")}
                >
                  Create Account
                </span>
              </p>
            </form>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-6 max-lg:w-full">
            <article className="flex flex-col gap-3 rounded-[3px] border border-white/80 bg-[rgba(7,26,44,0.75)] p-5 shadow-[0_0_5px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_45px_var(--cyber-accent)]">
              <h2 className="text-2xl font-bold cyber-section-title">
                About CyberSense
              </h2>
                       <p
  className="font-['Orbitron'] text-[13px] font-normal leading-[1.9] tracking-[0.01em] text-white"
  style={{ fontSize: "18px" }}
>
                CyberSense is an interactive cybersecurtity awareness platform
                focused on both technical threats and the human factors behind
                social engineering. Users work through realsitic scenarios
                involving phishing, impersonation, urgency, authority,
                suspicious links, credential requests, and other manipulation
                techniques. After each scenario, CyberSense explains the warning
                signs, identifies the human and technical cues involved, and
                helps users track patterns in their performance over time.
              </p>
            </article>

            <section className="flex w-full flex-col gap-3">
              <h2 className="font-['Inter:Bold'] text-2xl leading-normal font-bold text-[#00ffc8]">
                Platform areas
              </h2>
              <div className="grid w-full grid-cols-2 gap-3 xl:grid-cols-4">
                {platformAreas.map((area) => (
                  <article
                    className="flex h-[132px] min-w-0 flex-col items-start gap-3 rounded-[3px] border border-white/80 bg-[rgba(7,26,44,0.75)] p-4 shadow-[0_0_5px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_45px_var(--cyber-accent)]"
                    key={area.name}
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-[3px] border border-white bg-[rgba(7,26,44,0.75)]">
                      <img alt="" src={area.icon} />
                    </div>
                    <h3 className="text-base font-bold cyber-section-title">
                      {area.name}
                    </h3>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
