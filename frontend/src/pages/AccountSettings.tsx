
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface AccountUser {
  id: number;
  username: string;
  email: string;
}

const panel =
  "rounded-[3px] border border-white/80 bg-[rgba(7,26,44,0.75)] p-5 shadow-[0_0_5px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_45px_var(--cyber-accent)]";

/**
 * CyberSense Account & Settings
 *
 * Displays the authenticated user's account information.
 * Additional account preferences and security features
 * will be added as their backend support becomes available.
 */
export default function AccountSettings() {
  const [user, setUser] = useState<AccountUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState(
  () => localStorage.getItem("cybersense-theme") || "turquoise"
          );

  useEffect(() => {
    const controller = new AbortController();

    async function loadUser() {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "same-origin",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load account information.");
        }

        const data: AccountUser = await response.json();
        setUser(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            err instanceof Error ? err.message : "Something went wrong."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadUser();

    return () => controller.abort();
  }, []);
  useEffect(() => {
  document.documentElement.dataset.cyberTheme = theme;
  localStorage.setItem("cybersense-theme", theme);
}, [theme]);

  return (
    <main
    className="min-h-screen text-[var(--cyber-accent)]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 8, 20, 0.4), rgba(0, 8, 20, 0.5)), url("/assets/47d8c.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <header 

className="rounded-none border-2 border-white/90 bg-white/15 px-4 py-2 text-white font-semibold backdrop-blur-2xl shadow-[inset_0_0_12px_rgba(255,255,255,0.12),0_0_8px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/25 hover:shadow-[0_0_18px_3px_var(--cyber-accent),0_0_35px_var(--cyber-accent)]">
       <Link
  to="/"
  className="font-bold text-[var(--cyber-accent)] transition-all duration-300 hover:drop-shadow-[0_0_15px_var(--cyber-accent)]"
  style={{ fontFamily: '"Orbitron", sans-serif' }}
>
          CyberSense
        </Link>

        <nav className="flex flex-wrap gap-3 text-sm">
          <Link to="/dashboard" 

className="rounded-none border-2 border-[var(--cyber-accent)] bg-[rgba(7,26,44,0.85)] px-4 py-2 font-semibold text-[var(--cyber-accent)] shadow-[0_0_8px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:bg-[rgba(7,26,44,0.65)] hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_40px_var(--cyber-accent)]">
            Dashboard
          </Link>
          <Link to="/training" 

className="rounded-none border-2 border-[var(--cyber-accent)] bg-[rgba(7,26,44,0.85)] px-4 py-2 font-semibold text-[var(--cyber-accent)] shadow-[0_0_8px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:bg-[rgba(7,26,44,0.65)] hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_40px_var(--cyber-accent)]">
            Training
          </Link>
          <Link to="/analytics" 

className="rounded-none border-2 border-[var(--cyber-accent)] bg-[rgba(7,26,44,0.85)] px-4 py-2 font-semibold text-[var(--cyber-accent)] shadow-[0_0_8px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:bg-[rgba(7,26,44,0.65)] hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_40px_var(--cyber-accent)]">
            Progress
          </Link>
        </nav>
      </header>

      <div className="mx-auto max-w-[1450px] space-y-6 p-6">
        <section className={panel}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p
  className="text-xs font-semibold uppercase tracking-widest"
  style={{
    fontFamily: '"Orbitron", sans-serif',
    color: "var(--cyber-accent)",
    textShadow: "0 0 8px var(--cyber-accent)",
  }}
>
                CyberSense / Account & Settings
              </p>
             

<h1 className="mt-2 text-[30px] cyber-main-title">
                Account & Settings
              </h1>
            
<p className="mt-2 text-sm leading-relaxed cyber-body-text">
                Manage your profile, security, training preferences,
                and privacy settings.
              </p>
            </div>

            <Link to="/dashboard" 
className="text-sm font-semibold transition-all duration-300 hover:-translate-x-1 hover:drop-shadow-[0_0_12px_var(--cyber-accent)] hover:[text-shadow:0_0_8px_var(--cyber-accent),0_0_18px_var(--cyber-accent),0_0_32px_var(--cyber-accent)]">
             ← Back to Dashboard
            </Link>
          </div>
        </section>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          <section className={`${panel} lg:col-span-2`}>
           <h2 className="text-xl font-bold cyber-section-title">
  Profile Information
</h2>
            <p className="mt-1 text-sm leading-relaxed cyber-body-text">
              Your CyberSense account details.
            </p>

            {loading && <p className="mt-5">Loading your account...</p>}

            {error && (
              <p role="alert" className="mt-5 text-red-300">
                {error}
              </p>
            )}

            {user && (
              <div className="mt-5 flex flex-col gap-5 sm:flex-row">
                <div 
className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[3px] border-2 border-white/90 bg-[rgba(7,26,44,0.75)] text-3xl font-bold text-[var(--cyber-accent)] shadow-[0_0_10px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_22px_3px_var(--cyber-accent),0_0_40px_var(--cyber-accent)]">
                  {user.username.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <label className="text-sm font-semibold cyber-section-title">Username</label>
                    <input
                      readOnly
                      value={user.username}
                     
className="mt-1 w-full rounded-[3px] border border-white/80 bg-[rgba(7,26,44,0.75)] p-3 text-white cyber-body-text transition-all duration-300 hover:border-[var(--cyber-accent)] hover:shadow-[0_0_12px_var(--cyber-accent)]"
                    />
                  </div>

                  <div>
                    <label 
className="text-sm font-semibold cyber-section-title">Email Address</label>
                    <input
                      readOnly
                      value={user.email}
                   
className="mt-1 w-full rounded-[3px] border border-white/80 bg-[rgba(7,26,44,0.75)] p-3 text-white cyber-body-text transition-all duration-300 hover:border-[var(--cyber-accent)] hover:shadow-[0_0_12px_var(--cyber-accent)]"
                    />
                  </div>

                  <p className="text-xs text-gray-300">
                    Profile editing update soon
                  </p>
                </div>
              </div>
            )}
          </section>

{/* Training Preferences — right column */}
<aside className={panel}>
  <h2 className="text-xl font-bold cyber-section-title">
  Training Preferences
</h2>
 
<p className="mt-1 text-sm leading-relaxed cyber-body-text">
    Tailor your training experience to your needs.
  </p>

<div className="mt-5">
  <label
    htmlFor="theme-color"
  className="mb-2 block text-sm font-semibold cyber-section-title"
  >
    CyberSense Theme Color
  </label>

  <select
    id="theme-color"
    value={theme}
    onChange={(e) => setTheme(e.target.value)}
   
className="w-full rounded-[3px] border border-white/80 bg-[rgba(7,26,44,0.75)] p-3 text-white cyber-body-text transition-all duration-300 hover:border-[var(--cyber-accent)] hover:shadow-[0_0_18px_2px_var(--cyber-accent)] focus:outline-none focus:border-[var(--cyber-accent)] focus:shadow-[0_0_18px_2px_var(--cyber-accent)] cursor-pointer"
  >
    <option value="turquoise">Neon Turquoise</option>
    <option value="green">Neon Green</option>
    <option value="yellow">Neon Yellow</option>
    <option value="orange">Neon Orange</option>
    <option value="pink">Neon Pink</option>
    <option value="purple">Neon Purple</option>
    <option value="red">Neon Red</option>
    <option value="blue">Neon Blue</option>
  </select>
</div>

  <div className="mt-5 space-y-4">
    <div>
      <p 
className="mb-1 text-sm font-semibold cyber-section-title">
        Preferred Difficulty Level
      </p>
     
<div className="rounded-[3px] border border-white/80 bg-[rgba(7,26,44,0.75)] p-3 cyber-body-text transition-all duration-300 hover:border-[var(--cyber-accent)] hover:shadow-[0_0_12px_var(--cyber-accent)]">
        Not configured
      </div>
    </div>

    <div>
      <p 
className="mb-1 text-sm font-semibold cyber-section-title">
        Scenario Categories of Interest
      </p>
      
<div className="rounded-[3px] border border-white/80 bg-[rgba(7,26,44,0.75)] p-3 cyber-body-text transition-all duration-300 hover:border-[var(--cyber-accent)] hover:shadow-[0_0_12px_var(--cyber-accent)]">
        Not configured
      </div>
    </div>

    <div>
      <p 
className="mb-1 text-sm font-semibold cyber-section-title">
        Notification Preferences
      </p>
      
<div className="rounded-[3px] border border-white/80 bg-[rgba(7,26,44,0.75)] p-3 cyber-body-text transition-all duration-300 hover:border-[var(--cyber-accent)] hover:shadow-[0_0_12px_var(--cyber-accent)]">
        Not configured
      </div>
    </div>
  </div>

  <p className="mt-5 text-xs text-gray-300">
    Custom training preferences will become available
    when account settings can be saved.
  </p>
</aside>

{/* Account Security — below Profile Information */}
<section className={`${panel} lg:col-span-2`}>
  <h2 className="text-xl font-bold cyber-section-title">
  Account Security
</h2>
  <p className="mt-1 text-sm text-gray-300">
    Protect your account with stronger sign-in controls.
  </p>

  <div className="mt-5 space-y-4">
   
<div className="rounded-[3px] border border-white/80 bg-[rgba(7,26,44,0.75)] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_18px_2px_var(--cyber-accent)]">
     <h3 className="font-semibold cyber-section-title">
  Change Password
</h3>
      <p className="mt-2 text-sm leading-relaxed cyber-body-text">
        Password changes are not available yet.
        
      </p>
    </div>

  
<div className="rounded-[3px] border border-white/80 bg-[rgba(7,26,44,0.75)] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_18px_2px_var(--cyber-accent)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
       <h3 className="font-semibold cyber-section-title">
         Two-Factor Authentication / MFA
       </h3>
        <span className="rounded border border-cyan-300/40 px-3 py-1 text-xs">
          Not configured
        </span>
      </div>

     <p className="mt-2 text-sm leading-relaxed cyber-body-text">
        Additional sign-in verification will be available
        when MFA support is added UwU.
      </p>
    </div>
  </div>
</section>

{/* Privacy / Data — below Training Preferences */}
<aside className={panel}>
<h2 className="text-xl font-bold cyber-section-title">
  Privacy / Data
</h2>
  
<p className="mt-1 text-sm leading-relaxed cyber-body-text">
    Review information connected to your account.
  </p>

  <div className="mt-5 space-y-3">
    <Link
      to="/analytics"
      
className="block rounded-[3px] border border-white/80 bg-[rgba(7,26,44,0.75)] p-3 text-sm font-semibold cyber-body-text transition-all duration-300 hover:-translate-y-1 hover:border-[var(--cyber-accent)] hover:shadow-[0_0_20px_3px_var(--cyber-accent)] focus-visible:outline-2 focus-visible:outline-[var(--cyber-accent)]"
    >
      View Progress & Analytics
    </Link>

   <div className="rounded-[3px] border border-white/80 bg-[rgba(7,26,44,0.75)] p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_18px_2px_var(--cyber-accent)]">
      <p className="text-sm font-semibold cyber-section-title">
        Manage Saved Training History
      </p>
    <p className="mt-2 text-sm leading-relaxed cyber-body-text">
        History management is not available yet UwU.
      </p>
    </div>
  </div>
</aside>
        </div>
      </div>
    </main>
  );
}