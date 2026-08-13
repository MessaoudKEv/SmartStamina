import React from "react";
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Clock,
  UserCheck,
  X
} from "lucide-react";
import { ModerationReport } from "../types";

interface ModerationDashboardProps {
  reports: ModerationReport[];
  onResolveReport: (reportId: string, action: "Approved" | "Removed") => void;
  onClose: () => void;
}

export const ModerationDashboard: React.FC<ModerationDashboardProps> = ({
  reports,
  onResolveReport,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-900 text-white flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-white">
                SmartStamina Trust & Moderation Portal
              </h2>
              <p className="text-xs text-slate-300">
                Community Health Integrity & Misinformation Safeguards
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Trust Philosophy Banner */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-950 space-y-1.5">
            <h4 className="font-bold flex items-center gap-1.5 text-indigo-900">
              <UserCheck className="w-4 h-4 text-indigo-600" />
              Community Guidelines & Medical Safeguard Standard
            </h4>
            <p className="leading-relaxed">
              SmartStamina strictly prohibits unverified medical diagnosis claims, spam referral links, or deceptive battery statistics. All reported submissions undergo automated semantic screening and human verification.
            </p>
          </div>

          {/* Pending Queue */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                Active Reports Queue ({reports.length})
              </h3>
              <span className="text-xs text-slate-500">Auto-prioritized by report severity</span>
            </div>

            {reports.length > 0 ? (
              <div className="space-y-3">
                {reports.map((rep) => (
                  <div
                    key={rep.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            rep.status === "Pending"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {rep.status}
                        </span>
                        <span className="text-xs font-bold text-slate-900">
                          {rep.targetType}: {rep.reason}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">{rep.timestamp}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 italic">
                      "{rep.snippet}"
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs">
                      <span className="text-slate-400 text-[11px]">
                        Reporter: {rep.reporterEmail}
                      </span>

                      {rep.status === "Pending" ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onResolveReport(rep.id, "Removed")}
                            className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold transition-colors flex items-center gap-1"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Remove Content</span>
                          </button>

                          <button
                            onClick={() => onResolveReport(rep.id, "Approved")}
                            className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold transition-colors flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Dismiss / Approve</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-emerald-600 font-bold text-xs">
                          ✓ Handled by Moderation
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic py-6 text-center">
                All community reports have been successfully triaged and resolved.
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
