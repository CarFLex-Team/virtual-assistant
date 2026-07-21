"use client";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  X,
} from "lucide-react";

// I'm using hardcoded data for now but this will eventually be replaced with
// real API data from Mosap. NOTE: the previous placeholder values included

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
}: {
  setShowBrief: (show: boolean) => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background border border-border shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto rounded-2xl">
        <div className="sticky top-0 bg-surface border-b border-border text-slate-100 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-accent mb-1 font-medium">
                AI Morning Operations Brief
              </div>
              <h2 className="text-slate-100 text-lg font-semibold">
                UAE Operations Center
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
              <li className="flex items-start gap-2">
                <span className={`${SECTIONS.success.icon} mt-1`}>•</span>
                <span>All systems running normally</span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`${SECTIONS.success.icon} mt-1`}>•</span>
                <span>
                  Anomaly Detection: 0 flagged of 15,082 transactions scanned
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`${SECTIONS.success.icon} mt-1`}>•</span>
                <span>Predictive Risk Score: 8.6 / 100 (Low)</span>
              </li>
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
                Current customer base stands at 1,567 with 264,209 AED in active
                open balances.
              </p>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div className="bg-background rounded-lg p-3 border border-border">
                  <div className="text-xs text-slate-500 mb-1">
                    Financial Health Score
                  </div>
                  <div className="text-slate-100 font-medium">78.1</div>
                </div>
                <div className="bg-background rounded-lg p-3 border border-border">
                  <div className="text-xs text-slate-500 mb-1">
                    Average overdue duration
                  </div>
                  <div className="text-slate-100 font-medium">12.5 days</div>
                </div>
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
              <li className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 shrink-0" />
                <span className="text-slate-300">
                  445 high-risk overdue accounts above 50 AED (ref. EX-0468)
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 shrink-0" />
                <span className="text-slate-300">
                  Overdue exposure between 30-60 days: 801,556 AED
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 shrink-0" />
                <span className="text-slate-300">
                  Top 5 customers represent 45.2% of total overdue value
                  (collective)
                </span>
              </li>
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
              <li className="flex items-start gap-2">
                <span className={`${SECTIONS.insight.icon} mt-1`}>•</span>
                <span>
                  Natural customer attrition trending within expected range
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`${SECTIONS.insight.icon} mt-1`}>•</span>
                <span>
                  Primary Supplier Sourcing Insight: United Arab Emirates
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`${SECTIONS.insight.icon} mt-1`}>•</span>
                <span>
                  Collection pressure metrics concentrated among high-value
                  customer accounts
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`${SECTIONS.insight.icon} mt-1`}>•</span>
                <span>
                  Overdue review concentration may impact short term operational
                  liquidity
                </span>
              </li>
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
              <li>
                Prioritize outreach for accounts overdue more than 30 days
              </li>
              <li>
                Review high-value customer accounts against financial risk
                thresholds
              </li>
              <li>Review customer credit approval concentrations</li>
              <li>
                Monitor supplier dependency concentrations across sourcing
                reports
              </li>
            </ol>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <section
              className={`bg-surface border-l-4 ${SECTIONS.forecast.border} rounded-xl p-5`}
            >
              <h3 className={`font-semibold mb-3 ${SECTIONS.forecast.heading}`}>
                Forecast
              </h3>
              <p className="text-sm text-slate-300">
                Forecasted next-period risk may increase within the next 14 days
                if current payment behavior continues.
              </p>
            </section>

            <section
              className={`bg-surface border-l-4 ${SECTIONS.ops.border} rounded-xl p-5`}
            >
              <h3 className={`font-semibold mb-3 ${SECTIONS.ops.heading}`}>
                Operational Status
              </h3>
              <ul className="space-y-1 text-sm text-slate-300">
                <li>• Active Customers: 1,567</li>
                <li>• High Risk Accounts: 12</li>
                <li>• Responded Suppliers: 265</li>
                <li>• AI Monitoring Engines: Real-time</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
