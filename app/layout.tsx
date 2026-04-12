import type { Metadata } from "next";
import { Poppins, IBM_Plex_Mono, Geist } from "next/font/google";

import { AuthProvider } from "@/components/auth-provider";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meetuoo - Intelligent Meeting Companion",
  description: "Schedule, summarize, and collaborate with your intelligent meeting companion",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "selection-accent", poppins.variable, ibmPlexMono.variable, "font-sans", geist.variable)}
    >
      <body className="flex min-h-full flex-col bg-[#121212] overflow-x-hidden">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}


