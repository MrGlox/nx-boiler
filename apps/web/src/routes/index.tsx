import { createFileRoute, Link } from "@tanstack/react-router";

import { m } from "@repo/dictionaries/messages";
import { locales, setLocale } from "@repo/dictionaries/runtime";
import { getServerMessage } from "@/server/get-message";

export const Route = createFileRoute("/")({
  component: App,
  loader: () => {
    return getServerMessage({ data: "📩" });
  },
});

function App() {
  const serverMessage = Route.useLoaderData();

  return (
    <main>
      <header className="sticky top-0 z-50 py-2 bg-background/60 backdrop-blur">
        <div className="flex justify-between items-center container">
          <Link
            title="brand-logo"
            className="relative mr-6 flex items-center space-x-2"
            to="/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-auto h-[40px]"
              aria-hidden="true"
            >
              <title>Brand Logo</title>
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
            </svg>
            <span className="font-bold text-xl">acme.ai</span>
          </Link>
          <div className="hidden lg:block">
            <div className="flex items-center">
              <nav className="mr-10">
                <nav
                  aria-label="Main"
                  data-orientation="horizontal"
                  dir="ltr"
                  className="relative z-10 flex max-w-max flex-1 items-center justify-center"
                >
                  <div style={{ position: "relative" }}>
                    <ul
                      data-orientation="horizontal"
                      className="group flex flex-1 list-none items-center justify-center space-x-1"
                      dir="ltr"
                    >
                      <li>
                        <button
                          id="radix-:R34cv6ja:-trigger-radix-:R2r4cv6ja:"
                          data-state="closed"
                          aria-expanded="false"
                          aria-controls="radix-:R34cv6ja:-content-radix-:R2r4cv6ja:"
                          className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary/10 data-[state=open]:bg-primary/10 group"
                          data-radix-collection-item=""
                          type="button"
                        >
                          Features
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-chevron-down relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                            aria-hidden="true"
                          >
                            <title>Features dropdown</title>
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                      </li>
                      <li>
                        <button
                          id="radix-:R34cv6ja:-trigger-radix-:R4r4cv6ja:"
                          data-state="closed"
                          aria-expanded="false"
                          aria-controls="radix-:R34cv6ja:-content-radix-:R4r4cv6ja:"
                          className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary/10 data-[state=open]:bg-primary/10 group"
                          data-radix-collection-item=""
                          type="button"
                        >
                          Solutions
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-chevron-down relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                            aria-hidden="true"
                          >
                            <title>Solutions dropdown</title>
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                      </li>
                      <li>
                        <Link
                          className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary/10 data-[state=open]:bg-primary/10"
                          to="/blog"
                          data-radix-collection-item=""
                        >
                          Blog
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="absolute left-0 top-full flex justify-center" />
                </nav>
              </nav>
              <div className="gap-2 flex">
                <Link
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                  to="/signin"
                >
                  Signin
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-2 cursor-pointer block lg:hidden">
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:R1kcv6ja:"
              data-state="closed"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="text-2xl"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <title>Menu</title>
                <path d="M64 384h384v-42.67H64zm0-106.67h384v-42.66H64zM64 128v42.67h384V128z" />
              </svg>
            </button>
          </div>
        </div>
        <hr className="absolute w-full bottom-0 transition-opacity duration-300 ease-in-out opacity-100" />
      </header>
      <section id="hero">
        <div className="relative flex w-full flex-col items-center justify-start px-4 pt-32 sm:px-6 sm:pt-24 md:pt-32 lg:px-8">
          <Link
            to="/blog/introducing-acme-ai"
            className="flex w-auto items-center space-x-2 rounded-full bg-primary/20 px-2 py-1 ring-1 ring-accent whitespace-pre"
            style={{ opacity: 1, willChange: "auto", transform: "none" }}
          >
            <div className="w-fit rounded-full bg-accent px-2 py-0.5 text-center text-xs font-medium text-primary sm:text-sm">
              📣 Announcement
            </div>
            <p className="text-xs font-medium text-primary sm:text-sm">
              Introducing Acme.ai
            </p>
            <svg
              width="12"
              height="12"
              className="ml-1"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-labelledby="arrowIconTitle"
            >
              <title id="arrowIconTitle">Arrow icon</title>
              <path
                d="M8.78141 5.33312L5.20541 1.75712L6.14808 0.814453L11.3334 5.99979L6.14808 11.1851L5.20541 10.2425L8.78141 6.66645H0.666748V5.33312H8.78141Z"
                fill="hsl(var(--primary))"
              />
            </svg>
          </Link>
          <div className="flex w-full max-w-2xl flex-col space-y-4 overflow-hidden pt-8">
            <h1
              className="text-center text-4xl font-medium leading-tight text-foreground sm:text-5xl md:text-6xl"
              style={{
                filter: "blur(0px)",
                opacity: 1,
                willChange: "auto",
                transform: "none",
              }}
            >
              <span
                className="inline-block px-1 md:px-2 text-balance font-semibold"
                style={{ opacity: 1, willChange: "auto", transform: "none" }}
              >
                Automate
              </span>
              <span
                className="inline-block px-1 md:px-2 text-balance font-semibold"
                style={{ opacity: 1, willChange: "auto", transform: "none" }}
              >
                your
              </span>
              <span
                className="inline-block px-1 md:px-2 text-balance font-semibold"
                style={{ opacity: 1, willChange: "auto", transform: "none" }}
              >
                workflow
              </span>
              <span
                className="inline-block px-1 md:px-2 text-balance font-semibold"
                style={{ opacity: 1, willChange: "auto", transform: "none" }}
              >
                with AI
              </span>
            </h1>
            <p
              className="mx-auto max-w-xl text-center text-lg leading-7 text-muted-foreground sm:text-xl sm:leading-9 text-balance"
              style={{ opacity: 1, willChange: "auto", transform: "none" }}
            >
              No matter what problem you have, our AI can help you solve it.
            </p>
          </div>
          <div
            className="mx-auto mt-6 flex w-full max-w-2xl flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
            style={{ opacity: 1, willChange: "auto", transform: "none" }}
          >
            <Link
              className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 px-4 py-2 w-full sm:w-auto text-background flex gap-2"
              to="/signup"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-labelledby="getStartedIcon"
              >
                <title id="getStartedIcon">Get started icon</title>
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
              </svg>
              Get started for free
            </Link>
          </div>
          <p
            className="mt-5 text-sm text-muted-foreground"
            style={{ opacity: 1, willChange: "auto" }}
          >
            7 day free trial. No credit card required.
          </p>
          <div
            className="relative mx-auto flex w-full items-center justify-center"
            style={{ opacity: 1, willChange: "auto", transform: "none" }}
          >
            <div className="relative border rounded-lg shadow-lg max-w-screen-lg mt-16">
              <div className="relative cursor-pointer group rounded-md p-2 ring-1 ring-slate-200/50 dark:bg-gray-900/70 dark:ring-white/10 backdrop-blur-md">
                <img
                  alt="Hero Video"
                  loading="lazy"
                  width="1920"
                  height="1080"
                  decoding="async"
                  data-nimg="1"
                  className="transition-all duration-200 group-hover:brightness-[0.8] ease-out rounded-md border"
                  style={{ color: "transparent" }}
                  srcSet="/_next/image?url=%2Fdashboard.png&amp;w=1920&amp;q=75 1x, /_next/image?url=%2Fdashboard.png&amp;w=3840&amp;q=75 2x"
                  src="/_next/image?url=%2Fdashboard.png&amp;w=3840&amp;q=75"
                />
                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-100 scale-[0.9] transition-all duration-200 ease-out rounded-2xl">
                  <div className="z-30 bg-primary/10 flex items-center justify-center rounded-full backdrop-blur-md size-28">
                    <div className="flex items-center justify-center bg-gradient-to-b from-primary/30 to-primary shadow-md rounded-full size-20 transition-all ease-out duration-200 relative group-hover:scale-[1.2] scale-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-play size-8 text-white fill-white group-hover:scale-105 scale-100 transition-transform duration-200 ease-out"
                        style={{
                          filter:
                            "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
                        }}
                        aria-labelledby="playButtonTitle"
                      >
                        <title id="playButtonTitle">Play video</title>
                        <polygon points="6 3 20 12 6 21 6 3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 -bottom-12 h-1/3 bg-gradient-to-t from-background via-background to-transparent lg:h-1/4" />
        </div>
      </section>
      <section id="problem">
        <div>
          <div className="relative container mx-auto px-4 py-16 max-w-7xl">
            <div className="text-center space-y-4 pb-6 mx-auto">
              <h2 className="text-sm text-primary font-mono font-medium tracking-wider uppercase">
                Problem
              </h2>
              <h3 className="mx-auto mt-4 max-w-xs text-3xl font-semibold sm:max-w-none sm:text-4xl md:text-5xl">
                Manually entering your data is a hassle.
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div
                style={{
                  opacity: 1,
                  filter: "blur(0px)",
                  willChange: "auto",
                  transform: "translateY(-6px)",
                }}
              >
                <div className="rounded-lg border text-card-foreground bg-background border-none shadow-none">
                  <div className="p-6 space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-brain w-6 h-6 text-primary"
                      >
                        <title>Brain icon</title>
                        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                        <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                        <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
                        <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
                        <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
                        <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
                        <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
                        <path d="M6 18a4 4 0 0 1-1.967-.516" />
                        <path d="M19.967 17.484A4 4 0 0 1 18 18" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Data Overload</h3>
                    <p className="text-muted-foreground">
                      Businesses struggle to make sense of vast amounts of
                      complex data, missing out on valuable insights that could
                      drive growth and innovation.
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  opacity: 1,
                  filter: "blur(0px)",
                  willChange: "auto",
                  transform: "translateY(-6px)",
                }}
              >
                <div className="rounded-lg border text-card-foreground bg-background border-none shadow-none">
                  <div className="p-6 space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-zap w-6 h-6 text-primary"
                      >
                        <title>Lightning bolt icon</title>
                        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">
                      Slow Decision-Making
                    </h3>
                    <p className="text-muted-foreground">
                      Traditional data processing methods are too slow, causing
                      businesses to lag behind market changes and miss crucial
                      opportunities.
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  opacity: 1,
                  filter: "blur(0px)",
                  willChange: "auto",
                  transform: "translateY(-6px)",
                }}
              >
                <div className="rounded-lg border text-card-foreground bg-background border-none shadow-none">
                  <div className="p-6 space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-shield w-6 h-6 text-primary"
                      >
                        <title>Shield icon</title>
                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">
                      Data Security Concerns
                    </h3>
                    <p className="text-muted-foreground">
                      With increasing cyber threats, businesses worry about the
                      safety of their sensitive information when adopting new
                      technologies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
