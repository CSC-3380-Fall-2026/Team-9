import { getCsrfToken } from "../services/csrfService";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const assetPathPrefix = "/assets"

export default function CreateAccount() { 
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError("")

        if (password !== confirmPassword) {
            setError("Passwords don't match.")
            return
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters.")
            return
        }

        setLoading(true)
        try {
            // needs to run on network to test use "npm run dev -- --host"
        
const csrf = await getCsrfToken();

const res = await fetch("/api/users/register", {
  method: "POST",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
    [csrf.headerName]: csrf.token,
  },
  body: JSON.stringify({ email, username, password }),
});

            if (!res.ok) {
                const message = await res.text()
                setError(message || "Something went wrong. Please try again.")
                return
            }

            navigate("/")
        } catch {
            setError("Couldn't reach the server. Is the backend running?")
        } finally {
            setLoading(false)
        }
    }
    return (
        <main className="relative flex min-h-dvh flex-col overflow-hidden bg-[#071a2c]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <img
                    alt=""
                    className="absolute inset-0 size-full max-w-none object-cover"
                    src={`${assetPathPrefix}/47d8c.png`}
                />
               <div className="absolute inset-0 bg-[rgba(7,26,44,0.75)] backdrop-blur-[2px]" />
            </div>

         <nav className="relative z-10 flex h-[72px] shrink-0 items-center rounded-none border-2 border-white/90 bg-white/15 px-4 py-2 text-white font-semibold backdrop-blur-2xl shadow-[inset_0_0_12px_rgba(255,255,255,0.12),0_0_8px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/25 hover:shadow-[0_0_18px_3px_var(--cyber-accent),0_0_35px_var(--cyber-accent)]">
                <div>
                    <span className="cyber-display text-base font-bold text-[var(--cyber-accent)] transition-all duration-300 hover:drop-shadow-[0_0_15px_var(--cyber-accent)]">
                        CyberSense
                    </span>
                </div>
            </nav>
            <section className="relative flex min-h-[200px] shrink-0 items-start justify-center px-6 pb-14 pt-[72px] text-center sm:px-10 lg:px-14">
                <div className="flex w-full max-w-[760px] flex-col items-center gap-4 text-[#00ffc8]">
                    <h1 className="cyber-main-title text-[44px] sm:text-[56px] leading-tight">
                        CyberSense
                    </h1>
                    <p className="font-['Orbitron'] text-xl font-semibold leading-normal text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.35)]">
                        Create an account 
                    </p>
                </div>
            </section>
            <section className="relative z-10 flex flex-1 items-start justify-center px-6 pb-20 sm:px-10 lg:px-14">
                <form
                    onSubmit={handleSubmit}
                    className="flex w-full max-w-[420px] flex-col gap-4 rounded-[3px] border border-white/80 bg-[rgba(7,26,44,0.75)] p-8 shadow-[0_0_5px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_45px_var(--cyber-accent)]"
                >
                    <div className="flex flex-col gap-1">
                        <label htmlFor="username" className="text-sm font-semibold cyber-section-title">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="h-12 w-full rounded-[3px] border border-white bg-[rgba(7,26,44,0.75)] p-[14px] cyber-body-text outline-none transition-all duration-300 hover:border-[var(--cyber-accent)] hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_40px_var(--cyber-accent)] focus:border-[var(--cyber-accent)] focus:shadow-[0_0_20px_3px_var(--cyber-accent)]"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-sm font-semibold cyber-section-title">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-12 w-full rounded-[3px] border border-white bg-[rgba(7,26,44,0.75)] p-[14px] cyber-body-text outline-none transition-all duration-300 hover:border-[var(--cyber-accent)] hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_40px_var(--cyber-accent)] focus:border-[var(--cyber-accent)] focus:shadow-[0_0_20px_3px_var(--cyber-accent)]"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-sm font-semibold cyber-section-title">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={8}
                            className="h-12 w-full rounded-[3px] border border-white bg-[rgba(7,26,44,0.75)] p-[14px] cyber-body-text outline-none transition-all duration-300 hover:border-[var(--cyber-accent)] hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_40px_var(--cyber-accent)] focus:border-[var(--cyber-accent)] focus:shadow-[0_0_20px_3px_var(--cyber-accent)]"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="confirmPassword" className="text-sm font-semibold cyber-section-title">
                            Confirm password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength={8}
                            className="h-12 w-full rounded-[3px] border border-white bg-[rgba(7,26,44,0.75)] p-[14px] cyber-body-text outline-none transition-all duration-300 hover:border-[var(--cyber-accent)] hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_40px_var(--cyber-accent)] focus:border-[var(--cyber-accent)] focus:shadow-[0_0_20px_3px_var(--cyber-accent)]"
                        />
                    </div>

                    {error && (
                        <p
  role="alert"
  className="text-sm font-semibold text-red-300 cyber-body-text"
  style={{ color: "#fca5a5" }}
>
  {error}
</p>
                    )}

                  <button
  type="submit"
  disabled={loading}
  className="mt-2 block w-full cursor-pointer rounded border-2 border-[var(--cyber-accent)] px-5 py-3 text-center text-base font-semibold text-white shadow-[0_0_12px_2px_var(--cyber-accent),0_0_24px_var(--cyber-accent)] transition-all duration-300 hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_40px_var(--cyber-accent)] disabled:opacity-60"
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
                        {loading ? "Creating account..." : "Create account"}
                    </button>
                    <p className="text-center text-sm cyber-section-title">
  Already have an account?{" "}
  <button
    type="button"
    onClick={() => navigate("/")}
    className="cursor-pointer font-bold transition-all duration-300 hover:underline hover:drop-shadow-[0_0_12px_var(--cyber-accent)] hover:[text-shadow:0_0_8px_var(--cyber-accent),0_0_18px_var(--cyber-accent)]"
  >
    Log In
  </button>
</p>
                </form>
            </section>
        </main>
    )
}