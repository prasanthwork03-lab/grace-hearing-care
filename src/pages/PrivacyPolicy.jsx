import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Mail, MapPin, Phone } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-slate-100 space-y-8 text-left">
        
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center text-sm font-bold text-brand-blue hover:text-brand-teal transition-colors space-x-1.5">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Landing Page</span>
        </Link>

        {/* Header */}
        <div className="border-b border-slate-100 pb-6 space-y-3">
          <div className="flex items-center space-x-2 text-brand-teal font-extrabold text-sm uppercase tracking-wider">
            <ShieldCheck className="h-5 w-5" />
            <span>Google Ads Compliance Policy</span>
          </div>
          <h1 className="text-3xl font-extrabold text-brand-blue-dark tracking-tight">Privacy Policy</h1>
          <p className="text-xs text-slate-400">Last updated: July 2026</p>
        </div>

        {/* Content sections */}
        <div className="space-y-6 text-slate-650 text-sm sm:text-base leading-relaxed">
          
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-brand-blue-dark">1. Overview</h2>
            <p>
              At <strong>Grace Speech & Hearing Care / Grace Hearing Aids</strong>, we value the trust you place in us when sharing your personal information. This Privacy Policy details how we collect, store, and utilize your enquiry data when you visit our high-conversion Google Ads landing page.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-brand-blue-dark">2. Information We Collect</h2>
            <p>
              We collect information directly from you when you submit our appointment booking and enquiry form. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-1 font-semibold text-slate-700 text-xs sm:text-sm">
              <li>Full Name</li>
              <li>Phone Number (Indian Mobile)</li>
              <li>Area or Location</li>
              <li>Enquiry Requirement Type</li>
              <li>Preferred contact method (Call or WhatsApp)</li>
              <li>Preferred appointment date</li>
              <li>Optional details or hearing symptoms notes</li>
            </ul>
            <p className="mt-2 text-xs text-slate-500">
              We also automatically capture standard traffic tracking variables such as UTM parameters (utm_source, utm_medium, utm_campaign), GCLID (Google Click Identifier), device characteristics, and timestamps to optimize our marketing campaigns.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-brand-blue-dark">3. How We Use Your Data</h2>
            <p>
              The collected information is used solely for clinical scheduling and product consultation support, specifically to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li>Contact you via Call or WhatsApp to discuss your hearing requirements.</li>
              <li>Verify your appointment slot and schedule your clinical hearing aid trial.</li>
              <li>Measure and optimize the efficiency of our Google Search Ads campaigns.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-brand-blue-dark">4. Data Sharing and Protection</h2>
            <p>
              <strong>We do not sell, rent, lease, or share your personal database with third-party marketing companies.</strong> All lead enquiries are stored securely inside our authenticated Firebase system and are accessible only by authorized staff members of Grace Speech & Hearing Care.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-brand-blue-dark">5. Your Control & Deletion Requests</h2>
            <p>
              You maintain full control over your details. If you wish to review, update, or request the permanent deletion of your enquiry data from our systems, please contact us directly using the details below. We will execute deletion requests within 2 business days.
            </p>
          </section>

          <section className="space-y-2 border-t border-slate-100 pt-6">
            <h2 className="text-lg font-bold text-brand-blue-dark">6. Contact Information</h2>
            <p>For privacy queries, data requests, or clinical enquiries, please reach out to us:</p>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100/80 mt-3 space-y-3 font-semibold text-slate-700 text-xs sm:text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4.5 w-4.5 text-brand-teal" />
                <span>Grace Speech & Hearing, New No: 8, Old No: 68, Adanjan Mudali Street, Mandaveli, Chennai 600028</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4.5 w-4.5 text-brand-teal" />
                <span>+91 98400 29521 / 044 2462 0957</span>
              </div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
