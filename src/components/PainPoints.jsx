import React from "react";
import { MessageSquareOff, Tv, PhoneOff, Users, HeartHandshake, RefreshCw, CalendarDays } from "lucide-react";

export default function PainPoints() {
  const scrollToForm = () => {
    const element = document.getElementById("lead-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const struggles = [
    {
      icon: <MessageSquareOff className="h-8 w-8 text-brand-teal" />,
      title: "Asking to Repeat",
      description: "Finding yourself asking family and friends to repeat themselves, especially in crowded or noisy environments."
    },
    {
      icon: <Tv className="h-8 w-8 text-brand-teal" />,
      title: "High TV Volume",
      description: "Needing to turn the television or radio volume up to levels that others in the room find uncomfortable."
    },
    {
      icon: <PhoneOff className="h-8 w-8 text-brand-teal" />,
      title: "Unclear Phone Calls",
      description: "Struggling to hear clearly during telephone calls or missing parts of important phone conversations."
    },
    {
      icon: <Users className="h-8 w-8 text-brand-teal" />,
      title: "Difficult Family Chats",
      description: "Feeling left out during dinner table talk or family gatherings because voices sound muffled."
    },
    {
      icon: <HeartHandshake className="h-8 w-8 text-brand-teal" />,
      title: "Caring for Parents",
      description: "Looking for a reliable, easy-to-use, and comfortable hearing aid solution to support your aging parents."
    },
    {
      icon: <RefreshCw className="h-8 w-8 text-brand-teal" />,
      title: "Outdated Hearing Aid",
      description: "Your existing hearing aid is whistle-prone, uncomfortable, or no longer provides the clarity you need."
    }
  ];

  return (
    <section className="bg-slate-50 py-16 md:py-24 border-t border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue-dark tracking-tight">
            Are You Facing These Hearing Difficulties?
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            Hearing challenges can sneak up gradually. Identifying them early helps in finding the correct support and regaining clarity in everyday conversations.
          </p>
        </div>

        {/* Struggles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
          {struggles.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 flex flex-col text-left space-y-4"
            >
              <div className="p-3 bg-brand-blue/5 rounded-xl w-fit">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-brand-blue-dark">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Section Footer CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={scrollToForm}
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold text-white bg-brand-blue hover:bg-brand-blue-dark shadow-md active:scale-95 transition-all space-x-2"
          >
            <CalendarDays className="h-5 w-5" />
            <span>Book a Consultation Today</span>
          </button>
        </div>

      </div>
    </section>
  );
}
