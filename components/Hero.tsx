"use client";

import StripeButton from "@/src/components/pixel-perfect/stripe-button";

import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative pt-48 pb-32 overflow-hidden min-h-screen flex flex-col items-center justify-center selection-accent">
      {/* Premium Background Atmosphere */}
      <div className="absolute inset-0 z-0 text-white">
        <div className="absolute inset-0 bg-[#121212]"></div>
        <div className="absolute inset-0 technical-grid opacity-20"></div>
        
        {/* Decorative Technical Lines */}
        <div className="absolute left-1/4 top-0 h-full w-px bg-white/5 hidden lg:block">
           <div className="absolute top-1/4 left-0 plus-marker"></div>
           <div className="absolute top-3/4 left-0 plus-marker"></div>
        </div>
        <div className="absolute right-1/4 top-0 h-full w-px bg-white/5 hidden lg:block">
           <div className="absolute top-1/4 left-0 plus-marker"></div>
           <div className="absolute top-3/4 left-0 plus-marker"></div>
        </div>
        <div className="absolute top-1/4 left-0 w-full h-px bg-white/5 hidden lg:block"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-white/5 hidden lg:block"></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full hero-glow opacity-60"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>


      <div className="container relative z-10 mx-auto px-6 text-center max-w-5xl">
        {/* Pills / Badges */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 mb-10 animate-fade-in transition-all hover:bg-white/5 cursor-default">
          <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">
            Introducing v1.0
          </span>
          <div className="w-1 h-1 rounded-full bg-white/20"></div>
          <span className="text-[11px] font-medium text-neutral-400">
            View Changelog
          </span>
          <svg className="w-2.5 h-2.5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        <div className="relative inline-block group">
          <div className="absolute -top-12 -left-12 md:-top-20 md:-left-20 w-24 h-24 md:w-40 md:h-40 opacity-10 pointer-events-none transition-all duration-700 group-hover:opacity-20 group-hover:scale-110">
            <svg viewBox="0 0 1024 1024" className="w-full h-full" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M832 384l8 1.6-1.6 8 1.6 3.2-4.8 3.2-44.8 161.6-16-4.8 40-147.2-260.8 144-158.4 284.8-11.2-6.4-6.4 6.4-176-176 11.2-11.2 163.2 163.2 147.2-265.6-294.4-297.6 11.2-11.2v-8h9.6l3.2-3.2 3.2 3.2L664 208l1.6 16-395.2 22.4 278.4 278.4 276.8-153.6 6.4 12.8z" fill="#050D42"></path>
                <path d="M896 384c0 35.2-28.8 64-64 64s-64-28.8-64-64 28.8-64 64-64 64 28.8 64 64z m-656-32c-62.4 0-112-49.6-112-112s49.6-112 112-112 112 49.6 112 112-49.6 112-112 112z m304 336c-80 0-144-64-144-144s64-144 144-144 144 64 144 144-64 144-144 144z m-224 144c0-35.2 28.8-64 64-64s64 28.8 64 64-28.8 64-64 64-64-28.8-64-64z m-144-176c0-17.6 14.4-32 32-32s32 14.4 32 32-14.4 32-32 32-32-14.4-32-32z m448-440c0-22.4 17.6-40 40-40s40 17.6 40 40-17.6 40-40 40-40-17.6-40-40zM736 560c0-27.2 20.8-48 48-48s48 20.8 48 48-20.8 48-48 48-48-20.8-48-48z" fill="#2F4BFF"></path>
              </g>
            </svg>
          </div>
          <h1 className="text-8xl md:text-[12rem] font-bold tracking-tighter text-white max-w-4xl mx-auto leading-[0.8] mb-8 font-display uppercase italic text-center">
            MeetUOo
          </h1>
        </div>

        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-12 font-medium text-center">
          Save hours of meeting analysis with clean, ready-to-use AI insights 
          that just work — modern, responsive, and built for speed.
        </p>




        {/* Micro-details / Data Points */}
        <div className="mt-32 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-30 grayscale transition-all hover:grayscale-0 hover:opacity-60 text-white">
           <div className="flex items-center gap-2">
              <div className="w-5 h-5 border border-white rounded-sm"></div>
              <span className="text-[12px] font-bold uppercase tracking-widest">Analysis</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-5 h-5 border border-white rounded-full"></div>
              <span className="text-[12px] font-bold uppercase tracking-widest">Synthesis</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white rotate-45"></div>
              <span className="text-[12px] font-bold uppercase tracking-widest">Discovery</span>
           </div>
        </div>
      </div>
    </section>
  );
};

