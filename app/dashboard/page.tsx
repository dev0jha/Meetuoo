"use client";

import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@/components/auth-provider";

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black">
        <div className="flex flex-col items-center gap-4">
          <svg
            className="h-8 w-8 animate-spin text-black dark:text-white"
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
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const userName = user?.user_metadata?.full_name || user?.user_metadata?.name;
  const userEmail = user?.email;
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-black">
      <header className="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/dashboard"
            className="text-xl font-bold text-black dark:text-white"
          >
            Meetuoo
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={userName || "User"}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-medium text-white dark:bg-white dark:text-black">
                  {userName
                    ? userName.charAt(0).toUpperCase()
                    : userEmail?.charAt(0).toUpperCase() || "?"}
                </div>
              )}
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-black dark:text-white">
                  {userName || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {userEmail}
                </p>
              </div>
            </div>
            <button
              onClick={signOut}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-black dark:text-white">
              Welcome{userName ? `, ${userName.split(" ")[0]}` : ""}!
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Your intelligent meeting companion dashboard
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-black hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-white">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                Meetings
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Schedule and manage your meetings with AI-powered summaries.
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-black dark:text-white">
                Get Started
                <svg
                  className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>

            <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-black hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-white">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                Workspaces
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Organize your work and collaborate with team members.
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-black dark:text-white">
                Get Started
                <svg
                  className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>

            <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-black hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-white">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-black group-hover:text-green-600 dark:text-white dark:group-hover:text-green-400">
                Settings
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage your account settings and preferences.
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-black dark:text-white">
                Get Started
                <svg
                  className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 p-6 dark:border-gray-800 dark:from-blue-900/20 dark:to-purple-900/20">
            <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
              Quick Start Guide
            </h3>
            <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white dark:bg-white dark:text-black">
                  1
                </span>
                Upload your meeting audio or video file
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white dark:bg-white dark:text-black">
                  2
                </span>
                AI generates transcript and summary automatically
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white dark:bg-white dark:text-black">
                  3
                </span>
                Share insights with your team via email
              </li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
