import React from "react";
import { ShieldCheck, Heart, Sparkles, MapPin, Award, CheckCircle } from "lucide-react";

export default function WhyChoose() {
  const points = [
    {
      title: "Located in Mandaveli / R.A. Puram",
      description: "Conveniently situated in central Chennai with easy access and ample parking space."
    },
    {
      title: "Consultation First Approach",
      description: "We focus on detailed analysis and expert product guidance rather than quick sales."
    },
    {
      title: "Multiple Hearing Aid Models",
      description: "Access a wide portfolio of digital, invisible, and rechargeable models from leading global brands."
    },
    {
      title: "Trial & Custom Fitting Support",
      description: "Get real trials, custom ear fitting, and precision digital programming for natural hearing."
    },
    {
      title: "Lifetime After-Sales Support",
      description: "Comprehensive services, cleanings, battery supplies, and reprogramming adjustments are always available."
    },
    {
      title: "Senior Citizen Friendly",
      description: "A comfortable, welcoming clinic designed for ease of access and patient guidance for seniors."
    }
  ];

  const badges = [
    { label: "Local Chennai Centre", icon: <MapPin className="h-5 w-5 text-brand-teal" /> },
    { label: "Consultation-First", icon: <ShieldCheck className="h-5 w-5 text-brand-teal" /> },
    { label: "Lifetime Support", icon: <Award className="h-5 w-5 text-brand-teal" /> },
    { label: "Senior Friendly", icon: <Heart className="h-5 w-5 text-brand-teal" /> },
    { label: "Quick Booking", icon: <Sparkles className="h-5 w-5 text-brand-teal" /> }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue-dark tracking-tight">
            Why Chennai Customers Choose Grace Speech & Hearing
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            We provide a dedicated path to clearer hearing, combining modern audio technologies with caring, personalized healthcare consulting.
          </p>
        </div>

        {/* Core Badges Row */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-2 bg-white px-4 py-2.5 rounded-full border border-slate-100 shadow-sm text-xs font-bold text-slate-700"
            >
              {badge.icon}
              <span>{badge.label}</span>
            </div>
          ))}
        </div>

        {/* Detailed Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {points.map((pt, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex space-x-4 items-start text-left"
            >
              <CheckCircle className="h-6 w-6 text-brand-teal shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-brand-blue-dark">
                  {pt.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {pt.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
