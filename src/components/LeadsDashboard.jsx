import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  LogOut,
  MapPin,
  RefreshCw,
  Search,
  Users
} from "lucide-react";
import { ADMIN_EMAIL } from "../lib/adminConfig";
import { auth, db, onValue, ref, remove, update } from "../lib/firebase";
import LeadCard from "./LeadCard";

const FILTER_TABS = [
  ["all", "All Leads"],
  ["chennai", "Chennai"],
  ["needs_location_verification", "Verify Location"],
  ["outside_chennai_lead", "Outside Chennai"],
  ["contacted", "Contacted"],
  ["converted", "Converted"],
  ["not_interested", "Not Interested"]
];

const REQUIREMENTS = [
  "New Hearing Aid",
  "Hearing Aid Trial",
  "Rechargeable Hearing Aid",
  "Invisible / CIC Hearing Aid",
  "Hearing Aid Service",
  "Old Hearing Aid Exchange",
  "Hearing Test / Consultation",
  "Speech Therapy Enquiry"
];

function isChennaiLead(lead) {
  return lead.isChennaiLead === true || lead.leadStatus === "new_chennai_lead";
}

function needsLocationVerification(lead) {
  return lead.leadStatus === "needs_location_verification" ||
    lead.locationVerification === "unverified" ||
    lead.locationVerification === "unverified_chennai_area";
}

function isOutsideChennaiLead(lead) {
  return lead.leadStatus === "outside_chennai_lead" ||
    lead.leadStatus === "outside_chennai_unqualified" ||
    lead.locationVerification === "outside_chennai";
}

function matchesTab(lead, tab) {
  if (tab === "all") return true;
  if (tab === "chennai") return isChennaiLead(lead);
  if (tab === "needs_location_verification") return needsLocationVerification(lead);
  if (tab === "outside_chennai_lead") return isOutsideChennaiLead(lead);
  return lead.leadStatus === tab;
}

function getLeadTime(lead) {
  const time = new Date(lead.submittedAt || lead.createdAt || 0).getTime();
  return Number.isNaN(time) ? 0 : time;
}

