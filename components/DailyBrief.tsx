"use client";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  X,
} from "lucide-react";
import { BriefData as Data } from "@/utils/data/DashboardData";
const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  day: "2-digit",
  month: "short",
  year: "numeric",
});
const SECTIONS = {
  success: {
    border: "border-l-emerald-500",
    icon: "text-emerald-400",
    heading: "text-emerald-300",
  },
  info: {
    border: "border-l-accent",
    icon: "text-accent",
    heading: "text-sky-300",
  },
  danger: {
    border: "border-l-red-500",
    icon: "text-red-400",
    heading: "text-red-300",
  },
  insight: {
    border: "border-l-violet-500",
    icon: "text-violet-400",
    heading: "text-violet-300",
  },
  action: {
    border: "border-l-amber-500",
    icon: "text-amber-400",
    heading: "text-amber-300",
  },
  forecast: {
    border: "border-l-indigo-500",
    icon: "text-indigo-400",
    heading: "text-indigo-300",
  },
  ops: {
    border: "border-l-teal-500",
    icon: "text-teal-400",
    heading: "text-teal-300",
  },
};

export default function DailyBrief({
  setShowBrief,
  company,
}: {
  setShowBrief: (show: boolean) => void;
  company: string;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => setShowBrief(false)}
    >
      <div className="bg-background border border-border shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto rounded-2xl m-4">
        <div className="sticky top-0 bg-surface border-b border-border text-slate-100 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-accent mb-1 font-medium">
                AI Morning Operations Brief
              </div>
              <h2 className="text-slate-100 text-lg font-semibold">
                {company === "e01" ? "UAE" : "Tire Depot"} Operations Center
              </h2>
              <div className="text-sm text-slate-500 mt-1">{today}</div>
            </div>
            <button
              onClick={() => setShowBrief(false)}
              className="p-2 hover:bg-border rounded-lg transition-colors text-slate-400 hover:text-slate-100 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <section
            className={`bg-surface border-l-4 ${SECTIONS.success.border} rounded-xl p-5`}
          >
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className={`w-5 h-5 ${SECTIONS.success.icon}`} />
              <h3 className={`font-semibold ${SECTIONS.success.heading}`}>
                AI Monitoring Status
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              {Data[company as keyof typeof Data]?.aiMonitorSection?.map(
                (item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className={`${SECTIONS.success.icon} `}>•</span>
                    <span>{item}</span>
                  </li>
                ),
              )}
            </ul>
          </section>

          <section
            className={`bg-surface border-l-4 ${SECTIONS.info.border} rounded-xl p-5`}
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className={`w-5 h-5 ${SECTIONS.info.icon}`} />
              <h3 className={`font-semibold ${SECTIONS.info.heading}`}>
                Executive Summary
              </h3>
            </div>
            <div className="space-y-2 text-sm text-slate-300">
              <p>
                {
                  Data[company as keyof typeof Data]?.executiveSummarySection
                    ?.title
                }
              </p>
              <div className="mt-3 flex gap-3">
                {Data[
                  company as keyof typeof Data
                ]?.executiveSummarySection?.cards.map((card, index) => (
                  <div
                    key={index}
                    className="bg-background rounded-lg p-3 border border-border flex-1"
                  >
                    <div className="text-xs text-slate-500 mb-1">
                      {card.title}
                    </div>
                    <div className="text-slate-100 font-medium">
                      {card.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            className={`bg-surface border-l-4 ${SECTIONS.danger.border} rounded-xl p-5`}
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className={`w-5 h-5 ${SECTIONS.danger.icon}`} />
              <h3 className={`font-semibold ${SECTIONS.danger.heading}`}>
                Critical Alerts
              </h3>
            </div>
            <ul className="space-y-3">
              {Data[company as keyof typeof Data]?.criticalAlertsSection?.map(
                (alert, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    {/* <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 shrink-0" /> */}
                    <span className={`${SECTIONS.danger.icon} `}>•</span>
                    <span className="text-slate-300">{alert}</span>
                  </li>
                ),
              )}
            </ul>
          </section>

          <section
            className={`bg-surface border-l-4 ${SECTIONS.insight.border} rounded-xl p-5`}
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className={`w-5 h-5 ${SECTIONS.insight.icon}`} />
              <h3 className={`font-semibold ${SECTIONS.insight.heading}`}>
                AI Highlights
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              {Data[company as keyof typeof Data]?.aiHighlightsSection?.map(
                (highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className={`${SECTIONS.insight.icon}`}>•</span>
                    <span>{highlight}</span>
                  </li>
                ),
              )}
            </ul>
          </section>

          <section
            className={`bg-surface border-l-4 ${SECTIONS.action.border} rounded-xl p-5`}
          >
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className={`w-5 h-5 ${SECTIONS.action.icon}`} />
              <h3 className={`font-semibold ${SECTIONS.action.heading}`}>
                Recommended Actions
              </h3>
            </div>
            <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside">
              {Data[
                company as keyof typeof Data
              ]?.recommendedActionsSection?.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ol>
          </section>

          <div
            className={`grid grid-cols-1 ${
              Data[company as keyof typeof Data]?.operationalStatusSection
                ?.length < 5
                ? "md:grid-cols-2"
                : ""
            } gap-4`}
          >
            <section
              className={`bg-surface border-l-4 ${SECTIONS.forecast.border} rounded-xl p-5`}
            >
              <h3 className={`font-semibold mb-3 ${SECTIONS.forecast.heading}`}>
                Forecast
              </h3>
              <p className="text-sm text-slate-300">
                {Data[company as keyof typeof Data]?.forecast}
              </p>
            </section>

            <section
              className={`bg-surface border-l-4 ${SECTIONS.ops.border} rounded-xl p-5`}
            >
              <h3 className={`font-semibold mb-3 ${SECTIONS.ops.heading}`}>
                Operational Status
              </h3>
              <ul className="space-y-1 text-sm text-slate-300">
                {Data[
                  company as keyof typeof Data
                ]?.operationalStatusSection?.map((status, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className={`${SECTIONS.ops.icon}`}>•</span>
                    <span>{status}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
