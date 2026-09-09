import React from 'react';
import { Workflow, Lock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { RECENT_LOGS } from '../../data/telemetryData';

export const DashboardIncidents = ({
  planCapabilities,
  handleCopy,
  setCopyToast,
  setUpgradeModal,
  assets,
  handleInspectWithCopilot,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-extrabold text-white">Automated Incident Log &amp; SAP/CMMS Dispatch</h2>
          <p className="text-xs text-slate-400 font-mono">
            Audit trail of anomalous kinematic events and automatically generated work order drafts.
          </p>
        </div>

        <button
          onClick={() => {
            if (planCapabilities.sapSync) {
              handleCopy(`[WORK-ORDER-EXPORT-${Date.now()}] Asset: CONV-10, Severity: CRITICAL, Action: Replace bearing pack`, 'Work Order');
              setCopyToast('CMMS Work Orders Dispatched to SAP PM / IBM Maximo');
            } else {
              setUpgradeModal({
                isOpen: true,
                targetPlanSlug: 'enterprise-mesh',
                reason: 'Direct 2-way SAP PM, Siemens & IBM Maximo automated CMMS work order synchronization requires an Enterprise Mesh license.'
              });
            }
          }}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs font-mono shadow-glow-sm flex items-center gap-2"
        >
          <Workflow className="w-3.5 h-3.5" />
          <span>Sync CMMS Work Orders</span>
          {!planCapabilities.sapSync && <Lock className="w-3 h-3 text-blue-200" />}
        </button>
      </div>

      {/* Active Dispatch Notification Channels Bar */}
      <div className="p-4 rounded-2xl bg-[#080d17] border border-blue-900/40 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">CONFIGURED DISPATCH CHANNELS:</span>
          <span className="text-blue-400 font-bold">{planCapabilities.name} Plan</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          {['Email', 'SMS', 'WhatsApp', 'Slack', 'Webhooks', 'SAP PM', 'IBM Maximo'].map(channel => {
            const isEnabled = planCapabilities.dispatchChannels.includes(channel);
            return (
              <div
                key={channel}
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 ${
                  isEnabled
                    ? 'bg-blue-950/60 border-blue-500/40 text-blue-300'
                    : 'bg-[#06080d] border-slate-800 text-slate-500 opacity-60'
                }`}
              >
                {isEnabled ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Lock className="w-3 h-3 text-slate-500" />
                )}
                <span>{channel}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl bg-[#080d17] border border-blue-900/40 divide-y divide-slate-800/80">
        {RECENT_LOGS.map(log => (
          <div key={log.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                log.type === 'CRITICAL' ? 'bg-red-950 text-red-400 border border-red-500' :
                log.type === 'WARNING' ? 'bg-amber-950 text-amber-300 border border-amber-500/40' :
                'bg-blue-950 text-blue-300 border border-blue-800'
              }`}>
                {log.type}
              </span>
              <span className="text-slate-400">{log.time}</span>
              <strong className="text-white font-mono">{log.machineId}</strong>
            </div>

            <div className="text-slate-300 font-sans flex-1 sm:px-4">
              {log.msg}
            </div>

            <button
              onClick={() => handleInspectWithCopilot(assets.find(a => a.id === log.machineId) || assets[0])}
              className="px-3 py-1 rounded-lg bg-[#06080d] hover:bg-blue-950/60 border border-blue-900/50 text-blue-400 font-mono text-[11px] shrink-0"
            >
              Investigate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
