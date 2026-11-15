
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface AccountUser {
  id: number;
  username: string;
  email: string;
}

const panel =
  "rounded-[3px] border border-white/80 bg-[#071a2c]/60 p-5";

/**
 * CyberSense Account & Settings
 *
 * Displays the authenticated user's account information.
 * Additional account preferences and security features
 * will be added as their backend support becomes available.
 */
export default function AccountSettings() {
  const [user, setUser] = useState<AccountUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadUser() {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "same-origin",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load account information.");
        }

        const data: AccountUser = await response.json();
        setUser(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            err instanceof Error ? err.message : "Something went wrong."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadUser();

    return () => controller.abort();
  }, []);

  return (
    <main
      className="min-h-screen text-[#00ffc8]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 8, 20, 0.4), rgba(0, 8, 20, 0.5)), url("/assets/47d8c.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/30 bg-white/55 px-6 py-4 backdrop-blur-md">
        <Link to="/" className="font-bold text-[#071a2c]">
          CyberSense
        </Link>

        <nav className="flex flex-wrap gap-3 text-sm">
          <Link to="/dashboard" className="rounded bg-white px-4 py-2 text-black">
            Dashboard
          </Link>
          <Link to="/training" className="rounded bg-white px-4 py-2 text-black">
            Training
          </Link>
          <Link to="/analytics" className="rounded bg-white px-4 py-2 text-black">
            Progress
          </Link>
        </nav>
      </header>

      <div className="mx-auto max-w-[1450px] space-y-6 p-6">
        <section className={panel}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase">
                CyberSense / Account & Settings
              </p>
              <h1 className="mt-2 text-3xl font-bold">
                Account & Settings
              </h1>
              <p className="mt-2 text-sm text-gray-300">
                Manage your profile, security, training preferences,
                and privacy settings.
              </p>
            </div>

            <Link to="/dashboard" className="text-sm font-semibold hover:underline">
              Back to Dashboard
            </Link>
          </div>
        </section>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          <section className={`${panel} lg:col-span-2`}>
            <h2 className="text-xl font-bold">Profile Information</h2>
            <p className="mt-1 text-sm text-gray-300">
              Your CyberSense account details.
            </p>

            {loading && <p className="mt-5">Loading your account...</p>}

            {error && (
              <p role="alert" className="mt-5 text-red-300">
                {error}
              </p>
            )}

            {user && (
              <div className="mt-5 flex flex-col gap-5 sm:flex-row">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded border border-cyan-300/40 bg-[#071a2c] text-2xl font-bold">
                  {user.username.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <label className="text-sm font-semibold">Username</label>
                    <input
                      readOnly
                      value={user.username}
                      className="mt-1 w-full rounded border border-cyan-300/40 bg-[#071a2c]/80 p-3 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold">Email Address</label>
                    <input
                      readOnly
                      value={user.email}
                      className="mt-1 w-full rounded border border-cyan-300/40 bg-[#071a2c]/80 p-3 text-white"
                    />
                  </div>

                  <p className="text-xs text-gray-300">
                    Profile editing will be available when account
                    update support is connected.
                  </p>
                </div>
              </div>
            )}
          </section>

{/* Training Preferences — right column */}
<aside className={panel}>
  <h2 className="text-xl font-bold">Training Preferences</h2>
  <p className="mt-1 text-sm text-gray-300">
    Tailor your training experience to your needs.
  </p>

  <div className="mt-5 space-y-4">
    <div>
      <p className="mb-1 text-sm font-semibold">
        Preferred Difficulty Level
      </p>
      <div className="rounded border border-cyan-300/40 bg-[#071a2c]/80 p-3 text-gray-300">
        Not configured
      </div>
    </div>

    <div>
      <p className="mb-1 text-sm font-semibold">
        Scenario Categories of Interest
      </p>
      <div className="rounded border border-cyan-300/40 bg-[#071a2c]/80 p-3 text-gray-300">
        Not configured
      </div>
    </div>

    <div>
      <p className="mb-1 text-sm font-semibold">
        Notification Preferences
      </p>
      <div className="rounded border border-cyan-300/40 bg-[#071a2c]/80 p-3 text-gray-300">
        Not configured
      </div>
    </div>
  </div>

  <p className="mt-5 text-xs text-gray-300">
    Custom training preferences will become available
    when account settings can be saved.
  </p>
</aside>

{/* Account Security — below Profile Information */}
<section className={`${panel} lg:col-span-2`}>
  <h2 className="text-xl font-bold">Account Security</h2>
  <p className="mt-1 text-sm text-gray-300">
    Protect your account with stronger sign-in controls.
  </p>

  <div className="mt-5 space-y-4">
    <div className="rounded border border-cyan-300/40 bg-[#071a2c]/80 p-4">
      <h3 className="font-semibold">Change Password</h3>
      <p className="mt-2 text-sm text-gray-300">
        Password changes are not available yet.
        This feature requires a secure backend endpoint.
      </p>
    </div>

    <div className="rounded border border-cyan-300/40 bg-[#071a2c]/80 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-semibold">
          Two-Factor Authentication / MFA
        </h3>
        <span className="rounded border border-cyan-300/40 px-3 py-1 text-xs">
          Not configured
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-300">
        Additional sign-in verification will be available
        when MFA support is implemented.
      </p>
    </div>
  </div>
</section>

{/* Privacy / Data — below Training Preferences */}
<aside className={panel}>
  <h2 className="text-xl font-bold">Privacy / Data</h2>
  <p className="mt-1 text-sm text-gray-300">
    Review information connected to your account.
  </p>

  <div className="mt-5 space-y-3">
    <Link
      to="/analytics"
      className="block rounded border border-cyan-300/40 bg-[#071a2c]/80 p-3 text-sm hover:bg-cyan-900/40"
    >
      View Progress & Analytics
    </Link>

    <div className="rounded border border-cyan-300/40 bg-[#071a2c]/80 p-3">
      <p className="text-sm font-semibold">
        Manage Saved Training History
      </p>
      <p className="mt-2 text-xs text-gray-300">
        History management is not available yet.
      </p>
    </div>
  </div>
</aside>
        </div>
      </div>
    </main>
  );
}