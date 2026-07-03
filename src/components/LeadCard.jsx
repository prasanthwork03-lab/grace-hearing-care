import React, { useState } from "react";
import {
  Calendar,
  ChevronDown,
  FileText,
  MapPin,
  MessageCircle,
  Phone,
  Save,
  Trash2,
  User
} from "lucide-react";
import { formatDate } from "../lib/utils";

const STATUS_OPTIONS = [
  ["new_chennai_lead", "New Chennai Lead"],
  ["needs_location_verification", "Needs Location Verification"],
  ["outside_chennai_lead", "Outside Chennai"],
  ["contacted", "Contacted"],
  ["appointment_booked", "Appointment Booked"],
  ["converted", "Converted"],
  ["not_interested", "Not Interested"]
];

function getLocationBadge(lead) {
  if (lead.isChennaiLead || lead.locationVerification === "verified_chennai_area") {
    return { label: "Priority Chennai Lead", classes: "bg-emerald-100 text-emerald-800", border: "border-l-emerald-500" };
  }
  if (lead.locationVerification === "outside_chennai" || lead.leadStatus === "outside_chennai_lead" || lead.leadStatus === "outside_chennai_unqualified") {
    return { label: "Outside Chennai", classes: "bg-rose-100 text-rose-800", border: "border-l-rose-400" };
  }
  return { label: "Verify Location", classes: "bg-amber-100 text-amber-800", border: "border-l-amber-400" };
}

function normalizeStatus(status) {
  return status === "outside_chennai_unqualified" ? "outside_chennai_lead" : (status || "needs_location_verification");
}

export default function LeadCard({ lead, onUpdateStatus, onUpdateNotes, onDeleteLead }) {
  const [notes, setNotes] = useState(lead.adminNotes || "");
  const [savingNotes, setSavingNotes] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const locationBadge = getLocationBadge(lead);
  const selectedStatus = normalizeStatus(lead.leadStatus);
  const phoneDigits = String(lead.phone || "").replace(/\D/g, "");
  const localPhone = phoneDigits.startsWith("91") && phoneDigits.length === 12 ? phoneDigits.slice(2) : phoneDigits;
  const whatsappPhone = localPhone.length === 10 ? `91${localPhone}` : localPhone;
  const whatsappMessage = `Hi ${lead.name || "there"}, this is Grace Speech & Hearing Care. We received your enquiry for ${lead.requirement || "hearing care"}. Please share your preferred time to speak.`;

  const handleNotesSave = async (event) => {
    event.preventDefault();
    setSavingNotes(true);
    try {
      await onUpdateNotes(lead.id, notes.trim());
    } catch {
      // The dashboard displays the Firebase error.
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = async () => {
    try {
      await onDeleteLead(lead.id);
    } catch {
      setConfirmDelete(false);
    }
  };

  return (
    <article className={`rounded-2xl border border-slate-200 border-l-4 ${locationBadge.border} bg-white p-4 shadow-sm sm:p-5`}>
      <div className="grid gap-5 lg:grid-cols-[minmax(240px,0.8fr)_minmax(300px,1.2fr)_minmax(250px,0.8fr)]">
        <section className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${locationBadge.classes}`}>
              {locationBadge.label}
            </span>
            <span className="text-xs font-semibold text-slate-400">{formatDate(lead.submittedAt || lead.createdAt)}</span>
          </div>

          <h3 className="mt-3 flex items-center gap-2 text-lg font-black text-slate-900">
            <User className="h-4 w-4 shrink-0 text-slate-400" />
            <span className="truncate">{lead.name || "Unknown name"}</span>
          </h3>
          <a href={`tel:+91${localPhone}`} className="mt-2 flex items-center gap-2 text-base font-extrabold text-brand-blue hover:text-brand-teal">
            <Phone className="h-4 w-4" /> {lead.phone || "No phone"}
          </a>
          <p className="mt-2 flex items-start gap-2 text-sm font-semibold text-slate-600">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" /> {lead.area || "Location not provided"}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={`tel:+91${localPhone}`}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-3 py-2 text-xs font-extrabold text-white hover:bg-brand-blue-dark"
            >
              <Phone className="h-4 w-4" /> Call
            </a>
            <a
              href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-whatsapp px-3 py-2 text-xs font-extrabold text-white hover:bg-whatsapp-dark"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </section>

        <section className="rounded-xl bg-slate-50 p-4">
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-[10px] font-black uppercase tracking-wide text-slate-400">Requirement</dt>
              <dd className="mt-1 font-bold text-slate-800">{lead.requirement || "Not specified"}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-black uppercase tracking-wide text-slate-400">Preferred contact</dt>
              <dd className="mt-1 font-bold text-slate-800">{lead.preferredContact || "Call"}</dd>
            </div>
            {lead.appointmentDate && (
              <div className="sm:col-span-2">
                <dt className="text-[10px] font-black uppercase tracking-wide text-slate-400">Preferred date</dt>
                <dd className="mt-1 flex items-center gap-1 font-bold text-slate-800"><Calendar className="h-4 w-4" /> {lead.appointmentDate}</dd>
              </div>
            )}
          </dl>

          <div className="mt-4 border-t border-slate-200 pt-3">
            <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">Message</p>
            <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{lead.message || "No additional message"}</p>
          </div>

          <details className="mt-4 border-t border-slate-200 pt-3 text-xs text-slate-500">
            <summary className="flex cursor-pointer list-none items-center gap-1 font-bold text-slate-600">
              <ChevronDown className="h-3.5 w-3.5" /> Marketing details
            </summary>
            <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
              <span>Source: <strong>{lead.utm_source || "Direct"}</strong></span>
              <span>Medium: <strong>{lead.utm_medium || "—"}</strong></span>
              <span>Campaign: <strong>{lead.utm_campaign || "—"}</strong></span>
              <span>Device: <strong className="capitalize">{lead.deviceType || "Unknown"}</strong></span>
              {lead.gclid && <span className="break-all sm:col-span-2">GCLID: <strong>{lead.gclid}</strong></span>}
            </div>
          </details>
        </section>

        <section className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-[10px] font-black uppercase tracking-wide text-slate-400">Lead status</span>
            <select
              value={selectedStatus}
              onChange={(event) => onUpdateStatus(lead.id, event.target.value).catch(() => {})}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-800 outline-none focus:border-brand-teal focus:ring-4 focus:ring-brand-teal/10"
            >
              {STATUS_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>

          <form onSubmit={handleNotesSave}>
            <label htmlFor={`notes-${lead.id}`} className="mb-1.5 flex items-center gap-1 text-[10px] font-black uppercase tracking-wide text-slate-400">
              <FileText className="h-3.5 w-3.5" /> Staff notes
            </label>
            <textarea
              id={`notes-${lead.id}`}
              rows="3"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Add follow-up details"
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-brand-teal focus:bg-white"
            />
            <button
              type="submit"
              disabled={savingNotes}
              className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-50"
            >
              <Save className="h-3.5 w-3.5" /> {savingNotes ? "Saving…" : "Save note"}
            </button>
          </form>

          <div className="border-t border-slate-100 pt-3">
            {confirmDelete ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-rose-700">Delete this lead?</span>
                <button type="button" onClick={handleDelete} className="rounded-lg bg-rose-600 px-2.5 py-1.5 text-xs font-bold text-white">Delete</button>
                <button type="button" onClick={() => setConfirmDelete(false)} className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-bold text-slate-600">Cancel</button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-rose-600"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete lead
              </button>
            )}
          </div>
        </section>
      </div>
    </article>
  );
}
