"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type AuthMode = "login" | "signup";
type AuthMethod = "magic_link" | "google" | "github";

interface Message {
  type: "success" | "error" | "info";
  text: string;
}

export default function LoginPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [method, setMethod] = useState<AuthMethod>("magic_link");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const searchParams = useSearchParams();
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    if (searchParams.get("signup") === "true") {
      setMode("signup");
    }
    if (searchParams.get("error")) {
      const error = searchParams.get("error");
      if (error === "auth_callback_failed") {
        setMessage({
          type: "error",
          text: "Authentication failed. Please try again.",
        });
      }
    }
  }, [searchParams]);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: mode === "signup" ? { full_name: fullName } : undefined,
        },
      });

      if (error) throw error;
      setIsEmailSent(true);
      setMessage({
        type: "success",
        text: "Check your email for the magic link to sign in.",
      });
    } catch (err: unknown) {
      const error = err as { message?: string; code?: string };
      let errorMessage = error.message || "An error occurred";

      if (
        error.code === "over_request_rate_limit" ||
        error.code === "email_provider_rate_limit_exceeded"
      ) {
        errorMessage = "Too many requests. Please wait a moment and try again.";
      }

      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (err: unknown) {
      const error = err as { message?: string };
      setMessage({
        type: "error",
        text: error.message || "An error occurred",
      });
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setMessage(null);
    setIsEmailSent(false);
  };

  const resetForm = () => {
    setEmail("");
    setFullName("");
    setIsEmailSent(false);
    setMessage(null);
  };

  if (isEmailSent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 px-4 dark:from-gray-900 dark:to-black">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                <svg
                  className="h-8 w-8 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-black dark:text-white">
                Check your email
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                We sent a magic link to{" "}
                <span className="font-medium">{email}</span>
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Click the link in your email to{" "}
                {mode === "login" ? "sign in" : "create your account"}.
              </p>

              <button
                onClick={resetForm}
                className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Use a different email
              </button>
            </div>

            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Did not receive the email?{" "}
                <button
                  onClick={() => {
                    setIsEmailSent(false);
                    handleMagicLink({
                      preventDefault: () => {},
                    } as React.FormEvent);
                  }}
                  disabled={loading}
                  className="font-semibold text-black hover:text-gray-700 disabled:opacity-50 dark:text-white dark:hover:text-gray-300"
                >
                  Resend
                </button>
              </p>
            </div>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500">
            <Link
              href="/"
              className="hover:text-gray-700 dark:hover:text-gray-300"
            >
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 px-4 dark:from-gray-900 dark:to-black">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-block">
              <h1 className="text-2xl font-bold text-black dark:text-white">
                Meetuoo
              </h1>
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {mode === "signup"
                ? "Create your account to get started"
                : "Welcome back! Please sign in to continue"}
            </p>
          </div>

          <div className="mb-6 flex rounded-lg border border-gray-200 bg-gray-50 p-1 dark:border-gray-800 dark:bg-gray-800">
            <button
              onClick={() => setMethod("google")}
              disabled={loading}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                method === "google"
                  ? "bg-white text-black shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <button
              onClick={() => setMethod("github")}
              disabled={loading}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                method === "github"
                  ? "bg-white text-black shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                or continue with email
              </span>
            </div>
          </div>

          {method === "google" || method === "github" ? (
            <div className="space-y-4">
              <button
                onClick={() => handleOAuth(method)}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                {loading ? (
                  <svg
                    className="h-5 w-5 animate-spin text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <>
                    {method === "google" ? (
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    Continue with {method === "google" ? "Google" : "GitHub"}
                  </>
                )}
              </button>

              <button
                onClick={() => setMethod("magic_link")}
                className="flex w-full items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Use magic link instead
              </button>
            </div>
          ) : (
            <form onSubmit={handleMagicLink} className="space-y-5">
              {mode === "signup" && (
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Full name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required={mode === "signup"}
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-black focus:ring-1 focus:ring-black focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-white"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-black focus:ring-1 focus:ring-black focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-white"
                />
              </div>

              {message && (
                <div
                  className={`rounded-lg px-4 py-3 text-sm ${
                    message.type === "success"
                      ? "bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                      : message.type === "error"
                        ? "bg-red-50 text-red-800 dark:bg-red-900/50 dark:text-red-200"
                        : "bg-blue-50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:focus:ring-white"
              >
                {loading ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Send Magic Link
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMethod("google")}
                className="flex w-full items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
                Continue with Google or GitHub instead
              </button>
            </form>
          )}

          <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              {mode === "signup"
                ? "Already have an account?"
                : "Do not have an account?"}{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="font-semibold text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
              >
                {mode === "signup" ? "Sign in" : "Sign up"}
              </button>
            </p>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          <Link
            href="/"
            className="hover:text-gray-700 dark:hover:text-gray-300"
          >
            ← Back to home
          </Link>
        </p>

        <p className="mt-4 text-center text-xs text-gray-400">
          By continuing, you agree to our{" "}
          <Link
            href="/terms"
            className="underline hover:text-gray-600 dark:hover:text-gray-300"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline hover:text-gray-600 dark:hover:text-gray-300"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
