import React, { useEffect, useState } from "react";
import { CalendarRange } from "lucide-react";

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
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/90 backdrop-blur-lg border-t border-slate-100/60 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] px-3 sm:px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex justify-center items-center transition-all duration-300 ${isFormVisible ? "translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}
    >
      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={scrollToForm}
          className="w-full min-h-12 py-3 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-teal text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-brand-teal/20 animate-glow-pulse transition-all active:scale-[0.98] flex items-center justify-center space-x-2"
        >
          <CalendarRange className="h-5 w-5 animate-bounce" style={{ animationDuration: "2s" }} />
          <span>Book Appointment</span>
        </button>
      </div>
    </div>
  );
}
