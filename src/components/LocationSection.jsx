import React from "react";
import { MapPin, Phone, Clock, Compass, PhoneCall } from "lucide-react";

export default function LocationSection() {
  const address = "New No: 8, Old No: 68, Adanjan Mudali Street, Mandaveli / R.A. Puram, Chennai, Tamil Nadu 600028";
  
  const mapSearchQuery = encodeURIComponent("Grace Speech & Hearing Care Mandaveli Chennai");
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapSearchQuery}`;
  const embedUrl = `https://maps.google.com/maps?q=${mapSearchQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="location" className="py-16 md:py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-teal bg-brand-teal/10 px-3 py-1.5 rounded-full">
            Find Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue-dark tracking-tight">
            Visit Grace Speech & Hearing, Mandaveli
          </h2>
          <p className="text-sm text-slate-500">
            Come to our clinic for custom digital fittings, physical trials, and sound calibrations.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left info column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-100 text-left">
            <div className="space-y-6">
              
              {/* Address Row */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-brand-teal/10 rounded-xl text-brand-teal shrink-0 mt-1">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-blue-dark text-base uppercase tracking-wider text-xs">Clinic Address</h3>
                  <p className="text-sm sm:text-base text-slate-600 font-semibold mt-1 leading-relaxed">
                    {address}
                  </p>
                </div>
              </div>

              {/* Phones Row */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-brand-teal/10 rounded-xl text-brand-teal shrink-0 mt-1">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-blue-dark text-base uppercase tracking-wider text-xs">Call for Appointment</h3>
                  <div className="text-sm sm:text-base text-slate-600 font-bold mt-1 space-y-1">
                    <p className="hover:text-brand-teal transition">
                      <a href="tel:+919840029521">+91 98400 29521</a>
                    </p>
                    <p className="hover:text-brand-teal transition">
                      <a href="tel:04424620957">044 2462 0957</a>
                    </p>
                    <p className="text-xs text-slate-400 font-semibold">
                      Secondary: <a href="tel:+917358777677" className="hover:underline">+91 73587 77677</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Working Hours Row */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-brand-teal/10 rounded-xl text-brand-teal shrink-0 mt-1">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-blue-dark text-base uppercase tracking-wider text-xs">Clinic Hours</h3>
                  <p className="text-sm sm:text-base text-slate-600 font-semibold mt-1">
                    Monday – Saturday
                  </p>
                  <p className="text-sm text-slate-500 font-medium">
                    10:00 AM to 7:00 PM
                  </p>
                </div>
              </div>

            </div>

            {/* CTAs Row */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200/50">
              <a
                href="tel:+919840029521"
                className="inline-flex items-center justify-center p-3.5 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 space-x-1.5"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Call Center</span>
              </a>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-3.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-extrabold shadow-sm transition-all active:scale-95 space-x-1.5"
              >
                <Compass className="h-4 w-4 text-brand-teal" />
                <span>Get Directions</span>
              </a>
            </div>

          </div>

          {/* Right Map embed column */}
          <div className="lg:col-span-7 h-[350px] lg:h-auto min-h-[300px] bg-slate-100 rounded-3xl overflow-hidden border border-slate-100 shadow-sm relative">
            <iframe
              title="Google Map Embed"
              src={embedUrl}
              className="w-full h-full border-none"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
