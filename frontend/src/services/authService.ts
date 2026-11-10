
import { getCsrfToken } from "./csrfService";

/**
 * Verifies a user's email and password through Spring Security.
 * A successful response creates an authenticated server session.
 */
export async function login(
  email: string,
  password: string
): Promise<void> {

  // Get a CSRF token linked to the current browser session.
  const csrf = await getCsrfToken();

  // Send credentials to Spring Security for verification.
  const response = await fetch("/api/auth/login", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      [csrf.headerName]: csrf.token,
    },
    body: new URLSearchParams({
      email,
      password,
    }).toString(),
  });

  // Incorrect credentials must not grant access.
  if (response.status === 401) {
    throw new Error("Incorrect email or password.");
  }

  if (!response.ok) {
    throw new Error("Login failed. Please try again.");
  }
}

/**
 * Logs the current user out of CyberSense.
 *
 * Sends a protected request to Spring Security
 * to invalidate the authenticated session.
 */
export async function logout(): Promise<void> {
  const csrf = await getCsrfToken();

  const response = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      [csrf.headerName]: csrf.token,
    },
  });

  if (!response.ok) {
    throw new Error("Unable to log out. Please try again.");
  }
}