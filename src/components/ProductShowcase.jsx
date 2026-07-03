import React, { useState } from "react";
import { services } from "../data/services";
import { MessageSquare, CalendarRange, Sparkles, Ear } from "lucide-react";

// Function to render custom, premium SVGs for each hearing aid type (as a robust fallback)
const renderProductIcon = (productId) => {
  switch (productId) {
    case "bte_hearing_aid":
      return (
        <svg className="w-14 h-14 text-brand-teal" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 22C22 22 26 12 36 12C46 12 48 20 45 28C42 33 38 35 38 40C38 45 42 46 41 51C40 56 30 57 26 51C24 47 25 43 25 41" stroke="#0d9488" strokeWidth="2" strokeLinecap="round"/>
          <path d="M21 16C22.5 13 25.5 12 28 14C30.5 16 31 20 30.5 25C30 30 27.5 35 27.5 39C27.5 42 28.5 44 27 46C25.5 48 22.5 47 21.5 44C20.5 41 21.5 37 22 34C22.5 31 22.5 27 22.5 24C22.5 19 21.5 17 21 16Z" fill="url(#bteGrad)" stroke="#1e3a8a" strokeWidth="1.5"/>
          <defs>
            <linearGradient id="bteGrad" x1="21" y1="12" x2="30.5" y2="46">
              <stop stopColor="#94a3b8"/><stop offset="1" stopColor="#475569"/>
            </linearGradient>
          </defs>
        </svg>
      );
    case "cic_invisible_hearing_aid":
      return (
        <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 32C16 32 20 26 28 26C36 26 40 32 48 32" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M23 24C23 24 24.5 19 29 19C33.5 19 36 24 36 29C36 34 33 39 29 39C25 39 23 34 23 29Z" fill="#fdba74" stroke="#ea580c" strokeWidth="1.5"/>
          <path d="M35 21.5C35 21.5 37 24 37 29C37 34 35 36.5 35 36.5Z" fill="#ef4444" stroke="#dc2626" strokeWidth="1"/>
        </svg>
      );
    case "ric_hearing_aid":
      return (
        <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 20C20.5 16.5 24 15.5 26 17C28 18.5 28.5 22.5 28 27C27.5 31.5 26 36 26 40C26 43 26.5 45 25 47C23.5 49 21.5 48 20.5 45C19.5 42 20 38 20.5 35C21 32 21 28 20.5 25C20 21.5 19 20 19 20Z" fill="url(#ricGrad)" stroke="#334155" strokeWidth="1.5"/>
          <path d="M26 17C26 17 32 10 40 18C48 26 38 36 34 38" stroke="#0ea5e9" strokeWidth="1" strokeLinecap="round"/>
          <circle cx="34" cy="38" r="4.5" fill="#0d9488" fillOpacity="0.3" stroke="#0d9488" strokeWidth="1"/>
          <defs>
            <linearGradient id="ricGrad" x1="19" y1="15.5" x2="28" y2="47">
              <stop stopColor="#cbd5e1"/><stop offset="1" stopColor="#64748b"/>
            </linearGradient>
          </defs>
        </svg>
      );
    default:
      return <Ear className="h-10 w-10 text-brand-teal" />;
  }
};

// Sub-component to load images with error fallback
const ProductImage = ({ src, alt, productId }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full bg-slate-50 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center border border-slate-100 shadow-sm">
          {renderProductIcon(productId)}
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
  );
};

export default function ProductShowcase({ onSelectRequirement }) {
  
  const handleAction = (requirementVal) => {
    onSelectRequirement(requirementVal);
    const element = document.getElementById("lead-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="products" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue-dark tracking-tight">
            Hearing Aid Options Available
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            We offer a wide selection of leading-edge digital, rechargeable, and discreet hearing solutions tailored to your specific hearing needs and lifestyle.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300 overflow-hidden flex flex-col group text-left"
            >
              {/* Product Visual Box - Cover Photo */}
              <div className="h-56 bg-slate-100 relative overflow-hidden">
                <div className="absolute top-3 left-3 bg-brand-blue-dark/85 border border-white/10 px-2.5 py-1 rounded-full text-xs font-bold text-white flex items-center space-x-1 z-10 shadow-sm">
                  <Sparkles className="h-3 w-3 text-brand-cyan-light" />
                  <span>Premium Technology</span>
                </div>
                
                {/* Dynamically loads image or falls back to custom SVGs */}
                <ProductImage src={product.image} alt={product.name} productId={product.id} />
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-brand-blue-dark">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-650 leading-relaxed min-h-[40px]">
                    {product.description}
                  </p>
                  
                  {/* Highlight Benefit */}
                  <div className="pt-2 text-xs font-semibold text-brand-teal flex items-center">
                    <span className="bg-brand-teal/10 px-2.5 py-1 rounded-full">
                      Benefit: {product.benefit}
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-50">
                  <a
                    href={`https://wa.me/919840029521?text=Hi%20Grace%20Speech%20%26%20Hearing%2C%20I%20am%20interested%20in%20knowing%20the%20price%20of%20${encodeURIComponent(product.name)}.%20I%20am%20from%20Chennai.%20Please%20share%20pricing%20details.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-brand-teal text-brand-teal hover:bg-brand-teal/5 text-xs font-bold transition-all active:scale-95 text-center"
                  >
                    <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
                    Ask Price
                  </a>
                  <button
                    onClick={() => handleAction(product.requirementVal)}
                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-brand-teal hover:bg-brand-teal-light text-white text-xs font-bold shadow-sm transition-all active:scale-95"
                  >
                    <CalendarRange className="mr-1.5 h-3.5 w-3.5" />
                    Book Trial
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
