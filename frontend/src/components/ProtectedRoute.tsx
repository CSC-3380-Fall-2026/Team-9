
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Protects CyberSense pages from unauthenticated visitors.
 *
 * Checks the current login session before allowing
 * access to the Dashboard and other private pages.
 */
export default function ProtectedRoute() {
  const [status, setStatus] = useState<
    "loading" | "authorized" | "unauthorized" | "error"
  >("loading");

  useEffect(() => {
    let active = true;

    async function checkLogin() {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "same-origin",
        });

        if (!active) return;

        if (response.ok) {
          setStatus("authorized");
        } else if (response.status === 401 || response.status === 403) {
          setStatus("unauthorized");
        } else {
          setStatus("error");
        }
      } catch {
        if (active) setStatus("error");
      }
    }

    checkLogin();

    return () => {
      active = false;
    };
  }, []);

  if (status === "loading") {
    return <p>Checking your login...</p>;
  }

  if (status === "error") {
    return <p>Unable to verify your login. Please refresh and try again.</p>;
  }

  if (status === "unauthorized") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}