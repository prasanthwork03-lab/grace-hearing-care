import React from "react";
import { Phone, Calendar, Sparkles } from "lucide-react";

export default function FinalCTA() {
  const scrollToForm = () => {
    const element = document.getElementById("lead-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-brand-blue-dark text-white relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full bg-brand-teal/20 blur-3xl" />
      <div className="absolute left-1/4 top-0 w-64 h-64 rounded-full bg-brand-blue/15 blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative text-center space-y-8">
        
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full mx-auto">
          <Sparkles className="h-4 w-4 text-brand-cyan animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-brand-cyan-light">
            Take Action Today
          </span>
        </div>

        {/* Headlines */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-2xl mx-auto leading-tight">
            Ready to Find the Right Hearing Aid?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Book a personalized consultation with Grace Speech & Hearing and get expert guidance on suitable digital options, customized trials, and precise fittings.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 max-w-md mx-auto sm:max-w-none">
          <button
            onClick={scrollToForm}
            className="px-8 py-4 bg-brand-teal hover:bg-brand-teal-light text-white font-extrabold text-base rounded-xl transition duration-300 transform active:scale-95 shadow-lg shadow-brand-teal/20 flex items-center justify-center space-x-2"
          >
            <Calendar className="h-5 w-5" />
            <span>Book Appointment Now</span>
          </button>
          
          <a
            href="tel:+919840029521"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-extrabold text-base rounded-xl transition duration-300 transform active:scale-95 flex items-center justify-center space-x-2"
          >
            <Phone className="h-5 w-5 text-brand-cyan" />
            <span>Call +91 98400 29521</span>
          </a>
        </div>

        {/* Small trust banner */}
        <p className="text-[11px] text-slate-400 font-semibold tracking-wider uppercase">
          No obligation trials • Mandaveli centre since 2000
        </p>

      </div>
    </section>
  );
}
