import React from 'react';
import { Lock, AlertTriangle, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const DashboardPaywall = ({
  user,
  availablePlans,
  handleUpgrade,
  setActiveTab,
  handleToggleTrialSim,
}) => {
  return (
    <div className="max-w-5xl mx-auto my-8 space-y-8 animate-in fade-in zoom-in-95 duration-300">
      {/* Lock Alert Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-red-950/40 via-[#080d17] to-[#06080d] border border-red-500/40 shadow-2xl shadow-red-950/50 text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="w-16 h-16 mx-auto rounded-3xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shadow-glow-sm animate-pulse">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-500/50 text-red-300 text-xs font-mono">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span>14-DAY EVALUATION WINDOW HAS CONCLUDED</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Dashboard Component Access Locked
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Your 14-day trial period calculated from your registration date has expired. Real-time telemetry ingestion, AI diagnostics, and asset component access have been safely locked. Upgrade your subscription plan below to restore full continuous telemetry and fleet governance.
          </p>
        </div>

        {/* Key metadata badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-mono text-xs text-slate-300">
          <span className="px-3.5 py-2 rounded-xl bg-[#0b0f19] border border-slate-800">
            Registration Date: <span className="text-white font-semibold">{user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Active Session'}</span>
          </span>
          <span className="px-3.5 py-2 rounded-xl bg-red-950/50 border border-red-800/50 text-red-300 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span>Remaining Days: 0 (Expired)</span>
          </span>
          <button
            onClick={handleToggleTrialSim}
            className="px-3.5 py-2 rounded-xl bg-slate-800/70 hover:bg-slate-700 border border-slate-600 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
            title="Developer testing toggle"
          >
            <span>⚙️ Test Simulation Toggle</span>
          </button>
        </div>
      </div>

      {/* Tier Selection Cards for Upgrading */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-white font-mono">
              CHOOSE AN INDUSTRIAL LICENSE TO UNLOCK
            </h3>
            <p className="text-xs text-slate-400">Instantly activate continuous edge ingestion and full fleet controls</p>
          </div>
          <button
            onClick={() => setActiveTab('plan')}
            className="text-xs font-mono text-blue-400 hover:text-blue-300 underline underline-offset-4"
          >
            View detailed quota specs →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availablePlans.map((plan) => {
            const isPopular = plan.popular;
            const price = plan.monthly_price || plan.price;
            return (
              <div
                key={plan.id || plan.slug}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative transition-all ${
                  isPopular
                    ? 'bg-[#080d17] border-2 border-blue-500 shadow-xl shadow-blue-500/20'
                    : 'bg-[#080d17] border border-slate-800 hover:border-slate-700'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-blue-600 text-white font-mono font-bold text-[10px] tracking-wider uppercase">
                    RECOMMENDED
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-bold text-white">{plan.name}</h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{plan.description}</p>
                  </div>

                  <div className="flex items-baseline gap-1 font-mono">
                    <span className="text-3xl font-extrabold text-white">${price}</span>
                    <span className="text-xs text-slate-400">/mo</span>
                  </div>

                  <ul className="space-y-2 pt-3 border-t border-slate-800/80">
                    {(plan.features || []).slice(0, 4).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleUpgrade(plan.slug)}
                  className={`mt-6 w-full py-3 rounded-2xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    isPopular
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-glow-sm'
                      : 'bg-[#0b0f19] hover:bg-blue-900/40 text-blue-300 hover:text-white border border-blue-900/60'
                  }`}
                >
                  <span>Upgrade to {plan.name}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
