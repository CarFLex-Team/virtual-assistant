import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  X,
} from "lucide-react";
//I'm using hardcoded data for now but this will eventually be replaced with real API data from Mosap
export default function DailyBrief({
  setShowBrief,
}: {
  setShowBrief: (show: boolean) => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-sky-50 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto ">
        {/* Header */}
        <div className="sticky top-0 bg-linear-to-r from-sky-900 to-sky-900 text-white p-6 ">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-90 mb-1">
                AI Morning Operations Brief
              </div>
              <h2 className="text-white">Cairo Operations Center</h2>
              <div className="text-sm opacity-90 mt-1">
                Friday, 23-May-2025 08:45
              </div>
            </div>
            <button
              onClick={() => setShowBrief(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* AI Monitoring Status */}
          <section className="bg-green-50 border border-green-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <h3 className="text-green-900">AI Monitoring Status</h3>
            </div>
            <ul className="space-y-2 text-sm text-green-800">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>All systems running normally</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>
                  Anomaly Detection: 0/15,082/0.523/3706.806.687/172720
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Predictive Risk Score: 8602.65515 (Blue)</span>
              </li>
            </ul>
          </section>

          {/* Executive Summary */}
          <section className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="text-blue-900">Executive Summary</h3>
            </div>
            <div className="space-y-2 text-sm text-blue-800">
              <p>
                Current customer base stands at 1,567 with 264,209 active open
                balances totals.
              </p>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div className="bg-white/60 rounded-lg p-3">
                  <div className="text-xs text-blue-600 mb-1">
                    Financial Health Score
                  </div>
                  <div>78.102</div>
                </div>
                <div className="bg-white/60 rounded-lg p-3">
                  <div className="text-xs text-blue-600 mb-1">
                    Average overdue duration
                  </div>
                  <div>12.5 days</div>
                </div>
              </div>
            </div>
          </section>

          {/* Critical Alerts */}
          <section className="bg-red-50 border border-red-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <h3 className="text-red-900">Critical Alerts</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 shrink-0"></div>
                <span className="text-red-800">
                  High-risk overdue accounts above $50 AED: 445 EX-0468
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 shrink-0"></div>
                <span className="text-red-800">
                  Backdated overdue exposure between 30-60 days: 801,556,730
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 shrink-0"></div>
                <span className="text-red-800">
                  Top 5 customers represent 45.2% of total overdue value
                  (collective)
                </span>
              </li>
            </ul>
          </section>

          {/* AI Highlights */}
          <section className="bg-purple-50 border border-purple-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-purple-600" />
              <h3 className="text-purple-900">AI Highlights</h3>
            </div>
            <ul className="space-y-2 text-sm text-purple-800">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>
                  Natural Customer Attritions 20008-00006.80158.4825.225.6555
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>Primary Supplier Sourcing Insight: United Arab E.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>
                  Collection pressure metrics concentrated among high-value
                  customer accounts
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 mt-1">•</span>
                <span>
                  Overdue review concentration may impact short term operational
                  liquidity
                </span>
              </li>
            </ul>
          </section>

          {/* Recommended Actions */}
          <section className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-amber-600" />
              <h3 className="text-amber-900">Recommended Actions</h3>
            </div>
            <ol className="space-y-2 text-sm text-amber-800 list-decimal list-inside">
              <li>Prioritize outreach for overdue overdue more than 30 days</li>
              <li>
                Execute high-value customer accounts pending financial risk
                thresholds
              </li>
              <li>Review customer credit approval concentrations</li>
              <li>
                Monitor supplier dependency concentrations across sourcing
                reports
              </li>
            </ol>
          </section>

          {/* Forecast & Operational Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <section className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
              <h3 className="text-indigo-900 mb-3">Forecast</h3>
              <p className="text-sm text-indigo-800">
                Forecasted next-period risk may increase within the next 14 days
                if current payment behavior continues.
              </p>
            </section>

            <section className="bg-teal-50 border border-teal-200 rounded-xl p-5">
              <h3 className="text-teal-900 mb-3">Operational Status</h3>
              <ul className="space-y-1 text-sm text-teal-800">
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
