import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";


export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#121212] selection-accent font-sans flex flex-col items-center overflow-x-hidden">
      <Navbar />
      
      {/* Global Blueprint Lines */}
      <div className="absolute left-[max(0px,calc(50%-640px))] top-0 h-full w-px bg-white/5 hidden xl:block pointer-events-none z-20"></div>
      <div className="absolute right-[max(0px,calc(50%-640px))] top-0 h-full w-px bg-white/5 hidden xl:block pointer-events-none z-20"></div>

      <main className="dark relative bg-[#121212] text-foreground w-full relative z-10">
        <Hero />
      </main>




      {/* Simplified technical footer */}
      <footer className="w-full py-20 bg-[#121212] border-t border-white/5 selection-accent">

        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center">
                 <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
              </div>
              <span className="text-xl font-bold tracking-tighter text-white font-display uppercase">Meetuoo</span>
            </div>
            <p className="text-neutral-500 text-sm font-medium leading-relaxed max-w-[240px]">
              Building the next generation of AI-driven meeting intelligence for high-performance teams.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm">
             <Link href="#" className="text-neutral-500 hover:text-white transition-colors">Documentation</Link>
             <Link href="#" className="text-neutral-500 hover:text-white transition-colors">Privacy</Link>
             <Link href="#" className="text-neutral-500 hover:text-white transition-colors">Terms</Link>
          </div>

        </div>
        
        <div className="container mx-auto px-6 max-w-7xl mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-neutral-600 text-xs font-mono lowercase tracking-tight">
             © 2026 Meetuoo Inc. Built with precision and care.
           </p>
           <div className="flex items-center gap-4 text-xs text-neutral-600">
              <div className="flex items-center gap-1.5 cursor-default">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                 All systems operational
              </div>
              <div className="w-px h-3 bg-white/10 hidden md:block"></div>
              <p className="hidden md:block">v1.0.42-stable</p>
           </div>
        </div>
      </footer>
    </div>
  );
}

// Simple Link Mockup if not imported
function Link({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return <a href={href} className={className}>{children}</a>;
}

