
export const LoginPage = () => {
  return (
    <body className="bg-background font-body-md text-on-background flex items-center justify-center min-h-screen">
      <main className="w-full max-w-md mx-auto">
        <div className="flex flex-col w-full h-full items-center justify-center min-h-[calc(100vh-64px)] py-lg">
          <div className="w-full max-w-sm flex flex-col items-center">
            {/* Header */}
            <div className="mb-lg flex flex-col items-center">
              <span
                className="material-symbols-outlined text-primary text-5xl mb-sm"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                skillet
              </span>
              <h1 className="font-headline-lg text-headline-lg text-on-background text-center">
                HomeChef
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant text-center mt-xs">
                A neighborhood of flavor.
              </p>
            </div>

            {/* Form */}
            <form className="w-full flex flex-col bg-surface-container rounded-xl shadow-md p-md gap-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed/20 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
              <h2 className="font-headline-sm text-headline-sm text-on-surface mb-sm">
                Sign In
              </h2>

              {/* Email */}
              <div className="flex flex-col gap-xs">
                <label
                  className="font-label-md text-label-md text-on-surface-variant uppercase"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant/50">
                    mail
                  </span>
                  <input
                    className="w-full bg-tertiary-fixed text-on-surface font-body-md text-body-md rounded-lg py-sm pl-xl pr-sm focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                    id="email"
                    placeholder="you@example.com"
                    required
                    type="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-xs mt-sm">
                <label
                  className="font-label-md text-label-md text-on-surface-variant uppercase"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant/50">
                    lock
                  </span>
                  <input
                    className="w-full bg-tertiary-fixed text-on-surface font-body-md text-body-md rounded-lg py-sm pl-xl pr-sm focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                    id="password"
                    placeholder="••••••••"
                    required
                    type="password"
                  />
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end mt-xs">
                <a
                  className="font-body-sm text-body-sm text-primary hover:text-primary-container transition-colors"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Submit */}
              <button
                className="mt-md w-full bg-primary text-on-primary font-label-md text-label-md uppercase tracking-widest py-sm rounded-lg hover:bg-on-primary-fixed-variant transition-colors shadow-sm min-h-[48px]"
                type="submit"
              >
                Sign In
              </button>
            </form>

            {/* Register */}
            <div className="w-full flex flex-col items-center mt-lg gap-sm">
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                New to the neighborhood?
              </span>
              <div className="flex gap-sm">
                <button className="bg-transparent text-secondary font-label-md text-label-md uppercase tracking-widest py-sm px-md rounded-lg outline outline-1 outline-secondary hover:bg-secondary/10 transition-colors min-h-[48px]">
                  Join as Diner
                </button>
                <button className="bg-transparent text-secondary font-label-md text-label-md uppercase tracking-widest py-sm px-md rounded-lg outline outline-1 outline-secondary hover:bg-secondary/10 transition-colors min-h-[48px]">
                  Join as Cook
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </body>
  );
};


