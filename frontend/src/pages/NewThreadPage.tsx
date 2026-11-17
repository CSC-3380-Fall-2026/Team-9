import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createThread } from "../services/forumService";

const bgImage = "/assets/47d8c.png";

export default function NewThreadPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim() || !body.trim()) {
      setError("Title and message are required.");
      return;
    }

    setLoading(true);
    try {
      const thread = await createThread(title.trim(), body.trim());
      navigate(`/forum/${thread.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not post thread.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-[#071a2c]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img alt="" className="absolute inset-0 size-full max-w-none object-cover" src={bgImage} />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      <nav className="relative z-10 flex min-h-[72px] shrink-0 items-center justify-between gap-3 rounded-none border-2 border-white/90 bg-white/15 px-4 py-2 text-white font-semibold backdrop-blur-2xl shadow-[inset_0_0_12px_rgba(255,255,255,0.12),0_0_8px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/25 hover:shadow-[0_0_18px_3px_var(--cyber-accent),0_0_35px_var(--cyber-accent)] sm:px-6 lg:px-14">
       <span className="cyber-display text-base font-bold text-[var(--cyber-accent)] transition-all duration-300 hover:drop-shadow-[0_0_15px_var(--cyber-accent)]">
        CyberSense
           </span>
        <Link
  to="/forum"
  className="text-sm font-semibold cyber-section-title transition-all duration-300 hover:-translate-x-1 hover:drop-shadow-[0_0_12px_var(--cyber-accent)] hover:[text-shadow:0_0_8px_var(--cyber-accent),0_0_18px_var(--cyber-accent),0_0_32px_var(--cyber-accent)]"
>
          ← Back to forum
        </Link>
      </nav>

      <section className="relative z-10 flex flex-1 items-start justify-center px-6 pb-20 pt-[48px]">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-[640px] flex-col gap-4 rounded-[3px] border border-white/80 bg-[rgba(7,26,44,0.75)] p-8 shadow-[0_0_5px_var(--cyber-accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_45px_var(--cyber-accent)]"
        >
          <h1 className="text-2xl font-bold cyber-section-title drop-shadow-[0_0_4px_var(--cyber-accent)]">
  New thread
</h1>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold cyber-section-title">
              Title
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
              required
              className="w-full rounded-[3px] border border-white/80 bg-[rgba(7,26,44,0.75)] p-3 cyber-body-text outline-none transition-all duration-300 hover:border-[var(--cyber-accent)] hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_40px_var(--cyber-accent)] focus:border-[var(--cyber-accent)] focus:shadow-[0_0_20px_3px_var(--cyber-accent)]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="body" className="text-sm font-semibold text-[#202020]">
              Message
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={5000}
              rows={8}
              required
              className="w-full rounded-[3px] border border-white/80 bg-[rgba(7,26,44,0.75)] p-3 cyber-body-text outline-none transition-all duration-300 hover:border-[var(--cyber-accent)] hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_40px_var(--cyber-accent)] focus:border-[var(--cyber-accent)] focus:shadow-[0_0_20px_3px_var(--cyber-accent)]"
            />
          </div>

          {error && (
  <p
    role="alert"
    className="text-sm font-semibold text-red-300"
    style={{ fontFamily: '"Exo 2", sans-serif' }}
  >
    {error}
  </p>
)}

         <button
  type="submit"
  disabled={loading}
  className="mt-2 block w-full cursor-pointer rounded border-2 border-[var(--cyber-accent)] px-5 py-3 text-center text-base font-semibold text-white shadow-[0_0_12px_2px_var(--cyber-accent),0_0_24px_var(--cyber-accent)] transition-all duration-300 hover:shadow-[0_0_20px_3px_var(--cyber-accent),0_0_40px_var(--cyber-accent)] disabled:cursor-not-allowed disabled:opacity-60"
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
            {loading ? "Posting..." : "Post thread"}
          </button>
        </form>
      </section>
    </main>
  );
}