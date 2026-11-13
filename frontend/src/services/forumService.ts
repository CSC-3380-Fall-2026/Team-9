import type { ForumThread, ForumPost } from "../types/forum";
import { getCsrfToken } from "./csrfService";

export async function fetchThreads(): Promise<ForumThread[]> {
  const res = await fetch("/api/forum/threads", { credentials: "include" });
  if (!res.ok) throw new Error(`Could not load threads (${res.status})`);
  return res.json();
}

export async function fetchPosts(threadId: number): Promise<ForumPost[]> {
  const res = await fetch(`/api/forum/threads/${threadId}/posts`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error(`Could not load posts (${res.status})`);
  return res.json();
}

export async function createThread(title: string, body: string): Promise<ForumThread> {
  const csrf = await getCsrfToken();

  const res = await fetch("/api/forum/threads", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      [csrf.headerName]: csrf.token,
    },
    body: JSON.stringify({ title, body }),
  });
  if (res.status === 401) throw new Error("Please log in to post.");
  if (res.status === 403) throw new Error("Your session expired. Log in again and retry.");
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || `Could not create thread (${res.status})`);
  }
  return res.json();
}