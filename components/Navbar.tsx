"use client";

import StripeButton from "@/src/components/pixel-perfect/stripe-button";
import Link from "next/link";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1280px] z-50 transition-all duration-500 border-b border-x ${
        scrolled 
          ? "bg-[#121212]/80 backdrop-blur-xl py-4 border-white/10 shadow-lg" 
          : "bg-transparent py-8 border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center transition-transform group-hover:scale-110">
             <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
          </div>
          <span className="text-lg font-bold tracking-tighter text-white font-display uppercase">
            Meetuoo
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10">
        </div>


        <div className="flex items-center gap-6">
          <Link href="/login">
            <StripeButton className="px-6 py-2.5">
              Login
            </StripeButton>
          </Link>
        </div>

      </div>
    </nav>

  );
};

