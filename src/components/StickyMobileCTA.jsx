import React, { useEffect, useState } from "react";
import { CalendarRange, Sparkles } from "lucide-react";

export default function StickyMobileCTA() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById("lead-form");
    if (!form) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFormVisible(entry.isIntersecting),
      { threshold: 0.08 }
    );

    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  const scrollToForm = () => {
    const element = document.getElementById("lead-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      aria-hidden={isFormVisible}
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden px-4 pb-[max(0.9rem,env(safe-area-inset-bottom))] pt-5 flex justify-center items-center transition-all duration-300 ${isFormVisible ? "translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}
    >
      <div className="w-full max-w-md rounded-[1.6rem] border border-white/70 bg-white/80 p-2 shadow-[0_-10px_35px_rgba(15,23,42,0.16)] backdrop-blur-xl">
        <button
          type="button"
          onClick={scrollToForm}
          className="relative w-full min-h-14 overflow-hidden rounded-[1.25rem] bg-gradient-to-r from-brand-blue via-brand-teal to-brand-cyan px-4 py-3 text-white shadow-xl shadow-brand-teal/30 animate-glow-pulse transition-all active:scale-[0.98] flex items-center justify-center gap-3"
        >
          <span className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.28),transparent)] translate-x-[-120%] animate-[shine_2.8s_ease-in-out_infinite]" />
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/18 ring-1 ring-white/25">
            <CalendarRange className="h-5 w-5" />
          </span>
          <span className="relative text-left leading-tight">
            <span className="block text-sm font-black uppercase tracking-wide">Book Appointment</span>
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-100">
              <Sparkles className="h-3 w-3" />
              Free trial callback
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
