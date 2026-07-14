import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { validateLead } from "../lib/leadValidation";
import { getTrackingParams } from "../lib/tracking";
import { submitLeadToDb } from "../lib/firebase";
import { allowedChennaiAreas } from "../data/chennaiAreas";
import { User, Phone, MapPin, ClipboardList, Send, AlertCircle } from "lucide-react";

export default function LeadForm({ selectedRequirement, variant = "section" }) {
  const navigate = useNavigate();
  const isHeroVariant = variant === "hero";
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: "",
    requirement: isHeroVariant ? "Book Appointment" : "",
    preferredContact: "Call",
    appointmentDate: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [areaSuggestions, setAreaSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef(null);

  // Sync selected requirement from parent props
  useEffect(() => {
    if (selectedRequirement) {
      setFormData((prev) => ({ ...prev, requirement: selectedRequirement }));
    }
  }, [selectedRequirement]);

  // Click outside to close area suggestions dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update suggestions list
  const handleAreaChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, area: value }));

    if (value.trim().length > 1) {
      const filtered = allowedChennaiAreas.filter((a) =>
        a.toLowerCase().includes(value.toLowerCase())
      );
      setAreaSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setAreaSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (area) => {
    setFormData((prev) => ({ ...prev, area }));
    setShowSuggestions(false);
    
    // Clear area error if exists
    if (errors.area) {
      setErrors((prev) => ({ ...prev, area: null }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    // Clear validation error dynamically
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setErrors({});

    // Validate inputs
    const validation = validateLead(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setLoading(false);
      
      // Scroll to the first error
      const firstErrorKey = Object.keys(validation.errors)[0];
      const errorField = document.getElementsByName(firstErrorKey)[0];
      if (errorField) {
        errorField.scrollIntoView({ behavior: "smooth", block: "center" });
        errorField.focus();
      }
      return;
    }

    try {
      // Fetch hidden tracking parameters
      const tracking = getTrackingParams();

      // Bundle complete lead details
      const completeLead = {
        name: formData.name.trim(),
        phone: validation.phoneClean,
        area: formData.area.trim(),
        requirement: formData.requirement,
        preferredContact: formData.preferredContact,
        appointmentDate: formData.appointmentDate || "",
        message: formData.message.trim(),
        // Quality markers determined by validation
        leadStatus: validation.leadStatus,
        isChennaiLead: validation.isChennaiLead,
        locationVerification: validation.locationVerification,
        
        // Hidden parameters
        ...tracking,
        
        // Extra form metrics
        userArea: formData.area.trim(),
        requirementType: formData.requirement,
        adminNotes: "",
        lastUpdatedAt: new Date().toISOString()
      };

      // Save to Firebase
      await submitLeadToDb(completeLead);

      // Save phone/name temporarily in localStorage to show greeting on Thank You page
      try {
        localStorage.setItem("lastLeadName", formData.name.trim());
        localStorage.setItem("lastLeadPhone", validation.phoneClean);
      } catch {
        // Private browsing may disable storage; the Firebase save has already succeeded.
      }

      // Redirect to /thank-you
      navigate("/thank-you");
    } catch (err) {
      console.error("Submission failed:", err);
      setErrors({ submit: "A network error occurred. Please try again or call us directly." });
    } finally {
      setLoading(false);
    }
  };

  const formContent = (
    <>
        
        {/* Header Box */}
        {!isHeroVariant && (
        <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-10 px-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-teal bg-brand-teal/10 px-3 py-1.5 rounded-full">
            Appointment Booking
          </span>
          <h2 className="text-[1.75rem] leading-tight sm:text-4xl font-extrabold text-brand-blue-dark tracking-tight">
            Book Your Hearing Aid Consultation
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
            Fill the form below, and our Chennai care team will contact you within 2 hours to confirm your trial slot.
          </p>
        </div>
        )}

        {/* Lead Form Card */}
        <div className={`${isHeroVariant ? "min-w-0 max-w-full bg-white/95 rounded-[1.75rem] p-4 sm:p-5 shadow-2xl shadow-slate-900/15 border border-white/80" : "bg-white rounded-3xl p-5 sm:p-10 shadow-xl border border-slate-100"} relative overflow-visible`}>
          {isHeroVariant && (
            <div className="mb-4 rounded-2xl bg-gradient-to-r from-brand-blue-dark to-brand-teal p-4 text-white">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-cyan-100">Fast Appointment Booking</p>
              <h2 className="mt-1 text-2xl font-black leading-tight">Book a Hearing Aid Trial</h2>
              <p className="mt-1 text-xs font-semibold text-white/80">Only 3 details. Our Chennai team will call back.</p>
            </div>
          )}
          
          {errors.submit && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center space-x-3 text-rose-800 text-sm font-semibold">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{errors.submit}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            
            {/* Input Name */}
            <div className="space-y-1.5 text-left">
              <label htmlFor="name" className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter patient name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full min-w-0 pl-12 pr-4 py-3.5 rounded-xl border ${errors.name ? "border-rose-300 focus:ring-rose-200 focus:border-rose-400" : "border-slate-200 focus:ring-brand-teal/20 focus:border-brand-teal"} bg-slate-50/50 text-slate-900 placeholder-slate-400 font-medium text-sm focus:outline-none focus:ring-4 transition`}
                />
              </div>
              {errors.name && <p className="text-xs text-rose-500 font-bold flex items-center mt-1"><AlertCircle className="h-3.5 w-3.5 mr-1" />{errors.name}</p>}
            </div>

            {/* Input Phone */}
            <div className="space-y-1.5 text-left">
              <label htmlFor="phone" className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Phone Number (Indian Mobile) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  maxLength="15"
                  placeholder="e.g. 9840029521"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full min-w-0 pl-12 pr-4 py-3.5 rounded-xl border ${errors.phone ? "border-rose-300 focus:ring-rose-200 focus:border-rose-400" : "border-slate-200 focus:ring-brand-teal/20 focus:border-brand-teal"} bg-slate-50/50 text-slate-900 placeholder-slate-400 font-medium text-sm focus:outline-none focus:ring-4 transition`}
                />
              </div>
              {errors.phone && <p className="text-xs text-rose-500 font-bold flex items-center mt-1"><AlertCircle className="h-3.5 w-3.5 mr-1" />{errors.phone}</p>}
            </div>

            {/* Input Area / Location (Searchable combobox) */}
            <div className="space-y-1.5 text-left relative" ref={suggestionRef}>
              <label htmlFor="area" className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Area / Location <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  id="area"
                  name="area"
                  autoComplete="off"
                  placeholder={isHeroVariant ? "Your area" : "Type your area (e.g. Mandaveli or Coimbatore)"}
                  value={formData.area}
                  onChange={handleAreaChange}
                  onFocus={() => {
                    if (formData.area.trim().length > 1) {
                      setShowSuggestions(true);
                    }
                  }}
                  className={`w-full min-w-0 pl-12 pr-4 py-3.5 rounded-xl border ${errors.area ? "border-rose-300 focus:ring-rose-200 focus:border-rose-400" : "border-slate-200 focus:ring-brand-teal/20 focus:border-brand-teal"} bg-slate-50/50 text-slate-900 placeholder-slate-400 font-medium text-sm focus:outline-none focus:ring-4 transition`}
                />
              </div>
              {errors.area && <p className="text-xs text-rose-500 font-bold flex items-center mt-1"><AlertCircle className="h-3.5 w-3.5 mr-1" />{errors.area}</p>}

              {/* Area Suggestions Dropdown */}
              {showSuggestions && areaSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full mt-1.5 bg-white border border-slate-100 rounded-xl shadow-lg max-h-48 overflow-y-auto divide-y divide-slate-50 text-sm font-semibold">
                  {areaSuggestions.map((area, idx) => (
                    <li
                      key={idx}
                      onClick={() => selectSuggestion(area)}
                      className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer text-slate-700 hover:text-brand-blue flex items-center"
                    >
                      <MapPin className="h-3.5 w-3.5 mr-2 text-brand-teal" />
                      {area}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Select Requirement Dropdown */}
            {!isHeroVariant && (
            <div className="space-y-1.5 text-left">
              <label htmlFor="requirement" className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                What do you need? <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <ClipboardList className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <select
                  id="requirement"
                  name="requirement"
                  value={formData.requirement}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-3.5 rounded-xl border ${errors.requirement ? "border-rose-300 focus:ring-rose-200 focus:border-rose-400" : "border-slate-200 focus:ring-brand-teal/20 focus:border-brand-teal"} bg-slate-50/50 text-slate-900 font-semibold text-sm focus:outline-none focus:ring-4 transition appearance-none`}
                >
                  <option value="" disabled>Select your requirement</option>
                  <option value="New Hearing Aid">New Hearing Aid</option>
                  <option value="Hearing Aid Trial">Hearing Aid Trial</option>
                  <option value="Rechargeable Hearing Aid">Rechargeable Hearing Aid</option>
                  <option value="Invisible / CIC Hearing Aid">Invisible / CIC Hearing Aid</option>
                  <option value="Hearing Aid Service">Hearing Aid Service</option>
                  <option value="Old Hearing Aid Exchange">Old Hearing Aid Exchange</option>
                  <option value="Hearing Test / Consultation">Hearing Test / Consultation</option>
                  <option value="Speech Therapy Enquiry">Speech Therapy Enquiry</option>
                  <option value="Book Appointment">Book Appointment</option>
                  <option value="Other Option">Other Option</option>
                </select>
                <div className="absolute right-4 top-4.5 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-400" />
              </div>
              {errors.requirement && <p className="text-xs text-rose-500 font-bold flex items-center mt-1"><AlertCircle className="h-3.5 w-3.5 mr-1" />{errors.requirement}</p>}
            </div>
            )}

            {!isHeroVariant && (
              <p className="break-words text-xs font-semibold leading-relaxed text-slate-500">
                Grace Speech &amp; Hearing is based in Mandaveli, Chennai. Chennai appointments are given priority.
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-14 gradient-btn py-4 rounded-xl font-extrabold text-sm sm:text-base tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-brand-teal/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed scroll-mb-24"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting request...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Book Appointment</span>
                </>
              )}
            </button>
            
          </form>
          
        </div>
    </>
  );

  if (isHeroVariant) {
    return (
      <div id="lead-form" className="min-w-0 scroll-mt-24">
        {formContent}
      </div>
    );
  }

  return (
    <section id="lead-form" className="py-12 pb-16 md:py-24 bg-slate-50 relative scroll-mt-20">
      <div className="max-w-3xl mx-auto px-3 sm:px-6">
        {formContent}
      </div>
    </section>
  );
}
