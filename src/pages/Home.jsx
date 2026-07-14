import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import PainPoints from "../components/PainPoints";
import WhyChoose from "../components/WhyChoose";
import TrustSection from "../components/TrustSection";
import FAQ from "../components/FAQ";
import LocationSection from "../components/LocationSection";
import StickyMobileCTA from "../components/StickyMobileCTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />
      <Hero />
      <PainPoints />
      <WhyChoose />
      <TrustSection />
      <FAQ />
      <LocationSection />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
