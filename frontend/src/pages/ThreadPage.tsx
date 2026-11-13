import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPosts } from "../services/forumService";
import type { ForumPost } from "../types/forum";

const bgImage = "/assets/47d8c.png";
const panelStyle = { background: "rgba(7,26,44,0.75)" };

export default function ThreadPage() {
  const { id } = useParams();
  const threadId = Number(id);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchPosts(threadId)
      .then(setPosts)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [threadId]);

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

      <section className="relative z-10 flex flex-col items-start gap-5 px-14 pb-[38px] pt-[34px] w-full max-w-[860px] mx-auto">
        {loading && <p className="text-white/60 text-sm">Loading thread…</p>}
        {error && <p role="alert" className="text-sm text-red-400">{error}</p>}

        {!loading && !error && posts.length === 0 && (
          <p className="text-white/60 text-sm">This thread has no posts.</p>
        )}

        {posts.map((p) => (
          <article
            key={p.id}
            className="border border-white rounded-[3px] p-5 w-full"
            style={panelStyle}
          >
            <p className="whitespace-pre-wrap text-white text-sm">{p.body}</p>
            <p className="mt-3 text-xs text-[#00ffc8]">
              {p.authorName} · {new Date(p.createdAt).toLocaleString()}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}