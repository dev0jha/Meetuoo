import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
      <main className="flex w-full max-w-3xl flex-col items-center justify-center px-8 py-16">
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-black dark:text-white">
          Meetuoo
        </h1>
        <p className="mb-12 max-w-md text-center text-lg text-gray-600 dark:text-gray-400">
          Your intelligent meeting companion. Schedule, summarize, and
          collaborate with ease.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/login"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-black px-8 text-sm font-medium text-white shadow-lg transition-all hover:bg-gray-800 hover:shadow-xl md:w-auto dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Sign In
          </Link>
          <Link
            href="/login?signup=true"
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-8 text-sm font-medium transition-colors hover:bg-black/[.04] md:w-auto dark:border-white/[.145] dark:hover:bg-white/[.06]"
          >
            Sign Up
          </Link>
        </div>
      </main>
    </div>
  );
}
