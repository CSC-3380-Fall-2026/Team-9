/**
 * CyberSense CSRF Service UwU
 *
 * Retrieves a CSRF token from Spring Security.
 * The token will be included in requests that
 * change data, such as registration and login.
 */

interface CsrfTokenResponse {
  headerName: string;
  parameterName: string;
  token: string;
}

export async function getCsrfToken(): Promise<CsrfTokenResponse> {
  const response = await fetch("/api/csrf", {
    credentials: "same-origin",
  });

  if (!response.ok) {
    throw new Error("Unable to retrieve CSRF token");
  }

  return response.json();
}