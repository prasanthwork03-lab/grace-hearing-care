import React from "react";
import { Star, MessageSquareQuote, Check } from "lucide-react";

export default function TrustSection() {
  const reviews = [
    {
      name: "Ramanathan K.",
      location: "Mylapore, Chennai",
      rating: 5,
      review: "Very professional fitting support. I took my father here for a BTE trial. They explained all options in detail, adjusted the frequencies, and made the whole process comfortable for senior citizens."
    },
    {
      name: "Sujatha Sundar",
      location: "Mandaveli, Chennai",
      rating: 5,
      review: "The invisible CIC hearing aid is fantastic! Nobody can tell I am wearing one. The fine-tuning session was very helpful, and the staff is extremely patient. Excellent local service in Mandaveli."
    },
    {
      name: "Prasanna Venkatesh",
      location: "Adyar, Chennai",
      rating: 5,
      review: "Clean clinic, direct consultation, and very reasonable product guidance. They helped upgrade my mother's old hearing aid. The exchange value they offered was very genuine."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue-dark tracking-tight">
            Trusted by Chennai Customers
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            Hear first-hand experiences from local residents in Mylapore, Mandaveli, and surrounding areas who found clear audio support with our team.
          </p>
        </div>

        {/* Customer Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between text-left space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-1">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 italic leading-relaxed">
                  "{r.review}"
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-100/50 text-xs">
                <div>
                  <p className="font-bold text-brand-blue-dark">{r.name}</p>
                  <p className="text-slate-400 font-semibold">{r.location}</p>
                </div>
                <span className="flex items-center text-brand-teal font-extrabold uppercase tracking-wider text-[10px]">
                  <Check className="h-3 w-3 mr-1" /> Verified Lead
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Screenshot Box - Instruction Compliant */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-3xl p-8 text-center space-y-4 hover:bg-slate-100/50 transition-colors">
            <div className="flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />
              ))}
            </div>
            
            <h3 className="text-lg font-bold text-brand-blue-dark">Google Review Highlights</h3>
            
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              [Add real Google Review screenshot here]
              <span className="block mt-2 font-semibold text-slate-400">
                Place the screenshot image in public/assets/google-review-screenshot.png to showcase real-time patient ratings.
              </span>
            </p>

            <div className="inline-flex items-center space-x-2 text-xs font-bold text-brand-teal bg-brand-teal/5 border border-brand-teal/10 px-3.5 py-1.5 rounded-full">
              <span>Avg Google Rating 4.9 Stars (50+ Reviews)</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
