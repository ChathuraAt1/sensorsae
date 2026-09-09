import React from 'react';
import { 
  Radio, ShieldCheck, Zap, Lock, Search, Download, ArrowUpRight, 
  Activity, CheckCircle2, ChevronRight, Menu, Bell
} from 'lucide-react';

export const DashboardTopBar = ({
  selectedFacility,
  selectedAsset,
  activeTab,
  trialStatus,
  planCapabilities,
  searchQuery,
  setSearchQuery,
  timeRange,
  handleSelectTimeRange,
  handleExportCsv,
  handleUpgrade,
  setActiveTab,
}) => {
  return (
    <header className="bg-[#080d17]/95 backdrop-blur-md border-b border-blue-900/40 px-4 sm:px-6 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0 z-20">
      
      {/* Left: Clean Plant & Asset Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="min-w-0">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5 truncate">
            <span className="text-slate-500">FACILITY</span>
            <ChevronRight className="w-2.5 h-2.5 text-slate-600" />
            <span className="text-slate-300 font-semibold">{selectedFacility.code}</span>
            <ChevronRight className="w-2.5 h-2.5 text-slate-600" />
            <span className="text-blue-400 font-bold">{selectedAsset.id}</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <h1 className="text-sm sm:text-base font-extrabold text-white truncate">
              {selectedFacility.name.split('—')[0]}
            </h1>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" title="Edge Telemetry Live" />
            <span className="px-2 py-0.5 rounded-md bg-blue-950/60 border border-blue-900/50 text-blue-300 text-[10px] font-mono uppercase font-bold shrink-0">
              {activeTab === 'incidents' || activeTab === 'alerts' ? 'Incidents & Alerts' : 
               activeTab === 'plan' ? 'Subscription & Quotas' : activeTab}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Streamlined, Decluttered HUD Controls */}
      <div className="flex items-center gap-2.5 flex-wrap justify-end">

        {/* 14-Day Evaluation or Active License Pill */}
        {trialStatus.isTrial ? (
          <div className={`flex items-center gap-2 px-2.5 py-1 rounded-xl border font-mono text-xs shadow-sm transition-all ${
            trialStatus.isExpired 
              ? 'bg-red-950/70 border-red-500/60 text-red-300 animate-pulse'
              : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
          }`}>
            <div className={`w-2 h-2 rounded-full shrink-0 ${trialStatus.isExpired ? 'bg-red-500' : 'bg-amber-400 animate-ping'}`} />
            <span className="text-[11px] font-bold text-white">
              {trialStatus.isExpired ? '0d Left (Expired)' : `${trialStatus.remainingDays}d Trial`}
            </span>
            <button
              onClick={() => handleUpgrade('professional')}
              className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase tracking-wider transition-all flex items-center gap-1 ${
                trialStatus.isExpired 
                  ? 'bg-red-500 hover:bg-red-400 text-white' 
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950'
              }`}
              title="Upgrade License"
            >
              <span>Upgrade</span>
              <ArrowUpRight className="w-2.5 h-2.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setActiveTab('plan')}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-950/60 hover:bg-blue-900/40 border border-blue-500/30 text-blue-300 hover:text-white text-xs font-mono transition-all"
            title="Manage Plan & Quotas"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-bold">{planCapabilities.name}</span>
          </button>
        )}

        {/* Fast Telemetry Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search telemetry..."
            className="bg-[#06080d] border border-blue-900/50 rounded-xl px-2.5 py-1 pl-7 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono w-32 sm:w-40 transition-all"
          />
          <Search className="w-3 h-3 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Time Range Selector */}
        <div className="bg-[#06080d] border border-blue-900/50 rounded-xl p-0.5 flex text-[10px] font-mono">
          {['Live', '24h', '30d', '1-Year'].map(t => {
            const isLocked = planCapabilities && !planCapabilities.allowedHistoryRanges.includes(t);
            return (
              <button
                key={t}
                onClick={() => handleSelectTimeRange(t)}
                className={`px-2 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  timeRange === t ? 'bg-blue-600 text-white font-bold shadow-sm' : 
                  isLocked ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-white'
                }`}
                title={isLocked ? `${t} archive requires an upgraded license` : undefined}
              >
                <span>{t}</span>
                {isLocked && <Lock className="w-2.5 h-2.5 text-blue-400/70" />}
              </button>
            );
          })}
        </div>

        {/* Export CSV Snapshot */}
        <button
          onClick={handleExportCsv}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#0b0f19] hover:bg-slate-800 border border-blue-900/50 text-slate-300 hover:text-white text-xs font-mono transition-colors"
          title="Export CSV telemetry snapshot"
        >
          <Download className="w-3 h-3 text-blue-400" />
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>
    </header>
  );
};
