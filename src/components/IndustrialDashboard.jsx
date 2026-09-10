import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Cpu, Activity, Radio, ShieldCheck, User, LogOut, Bot, Lock,
  LayoutDashboard, Eye, Sliders, AlertTriangle, ArrowUpRight, Check
} from 'lucide-react';
import { 
  INDUSTRIAL_FACILITIES, INITIAL_ASSETS, CLUSTER_METRICS, RECENT_LOGS 
} from '../data/telemetryData';
import { useAuth } from '../context/AuthContext';
import { 
  fetchBackendPlans, 
  fetchUserActivePlan, 
  derivePlanCapabilities, 
  calculateTrialStatus,
  FALLBACK_PLANS 
} from '../services/subscriptionService';

// Modular Subpage Components
import { DashboardTopBar } from './dashboard/DashboardTopBar';
import { DashboardOverview } from './dashboard/DashboardOverview';
import { DashboardSensors } from './dashboard/DashboardSensors';
import { DashboardCopilot } from './dashboard/DashboardCopilot';
import { DashboardThermal } from './dashboard/DashboardThermal';
import { DashboardOrin } from './dashboard/DashboardOrin';
import { DashboardFft } from './dashboard/DashboardFft';
import { DashboardIncidents } from './dashboard/DashboardIncidents';
import { DashboardPlan } from './dashboard/DashboardPlan';
import { DashboardPaywall } from './dashboard/DashboardPaywall';
import { DashboardUpgradeModal } from './dashboard/DashboardUpgradeModal';

