import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchThreads } from "../services/forumService";
import type { ForumThread } from "../types/forum";

const bgImage = "/assets/47d8c.png";
const panelClass =
  "border border-white/90 flex flex-col gap-4 items-start overflow-clip p-5 relative rounded-[3px] shrink-0 w-full shadow-[0_0_5px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_45px_var(--cyber-accent)]";
const panelStyle = { background: "rgba(7,26,44,0.75)" };

export default function ForumPage() {
  const navigate = useNavigate();
  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchThreads()
      .then(setThreads)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-[#071a2c]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img alt="" className="absolute inset-0 size-full max-w-none object-cover" src={bgImage} />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      

<nav className="relative z-10 flex flex-col items-start gap-1 border-b-2 border-white/90 bg-white/15 px-4 py-3 backdrop-blur-2xl">
  <Link
    to="/"
    className="font-bold text-[var(--cyber-accent)] transition-all duration-300 hover:drop-shadow-[0_0_15px_var(--cyber-accent)]"
    style={{ fontFamily: '"Orbitron", sans-serif' }}
  >
    CyberSense
  </Link>

  <div className="flex flex-wrap gap-3 text-sm">
    {[
      { label: "Dashboard", to: "/dashboard" },
      { label: "Training", to: "/training" },
      { label: "Progress", to: "/analytics" },
    ].map((item) => (
      <Link
        key={item.to}
        to={item.to}
        className="rounded-none border-2 border-[var(--cyber-accent)] bg-[rgba(7,26,44,0.85)] px-4 py-2 font-semibold text-[var(--cyber-accent)] shadow-[0_0_8px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_40px_var(--cyber-accent)]"
      >
        {item.label}
      </Link>
    ))}
  </div>
</nav>

      <div className="relative z-10 flex flex-col items-start gap-6 px-14 pb-[38px] pt-[34px] w-full">
        <div
         
className="border border-white/90 flex flex-col gap-5 items-start overflow-clip px-7 py-6 rounded-[3px] w-full shadow-[0_0_5px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_45px_var(--cyber-accent)]"
          style={panelStyle}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-2 items-start">
           <p
  className="text-xs font-semibold uppercase tracking-widest"
  style={{
    fontFamily: '"Orbitron", sans-serif',
    color: "var(--cyber-accent)",
    textShadow: "0 0 8px var(--cyber-accent)",
  }}
>
                Forum / Discussion
              </p>
              <h1
  className="text-[30px] font-semibold leading-tight"
  style={{
    fontFamily: '"Orbitron", sans-serif',
    color: "var(--cyber-accent)",
    textShadow:
      "0 0 5px var(--cyber-accent), 0 0 14px var(--cyber-accent), 0 0 30px var(--cyber-accent), 0 0 48px color-mix(in srgb, var(--cyber-accent) 55%, transparent)",
  }}
>
  Forum
</h1>
             <p className="text-sm leading-relaxed cyber-body-text">
                Ask questions and share what you've noticed about suspicious messages.
              </p>
            </div>
           <button
  onClick={() => navigate("/forum/new")}
  className="cursor-pointer rounded-[3px] border-2 border-[var(--cyber-accent)] px-[22px] py-[13px] text-white shadow-[0_0_12px_2px_var(--cyber-accent),0_0_24px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_40px_var(--cyber-accent)]"
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
              <span className="font-bold text-white text-sm whitespace-nowrap">New thread +</span>
            </button>
          </div>
        </div>

        <div className={panelClass} style={panelStyle}>
        <h2 className="text-xl font-bold cyber-section-title">
  Threads
</h2>

          {loading && <p className="text-white/60 text-sm">Loading threads…</p>}
          {error && <p role="alert" className="text-sm text-red-400">{error}</p>}

          {!loading && !error && threads.length === 0 && (
            <p className="text-white/60 text-sm">No threads yet. Start the first discussion.</p>
          )}

          <div className="flex flex-col gap-3 w-full">
            {threads.map((t) => (
              <button
                key={t.id}
                onClick={() => navigate(`/forum/${t.id}`)}
               className="flex w-full cursor-pointer flex-col items-start gap-1 rounded-[3px] border border-white/90 px-4 py-3 text-left shadow-[0_0_5px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_45px_var(--cyber-accent)]"
                style={panelStyle}
              >
                
<p
  className="text-base font-semibold"
  style={{
    fontFamily: '"Orbitron", sans-serif',
    color: "var(--cyber-accent)",
    textShadow:
      "0 0 5px color-mix(in srgb, var(--cyber-accent) 55%, transparent)",
  }}
>{t.title}</p>
                <p className="text-sm leading-relaxed cyber-body-text opacity-80">
                  by {t.authorName} · {new Date(t.createdAt).toLocaleString()}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}