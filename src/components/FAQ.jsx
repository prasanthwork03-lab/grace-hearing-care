import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: "Which hearing aid is best for me?",
      a: "The right hearing aid depends on your specific hearing needs, comfort preferences, lifestyle, and budget. A detailed consultation and trial help identify the most suitable option for you."
    },
    {
      q: "Do you provide rechargeable hearing aids?",
      a: "Yes, modern rechargeable hearing aid options are available. They provide convenient overnight charging, eliminating the need to handle and replace small batteries frequently. You can book a consultation to try these models."
    },
    {
      q: "Do you provide invisible hearing aids?",
      a: "Yes, completely-in-canal (CIC) or invisible-in-canal (IIC) hearing aids may be available depending on your level of hearing loss and ear canal geometry. Please book a consultation to check your suitability."
    },
    {
      q: "Do you provide hearing aid service?",
      a: "Yes, we provide service, cleaning, reprogramming, and support for all major hearing aid brands. You can submit a service request through our form or contact the clinic directly by phone."
    },
    {
      q: "Where is Grace Speech & Hearing located?",
      a: "Grace Speech & Hearing is located at New No: 8, Old No: 68, Adanjan Mudali Street, Mandaveli / R.A. Puram, Chennai, Tamil Nadu 600028. Our clinic is easily accessible from all central parts of Chennai."
    },
    {
      q: "Do you accept old hearing aid exchange?",
      a: "Yes, old hearing aid exchange options are available for eligible devices. Contact our centre or submit the booking form to get current exchange details."
    },
    {
      q: "Do you serve customers outside Chennai?",
      a: "Yes. Grace Speech & Hearing is based in Mandaveli, Chennai, so Chennai appointments are given priority. You can still submit an enquiry from any location, and our team will contact you about the available options."
    }
  ];

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-teal bg-brand-teal/10 px-3 py-1.5 rounded-full">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue-dark tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Find quick answers to common questions about our hearing aids, consultations, and location.
          </p>
        </div>

        {/* FAQs list (Accordion style) */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300"
              >
                {/* Question bar */}
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 flex items-center justify-between text-left text-brand-blue-dark font-bold text-base hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-center space-x-3 pr-4">
                    <HelpCircle className="h-5 w-5 text-brand-teal shrink-0" />
                    <span>{faq.q}</span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 shrink-0 transform transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-brand-teal" : ""
                    }`}
                  />
                </button>

                {/* Answer box */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? "max-h-48 border-t border-slate-100" : "max-h-0"
                  }`}
                >
                  <div className="p-5 text-sm sm:text-base text-slate-600 leading-relaxed bg-slate-50/30 text-left">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
