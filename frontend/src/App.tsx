/*
  CyberSense Landing / Login Page

  Okay so umm this page is based on the CyberSense interface designed in we did in Figma.
  Figma Make was used to generate an initial React implementation of
  the design(although with a few modifications cuz figma played but we still need to go in and add clikable
  tabs and i also think we should update some of the info i changed the about us in this section but honetly those can be separate tasks)
  , which was then integrated into the team's existing
  React + TypeScript + Vite frontend.
  oh i also installed tailwind(it was some bs sooo umm yeah) 
  so yall might need to as well it was the only way to intergrate it properly
  

  Right now this page currently includes: 
  CyberSense navigation/header
  Login form
  About CyberSense section
  Platform area cards(cant click on these need to add code for this)
  Responsive layout
  Figma-designed background and SVG assets

  The login form is currently frontend-only.so its absolutely useless lol but thats fine for now.
  Backend authentication and database functionality will be added later.
  teehee.
*/




const assetPathPrefix = "/assets"




// This the main area of CyberSense platform that is shown on the landing page.

const platformAreas = [
  {
    name: "Interactive Training",
    icon: `${assetPathPrefix}/83ad3.svg`,
  },
  {
    name: "Progress & Analytics",
    icon: `${assetPathPrefix}/e5a73.svg`,
  },
  {
    name: "Admin and Classes",
    icon: `${assetPathPrefix}/511a9.svg`,
  },
  {
    name: "Community Forum",
    icon: `${assetPathPrefix}/867c2.svg`,
  },
]

export default function App() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-[#071a2c]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <img
          alt=""
          className="absolute inset-0 size-full max-w-none object-cover"
          src={`${assetPathPrefix}/47d8c.png`}
        />
        <div className="absolute inset-0 bg-black/18" />
      </div>

      <nav className="relative z-10 flex h-[72px] shrink-0 items-center border-b border-[#a7a7a3] bg-white px-6 sm:px-10 lg:px-14">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="size-8 rounded-[3px] border border-[#202020] bg-[#e5e5e2]"
          />
          <span className="font-['Inter:Bold'] text-base font-bold text-[#202020]">
            CyberSense
          </span>
        </div>
      </nav>

      <section className="relative flex min-h-[360px] shrink-0 items-start justify-center bg-[rgba(7,26,44,0.75)] px-6 pb-14 pt-[72px] text-center sm:px-10 lg:px-14">
        <div className="flex w-full max-w-[760px] flex-col items-center gap-4 text-[#00ffc8]">
          <h1 className="font-['Inter:Bold'] text-[44px] leading-normal font-bold sm:text-[56px]">
            CyberSense
          </h1>
          <p className="font-['Inter:Semi_Bold'] text-xl leading-normal font-semibold">
            Human-Centered Cybersecurity Training
          </p>
          <p className="font-['Inter:Regular'] text-base leading-6 font-normal">
           Learn how attackers use both technical tricks and human behavior to manipulate users, and how to recognize the warning signs before responding.
          </p>
        </div>
      </section>

      <section className="relative flex flex-1 bg-[rgba(7,26,44,0.75)] px-6 py-10 sm:px-10 lg:px-14">
        <div className="flex w-full items-start gap-6 max-lg:flex-col">
          <div className="w-[420px] shrink-0 max-lg:w-full">
            <form
              className="flex w-full flex-col items-start gap-4 rounded-[3px] border border-white bg-[rgba(7,26,44,0.75)] p-6"
              onSubmit={(event) => event.preventDefault()}
            >
              <h2 className="font-['Inter:Bold'] text-2xl leading-normal font-bold text-[#00ffc8]">
                Log In
              </h2>

              <label className="flex w-full flex-col gap-2 font-['Inter:Semi_Bold'] text-sm leading-normal font-semibold text-[#00ffc8]">
                Email or Username
                <input
                  autoComplete="username"
                  className="h-12 w-full rounded-[3px] border border-white bg-[rgba(7,26,44,0.75)] p-[14px] font-['Inter:Regular'] text-sm font-normal text-[#00ffc8] outline-none placeholder:text-[rgba(0,200,160,0.5)] focus:border-[#00ffc8]"
                  name="username"
                  placeholder="Enter email or username"
                  type="text"
                />
              </label>

              <label className="flex w-full flex-col gap-2 font-['Inter:Semi_Bold'] text-sm leading-normal font-semibold text-[#00ffc8]">
                Password
                <input
                  autoComplete="current-password"
                  className="h-12 w-full rounded-[3px] border border-white bg-[rgba(7,26,44,0.75)] p-[14px] font-['Inter:Regular'] text-sm font-normal text-[#00ffc8] outline-none placeholder:text-[rgba(0,200,160,0.5)] focus:border-[#00ffc8]"
                  name="password"
                  placeholder="Enter password"
                  type="password"
                />
              </label>

              <button
                className="h-12 w-full cursor-pointer rounded-[3px] bg-[#363636] font-['Inter:Bold'] text-sm font-bold text-white transition-colors hover:bg-[#464646] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ffc8]"
                type="submit"
              >
                Log In
              </button>

              <a
                className="font-['Inter:Semi_Bold'] text-sm leading-normal font-semibold text-[#00ffc8] hover:underline"
                href="#forgot-password"
              >
                Forgot Password?
              </a>

              <p className="flex gap-2 text-sm leading-normal text-[#00ffc8]">
                <span className="font-['Inter:Regular'] font-normal">
                  New user?
                </span>
                <a
                  className="font-['Inter:Bold'] font-bold hover:underline"
                  href="#create-account"
                >
                  Create Account
                </a>
              </p>
            </form>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-6 max-lg:w-full">
            <article className="flex flex-col gap-3 rounded-[3px] border border-white bg-[rgba(7,26,44,0.75)] p-6 text-[#00ffc8]">
              <h2 className="font-['Inter:Bold'] text-2xl leading-normal font-bold">
                About CyberSense
              </h2>
              <p className="font-['Inter:Regular'] text-base leading-6 font-normal">
               CyberSense is an interactive cybersecurtity awareness platform focused on both technical threats and the human factors behind social engineering. Users work through realsitic scenarios involving phishing, impersonation, urgency, authority,
               suspicious links, credential requests, and other manipulation techniques.After each scenario, CyberSense explains the warning signs, identifies the human and technical cues involved, and helps users track patterns in their performance over time.
              </p>
            </article>

            <section className="flex w-full flex-col gap-3">
              <h2 className="font-['Inter:Bold'] text-2xl leading-normal font-bold text-[#00ffc8]">
                Platform areas
              </h2>
              <div className="grid w-full grid-cols-2 gap-3 xl:grid-cols-4">
                {platformAreas.map((area) => (
                  <article
                    className="flex h-[132px] min-w-0 flex-col items-start gap-3 rounded-[3px] border border-white bg-[rgba(7,26,44,0.75)] p-4"
                    key={area.name}
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-[3px] border border-white bg-[rgba(7,26,44,0.75)]">
                      <img alt="" src={area.icon} />
                    </div>
                    <h3 className="font-['Inter:Bold'] text-base leading-normal font-bold text-[#00ffc8]">
                      {area.name}
                    </h3>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}