export default function LeadsDashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [requirementFilter, setRequirementFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [dashboardError, setDashboardError] = useState("");

  useEffect(() => {
    if (!auth) {
      navigate("/admin", { replace: true });
      return undefined;
    }

    return onAuthStateChanged(auth, (user) => {
      if (user?.email?.toLowerCase() === ADMIN_EMAIL) {
        setIsAuthorized(true);
      } else {
        if (user) signOut(auth).catch((error) => console.error("Could not sign out unauthorized user:", error));
        navigate("/admin", { replace: true });
      }
    });
  }, [navigate]);

  useEffect(() => {
    if (!isAuthorized || !db) return undefined;

    const unsubscribe = onValue(
      ref(db, "leads"),
      (snapshot) => {
        const data = snapshot.val() || {};
        setLeads(Object.entries(data).map(([id, lead]) => ({ ...lead, id })));
        setDashboardError("");
        setLoading(false);
      },
      (error) => {
        console.error("Firebase leads listener failed:", error);
        setDashboardError("Unable to load leads. Confirm the Firebase rules are published and this admin account is signed in.");
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [isAuthorized]);

  const updateLead = async (leadId, values, errorMessage) => {
    setDashboardError("");
    try {
      await update(ref(db, `leads/${leadId}`), {
        ...values,
        lastUpdatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error(errorMessage, error);
      setDashboardError(errorMessage);
      throw error;
    }
  };

  const handleUpdateStatus = (leadId, leadStatus) => {
    const locationUpdates = {
      new_chennai_lead: { isChennaiLead: true, locationVerification: "verified_chennai_area" },
      needs_location_verification: { isChennaiLead: false, locationVerification: "unverified" },
      outside_chennai_lead: { isChennaiLead: false, locationVerification: "outside_chennai" }
    };

    return updateLead(
      leadId,
      { leadStatus, ...(locationUpdates[leadStatus] || {}) },
      "Could not update this lead. Please try again."
    );
  };

  const handleUpdateNotes = (leadId, adminNotes) => updateLead(
    leadId,
    { adminNotes },
    "Could not save the staff note. Please try again."
  );

  const handleDeleteLead = async (leadId) => {
    setDashboardError("");
    try {
      await remove(ref(db, `leads/${leadId}`));
    } catch (error) {
      console.error("Could not delete lead:", error);
      setDashboardError("Could not delete this lead. Please try again.");
      throw error;
    }
  };

  const handleLogout = async () => {
    if (auth) await signOut(auth);
    navigate("/admin", { replace: true });
  };

  const filteredLeads = leads
    .filter((lead) => {
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch = !term || [lead.name, lead.phone, lead.area, lead.requirement]
        .some((value) => String(value || "").toLowerCase().includes(term));
      const matchesRequirement = requirementFilter === "all" || lead.requirement === requirementFilter;
      return matchesSearch && matchesRequirement && matchesTab(lead, activeTab);
    })
    .sort((a, b) => sortOrder === "desc" ? getLeadTime(b) - getLeadTime(a) : getLeadTime(a) - getLeadTime(b));

  const handleExportCSV = () => {
    if (!filteredLeads.length) return;

    const headers = [
      "Name", "Phone", "Area", "Requirement", "Preferred Contact", "Appointment Date",
      "Message", "Lead Status", "Chennai Lead", "Location Verification", "UTM Source",
      "UTM Medium", "UTM Campaign", "UTM Term", "UTM Content", "GCLID", "Device",
      "Page URL", "Submitted At", "Staff Notes"
    ];
    const fields = [
      "name", "phone", "area", "requirement", "preferredContact", "appointmentDate",
      "message", "leadStatus", "isChennaiLead", "locationVerification", "utm_source",
      "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "deviceType",
      "pageUrl", "submittedAt", "adminNotes"
    ];
    const escapeCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
    const rows = filteredLeads.map((lead) => fields.map((field) => escapeCell(lead[field])).join(","));
    const blob = new Blob([`\uFEFF${headers.map(escapeCell).join(",")}\n${rows.join("\n")}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `grace_leads_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const chennaiCount = leads.filter(isChennaiLead).length;
  const verificationCount = leads.filter(needsLocationVerification).length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900">Grace Leads</h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-extrabold uppercase text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
              </span>
            </div>
            <p className="mt-1 text-xs font-medium text-slate-500">New enquiries appear automatically</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCSV}
              disabled={!filteredLeads.length}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-40"
            >
              <Download className="h-4 w-4" /> Export
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-5 px-4 py-6 sm:px-6">
        <section className="grid grid-cols-3 gap-3" aria-label="Lead summary">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <Users className="mb-2 h-5 w-5 text-slate-400" />
            <p className="text-2xl font-black text-slate-900">{leads.length}</p>
            <p className="text-xs font-semibold text-slate-500">All leads</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <CheckCircle2 className="mb-2 h-5 w-5 text-emerald-600" />
            <p className="text-2xl font-black text-emerald-800">{chennaiCount}</p>
            <p className="text-xs font-semibold text-emerald-700">Chennai priority</p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <MapPin className="mb-2 h-5 w-5 text-amber-600" />
            <p className="text-2xl font-black text-amber-800">{verificationCount}</p>
            <p className="text-xs font-semibold text-amber-700">Need verification</p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm" aria-label="Lead filters">
          <div className="flex gap-2 overflow-x-auto pb-3">
            {FILTER_TABS.map(([value, label]) => {
              const count = leads.filter((lead) => matchesTab(lead, value)).length;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={activeTab === value}
                  onClick={() => setActiveTab(value)}
                  className={`shrink-0 rounded-xl px-3 py-2 text-xs font-extrabold transition ${activeTab === value ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                >
                  {label} <span className="ml-1 opacity-70">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="grid gap-3 border-t border-slate-100 pt-4 md:grid-cols-[1fr_auto_auto]">
            <label className="relative block">
              <span className="sr-only">Search leads</span>
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="search"
                placeholder="Search name, phone, area, or requirement"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm font-medium outline-none focus:border-brand-teal focus:bg-white focus:ring-4 focus:ring-brand-teal/10"
              />
            </label>

            <select
              aria-label="Filter by requirement"
              value={requirementFilter}
              onChange={(event) => setRequirementFilter(event.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-700 outline-none focus:border-brand-teal"
            >
              <option value="all">All requirements</option>
              {REQUIREMENTS.map((requirement) => <option key={requirement} value={requirement}>{requirement}</option>)}
            </select>

            <select
              aria-label="Sort leads"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-700 outline-none focus:border-brand-teal"
            >
              <option value="desc">Newest first</option>
              <option value="asc">Oldest first</option>
            </select>
          </div>
        </section>

        {dashboardError && (
          <div role="alert" className="flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-800">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {dashboardError}
          </div>
        )}

        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-slate-700">{filteredLeads.length} {filteredLeads.length === 1 ? "lead" : "leads"} shown</h2>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-20">
            <RefreshCw className="h-7 w-7 animate-spin text-brand-teal" />
            <p className="mt-3 text-sm font-semibold text-slate-500">Loading leads…</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
            <Users className="mx-auto h-8 w-8 text-slate-300" />
            <h3 className="mt-3 font-bold text-slate-800">No leads found</h3>
            <p className="mt-1 text-sm text-slate-500">Try All Leads or clear the search and requirement filter.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onUpdateStatus={handleUpdateStatus}
                onUpdateNotes={handleUpdateNotes}
                onDeleteLead={handleDeleteLead}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
