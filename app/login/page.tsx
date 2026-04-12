"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import StripeButton from "@/src/components/pixel-perfect/stripe-button";


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
    <div className="relative min-h-screen flex items-center justify-center bg-[#121212] overflow-hidden selection-accent font-sans">
      {/* Technical Background Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 technical-grid opacity-[0.05]"></div>
        <div className="absolute inset-0 diagonal-lines opacity-[0.03]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full hero-glow opacity-40"></div>
      </div>

      <div className="w-full max-w-md relative z-10 px-4">
        <div className="rounded-3xl border border-white/5 bg-neutral-900/40 backdrop-blur-xl p-8 shadow-2xl transition-all">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-block group">
              <h1 className="text-3xl font-bold tracking-tighter text-white uppercase italic group-hover:scale-110 transition-transform">
                MeetUOo
              </h1>
            </Link>
            <p className="mt-4 text-sm font-medium text-neutral-400">
              {mode === "signup"
                ? "Create your account to get started"
                : "Welcome back! Please sign in to continue"}
            </p>
          </div>

          <div className="mb-6 flex rounded-xl border border-white/5 bg-neutral-950/50 p-1">
            <button
              onClick={() => setMethod("google")}
              disabled={loading}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-[13px] font-bold transition-all ${
                method === "google"
                  ? "bg-white text-black shadow-lg"
                  : "text-neutral-500 hover:text-white"
              }`}
            >
              Google
            </button>
            <button
              onClick={() => setMethod("github")}
              disabled={loading}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-[13px] font-bold transition-all ${
                method === "github"
                  ? "bg-white text-black shadow-lg"
                  : "text-neutral-500 hover:text-white"
              }`}
            >
              GitHub
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-[11px] font-bold uppercase tracking-widest">
              <span className="bg-neutral-900/40 px-3 text-neutral-500">
                Email Authentication
              </span>
            </div>
          </div>

          {method === "google" || method === "github" ? (
            <div className="space-y-4">
              <StripeButton
                onClick={() => handleOAuth(method)}
                disabled={loading}
                className="w-full py-3.5"
              >
                {loading ? "Connecting..." : `Continue with ${method === "google" ? "Google" : "GitHub"}`}
              </StripeButton>

              <button
                onClick={() => setMethod("magic_link")}
                className="flex w-full items-center justify-center gap-2 text-xs font-bold text-neutral-500 hover:text-white transition-colors"
              >
                ← Use magic link instead
              </button>
            </div>
          ) : (
            <form onSubmit={handleMagicLink} className="space-y-5">
              {mode === "signup" && (
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-[11px] font-bold uppercase tracking-widest text-neutral-500 mb-1.5"
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
                    className="mt-1 block w-full rounded-xl border border-white/5 bg-neutral-950/50 px-4 py-3 text-sm text-white placeholder-neutral-600 shadow-sm focus:border-white/20 focus:outline-none transition-all"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-[11px] font-bold uppercase tracking-widest text-neutral-500 mb-1.5"
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
                  className="mt-1 block w-full rounded-xl border border-white/5 bg-neutral-950/50 px-4 py-3 text-sm text-white placeholder-neutral-600 shadow-sm focus:border-white/20 focus:outline-none transition-all"
                />
              </div>

              {message && (
                <div
                  className={`rounded-xl px-4 py-3 text-[13px] font-bold ${
                    message.type === "success"
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : message.type === "error"
                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                        : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <StripeButton
                type="submit"
                disabled={loading}
                className="w-full py-3.5"
              >
                {loading ? "Sending..." : "Send Magic Link"}
              </StripeButton>

              <button
                type="button"
                onClick={() => setMethod("google")}
                className="flex w-full items-center justify-center gap-2 text-xs font-bold text-neutral-500 hover:text-white transition-colors"
              >
                Show OAuth Options →
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-center text-[13px] font-medium text-neutral-500">
              {mode === "signup"
                ? "Already have an account?"
                : "Need an account?"}{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-white font-bold hover:underline"
              >
                {mode === "signup" ? "Sign in" : "Sign up"}
              </button>
            </p>
          </div>
        </div>

        <p className="mt-12 text-center text-[11px] font-bold uppercase tracking-widest text-neutral-600">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-neutral-500 hover:text-white transition-colors">
            Terms
          </Link>{" "}
          &{" "}
          <Link href="/privacy" className="text-neutral-500 hover:text-white transition-colors">
            Privacy
          </Link>
        </p>
      </div>
    </div>
  );
}


