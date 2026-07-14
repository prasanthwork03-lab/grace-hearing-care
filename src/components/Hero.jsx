import React from "react";
import { Phone, MessageSquare, Star, CheckCircle2, MapPin, Clock, Volume2 } from "lucide-react";
import LeadForm from "./LeadForm";

export default function Hero() {
  const trustPoints = [
    "Hearing aid trial before buying",
    "Senior-friendly consultation"
  ];

  const painTriggers = [
    {
      pain: "TV volume too high?",
      solution: "We tune speech clarity so family TV time feels normal again."
    },
    {
      pain: "Parents keep asking to repeat?",
      solution: "Try comfortable hearing aids made for daily conversations."
    },
    {
      pain: "Phone calls unclear?",
      solution: "Get guidance for Bluetooth and rechargeable hearing options."
    }
  ];

  return (
    <section className="relative max-w-full overflow-x-hidden bg-[#f7fbfb] pt-5 pb-10 md:pt-8 md:pb-16">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#e8f8f5] to-transparent" />
      <div className="absolute -left-24 top-32 hidden h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl md:block" />
      <div className="absolute -right-24 bottom-10 hidden h-72 w-72 rounded-full bg-teal-200/40 blur-3xl md:block" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex min-w-0 flex-wrap items-center justify-center gap-2 overflow-hidden rounded-2xl border border-teal-100 bg-white/80 px-3 py-2 text-center shadow-sm md:rounded-full md:justify-between">
          <div className="flex min-w-0 items-center gap-1 text-[11px] font-black uppercase tracking-wide text-brand-blue-dark sm:gap-1.5 sm:text-[12px]">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="ml-1">4.9 Google Rating</span>
          </div>
          <p className="w-full text-[11px] font-bold text-slate-600 sm:w-auto sm:text-[12px]">
            Trusted local hearing care for Chennai families
          </p>
          <div className="hidden items-center gap-1.5 text-[12px] font-black text-brand-teal sm:flex">
            <Clock className="h-4 w-4" />
            <span>Callback within 2 hours</span>
          </div>
        </div>

        <div className="grid min-w-0 items-center gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div className="min-w-0 space-y-5 text-center lg:text-left">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-brand-teal shadow-sm ring-1 ring-teal-100 sm:text-xs">
              <MapPin className="h-4 w-4" />
              <span className="sm:hidden">Mandaveli, Chennai</span>
              <span className="hidden sm:inline">Mandaveli Hearing Aid Consultation</span>
            </div>

            <div className="overflow-hidden rounded-[1.75rem] border border-white bg-white shadow-xl shadow-slate-900/10 lg:hidden">
              <img
                src="/assets/hearing-consultation.png"
                alt="Friendly hearing aid consultation in Chennai"
                className="h-48 w-full object-cover"
              />
              <div className="grid gap-2 p-4">
                {trustPoints.map((point) => (
                  <div key={point} className="flex items-center gap-2 text-left text-xs font-extrabold text-slate-700">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-teal" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="mx-auto max-w-[19.5rem] text-[1.55rem] font-black leading-[1.1] tracking-tight text-brand-blue-dark sm:max-w-2xl sm:text-5xl lg:mx-0 lg:text-6xl">
                Hear conversations clearly again.
              </h1>
              <p className="mx-auto max-w-[18rem] text-sm font-medium leading-relaxed text-slate-600 sm:max-w-2xl sm:text-lg lg:mx-0">
                Book a simple hearing aid trial. We help you choose the right fit without pressure.
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              {painTriggers.map((item) => (
                <div key={item.pain} className="rounded-2xl border border-amber-100 bg-amber-50 px-3 py-3 text-left shadow-sm">
                  <Volume2 className="mb-1 h-4 w-4 text-amber-600" />
                  <p className="text-sm font-black text-amber-950">{item.pain}</p>
                  <p className="mt-1 text-[11px] font-bold leading-snug text-amber-800">{item.solution}</p>
                </div>
              ))}
            </div>

            <div className="hidden overflow-hidden rounded-[1.75rem] border border-white bg-white shadow-xl shadow-slate-900/10 lg:block">
              <img
                src="/assets/hearing-consultation.png"
                alt="Friendly hearing aid consultation in Chennai"
                className="h-52 w-full object-cover sm:h-64 lg:h-72"
              />
              <div className="grid gap-2 p-4 sm:grid-cols-3">
                {trustPoints.map((point) => (
                  <div key={point} className="flex items-center gap-2 text-left text-xs font-extrabold text-slate-700">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-teal" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden gap-3 sm:grid-cols-2 lg:grid">
              <a
                href="tel:+919840029521"
                className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-brand-blue-dark px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg active:scale-95"
              >
                <Phone className="h-5 w-5" />
                Call Now
              </a>
              <a
                href="https://wa.me/919840029521?text=Hi%20Grace%20Speech%20%26%20Hearing%2C%20I%20want%20to%20book%20a%20hearing%20aid%20trial%20appointment.%20Please%20call%20me."
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-whatsapp px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg active:scale-95"
              >
                <MessageSquare className="h-5 w-5" />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="min-w-0 lg:sticky lg:top-24">
            <LeadForm variant="hero" />
          </div>

          <div className="space-y-4 lg:hidden">
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href="tel:+919840029521"
                className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-brand-blue-dark px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg active:scale-95"
              >
                <Phone className="h-5 w-5" />
                Call Now
              </a>
              <a
                href="https://wa.me/919840029521?text=Hi%20Grace%20Speech%20%26%20Hearing%2C%20I%20want%20to%20book%20a%20hearing%20aid%20trial%20appointment.%20Please%20call%20me."
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-whatsapp px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg active:scale-95"
              >
                <MessageSquare className="h-5 w-5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
