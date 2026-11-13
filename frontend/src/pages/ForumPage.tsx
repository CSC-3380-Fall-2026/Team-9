import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchThreads } from "../services/forumService";
import type { ForumThread } from "../types/forum";

const bgImage = "/assets/47d8c.png";
const panelClass =
  "border border-white flex flex-col gap-4 items-start overflow-clip p-5 relative rounded-[3px] shrink-0 w-full";
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

      <nav className="relative z-10 flex h-[72px] shrink-0 items-center justify-between border-b border-[#a7a7a3] bg-white/55 px-14 backdrop-blur-[9px]">
        <span className="text-base font-bold text-[#202020]">CyberSense</span>
        <Link to="/dashboard" className="text-sm font-semibold text-[#202020] hover:underline">
          ← Dashboard
        </Link>
      </nav>

      <div className="relative z-10 flex flex-col items-start gap-6 px-14 pb-[38px] pt-[34px] w-full">
        <div
          className="border border-white flex flex-col gap-5 items-start overflow-clip px-7 py-6 rounded-[3px] w-full"
          style={panelStyle}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-2 items-start">
              <p className="font-bold text-[#0effd3] text-xs uppercase tracking-wide">
                Forum / Discussion
              </p>
              <p className="font-bold text-[#00ffc8] text-[28px] leading-tight">Forum</p>
              <p className="text-white text-sm">
                Ask questions and share what you've noticed about suspicious messages.
              </p>
            </div>
            <button
              onClick={() => navigate("/forum/new")}
              className="bg-[#363636] px-[22px] py-[13px] rounded-[3px] hover:bg-[#4a4a4a] transition-colors cursor-pointer"
            >
              <span className="font-bold text-white text-sm whitespace-nowrap">New thread +</span>
            </button>
          </div>
        </div>

        <div className={panelClass} style={panelStyle}>
          <p className="font-bold text-xl text-[#00ffc8]">Threads</p>

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
                className="border border-white flex flex-col gap-1 items-start px-4 py-3 rounded-[3px] w-full text-left hover:bg-[rgba(0,255,200,0.05)] transition-colors cursor-pointer"
                style={panelStyle}
              >
                <p className="font-bold text-[#00ffc8] text-base">{t.title}</p>
                <p className="text-white/60 text-xs">
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