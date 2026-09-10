"use client";

import React, { useState } from "react";
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  Filter,
  Truck,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
  FileCheck2,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { AdminNav } from "@/components/AdminNav";

export default function AdminRecyclersPage() {
  const { recyclers, updateRecyclerStatus } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "AUTHORIZED" | "PENDING" | "UNAUTHORIZED">("ALL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleStatusChange = (
    recyclerId: string,
    facilityName: string,
    newStatus: "AUTHORIZED" | "PENDING" | "UNAUTHORIZED"
  ) => {
    updateRecyclerStatus(recyclerId, newStatus);
    showToast(`Updated "${facilityName}" license status to ${newStatus}`);
  };

  const filteredRecyclers = recyclers.filter((r) => {
    const matchesSearch =
      r.facilityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.authorizationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.serviceArea.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || r.authorizationStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-[#FFFDF9] to-slate-50 pb-16">
      <AdminNav />

      {/* Floating Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                CPCB Regulatory Role
              </span>
              <span className="text-xs text-slate-500">Facility Authorization Registry</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Recycler Compliance & Authorization
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Review facility credentials, track material authorizations, and toggle regulatory operating permits.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-mono text-xs font-bold">
              Total: {recyclers.length} Facilities
            </span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by facility name, CPCB license no., or location..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold self-start sm:self-auto overflow-x-auto">
            {(["ALL", "AUTHORIZED", "PENDING", "UNAUTHORIZED"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg transition-all capitalize whitespace-nowrap ${
                  statusFilter === st
                    ? "bg-white text-slate-900 shadow-2xs font-extrabold"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {st.toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Recyclers Table / Cards */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Recycler Facility & License</th>
                  <th className="py-3.5 px-4">Location & Service Area</th>
                  <th className="py-3.5 px-4">Materials Authorized</th>
                  <th className="py-3.5 px-4">Pickup Logistics</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Regulatory Status Toggle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredRecyclers.map((rec) => {
                  return (
                    <tr key={rec._id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Facility info */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-extrabold text-slate-900 text-sm">
                              {rec.facilityName}
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <FileCheck2 className="w-3.5 h-3.5 text-slate-400" />
                              <span className="font-mono text-[11px] text-slate-600 font-semibold">
                                {rec.authorizationNumber}
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-500 mt-1">
                              {rec.contactDetails}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-slate-800 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{rec.location}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Service: {rec.serviceArea}
                        </div>
                      </td>

                      {/* Materials */}
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {rec.materialsAccepted.map((mat) => (
                            <span
                              key={mat}
                              className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[10px] border border-slate-200"
                            >
                              {mat}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Pickup */}
                      <td className="py-4 px-4">
                        {rec.pickupAvailable ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            <Truck className="w-3 h-3" />
                            <span>Doorstep Fleet</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                            <span>Drop-off Only</span>
                          </span>
                        )}
                      </td>

                      {/* Authorization Status Toggle */}
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-2">
                          {/* Segmented status toggle buttons */}
                          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 shadow-2xs">
                            <button
                              type="button"
                              onClick={() => handleStatusChange(rec._id, rec.facilityName, "AUTHORIZED")}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                                rec.authorizationStatus === "AUTHORIZED"
                                  ? "bg-emerald-600 text-white shadow-xs"
                                  : "text-slate-600 hover:text-emerald-700"
                              }`}
                              title="Set status to AUTHORIZED"
                            >
                              Authorized
                            </button>

                            <button
                              type="button"
                              onClick={() => handleStatusChange(rec._id, rec.facilityName, "PENDING")}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                                rec.authorizationStatus === "PENDING"
                                  ? "bg-amber-500 text-white shadow-xs"
                                  : "text-slate-600 hover:text-amber-700"
                              }`}
                              title="Set status to PENDING"
                            >
                              Pending
                            </button>

                            <button
                              type="button"
                              onClick={() => handleStatusChange(rec._id, rec.facilityName, "UNAUTHORIZED")}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                                rec.authorizationStatus === "UNAUTHORIZED"
                                  ? "bg-red-600 text-white shadow-xs"
                                  : "text-slate-600 hover:text-red-700"
                              }`}
                              title="Set status to UNAUTHORIZED"
                            >
                              Revoke
                            </button>
                          </div>
                        </div>

                        <div className="text-[10px] text-slate-400 mt-1 font-mono">
                          Current: <strong className="text-slate-700">{rec.authorizationStatus}</strong>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredRecyclers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      No recyclers matching your filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
