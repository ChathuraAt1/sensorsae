import React from 'react';
import { 
  ShieldCheck, Lock, Radio, Zap, Clock, Check, CheckCircle2, ArrowUpRight 
} from 'lucide-react';

export const DashboardPlan = ({
  planCapabilities,
  trialStatus,
  handleToggleTrialSim,
  handleUpgrade,
  availablePlans,
  rawActivePlan,
  token,
  user,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-400 font-mono text-xs mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>BACKEND-SYNCHRONIZED INDUSTRIAL LICENSE</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Subscription &amp; Fleet Quota Governance</h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Live telemetry parameters synced with <code className="text-blue-400">dash.sensorsae.net/api/subscription-plans</code>.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          {trialStatus.isExpired ? (
            <span className="px-3.5 py-2 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
              <span>Trial Expired (0 Days Left)</span>
            </span>
          ) : (
            <span className="px-3.5 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>License Active ({planCapabilities.name})</span>
            </span>
          )}
        </div>
      </div>

      {/* Expired Trial Warning Banner */}
      {trialStatus.isExpired && (
        <div className="p-5 rounded-2xl bg-red-950/40 border border-red-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-red-950/40 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-500/20 text-red-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>14-Day Evaluation Window Concluded</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">LOCKED</span>
              </div>
              <div className="text-xs text-red-200 mt-0.5">
                Access to all asset telemetry, AI diagnostics, and thermal cameras is paused. Select a plan below to upgrade and restore real-time fleet operations.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleToggleTrialSim}
              className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-600 text-slate-300 text-xs font-mono transition-colors"
            >
              ⚙️ Test Simulation Toggle
            </button>
            <button
              onClick={() => handleUpgrade('professional')}
              className="px-4 py-1.5 rounded-xl bg-red-500 hover:bg-red-400 text-white font-mono text-xs font-bold transition-colors shadow-glow-sm flex items-center gap-1.5"
            >
              <span>Upgrade Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 4 Quota Utilization KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        {/* Metric 1: Fleet Sensor Nodes */}
        <div className="p-5 rounded-2xl bg-[#080d17] border border-blue-900/40 space-y-3">
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span>FLEET SENSOR NODES</span>
            <Radio className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            {planCapabilities.activeNodesCount}{' '}
            <span className="text-slate-500 text-sm font-normal">
              / {planCapabilities.nodeLimit === Infinity ? 'Unlimited' : planCapabilities.nodeLimit}
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${
                planCapabilities.nodeLimit === Infinity ? 'bg-emerald-400 w-full' : 'bg-blue-500'
              }`}
              style={{
                width: planCapabilities.nodeLimit === Infinity 
                  ? '100%' 
                  : `${Math.min(100, Math.round((planCapabilities.activeNodesCount / planCapabilities.nodeLimit) * 100))}%`
              }}
            />
          </div>
          <span className="text-[10px] text-slate-400 block">
            {planCapabilities.nodeLimit === Infinity ? 'Zero node capping active' : `${Math.round((planCapabilities.activeNodesCount / planCapabilities.nodeLimit) * 100)}% quota consumed`}
          </span>
        </div>

        {/* Metric 2: Polling Frequency */}
        <div className="p-5 rounded-2xl bg-[#080d17] border border-blue-900/40 space-y-3">
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span>SAMPLING POLLING CYCLE</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            {planCapabilities.pollingIntervalSec}s{' '}
            <span className="text-slate-500 text-sm font-normal">Interval</span>
          </div>
          <div className="p-2 rounded-xl bg-[#06080d] border border-slate-800 text-[10px] text-slate-300 truncate">
            {planCapabilities.pollingLabel}
          </div>
        </div>

        {/* Metric 3: History Retention */}
        <div className="p-5 rounded-2xl bg-[#080d17] border border-blue-900/40 space-y-3">
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span>HISTORICAL ARCHIVE</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            {planCapabilities.historyDays === Infinity ? 'Unlimited' : `${planCapabilities.historyDays} Days`}
          </div>
          <span className="text-[10px] text-slate-400 block">
            Full-resolution audit-ready sensor storage
          </span>
        </div>

        {/* Metric 4: Cyber-Physical Architecture */}
        <div className="p-5 rounded-2xl bg-[#080d17] border border-blue-900/40 space-y-3">
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span>SECURITY &amp; COMPLIANCE</span>
            <Lock className={`w-4 h-4 ${planCapabilities.airGapped ? 'text-emerald-400' : 'text-blue-400'}`} />
          </div>
          <div className="text-base font-extrabold text-white truncate">
            {planCapabilities.airGapped ? '100% Air-Gapped' : 'Industrial TLS 1.3'}
          </div>
          <span className="text-[10px] text-slate-400 block">
            {planCapabilities.airGapped ? 'IEC 62443 zero data egress' : 'Encrypted cloud & Modbus gateway'}
          </span>
        </div>
      </div>

      {/* Plan Comparison & 1-Click Upgrade Cards (Loaded directly from backend availablePlans) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-white">Available Industrial License Plans</h3>
          <span className="text-xs font-mono text-slate-400">
            Source: <span className="text-blue-400">GET /api/subscription-plans</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {availablePlans.map((plan) => {
            const planSlug = (plan.slug || plan.name || '').toLowerCase();
            const activeSlug = (rawActivePlan?.slug || rawActivePlan?.name || '').toLowerCase();
            const isCurrent = planSlug === activeSlug || 
              (planSlug.includes('pro') && activeSlug.includes('pro')) ||
              (planSlug.includes('starter') && activeSlug.includes('starter')) ||
              (planSlug.includes('enterprise') && activeSlug.includes('enterprise'));
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id || plan.slug}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all relative ${
                  isCurrent
                    ? 'bg-blue-950/40 border-2 border-blue-500 shadow-2xl shadow-blue-500/20'
                    : isPopular
                      ? 'bg-[#080d17] border border-blue-500/40 hover:border-blue-400'
                      : 'bg-[#080d17] border border-slate-800 hover:border-slate-700'
                }`}
              >
                {isCurrent && (
                  <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-blue-600 text-white font-mono font-bold text-[10px] tracking-wider uppercase shadow-glow-sm flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>CURRENT ACTIVE PLAN</span>
                  </div>
                )}

                {!isCurrent && isPopular && (
                  <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-blue-900 border border-blue-400 text-blue-200 font-mono font-bold text-[10px] tracking-wider uppercase shadow-glow-sm">
                    MOST POPULAR
                  </div>
                )}

                <div className="space-y-4 pt-1">
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white tracking-tight">{plan.name}</h4>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed min-h-[36px]">
                      {plan.description}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1 font-mono">
                    <span className="text-3xl font-extrabold text-white">
                      ${plan.yearly_price || plan.price}
                    </span>
                    <span className="text-xs text-slate-400">/ month (annual billing)</span>
                  </div>

                  <div className="border-t border-slate-800/80 pt-4 space-y-2.5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 block font-bold">
                      INCLUDED CAPABILITIES
                    </span>
                    <ul className="space-y-2 text-xs text-slate-300 font-sans">
                      {(plan.features || []).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800/60 mt-6">
                  {isCurrent ? (
                    <button
                      disabled
                      className="w-full py-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center gap-2 cursor-default"
                    >
                      <Check className="w-4 h-4" />
                      <span>Active Licensed Tier</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpgrade(plan)}
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs shadow-glow-sm transition-all flex items-center justify-center gap-2 group"
                    >
                      <span>Upgrade to {plan.name}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Backend API Sync Diagnostic Footer */}
      <div className="p-4 rounded-2xl bg-[#06080d] border border-blue-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
          <span>API Source: <code className="text-white">dash.sensorsae.net</code></span>
          <span className="text-slate-600">•</span>
          <span>Bearer Token: <span className="text-emerald-400 font-bold">{token ? 'Sanctum Active' : 'Demo Session'}</span></span>
        </div>
        <div>
          Operator: <span className="text-white">{user?.username || user?.email || 'Field Reliability Engineer'}</span>
        </div>
      </div>
    </div>
  );
};
