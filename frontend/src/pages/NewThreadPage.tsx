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

      <nav className="relative z-10 flex h-[72px] shrink-0 items-center justify-between border-b border-[#a7a7a3] bg-white/55 px-14 backdrop-blur-[9px]">
        <span className="text-base font-bold text-[#202020]">CyberSense</span>
        <Link to="/forum" className="text-sm font-semibold text-[#202020] hover:underline">
          ← Back to forum
        </Link>
      </nav>

      <section className="relative z-10 flex flex-1 items-start justify-center px-6 pb-20 pt-[48px]">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-[640px] flex-col gap-4 rounded-[6px] border border-[#a7a7a3] bg-white p-8"
        >
          <h1 className="font-bold text-[#202020] text-2xl">New thread</h1>

          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-sm font-semibold text-[#202020]">
              Title
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
              required
              className="rounded-[3px] border border-[#a7a7a3] px-3 py-2 text-[#202020] outline-none focus:border-[#071a2c]"
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
              className="rounded-[3px] border border-[#a7a7a3] px-3 py-2 text-[#202020] outline-none focus:border-[#071a2c]"
            />
          </div>

          {error && <p role="alert" className="text-sm font-semibold text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-[3px] bg-[#071a2c] px-4 py-2 font-semibold text-[#00ffc8] disabled:opacity-60"
          >
            {loading ? "Posting..." : "Post thread"}
          </button>
        </form>
      </section>
    </main>
  );
}