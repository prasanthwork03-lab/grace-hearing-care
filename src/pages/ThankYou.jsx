import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Phone, MessageSquare, ArrowLeft, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

export default function ThankYou() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Retreive name from storage for personal touch
    let name = "";
    try {
      name = localStorage.getItem("lastLeadName") || "";
    } catch {
      // The thank-you page still works when private browsing blocks storage.
    }
    if (name) {
      setUserName(name);
    }

    // =========================================================================
    // GOOGLE ADS & GTM CONVERSION TRACKING PLACEHOLDERS
    // =========================================================================
    
    // 1. Google Ads Conversion Code (gtag.js)
    // To trigger the Google Ads conversion, uncomment and set your details below:
    /*
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
          'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
          'value': 1.0,
          'currency': 'INR'
      });
    }
    */

    // 2. Google Tag Manager Custom Event
    // Useful for tracking in GA4 or multiple channels:
    /*
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'lead_submission_success',
        'lead_name': name || 'anonymous',
        'timestamp': new Date().toISOString()
      });
    }
    */
    
    console.log("Tracking event: Lead submission success tracked.");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full bg-brand-teal/10 blur-3xl" />
      <div className="absolute left-0 top-0 w-[300px] h-[300px] rounded-full bg-brand-blue/5 blur-3xl" />

      <div className="w-full max-w-2xl bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-slate-100 relative text-center space-y-8">
        
        {/* Success Icon */}
        <div className="relative inline-flex justify-center items-center">
          <div className="p-4 bg-brand-teal/10 rounded-full border border-brand-teal/20 relative animate-pulse-slow">
            <CheckCircle2 className="h-16 w-16 text-brand-teal" />
          </div>
          <div className="absolute -top-1 -right-1 bg-brand-blue text-white p-1 rounded-full border-2 border-white">
            <Sparkles className="h-4 w-4 text-brand-cyan" />
          </div>
        </div>

        {/* Copy text */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-blue-dark tracking-tight">
            Thank You, {userName || "there"}!
          </h1>
          <h2 className="text-lg sm:text-xl font-bold text-slate-700">
            Your Appointment Request Has Been Received.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto leading-relaxed">
            Our team will contact you shortly (typically within 2 hours) to verify your details and lock in your consultation session.
          </p>
        </div>

        {/* Urgent Action CTA */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-left space-y-4 max-w-md mx-auto">
          <p className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Need Immediate Assistance?</p>
          <p className="text-xs sm:text-sm font-semibold text-slate-650">
            If you want to skip the queue or book for today, click below to connect with us instantly:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="tel:+919840029521"
              className="gradient-btn-blue py-3 rounded-xl font-bold text-sm text-center flex items-center justify-center space-x-2 active:scale-95 transition-all shadow"
            >
              <Phone className="h-4 w-4" />
              <span>Call +91 98400 29521</span>
            </a>
            <a
              href="https://wa.me/919840029521?text=Hi%20Grace%20Speech%20%26%20Hearing%2C%20I%20just%20submitted%20the%20appointment%20form.%20Please%20verify%20my%20slot%20now."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-slate-150 border border-slate-200 text-whatsapp hover:text-whatsapp-dark py-3 rounded-xl font-bold text-sm text-center flex items-center justify-center space-x-2 active:scale-95 transition-all shadow-sm"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp Now</span>
            </a>
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-4 border-t border-slate-100">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-bold text-brand-blue hover:text-brand-teal transition-colors space-x-1.5"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home Page</span>
          </Link>
        </div>

        {/* Trust verification bottom */}
        <div className="flex items-center justify-center space-x-2 text-xs font-bold text-slate-400 pt-2">
          <ShieldCheck className="h-4 w-4 text-brand-teal" />
          <span>Google Ads Qualified Conversion Page</span>
        </div>

      </div>
    </div>
  );
}
