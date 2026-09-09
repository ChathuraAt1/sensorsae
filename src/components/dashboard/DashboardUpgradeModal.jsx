import React from 'react';
import { Lock, X, ArrowUpRight } from 'lucide-react';

export const DashboardUpgradeModal = ({
  upgradeModal,
  setUpgradeModal,
  availablePlans,
  handleUpgrade,
}) => {
  if (!upgradeModal.isOpen) return null;

  const targetPlan = availablePlans.find(p => 
    (p.slug || '').toLowerCase().includes(upgradeModal.targetPlanSlug.toLowerCase())
  ) || availablePlans[1];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="max-w-lg w-full bg-[#0b0f19] border border-blue-500/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl shadow-blue-500/20">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold">LICENSE UPGRADE REQUIRED</span>
              <h3 className="text-lg font-extrabold text-white">Unlock Industrial Capability</h3>
            </div>
          </div>
          <button
            onClick={() => setUpgradeModal({ isOpen: false, targetPlanSlug: '', reason: '' })}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-slate-300 text-xs leading-relaxed font-sans">
          {upgradeModal.reason}
        </p>

        {/* Target Plan Quick Preview */}
        <div className="p-4 rounded-2xl bg-[#06080d] border border-blue-900/60 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-white font-bold text-sm">{targetPlan.name}</span>
              <span className="text-blue-400 font-mono text-xs block">${targetPlan.yearly_price || targetPlan.price} / month (annual)</span>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Recommended Tier
            </span>
          </div>
          <p className="text-slate-400 text-xs">{targetPlan.description}</p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => setUpgradeModal({ isOpen: false, targetPlanSlug: '', reason: '' })}
            className="px-4 py-2 rounded-xl bg-[#06080d] hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-mono border border-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => handleUpgrade(upgradeModal.targetPlanSlug)}
            className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold font-mono shadow-glow-sm transition-all flex items-center gap-2"
          >
            <span>Upgrade License</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
