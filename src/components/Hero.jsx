import React from "react";
import { Phone, MessageSquare, Calendar, ShieldCheck, MapPin, Star } from "lucide-react";

export default function Hero() {
  const scrollToForm = () => {
    const element = document.getElementById("lead-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 md:py-20 lg:py-24">
      {/* Background blobs for premium depth */}
      <div className="absolute top-0 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-brand-cyan/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-brand-blue/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 text-left space-y-6 md:space-y-8">
            
            {/* Tag / Location Pin */}
            <div className="inline-flex items-center space-x-2 bg-brand-blue/5 border border-brand-blue/10 px-3 py-1.5 rounded-full">
              <MapPin className="h-4 w-4 text-brand-teal animate-bounce" />
              <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
                Mandaveli / R.A. Puram, Chennai
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-blue-dark leading-tight tracking-tight mt-2">
              Find the Right Hearing Aid for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-teal">
                Clearer Everyday Conversations
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Get expert guidance for BTE, CIC, RIC, rechargeable and digital hearing aids with professional consultation, precise fitting, and lifetime after-sales support at Grace Speech & Hearing, Mandaveli.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={scrollToForm}
                className="gradient-btn px-8 py-4 rounded-xl font-extrabold text-base text-white text-center shadow-lg shadow-brand-teal/20 active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <Calendar className="h-5 w-5" />
                <span>Book Consultation</span>
              </button>

              <a
                href="tel:+919840029521"
                className="gradient-btn-blue px-6 py-4 rounded-xl font-bold text-base text-center shadow-md active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <Phone className="h-5 w-5" />
                <span>Call +91 98400 29521</span>
              </a>

              <a
                href="https://wa.me/919840029521?text=Hi%20Grace%20Speech%20%26%20Hearing%2C%20I%20am%20interested%20in%20hearing%20aid%20consultation.%20I%20am%20from%20Chennai.%20Please%20share%20appointment%20details."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-slate-50 border border-slate-200 text-whatsapp hover:text-whatsapp-dark px-6 py-4 rounded-xl font-bold text-base text-center active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <MessageSquare className="h-5 w-5" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Trust Line */}
            <div className="text-xs text-slate-500 font-semibold flex flex-wrap gap-2 items-center">
              <span>Open 10:00 AM – 7:00 PM (Mon - Sat)</span>
              <span className="text-slate-300">•</span>
              <span className="text-brand-teal">Chennai Appointments Prioritized</span>
            </div>

            {/* Value Props Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5 text-brand-teal shrink-0" />
                <span className="text-xs font-bold text-slate-700">Digital Consultation</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5 text-brand-teal shrink-0" />
                <span className="text-xs font-bold text-slate-700">Trial & Fitting Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5 text-brand-teal shrink-0" />
                <span className="text-xs font-bold text-slate-700">Chennai Local Centre</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5 text-brand-teal shrink-0" />
                <span className="text-xs font-bold text-slate-700">After-Sales Service</span>
              </div>
            </div>

          </div>

          {/* Right Visual Column (Interactive Card / Illustration) */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Visual Card */}
            <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
              {/* Top accent */}
              <div className="h-2 bg-gradient-to-r from-brand-blue to-brand-teal" />
              
              <div className="p-8 space-y-6">
                
                {/* Brand Visual Logo Slot */}
                <div className="flex justify-center">
                  <div className="w-full bg-slate-50/50 p-2.5 rounded-2xl border border-slate-100 relative group">
                    <img 
                      src="/assets/partner-badge.png" 
                      alt="Grace Hearing Partner Logo" 
                      className="w-full h-auto object-contain rounded-xl"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1590611357124-72400493659d?w=150&auto=format&fit=crop";
                      }}
                    />
                  </div>
                </div>

                {/* Patient / Trust Callout */}
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-brand-blue-dark">Grace Speech & Hearing</h3>
                  <p className="text-xs font-bold text-brand-teal uppercase tracking-widest">Chennai's Premium Care Centre</p>
                  
                  {/* Rating */}
                  <div className="flex justify-center items-center space-x-1 pt-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-slate-500 ml-1.5">(4.9/5 Google Rating)</span>
                  </div>
                </div>

                {/* Diagnostic Check List */}
                <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100 space-y-2 text-sm text-left">
                  <p className="font-bold text-slate-700 mb-2">Our Consultation Includes:</p>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
                    <span>Detailed hearing capability assessment</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
                    <span>Trial models from top digital brands</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
                    <span>Custom earmold and fit adaptation</span>
                  </div>
                </div>

                {/* Booking urgency trigger */}
                <button
                  onClick={scrollToForm}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md active:scale-95 transition-all uppercase tracking-wider"
                >
                  Book Free Trial Session
                </button>

              </div>
            </div>

            {/* Back Accent Badge */}
            <div className="absolute -bottom-6 -left-6 bg-brand-teal text-white p-4 rounded-2xl shadow-lg border border-brand-teal-light flex items-center space-x-3 max-w-[200px] animate-pulse-slow">
              <ShieldCheck className="h-8 w-8 text-brand-cyan" />
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-cyan-light">Authorised Partner</p>
                <p className="text-xs font-bold leading-tight">All Leading Global Brands</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
