import React from "react";
import { Phone, Clock, CalendarDays } from "lucide-react";

export default function Header() {
  const scrollToForm = () => {
    const element = document.getElementById("lead-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex min-w-0 items-center space-x-2 sm:space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img
              src="/assets/logo.png"
              alt="Grace Speech & Hearing"
              className="h-12 w-auto shrink-0 object-contain rounded-md sm:h-14"
              onError={(e) => {
                // Failback placeholder if image not found
                e.target.style.display = "none";
              }}
            />
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-bold text-brand-blue-dark leading-tight tracking-tight sm:text-lg">
                Grace Speech & Hearing
              </span>
              <span className="truncate text-[9px] uppercase font-semibold text-brand-teal tracking-wider sm:text-[10px]">
                Hearing Aid Care Chennai
              </span>
            </div>
          </div>

          {/* Quick Contact & Hours (Desktop) */}
          <div className="hidden lg:flex items-center space-x-8 text-sm">
            <div className="flex items-center space-x-2 text-slate-600">
              <Clock className="h-4 w-4 text-brand-teal" />
              <div>
                <p className="font-medium text-xs text-slate-400 uppercase tracking-wider">Hours</p>
                <p className="font-semibold text-brand-blue-dark">Mon - Sat: 10 AM - 7 PM</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-slate-600">
              <Phone className="h-4 w-4 text-brand-teal" />
              <div>
                <p className="font-medium text-xs text-slate-400 uppercase tracking-wider">Call Centre</p>
                <p className="font-bold text-brand-blue-dark">
                  <a href="tel:+919840029521" className="hover:text-brand-teal transition">+91 98400 29521</a>
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="ml-2 flex shrink-0 items-center space-x-2 sm:space-x-3">
            <a
              href="tel:+919840029521"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <Phone className="mr-2 h-4 w-4 text-brand-blue" />
              Call Now
            </a>
            
            <button
              onClick={scrollToForm}
              className="inline-flex items-center justify-center rounded-lg bg-brand-teal px-3 py-2.5 text-xs font-bold text-white shadow-md shadow-brand-teal/20 transition-all duration-300 active:scale-95 hover:bg-brand-teal-light sm:px-5 sm:text-sm"
            >
              <CalendarDays className="mr-1.5 h-4 w-4 sm:mr-2" />
              <span className="sm:hidden">Book</span>
              <span className="hidden sm:inline">Book Appointment</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
