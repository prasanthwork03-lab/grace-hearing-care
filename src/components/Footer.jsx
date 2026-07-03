import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, HeartHandshake } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 md:py-16 border-t border-slate-800 pb-24 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-5 text-left space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-white font-extrabold text-lg tracking-tight">
                Grace Speech & Hearing
              </span>
              <span className="text-[10px] uppercase font-bold text-brand-cyan tracking-widest bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                Est. 2000
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Chennai's premier hearing aid consultation, trial, fitting, and service support clinic. Dedicated to providing clearer conversations with modern digital technology.
            </p>

            <div className="text-xs text-slate-500 space-y-1">
              <p>Address: New No: 8, Old No: 68, Adanjan Mudali Street,</p>
              <p>Mandaveli / R.A. Puram, Chennai, Tamil Nadu 600028</p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 text-left space-y-3">
            <h3 className="text-white font-bold text-xs uppercase tracking-wider text-slate-400">Navigation</h3>
            <ul className="text-sm font-semibold space-y-2">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-white transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("products")} className="hover:text-white transition">
                  Hearing Aid Models
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("lead-form")} className="hover:text-white transition">
                  Book Trial
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("location")} className="hover:text-white transition">
                  Clinic Location
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Admin */}
          <div className="md:col-span-4 text-left space-y-3">
            <h3 className="text-white font-bold text-xs uppercase tracking-wider text-slate-400">Legal Compliance</h3>
            <ul className="text-sm font-semibold space-y-2">
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-white transition">
                  Staff Login Portal
                </Link>
              </li>
            </ul>

            {/* Google Ads Compliance Badges */}
            <div className="flex items-center space-x-2.5 pt-4 text-xs font-bold text-slate-500">
              <ShieldCheck className="h-4 w-4 text-brand-teal" />
              <span>Compliant with Google Health policies</span>
            </div>
          </div>

        </div>

        {/* Disclaimer Section */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-left space-y-4">
          <p className="text-[10px] leading-relaxed text-slate-500">
            <strong>Medical Disclaimer:</strong> Hearing aids are supportive acoustic devices designed to improve speech audibility and sound clarity. They do not constitute a permanent cure for hearing loss. Actual performance depends on individual ear geometry, audiological thresholds, and customized digital fitting. An in-person consultation and audiology trial are mandatory before procuring any digital hearing aid device.
          </p>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-slate-500">
            <p>
              &copy; {currentYear} Grace Speech & Hearing Care. All rights reserved. Chennai, India.
            </p>
            <p className="flex items-center space-x-1 font-bold text-[10px] text-slate-600 bg-white/5 border border-white/5 px-2.5 py-1 rounded-full">
              <HeartHandshake className="h-3.5 w-3.5" />
              <span>Dedicated Senior Support</span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
