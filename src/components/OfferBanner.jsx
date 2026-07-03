import React from "react";

export default function OfferBanner({ onSelectRequirement }) {
  const handleClaim = () => {
    onSelectRequirement("Old Hearing Aid Exchange");
    const element = document.getElementById("lead-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-8 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          onClick={handleClaim}
          className="cursor-pointer rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 relative group"
        >
          {/* Main Poster Image */}
          <img 
            src="/assets/offer-poster.jpeg" 
            alt="26th Anniversary Special Hearing Aid Offer" 
            className="w-full h-auto object-cover"
          />
          {/* Subtle hover overlay to guide user interaction */}
          <div className="absolute inset-0 bg-brand-blue-dark/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-brand-teal text-white font-extrabold text-sm uppercase px-5 py-2.5 rounded-xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              Claim Anniversary Offer
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
