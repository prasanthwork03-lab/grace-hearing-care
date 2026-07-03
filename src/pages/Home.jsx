import React, { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import PainPoints from "../components/PainPoints";
import ProductShowcase from "../components/ProductShowcase";
import OfferBanner from "../components/OfferBanner";
import WhyChoose from "../components/WhyChoose";
import Process from "../components/Process";
import LeadForm from "../components/LeadForm";
import TrustSection from "../components/TrustSection";
import FAQ from "../components/FAQ";
import LocationSection from "../components/LocationSection";
import FinalCTA from "../components/FinalCTA";
import StickyMobileCTA from "../components/StickyMobileCTA";
import Footer from "../components/Footer";

export default function Home() {
  const [selectedRequirement, setSelectedRequirement] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />
      <Hero />
      <PainPoints />
      <ProductShowcase onSelectRequirement={setSelectedRequirement} />
      <OfferBanner onSelectRequirement={setSelectedRequirement} />
      <WhyChoose />
      <Process />
      <LeadForm selectedRequirement={selectedRequirement} />
      <TrustSection />
      <FAQ />
      <LocationSection />
      <FinalCTA />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
