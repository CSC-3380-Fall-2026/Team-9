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
            const res = await fetch("http://localhost:8080/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, username, password }),
            })

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
                <div className="absolute inset-0 bg-[#071a2c]/80" />
            </div>

            <nav className="relative z-10 flex h-[72px] shrink-0 items-center border-b border-[#a7a7a3] bg-white px-6 sm:px-10 lg:px-14">
                <div className="flex items-center gap-3">
                    <div
                        aria-hidden="true"
                        className="size-8 rounded-[3px] border border-[#202020] bg-[#e5e5e2]"
                    />
                    <span className="font-['Inter:Bold'] text-base font-bold text-[#202020]">
                        CyberSense
                    </span>
                </div>
            </nav>
            <section className="relative flex min-h-[200px] shrink-0 items-start justify-center px-6 pb-14 pt-[72px] text-center sm:px-10 lg:px-14">
                <div className="flex w-full max-w-[760px] flex-col items-center gap-4 text-[#00ffc8]">
                    <h1 className="font-['Inter:Bold'] text-[44px] leading-normal font-bold sm:text-[56px]">
                        CyberSense
                    </h1>
                    <p className="font-['Inter:Semi_Bold'] text-xl leading-normal font-semibold">
                        Create an account 
                    </p>
                </div>
            </section>
            <section className="relative z-10 flex flex-1 items-start justify-center px-6 pb-20 sm:px-10 lg:px-14">
                <form
                    onSubmit={handleSubmit}
                    className="flex w-full max-w-[420px] flex-col gap-4 rounded-[6px] border border-[#a7a7a3] bg-white p-8"
                >
                    <div className="flex flex-col gap-1">
                        <label htmlFor="username" className="font-['Inter:Semi_Bold'] text-sm font-semibold text-[#202020]">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="rounded-[3px] border border-[#a7a7a3] px-3 py-2 text-[#202020] outline-none focus:border-[#071a2c]"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-['Inter:Semi_Bold'] text-sm font-semibold text-[#202020]">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="rounded-[3px] border border-[#a7a7a3] px-3 py-2 text-[#202020] outline-none focus:border-[#071a2c]"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-['Inter:Semi_Bold'] text-sm font-semibold text-[#202020]">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={8}
                            className="rounded-[3px] border border-[#a7a7a3] px-3 py-2 text-[#202020] outline-none focus:border-[#071a2c]"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="confirmPassword" className="font-['Inter:Semi_Bold'] text-sm font-semibold text-[#202020]">
                            Confirm password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength={8}
                            className="rounded-[3px] border border-[#a7a7a3] px-3 py-2 text-[#202020] outline-none focus:border-[#071a2c]"
                        />
                    </div>

                    {error && (
                        <p className="text-sm font-semibold text-red-600">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 rounded-[3px] bg-[#071a2c] px-4 py-2 font-['Inter:Semi_Bold'] font-semibold text-[#00ffc8] disabled:opacity-60"
                    >
                        {loading ? "Creating account..." : "Create account"}
                    </button>
                </form>
            </section>
        </main>
    )
}