export const IndustrialDashboard = ({ 
  onBackToHome, 
  initialTab = 'overview', 
  initialAssetId = null,
  onSelectPlan 
}) => {
  const { user, token, logout, apiBase } = useAuth();

  // Read URL query params if present for deep linking (supporting both alerts and incidents)
  const urlParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const rawTabParam = urlParams.get('tab') || initialTab || 'overview';
  const defaultTab = (rawTabParam === 'alerts' || rawTabParam === 'alert') ? 'incidents' : rawTabParam;
  const defaultAssetId = urlParams.get('asset') || initialAssetId || 'PUMP-04';

  // Navigation state
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [selectedFacility, setSelectedFacility] = useState(INDUSTRIAL_FACILITIES[0]);
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [selectedAsset, setSelectedAsset] = useState(() => {
    return INITIAL_ASSETS.find(a => a.id === defaultAssetId) || INITIAL_ASSETS[0];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Time Range & Interactive ISO 10816 Threshold Slider State
  const [timeRange, setTimeRange] = useState('Live');
  const [isoThresholdLimit, setIsoThresholdLimit] = useState(2.80); // mm/s threshold slider
  const [hoveredHarmonicIdx, setHoveredHarmonicIdx] = useState(null);
  const [copyToast, setCopyToast] = useState('');

  // Interactive Thermal Spot-Picker State (Coordinates in %)
  const [thermalCrosshair, setThermalCrosshair] = useState({ x: 52, y: 48, tempDelta: 0 });

  // Real Subscription & Plan Governance State (Synced live from backend API)
  const [availablePlans, setAvailablePlans] = useState(FALLBACK_PLANS);
  const [rawActivePlan, setRawActivePlan] = useState(FALLBACK_PLANS[1]);
  const [isPlanLoading, setIsPlanLoading] = useState(true);
  const [upgradeModal, setUpgradeModal] = useState({ isOpen: false, targetPlanSlug: 'professional', reason: '' });

  // 14-Day Registration Trial Period Governance
  const [trialRefreshKey, setTrialRefreshKey] = useState(0);
  const [isUserPaid, setIsUserPaid] = useState(() => {
    return Boolean(
      localStorage.getItem('sensorsae_has_paid') === 'true' ||
      (user?.current_plan && user.current_plan !== 'free')
    );
  });

  // Calculate remaining days from registration date (14-day evaluation period)
  const trialStatus = useMemo(() => {
    return calculateTrialStatus(user, isUserPaid);
  }, [user, isUserPaid, trialRefreshKey]);

  // Developer / Testing toggle to simulate active vs expired trial
  const handleToggleTrialSim = () => {
    if (localStorage.getItem('sensorsae_force_trial_expired') === 'true') {
      localStorage.removeItem('sensorsae_force_trial_expired');
      localStorage.setItem('sensorsae_trial_start', new Date().toISOString());
      setCopyToast('Trial reset: 14 Days Remaining restored');
    } else {
      localStorage.setItem('sensorsae_force_trial_expired', 'true');
      setCopyToast('Trial expired mode simulated (Component Access Paused)');
    }
    setTrialRefreshKey(k => k + 1);
  };

  // Dynamically derive capabilities, quotas, and limits based on backend plan data
  const planCapabilities = useMemo(() => {
    return derivePlanCapabilities(rawActivePlan);
  }, [rawActivePlan]);

  // Fetch subscription plans and user's active plan on mount
  useEffect(() => {
    let isMounted = true;
    const loadSubscription = async () => {
      try {
        setIsPlanLoading(true);
        const plans = await fetchBackendPlans();
        if (!isMounted) return;
        setAvailablePlans(plans);

        const active = await fetchUserActivePlan(token, user);
        if (!isMounted) return;

        // If backend reports an active subscribed plan or user has current_plan, set isUserPaid
        if (active && (active.slug || active.name)) {
          const activeSlug = (active.slug || active.name || '').toLowerCase();
          if (!activeSlug.includes('free')) {
            setIsUserPaid(true);
            localStorage.setItem('sensorsae_has_paid', 'true');
          }
        }

        const targetSlug = (active?.slug || active?.name || '').toLowerCase();
        const matched = plans.find(p => {
          const pSlug = (p.slug || p.name || '').toLowerCase();
          return pSlug === targetSlug || 
            (targetSlug.includes('starter') && pSlug.includes('starter')) || 
            (targetSlug.includes('pro') && pSlug.includes('pro')) || 
            (targetSlug.includes('enterprise') && pSlug.includes('enterprise'));
        }) || active || plans[1];

        setRawActivePlan(matched);
      } catch (err) {
        console.warn('Subscription loading error:', err);
      } finally {
        if (isMounted) setIsPlanLoading(false);
      }
    };
    loadSubscription();
    return () => { isMounted = false; };
  }, [token, user]);

  // Handle plan upgrade action
  const handleUpgrade = (targetSlugOrPlan) => {
    let target = null;
    if (typeof targetSlugOrPlan === 'object' && targetSlugOrPlan !== null) {
      target = targetSlugOrPlan;
    } else {
      const slugStr = String(targetSlugOrPlan || 'professional').toLowerCase();
      target = availablePlans.find(p => (p.slug || '').toLowerCase().includes(slugStr)) || availablePlans[1];
    }

    setUpgradeModal({ isOpen: false, targetPlanSlug: '', reason: '' });
    if (onSelectPlan) {
      onSelectPlan(target, 'yearly');
    } else {
      onBackToHome();
    }
  };

  // Facility selection with enterprise multi-facility gating
  const handleSelectFacility = (facilityId) => {
    const fac = INDUSTRIAL_FACILITIES.find(f => f.id === facilityId);
    if (!fac) return;
    if (planCapabilities && !planCapabilities.allowedFacilities.includes(fac.id)) {
      setUpgradeModal({
        isOpen: true,
        targetPlanSlug: 'enterprise-mesh',
        reason: `Multi-Facility Fleet Telemetry (${fac.name.split('—')[0]}) requires an Enterprise Mesh license. Your current ${planCapabilities.name} plan covers 1 single production facility.`
      });
      return;
    }
    setSelectedFacility(fac);
  };

  // Time range selection with tier archive retention gating
  const handleSelectTimeRange = (range) => {
    if (planCapabilities && !planCapabilities.allowedHistoryRanges.includes(range)) {
      const targetSlug = (range === '1-Year' || range === '90d') ? 'professional' : 'enterprise-mesh';
      setUpgradeModal({
        isOpen: true,
        targetPlanSlug: targetSlug,
        reason: `Extended Historical Telemetry (${range}) requires an upgraded license (${range === '1-Year' || range === '90d' ? 'Professional: 1-Year archive' : 'Enterprise: Unlimited cold storage'}). Your current ${planCapabilities.name} plan includes ${planCapabilities.historyDays}-Day retention.`
      });
      return;
    }
    setTimeRange(range);
  };

  // Update selectedAsset if defaultAssetId changes
  useEffect(() => {
    if (defaultAssetId) {
      const found = assets.find(a => a.id === defaultAssetId);
      if (found) setSelectedAsset(found);
    }
  }, [defaultAssetId]);

  // Real-time live streaming simulation tick
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(prev => prev.map(mach => {
        const jitter = (Math.random() - 0.5) * 0.04;
        const newVibe = Math.max(0.1, Number((mach.vibrationRms + jitter).toFixed(2)));
        const newTemp = Math.max(20, Number((mach.temperature + (Math.random() - 0.5) * 0.2).toFixed(1)));
        
        // Re-evaluate status against dynamic ISO threshold limit
        let dynamicStatus = mach.status;
        if (newVibe > isoThresholdLimit * 1.25) {
          dynamicStatus = 'CRITICAL';
        } else if (newVibe > isoThresholdLimit) {
          dynamicStatus = 'ATTENTION';
        } else {
          dynamicStatus = 'OPTIMAL';
        }

        return {
          ...mach,
          vibrationRms: newVibe,
          temperature: newTemp,
          status: dynamicStatus,
        };
      }));
    }, Math.max(800, (planCapabilities?.pollingIntervalSec || 2.5) * 1000));

    if (trialStatus.isExpired) {
      clearInterval(interval);
      return;
    }

    return () => clearInterval(interval);
  }, [isoThresholdLimit, planCapabilities?.pollingIntervalSec, trialStatus.isExpired]);

  // Copy to clipboard with visual toast feedback
  const handleCopy = (text, label = 'Information') => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopyToast(`${label} copied to clipboard`);
      setTimeout(() => setCopyToast(''), 2200);
    }
  };

  // Filtered Assets
  const filteredAssets = useMemo(() => {
    return assets.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = categoryFilter === 'All' || item.category === categoryFilter;
      const matchSeverity = severityFilter === 'All' || item.status === severityFilter;
      return matchSearch && matchCategory && matchSeverity;
    });
  }, [assets, searchQuery, categoryFilter, severityFilter]);

  // Overall Health metric
  const averageHealth = useMemo(() => {
    const total = assets.reduce((acc, curr) => acc + curr.healthScore, 0);
    return Math.round(total / assets.length);
  }, [assets]);

  // Counts
  const attentionCount = assets.filter(a => a.status === 'ATTENTION').length;
  const criticalCount = assets.filter(a => a.status === 'CRITICAL').length;

  // Export Data Action
  const handleExportCsv = () => {
    const headers = "Asset ID,Name,Category,Status,Health Score,Vibration (mm/s),ISO Limit,Temp (°C),RUL (Hours),Edge Hub\n";
    const rows = assets.map(a => 
      `"${a.id}","${a.name}","${a.category}","${a.status}",${a.healthScore},${a.vibrationRms},${isoThresholdLimit},${a.temperature},${a.rulHours},"${a.edgeHubId}"`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `sensorsae_telemetry_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Switch to copilot with context preloaded
  const handleInspectWithCopilot = (asset) => {
    setSelectedAsset(asset);
    setActiveTab('copilot');
  };

  // Interactive thermal canvas click handler
  const handleThermalClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(5, Math.min(95, Math.round(((e.clientX - rect.left) / rect.width) * 100)));
    const y = Math.max(5, Math.min(95, Math.round(((e.clientY - rect.top) / rect.height) * 100)));
    const dist = Math.sqrt(Math.pow(x - 50, 2) + Math.pow(y - 50, 2));
    const delta = Number((12 - dist * 0.2).toFixed(1));
    setThermalCrosshair({ x, y, tempDelta: delta });
  };

  // Embedded Copilot AI Chat State
  const [chatMessages, setChatMessages] = useState([
    {
      id: 'init',
      role: 'assistant',
      content: `Operator session verified. Connected to on-prem Edge-X1 telemetry cluster. Ready to analyze vibration FFT harmonics, RUL forecasts, or generate shift handovers.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatEndRef = useRef(null);

  const handleSendAiMessage = async (overridePrompt = null) => {
    const text = (overridePrompt || chatInput).trim();
    if (!text || isAiLoading) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updated = [...chatMessages, userMsg];
    setChatMessages(updated);
    setChatInput('');
    setIsAiLoading(true);

    try {
      const systemContext = `You are SENSORSAE AI Copilot running in the industrial operations dashboard.
Current Facility: ${selectedFacility.name}.
Focused Equipment: ${selectedAsset.name} [${selectedAsset.id}]
- Status: ${selectedAsset.status}, Health: ${selectedAsset.healthScore}%
- Vibration: ${selectedAsset.vibrationRms} mm/s RMS (Simulated ISO Threshold Limit: ${isoThresholdLimit} mm/s)
- Temperature: ${selectedAsset.temperature} °C (Delta-T: +${selectedAsset.thermalDeltaT} °C)
- Ultrasonic Acoustic: ${selectedAsset.ultrasonicAcoustic} dB
- Primary Diagnostic: ${selectedAsset.primaryFault}
- Remaining Useful Life (RUL): ${selectedAsset.rulHours} hours
Provide actionable, highly technical, concise industrial engineering diagnostics. Do not invent fictional equipment.`;

      const apiPayload = {
        messages: [
          { role: 'system', content: systemContext },
          ...updated.filter(m => m.id !== 'init').map(m => ({ role: m.role, content: m.content }))
        ],
        async: false,
      };

      const res = await fetch(`${apiBase || 'https://dash.sensorsae.net'}/api/ai/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(apiPayload), // strictly without specifying a model as required
      });

      if (!res.ok) {
        throw new Error(`AI gateway error (${res.status})`);
      }

      const json = await res.json();
      let reply = '';
      if (json.data) {
        if (typeof json.data === 'string') reply = json.data;
        else if (json.data.choices && json.data.choices[0]?.message?.content) reply = json.data.choices[0].message.content;
        else if (json.data.response) reply = json.data.response;
        else if (json.data.content) reply = json.data.content;
        else if (json.data.output) reply = json.data.output;
        else reply = JSON.stringify(json.data);
      } else {
        reply = json.message || "Diagnostics processed nominally.";
      }

      setChatMessages(prev => [...prev, {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);

    } catch (err) {
      console.warn('Dashboard Copilot fallback:', err.message);
      setChatMessages(prev => [...prev, {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: `[Notice: Edge-X1 Fallback Mode active: ${err.message}]. Automated Rule Diagnostic for ${selectedAsset.id}: Vibration (${selectedAsset.vibrationRms} mm/s) evaluated against ${isoThresholdLimit} mm/s threshold. Ultrasonic acoustic spikes suggest verifying lubrication film thickness.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    } finally {
      setIsAiLoading(false);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  return (
    <div className="h-screen w-full bg-[#06080d] text-slate-100 flex font-sans overflow-hidden selection:bg-blue-500/30 relative">
      
      {/* Visual Toast Notification for Click-to-Copy */}
      {copyToast && (
        <div className="fixed top-5 right-5 z-50 px-4 py-2 rounded-xl bg-blue-600 text-white font-mono text-xs shadow-2xl shadow-blue-500/30 flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <Check className="w-3.5 h-3.5" />
          <span>{copyToast}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. DENSE INDUSTRIAL SIDEBAR (Fixed strictly to window height)             */}
      {/* ========================================================================= */}
      <aside className={`transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-64 sm:w-72'
      } bg-[#080d17] border-r border-blue-900/40 flex flex-col justify-between shrink-0 z-30 h-full overflow-y-auto select-none`}>
        
        {/* Top Sidebar Header */}
        <div className="space-y-4">
          <div className="p-4 border-b border-blue-900/30 flex items-center justify-between">
            {!sidebarCollapsed && (
              <div 
                onClick={onBackToHome}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-950 border border-blue-500/40 flex items-center justify-center text-blue-400 group-hover:shadow-glow-sm transition-all">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-extrabold text-sm tracking-wider text-white">
                    SENSOR<span className="text-blue-500 font-black">SAE</span>
                  </div>
                  <div className="text-[9px] font-mono text-blue-400 uppercase tracking-widest -mt-0.5">
                    OPERATING SYSTEM v3.2
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors mx-auto"
              title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Facility Selector */}
          {!sidebarCollapsed && (
            <div className="px-4">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1.5 flex items-center justify-between">
                <span>Active Industrial Facility</span>
                {planCapabilities && planCapabilities.allowedFacilities.length === 1 && (
                  <span className="text-[9px] text-blue-400 font-mono">1/3 Facilities</span>
                )}
              </label>
              <select
                value={selectedFacility.id}
                onChange={(e) => handleSelectFacility(e.target.value)}
                className="w-full bg-[#06080d] border border-blue-900/50 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
              >
                {INDUSTRIAL_FACILITIES.map(f => {
                  const isLocked = planCapabilities && !planCapabilities.allowedFacilities.includes(f.id);
                  return (
                    <option key={f.id} value={f.id}>
                      {f.code} • {f.name.split('—')[0]} {isLocked ? '🔒 (Enterprise)' : ''}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          {/* Sidebar Navigation Items */}
          <nav className="px-2 space-y-1">
            {[
              { id: 'overview', label: 'Plant Overview', icon: LayoutDashboard, badge: `${averageHealth}%` },
              { id: 'sensors', label: 'Edge-X1 Sensor Mesh', icon: Radio, badge: `${assets.length} Nodes` },
              { id: 'copilot', label: 'AI Diagnostics Copilot', icon: Bot, badge: 'Live AI' },
              { id: 'thermal', label: 'Thermal Vision Guard', icon: Eye, badge: 'LWIR' },
              { id: 'orin', label: 'Nvidia Orin Engine', icon: Cpu, badge: '275 TOPS' },
              { id: 'fft', label: 'Spectral FFT & DSP', icon: Activity, badge: '192 kHz' },
              { 
                id: 'incidents', 
                label: 'Incident Log & Alerts', 
                icon: AlertTriangle, 
                badge: `${criticalCount + attentionCount}`, 
                alert: criticalCount > 0 
              },
              { 
                id: 'plan', 
                label: 'Subscription & Quotas', 
                icon: ShieldCheck, 
                badge: trialStatus.isExpired ? 'UPGRADE' : planCapabilities.name.split(' ')[0],
                alert: trialStatus.isExpired 
              },
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (item.id === 'incidents' && (activeTab === 'alerts' || activeTab === 'alert'));
              const isBlocked = trialStatus.isExpired && item.id !== 'plan';

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (isBlocked) {
                      setCopyToast('Component Access Blocked: 14-Day Trial Expired. Please upgrade.');
                    }
                    setActiveTab(item.id);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold shadow-glow-sm'
                      : isBlocked
                        ? 'text-slate-500 hover:text-slate-300 hover:bg-[#0e1626]/60'
                        : 'text-slate-300 hover:text-white hover:bg-[#0e1626]'
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : isBlocked ? 'text-slate-500' : 'text-blue-400'}`} />
                    {!sidebarCollapsed && (
                      <span className="truncate flex items-center gap-1.5">
                        <span>{item.label}</span>
                        {isBlocked && <Lock className="w-3 h-3 text-red-400/80 inline-block" />}
                      </span>
                    )}
                  </div>

                  {!sidebarCollapsed && (
                    <span className={`text-[10px] font-mono px-2 py-0.2 rounded-full ${
                      item.alert
                        ? 'bg-red-500 text-white animate-pulse font-bold'
                        : isActive
                          ? 'bg-blue-700/60 text-blue-100'
                          : isBlocked
                            ? 'bg-red-950/60 text-red-300 border border-red-900/60'
                            : 'bg-blue-950/80 text-blue-300 border border-blue-900/60'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-blue-900/30 space-y-2">
          {!sidebarCollapsed && (
            <div className="space-y-2">
              {/* 14-Day Evaluation Countdown Gauge */}
              {trialStatus.isTrial && (
                <div className={`p-2.5 rounded-xl border font-mono text-[11px] space-y-1.5 ${
                  trialStatus.isExpired 
                    ? 'bg-red-950/50 border-red-500/40 text-red-300' 
                    : 'bg-[#06080d] border-amber-500/30 text-amber-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400">
                      {trialStatus.isExpired ? 'Trial Expired' : '14-Day Trial'}
                    </span>
                    <span className={`font-bold ${trialStatus.isExpired ? 'text-red-400' : 'text-amber-400'}`}>
                      {trialStatus.isExpired ? '0d Left' : `${trialStatus.remainingDays}d Left`}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${trialStatus.isExpired ? 'bg-red-500 w-full' : 'bg-amber-400'}`}
                      style={{ width: `${trialStatus.percentRemaining}%` }}
                    />
                  </div>
                  <button
                    onClick={() => handleUpgrade('professional')}
                    className={`w-full mt-1 py-1 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1 ${
                      trialStatus.isExpired 
                        ? 'bg-red-600 hover:bg-red-500 text-white shadow-glow-sm' 
                        : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    <span>{trialStatus.isExpired ? 'Upgrade to Unlock' : 'Upgrade Plan'}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Operator Info */}
              <div className="p-2.5 rounded-xl bg-[#06080d] border border-blue-900/40 space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">OPERATOR:</span>
                  <span className="text-white truncate max-w-[120px] font-bold">
                    {user?.username || user?.email?.split('@')[0] || 'Reliability Lead'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-500">SESSION:</span>
                  <span className="text-emerald-400 font-bold">{token ? 'Sanctum Live' : 'Demo Mode'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Return & Logout Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={onBackToHome}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#06080d] hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-mono border border-slate-800 transition-colors"
              title="Return to Public Site"
            >
              {!sidebarCollapsed ? <span>Portal</span> : <span>←</span>}
            </button>
            {user && (
              <button
                onClick={logout}
                className="p-2 rounded-xl bg-[#06080d] hover:bg-red-950/50 text-slate-400 hover:text-red-400 border border-slate-800 hover:border-red-900/50 transition-colors"
                title="Log Out Session"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MAIN DASHBOARD CONTENT AREA (Fixed height with scrolling panel)        */}
      {/* ========================================================================= */}
      <div className="flex-1 h-full flex flex-col min-w-0 overflow-hidden">
        
        {/* Streamlined & Decluttered Top Control Bar */}
        <DashboardTopBar
          selectedFacility={selectedFacility}
          selectedAsset={selectedAsset}
          activeTab={activeTab}
          trialStatus={trialStatus}
          planCapabilities={planCapabilities}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          timeRange={timeRange}
          handleSelectTimeRange={handleSelectTimeRange}
          handleExportCsv={handleExportCsv}
          handleUpgrade={handleUpgrade}
          setActiveTab={setActiveTab}
        />

        {/* Dynamic Scrolling Viewport */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* TRIAL EXPIRED PAYWALL / COMPONENT ACCESS LOCK */}
          {trialStatus.isExpired && activeTab !== 'plan' ? (
            <DashboardPaywall
              user={user}
              availablePlans={availablePlans}
              handleUpgrade={handleUpgrade}
              setActiveTab={setActiveTab}
              handleToggleTrialSim={handleToggleTrialSim}
            />
          ) : (
            <>
              {activeTab === 'overview' && (
                <DashboardOverview
                  averageHealth={averageHealth}
                  assets={assets}
                  criticalCount={criticalCount}
                  attentionCount={attentionCount}
                  isoThresholdLimit={isoThresholdLimit}
                  setIsoThresholdLimit={setIsoThresholdLimit}
                  filteredAssets={filteredAssets}
                  categoryFilter={categoryFilter}
                  setCategoryFilter={setCategoryFilter}
                  selectedAsset={selectedAsset}
                  setSelectedAsset={setSelectedAsset}
                  handleCopy={handleCopy}
                  handleInspectWithCopilot={handleInspectWithCopilot}
                  hoveredHarmonicIdx={hoveredHarmonicIdx}
                  setHoveredHarmonicIdx={setHoveredHarmonicIdx}
                  handleThermalClick={handleThermalClick}
                  thermalCrosshair={thermalCrosshair}
                />
              )}

              {activeTab === 'sensors' && (
                <DashboardSensors
                  filteredAssets={filteredAssets}
                  severityFilter={severityFilter}
                  setSeverityFilter={setSeverityFilter}
                  planCapabilities={planCapabilities}
                  isoThresholdLimit={isoThresholdLimit}
                  setSelectedAsset={setSelectedAsset}
                  handleInspectWithCopilot={handleInspectWithCopilot}
                  handleUpgrade={handleUpgrade}
                />
              )}

              {activeTab === 'copilot' && (
                <DashboardCopilot
                  selectedAsset={selectedAsset}
                  setSelectedAsset={setSelectedAsset}
                  assets={assets}
                  chatMessages={chatMessages}
                  setChatMessages={setChatMessages}
                  chatInput={chatInput}
                  setChatInput={setChatInput}
                  isAiLoading={isAiLoading}
                  handleSendAiMessage={handleSendAiMessage}
                  handleCopy={handleCopy}
                  chatEndRef={chatEndRef}
                />
              )}

              {activeTab === 'thermal' && (
                <DashboardThermal assets={assets} />
              )}

              {activeTab === 'orin' && (
                <DashboardOrin />
              )}

              {activeTab === 'fft' && (
                <DashboardFft
                  selectedAsset={selectedAsset}
                  planCapabilities={planCapabilities}
                  isoThresholdLimit={isoThresholdLimit}
                  hoveredHarmonicIdx={hoveredHarmonicIdx}
                  setHoveredHarmonicIdx={setHoveredHarmonicIdx}
                  handleUpgrade={handleUpgrade}
                />
              )}

              {(activeTab === 'incidents' || activeTab === 'alerts' || activeTab === 'alert') && (
                <DashboardIncidents
                  planCapabilities={planCapabilities}
                  handleCopy={handleCopy}
                  setCopyToast={setCopyToast}
                  setUpgradeModal={setUpgradeModal}
                  assets={assets}
                  handleInspectWithCopilot={handleInspectWithCopilot}
                />
              )}

              {activeTab === 'plan' && (
                <DashboardPlan
                  planCapabilities={planCapabilities}
                  trialStatus={trialStatus}
                  handleToggleTrialSim={handleToggleTrialSim}
                  handleUpgrade={handleUpgrade}
                  availablePlans={availablePlans}
                  rawActivePlan={rawActivePlan}
                  token={token}
                  user={user}
                />
              )}
            </>
          )}

        </main>
      </div>

      {/* Interactive Upgrade Modal */}
      <DashboardUpgradeModal
        upgradeModal={upgradeModal}
        setUpgradeModal={setUpgradeModal}
        availablePlans={availablePlans}
        handleUpgrade={handleUpgrade}
      />

    </div>
  );
};
