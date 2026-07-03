import React from "react";
import { CalendarRange, Speech, Ear, Settings2, Calendar } from "lucide-react";

export default function Process() {
  const scrollToForm = () => {
    const element = document.getElementById("lead-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const steps = [
    {
      num: "01",
      icon: <CalendarRange className="h-6 w-6 text-brand-teal" />,
      title: "Book Appointment",
      description: "Submit our short form or contact us via Phone/WhatsApp. Our team will schedule your visit."
    },
    {
      num: "02",
      icon: <Speech className="h-6 w-6 text-brand-teal" />,
      title: "Requirement Discussion",
      description: "Our experts discuss your specific hearing needs, challenges, and lifestyle routines."
    },
    {
      num: "03",
      icon: <Ear className="h-6 w-6 text-brand-teal" />,
      title: "Trial & Recommendation",
      description: "Experience premium digital hearing devices first-hand with active recommendations."
    },
    {
      num: "04",
      icon: <Settings2 className="h-6 w-6 text-brand-teal" />,
      title: "Fitting & Ongoing Support",
      description: "We program, fine-tune, and fit your model, followed by complete after-sales care."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue-dark tracking-tight">
            Simple 4-Step Hearing Aid Consultation Process
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            A clear, organized approach ensures you or your parents receive the exact device needed for comfortable hearing.
          </p>
        </div>

        {/* Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 relative">
          
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/3 left-8 right-8 h-0.5 bg-slate-100 -z-10" />

          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-4 group">
              
              {/* Step Circle */}
              <div className="relative w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-md flex items-center justify-center group-hover:border-brand-teal transition-all duration-300">
                <div className="absolute -top-3 -right-3 bg-brand-blue-dark text-brand-cyan text-[10px] font-black px-2 py-0.5 rounded-full border border-brand-teal/20">
                  {step.num}
                </div>
                {step.icon}
              </div>

              {/* Step Copy */}
              <div className="space-y-1.5 px-4">
                <h3 className="text-lg font-bold text-brand-blue-dark">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {step.description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Section Footer CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={scrollToForm}
            className="gradient-btn px-6 py-3.5 rounded-xl font-bold text-base flex items-center justify-center space-x-2 mx-auto"
          >
            <Calendar className="h-5 w-5" />
            <span>Start With a Consultation</span>
          </button>
        </div>

      </div>
    </section>
  );
}
