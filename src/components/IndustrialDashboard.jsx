import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Cpu, Activity, ArrowLeft, Radio, AlertCircle, CheckCircle2, 
  TrendingUp, BarChart2, ShieldCheck, RefreshCw, Zap, Bell, 
  User, LogOut, Bot, Sparkles, Key, Lock, ExternalLink,
  LayoutDashboard, Server, Eye, Thermometer, Layers, Wrench,
  Search, Filter, Download, ChevronRight, Sliders, Volume2,
  Clock, Check, AlertTriangle, Send, Terminal, CornerDownLeft,
  Copy, Crosshair, HelpCircle, ArrowUpRight, X, CreditCard,
  CheckCircle
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

export const IndustrialDashboard = ({ 
  onBackToHome, 
  initialTab = 'overview', 
  initialAssetId = null,
  onSelectPlan 
}) => {
  const { user, token, logout, apiBase } = useAuth();

  // Read URL query params if present for deep linking
  const urlParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const defaultTab = urlParams.get('tab') || initialTab || 'overview';
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
    return Boolean(localStorage.getItem('sensorsae_has_paid') === 'true');
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
    // calculate simulated delta from center (50, 50)
    const dist = Math.sqrt(Math.pow(x - 50, 2) + Math.pow(y - 50, 2));
    const delta = Number((12 - dist * 0.2).toFixed(1));
    setThermalCrosshair({ x, y, tempDelta: delta });
  };

  // --- Embedded Copilot AI Chat State ---
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
    // STRICT VIEWPORT CONTAINER: Locks outer container to exact 100vh window height
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
              { id: 'incidents', label: 'Incident Log & Orders', icon: AlertTriangle, badge: `${criticalCount + attentionCount}`, alert: criticalCount > 0 },
              { 
                id: 'plan', 
                label: 'Subscription & Quotas', 
                icon: ShieldCheck, 
                badge: trialStatus.isExpired ? 'UPGRADE' : planCapabilities.name.split(' ')[0],
                alert: trialStatus.isExpired 
              },
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
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

        {/* Sidebar Footer: User Session, 14-Day Trial Counter & Actions */}
        <div className="p-3 border-t border-blue-900/40 bg-[#06080d]/60 space-y-2 shrink-0">
          {!sidebarCollapsed ? (
            <>
              {/* 14-Day Evaluation Period Status Meter */}
              {trialStatus.isTrial && (
                <div className={`p-2.5 rounded-xl border font-mono text-xs space-y-1.5 ${
                  trialStatus.isExpired 
                    ? 'bg-red-950/40 border-red-500/40 text-red-300' 
                    : 'bg-amber-950/30 border-amber-500/30 text-amber-300'
                }`}>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold uppercase tracking-wider flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{trialStatus.isExpired ? 'Trial Expired' : '14-Day Trial'}</span>
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
                    className={`w-full py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${
                      trialStatus.isExpired 
                        ? 'bg-red-600 hover:bg-red-500 text-white shadow-glow-sm animate-pulse' 
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm'
                    }`}
                  >
                    <span>{trialStatus.isExpired ? 'Upgrade to Unlock' : 'Upgrade Plan'}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              <div 
                onClick={() => setActiveTab('plan')}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-[#0b0f19] border border-slate-800 hover:border-blue-500/50 cursor-pointer transition-all group"
                title="View Subscription & Quotas"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-400 flex items-center justify-center text-blue-300 text-xs shrink-0 group-hover:scale-105 transition-transform">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-white font-bold text-xs truncate">
                    {user?.username || user?.email?.split('@')[0] || 'Operator'}
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400 truncate flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block"></span>
                    <span>{planCapabilities.name}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1.5 pt-1">
                <button
                  onClick={onBackToHome}
                  className="py-1.5 px-2 rounded-lg bg-[#0b0f19] hover:bg-slate-800 text-[11px] text-slate-300 hover:text-white font-mono transition-colors text-center truncate flex items-center justify-center gap-1"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Main Site</span>
                </button>

                <button
                  onClick={logout}
                  className="py-1.5 px-2 rounded-lg bg-red-950/30 hover:bg-red-950/80 border border-red-500/20 text-[11px] text-red-300 font-mono transition-colors text-center truncate flex items-center justify-center gap-1"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={onBackToHome}
              title="Return to Site"
              className="w-full p-2 text-slate-400 hover:text-white flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
        </div>

      </aside>

      {/* ========================================================================= */}
      {/* 2. MAIN DASHBOARD CONTENT AREA (Fixed height with scrolling panel)        */}
      {/* ========================================================================= */}
      <div className="flex-1 h-full flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Control Bar (Shrink-0) */}
        <header className="bg-[#080d17]/90 backdrop-blur-md border-b border-blue-900/40 px-6 py-3 flex flex-col xl:flex-row xl:items-center justify-between gap-3 shrink-0 z-20">
          
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <span>SENSORSAE OS</span>
                <span>/</span>
                <span>{selectedFacility.code}</span>
                <span>/</span>
                <span className="text-blue-400">{selectedAsset.id}</span>
              </div>
              <h1 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>{selectedFacility.name.split('—')[0]}</span>
                <span className="text-blue-500 font-mono text-xs font-normal">•</span>
                <span className="text-blue-400 text-xs uppercase font-mono tracking-wider">
                  {activeTab === 'plan' ? 'Subscription & Quotas' : activeTab}
                </span>
              </h1>
            </div>

            <div className="flex items-center gap-2.5">
              {/* 14-Day Evaluation Status Pill & Upgrade Button */}
              {trialStatus.isTrial && (
                <div className={`flex items-center gap-2 px-3 py-1 rounded-xl border font-mono text-xs shadow-sm transition-all ${
                  trialStatus.isExpired 
                    ? 'bg-red-950/60 border-red-500/50 text-red-300 animate-pulse'
                    : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${trialStatus.isExpired ? 'bg-red-500' : 'bg-amber-400 animate-ping'}`} />
                  <div className="flex flex-col text-left">
                    <span className="text-[8px] uppercase tracking-widest font-bold">
                      {trialStatus.isExpired ? 'TRIAL EXPIRED' : '14-DAY TRIAL'}
                    </span>
                    <span className="font-bold text-white text-[11px]">
                      {trialStatus.isExpired ? (
                        <span className="text-red-400 font-extrabold">0 Days Left</span>
                      ) : (
                        <span>{trialStatus.remainingDays} {trialStatus.remainingDays === 1 ? 'Day' : 'Days'} Left</span>
                      )}
                    </span>
                  </div>
                  <button
                    onClick={() => handleUpgrade('professional')}
                    className={`ml-1 px-2.5 py-1 rounded-lg text-slate-950 font-bold text-[10px] uppercase tracking-wider transition-all shadow-sm flex items-center gap-1 ${
                      trialStatus.isExpired 
                        ? 'bg-red-500 hover:bg-red-400 text-white' 
                        : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500'
                    }`}
                  >
                    <span>Upgrade</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Active License Pill (Clickable -> opens Plan Tab) */}
              <div 
                onClick={() => setActiveTab('plan')}
                className="cursor-pointer group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/40 border border-blue-500/30 hover:border-blue-400 transition-all shadow-sm"
                title="Manage Fleet Quotas & Plan"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col text-left">
                  <span className="text-[8px] font-mono text-slate-400 uppercase tracking-wider">ACTIVE LICENSE</span>
                  <span className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                    <span>{planCapabilities.name}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quota & Telemetry HUD Bar */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Fleet Node Quota Meter */}
            <div 
              onClick={() => setActiveTab('plan')}
              className="cursor-pointer hidden md:flex items-center gap-2 px-3 py-1 rounded-xl bg-[#06080d] border border-slate-800 hover:border-blue-500/40 font-mono text-xs transition-all"
              title="Click to view full quota breakdown"
            >
              <Radio className="w-3 h-3 text-blue-400 shrink-0" />
              <div>
                <div className="flex items-center justify-between gap-2 text-[9px] text-slate-400">
                  <span>FLEET NODES</span>
                  <span className="text-white font-bold">
                    {planCapabilities.activeNodesCount} / {planCapabilities.nodeLimit === Infinity ? '∞' : planCapabilities.nodeLimit}
                  </span>
                </div>
                <div className="w-20 h-1 bg-slate-800 rounded-full overflow-hidden mt-0.5">
                  <div 
                    className={`h-full rounded-full ${
                      planCapabilities.nodeLimit === Infinity 
                        ? 'bg-emerald-400 w-full' 
                        : (planCapabilities.activeNodesCount / planCapabilities.nodeLimit) > 0.85
                          ? 'bg-amber-400'
                          : 'bg-blue-500'
                    }`}
                    style={{
                      width: planCapabilities.nodeLimit === Infinity 
                        ? '100%' 
                        : `${Math.min(100, Math.round((planCapabilities.activeNodesCount / planCapabilities.nodeLimit) * 100))}%`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Polling Speed Indicator */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#06080d] border border-slate-800 font-mono text-xs text-slate-300">
              <Zap className="w-3 h-3 text-amber-400 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-[8px] text-slate-500 uppercase">POLLING RESOLUTION</span>
                <span className="text-white font-bold text-[10px]">{planCapabilities.pollingLabel.split(' ')[0]}</span>
              </div>
            </div>

            {/* Security Architecture Badge */}
            <div className="hidden 2xl:flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#06080d] border border-slate-800 font-mono text-xs text-slate-300">
              <Lock className={`w-3 h-3 shrink-0 ${planCapabilities.airGapped ? 'text-emerald-400' : 'text-blue-400'}`} />
              <div className="flex flex-col text-left">
                <span className="text-[8px] text-slate-500 uppercase">SECURITY</span>
                <span className="text-white font-bold text-[10px]">
                  {planCapabilities.airGapped ? 'Air-Gapped IEC 62443' : 'Industrial TLS 1.3'}
                </span>
              </div>
            </div>

            {/* Live Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search telemetry..."
                className="bg-[#06080d] border border-blue-900/50 rounded-xl px-3 py-1.5 pl-7 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono w-36 sm:w-44"
              />
              <Search className="w-3 h-3 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Time range selector with tier archive retention gating */}
            <div className="bg-[#06080d] border border-blue-900/50 rounded-xl p-0.5 flex text-[10px] font-mono">
              {['Live', '24h', '30d', '1-Year', 'Archive'].map(t => {
                const isLocked = planCapabilities && !planCapabilities.allowedHistoryRanges.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() => handleSelectTimeRange(t)}
                    className={`px-2 py-1 rounded-lg transition-all flex items-center gap-1 ${
                      timeRange === t ? 'bg-blue-600 text-white font-bold shadow-sm' : 
                      isLocked ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-white'
                    }`}
                    title={isLocked ? `${t} retention requires an upgraded license` : undefined}
                  >
                    <span>{t}</span>
                    {isLocked && <Lock className="w-2.5 h-2.5 text-blue-400/70" />}
                  </button>
                );
              })}
            </div>

            {/* Export Telemetry CSV */}
            <button
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0b0f19] hover:bg-slate-800 border border-blue-900/50 text-slate-300 hover:text-white text-xs font-mono transition-colors"
              title="Export full CSV telemetry snapshot"
            >
              <Download className="w-3 h-3 text-blue-400" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </header>

        {/* Dynamic Scrolling Viewport */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* TRIAL EXPIRED PAYWALL / COMPONENT ACCESS LOCK */}
          {trialStatus.isExpired && activeTab !== 'plan' ? (
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
          ) : (
            <>
              {/* ------------------------------------------------------------- */}
              {/* TAB 1: OVERVIEW & PLANT HEALTH                                */}
              {/* ------------------------------------------------------------- */}
              {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Top High-Density Metric Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4.5 rounded-2xl bg-[#080d17] border border-blue-900/40 space-y-1 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />
                  <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                    <span>OVERALL ASSET HEALTH</span>
                    <span className="text-emerald-400">Nominal</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    {averageHealth}%
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">
                    Calculated across {assets.length} edge-monitored assets
                  </div>
                </div>

                <div className="p-4.5 rounded-2xl bg-[#080d17] border border-blue-900/40 space-y-1 relative overflow-hidden">
                  <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                    <span>ACTIVE ANOMALIES</span>
                    <span className={`text-[10px] font-bold ${criticalCount > 0 ? 'text-red-400 animate-pulse' : 'text-blue-400'}`}>
                      {criticalCount > 0 ? 'Action Needed' : 'Monitoring'}
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono flex items-baseline gap-2">
                    <span className={criticalCount > 0 ? 'text-red-400' : 'text-white'}>{criticalCount + attentionCount}</span>
                    <span className="text-xs text-slate-500 font-normal">({criticalCount} Critical, {attentionCount} Warning)</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">
                    Pinpointed 3–6 weeks before thermal breakdown
                  </div>
                </div>

                <div className="p-4.5 rounded-2xl bg-[#080d17] border border-blue-900/40 space-y-1">
                  <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                    <span>NVIDIA ORIN NX COMPUTE</span>
                    <span className="text-cyan-400">275 TOPS</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    3.64 ms
                  </div>
                  <div className="text-[10px] font-mono text-blue-400">
                    51.6% GPU inference load • TensorRT INT8
                  </div>
                </div>

                <div className="p-4.5 rounded-2xl bg-[#080d17] border border-blue-900/40 space-y-1">
                  <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                    <span>ESTIMATED DOWNTIME AVERTED</span>
                    <span className="text-emerald-400 font-bold">Q3 YTD</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                    {CLUSTER_METRICS.preventedDowntimeYtd}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">
                    Calculated via plant downtime financial baseline
                  </div>
                </div>
              </div>

              {/* Interactive ISO 10816 Limit Slider Control Bar */}
              <div className="p-4 rounded-2xl bg-[#080d17] border border-blue-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <Sliders className="w-4 h-4 text-blue-400" />
                    <span>Interactive ISO 10816 Velocity Limit Tester</span>
                    <span className="px-2 py-0.2 rounded bg-blue-950 text-blue-300 text-[10px] border border-blue-800">
                      LIVE THRESHOLD
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">
                    Drag slider to test tighter vibration tolerances. Assets dynamically adapt status between Optimal, Warning, and Critical.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-slate-400 text-xs">Threshold:</span>
                  <input
                    type="range"
                    min="1.0"
                    max="4.0"
                    step="0.1"
                    value={isoThresholdLimit}
                    onChange={(e) => setIsoThresholdLimit(Number(e.target.value))}
                    className="w-32 sm:w-44 accent-blue-500 cursor-pointer"
                  />
                  <span className="px-2.5 py-1 rounded-lg bg-[#06080d] border border-blue-500/40 text-blue-400 font-bold text-xs min-w-[70px] text-center">
                    {isoThresholdLimit.toFixed(2)} mm/s
                  </span>
                </div>
              </div>

              {/* Machinery Digital Twin Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h2 className="text-sm font-extrabold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <span>Machine Digital Twin Readout ({filteredAssets.length} Assets)</span>
                  </h2>

                  <div className="flex items-center gap-1.5 text-xs font-mono flex-wrap">
                    <span className="text-slate-500">Filter:</span>
                    {['All', 'Pumps', 'Motors', 'Gearboxes', 'CNC Spindles', 'Compressors', 'Conveyors'].map(c => (
                      <button
                        key={c}
                        onClick={() => setCategoryFilter(c)}
                        className={`px-2 py-0.5 rounded-md transition-colors ${
                          categoryFilter === c ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredAssets.map(mach => {
                    const isSelected = selectedAsset.id === mach.id;
                    const isCrit = mach.status === 'CRITICAL';
                    const isWarn = mach.status === 'ATTENTION';

                    return (
                      <div
                        key={mach.id}
                        onClick={() => setSelectedAsset(mach)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                          isSelected
                            ? 'bg-[#0f172a] border-blue-400 shadow-glow-sm'
                            : 'bg-[#080d17] border-blue-900/30 hover:border-blue-500/50'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-xs text-blue-400 font-bold">{mach.id}</span>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleCopy(mach.id, mach.name); }}
                                title="Copy Asset ID"
                                className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-500 hover:text-blue-300 transition-opacity"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>

                            <span className={`font-mono text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                              isCrit
                                ? 'bg-red-950 text-red-300 border border-red-500 animate-pulse'
                                : isWarn
                                  ? 'bg-amber-950 text-amber-300 border border-amber-500/50'
                                  : 'bg-blue-950 text-blue-300 border border-blue-800'
                            }`}>
                              {mach.status}
                            </span>
                          </div>

                          <div>
                            <div className="font-bold text-white text-sm truncate">{mach.name}</div>
                            <div className="text-[11px] text-slate-400 truncate">{mach.location}</div>
                          </div>

                          {/* Hover Mini Vibration Wave Sparkline */}
                          <div className="h-6 w-full opacity-30 group-hover:opacity-100 transition-opacity flex items-end justify-between gap-0.5 pt-1">
                            {[18, 35, 60, 42, 85, 30, 65, 90, 45, 55, 75, 40].map((v, sIdx) => (
                              <div
                                key={sIdx}
                                className="w-full rounded-t-sm"
                                style={{
                                  height: `${(v * (mach.vibrationRms / 2.0)) % 100}%`,
                                  backgroundColor: isCrit ? '#ef4444' : isWarn ? '#f59e0b' : '#3b82f6',
                                }}
                              />
                            ))}
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px] font-mono">
                            <div>
                              <span className="text-slate-500 block text-[9px]">VIBRATION</span>
                              <span className={mach.vibrationRms > isoThresholdLimit ? 'text-red-400 font-bold' : 'text-slate-200'}>
                                {mach.vibrationRms} mm/s
                              </span>
                            </div>
                            <div>
                              <span className="text-slate-500 block text-[9px]">TEMPERATURE</span>
                              <span className="text-slate-200">{mach.temperature} °C</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block text-[9px]">HEALTH</span>
                              <span className="text-emerald-400 font-bold">{mach.healthScore}%</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block text-[9px]">RUL EST.</span>
                              <span className="text-blue-300">{mach.rulHours} hrs</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 mt-2 border-t border-slate-900 flex items-center justify-between">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleInspectWithCopilot(mach); }}
                            className="text-[10px] text-blue-400 hover:text-blue-300 font-mono font-bold flex items-center gap-1"
                          >
                            <Bot className="w-3 h-3" />
                            <span>Ask Copilot</span>
                          </button>
                          <span className="text-[9px] font-mono text-slate-500">{mach.lastReportTime}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Focused Asset Deep Dive Card */}
              <div className="rounded-3xl bg-[#080d17] border border-blue-500/40 p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-widest font-bold">
                      <span>FOCUSED TELEMETRY INSPECTOR</span>
                      <span>•</span>
                      <span>{selectedAsset.edgeHubId}</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-white">
                      {selectedAsset.name} ({selectedAsset.id})
                    </h3>
                    <p className="text-xs text-slate-400">
                      {selectedAsset.location} • RPM: {selectedAsset.rpm} • Standard: {selectedAsset.isoStandard}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 font-mono">
                    <button
                      onClick={() => handleInspectWithCopilot(selectedAsset)}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-glow-sm transition-all"
                    >
                      <Bot className="w-3.5 h-3.5" />
                      <span>Diagnose in AI Copilot</span>
                    </button>
                  </div>
                </div>

                {/* 3-Column Diagnostic Inspector */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Col 1: Primary Fault Diagnosis */}
                  <div className="p-4.5 rounded-2xl bg-[#06080d] border border-blue-900/40 space-y-3 font-mono text-xs">
                    <div className="text-[11px] text-blue-400 font-bold uppercase tracking-wider flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>Root Cause Classification</span>
                      </div>
                      <button
                        onClick={() => handleCopy(selectedAsset.primaryFault, 'Diagnosis')}
                        className="text-slate-500 hover:text-white"
                        title="Copy Diagnosis"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-slate-200 text-xs font-sans leading-relaxed">
                      {selectedAsset.primaryFault}
                    </div>
                    <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/20 text-[11px] text-blue-300 font-sans">
                      <strong>Prescribed Maintenance:</strong> {selectedAsset.recommendedAction}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Monitoring Pods: {selectedAsset.podIds.join(', ')}
                    </div>
                  </div>

                  {/* Col 2: FFT Harmonic Spectrum Peaks */}
                  <div className="p-4.5 rounded-2xl bg-[#06080d] border border-blue-900/40 space-y-3 font-mono text-xs">
                    <div className="text-[11px] text-blue-400 font-bold uppercase tracking-wider flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      <span>192 kHz FFT Spectral Harmonics</span>
                    </div>
                    <div className="space-y-2">
                      {selectedAsset.fftSpectrum.map((pk, idx) => (
                        <div 
                          key={idx} 
                          onMouseEnter={() => setHoveredHarmonicIdx(idx)}
                          onMouseLeave={() => setHoveredHarmonicIdx(null)}
                          className={`flex items-center justify-between text-xs p-1.5 rounded-lg transition-colors cursor-pointer ${
                            hoveredHarmonicIdx === idx ? 'bg-blue-950/80 border border-blue-500/40' : 'hover:bg-slate-900'
                          }`}
                        >
                          <span className="text-slate-400">{pk.freq}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-bold">{pk.amp} mm/s</span>
                            <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                              pk.status === 'Optimal' || pk.status === 'Normal'
                                ? 'bg-blue-950 text-blue-300'
                                : 'bg-red-950 text-red-300'
                            }`}>
                              {pk.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Col 3: Interactive Thermal Vision Spot-Picker */}
                  <div className="p-4.5 rounded-2xl bg-[#06080d] border border-blue-900/40 space-y-3 font-mono text-xs">
                    <div className="text-[11px] text-cyan-400 font-bold uppercase tracking-wider flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span>Thermal Vision Guard (LWIR)</span>
                      </div>
                      <span className="text-[9px] text-slate-500">Click to Sample</span>
                    </div>

                    {/* Interactive Clickable Thermal Canvas */}
                    <div 
                      onClick={handleThermalClick}
                      className="h-28 rounded-xl bg-gradient-to-tr from-blue-950 via-purple-900 to-amber-600 relative cursor-crosshair overflow-hidden border border-white/10"
                      title="Click anywhere to inspect localized thermal gradient"
                    >
                      {/* Crosshair Target */}
                      <div 
                        className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-150 flex items-center justify-center"
                        style={{ left: `${thermalCrosshair.x}%`, top: `${thermalCrosshair.y}%` }}
                      >
                        <Crosshair className="w-5 h-5 text-white drop-shadow-md animate-pulse" />
                      </div>
                      <div className="absolute bottom-1 right-2 text-[9px] bg-black/50 px-1.5 py-0.5 rounded text-white/80">
                        Spot Temp: {(selectedAsset.temperature + thermalCrosshair.tempDelta).toFixed(1)}°C
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-slate-400">Baseline Delta-T:</span>
                      <span className={selectedAsset.thermalDeltaT > 15 ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                        +{selectedAsset.thermalDeltaT} °C
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          selectedAsset.thermalDeltaT > 15 ? 'bg-red-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${Math.min(100, (selectedAsset.thermalDeltaT / 30) * 100)}%` }}
                      />
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 2: EDGE-X1 SENSOR MESH (DENSE DATA TABLE)                */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'sensors' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-extrabold text-white">Edge-X1 Sensor Mesh Telemetry</h2>
                  <p className="text-xs text-slate-400 font-mono">
                    High-density data streaming across 48 physical sensor nodes and triaxial accelerometers.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-slate-400">Severity:</span>
                  {['All', 'OPTIMAL', 'ATTENTION', 'CRITICAL'].map(s => (
                    <button
                      key={s}
                      onClick={() => setSeverityFilter(s)}
                      className={`px-2.5 py-1 rounded-lg transition-colors ${
                        severityFilter === s ? 'bg-blue-600 text-white font-bold' : 'bg-[#080d17] text-slate-400 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Plan Quota Status Banner */}
              <div className="p-3.5 rounded-2xl bg-[#080d17] border border-blue-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-950 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                    <Radio className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-white font-bold text-xs block">
                      Licensed Fleet: {planCapabilities.activeNodesCount} / {planCapabilities.nodeLimit === Infinity ? 'Unlimited' : planCapabilities.nodeLimit} Physical Sensor Nodes Active
                    </span>
                    <p className="text-slate-400 text-[11px] font-sans">
                      {planCapabilities.name} Tier • {planCapabilities.pollingLabel} • {planCapabilities.historyDays === Infinity ? 'Unlimited Cold Storage' : `${planCapabilities.historyDays}-Day Telemetry Retention`}
                    </p>
                  </div>
                </div>

                {planCapabilities.nodeLimit !== Infinity && (
                  <button
                    onClick={() => handleUpgrade('enterprise-mesh')}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-950/60 hover:bg-blue-900 border border-blue-500/40 text-blue-300 hover:text-white font-mono text-xs transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <span>Expand Fleet Limit</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <div className="rounded-2xl bg-[#080d17] border border-blue-900/40 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead className="bg-[#06080d] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4">Asset ID &amp; Name</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Health</th>
                        <th className="py-3 px-4">Vibe (RMS)</th>
                        <th className="py-3 px-4">Acc (g)</th>
                        <th className="py-3 px-4">Temp (°C)</th>
                        <th className="py-3 px-4">RUL</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {filteredAssets.map((mach) => (
                        <tr 
                          key={mach.id}
                          className="hover:bg-blue-950/30 transition-colors cursor-pointer"
                          onClick={() => setSelectedAsset(mach)}
                        >
                          <td className="py-3 px-4 font-bold text-white">
                            <div className="flex items-center gap-2">
                              <span className="text-blue-400 font-mono">{mach.id}</span>
                              <span className="font-sans font-medium text-slate-200">{mach.name}</span>
                            </div>
                            <div className="text-[10px] text-slate-500 font-normal">{mach.location}</div>
                          </td>
                          <td className="py-3 px-4 text-slate-300">{mach.category}</td>
                          <td className="py-3 px-4">
                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                              mach.status === 'CRITICAL' 
                                ? 'bg-red-950 text-red-400 border border-red-500' 
                                : mach.status === 'ATTENTION'
                                  ? 'bg-amber-950 text-amber-300 border border-amber-500/50'
                                  : 'bg-blue-950 text-blue-300 border border-blue-800'
                            }`}>
                              {mach.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-emerald-400 font-bold">{mach.healthScore}%</td>
                          <td className="py-3 px-4">
                            <span className={mach.vibrationRms > isoThresholdLimit ? 'text-red-400 font-bold' : 'text-slate-200'}>
                              {mach.vibrationRms}
                            </span>
                            <span className="text-slate-500 text-[10px]"> / {isoThresholdLimit}</span>
                          </td>
                          <td className="py-3 px-4 text-slate-300">{mach.peakAcceleration} g</td>
                          <td className="py-3 px-4 text-slate-300">{mach.temperature} °C</td>
                          <td className="py-3 px-4 text-blue-300">{mach.rulHours} hrs</td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleInspectWithCopilot(mach); }}
                              className="px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white text-[10px] font-bold transition-all"
                            >
                              Copilot
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 3: DEDICATED IN-DASHBOARD AI COPILOT                      */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'copilot' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Equipment Context Card (Spans 4 cols) */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-5 rounded-3xl bg-[#080d17] border border-blue-900/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-blue-400 uppercase font-bold tracking-widest">
                      INJECTED SENSOR CONTEXT
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white">{selectedAsset.name}</div>
                    <div className="font-mono text-xs text-slate-400">{selectedAsset.id} • {selectedAsset.location}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#06080d] border border-slate-800 space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-500">RMS Velocity:</span>
                      <span className="text-slate-200">{selectedAsset.vibrationRms} mm/s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">ISO Standard:</span>
                      <span className="text-slate-300 truncate max-w-[150px]">{selectedAsset.isoStandard}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Ultrasonic Acoustic:</span>
                      <span className="text-slate-200">{selectedAsset.ultrasonicAcoustic} dB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Enclosure Temp:</span>
                      <span className="text-slate-200">{selectedAsset.temperature} °C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">RUL Prognosis:</span>
                      <span className="text-blue-400 font-bold">{selectedAsset.rulHours} Operating Hours</span>
                    </div>
                  </div>

                  {/* Switch Asset Selector */}
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Change Target Equipment:
                    </label>
                    <select
                      value={selectedAsset.id}
                      onChange={(e) => setSelectedAsset(assets.find(a => a.id === e.target.value) || assets[0])}
                      className="w-full bg-[#06080d] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                    >
                      {assets.map(a => (
                        <option key={a.id} value={a.id}>{a.id} — {a.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Suggested Diagnostic Prompts */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
                      Quick Engineering Queries:
                    </span>
                    {[
                      `Diagnose root cause for ${selectedAsset.id}`,
                      `Is ${selectedAsset.vibrationRms} mm/s within ISO 10816 limit?`,
                      `Draft shift handover work order for maintenance`,
                      `Explain bearing frequencies (BPFO vs BPFI)`
                    ].map((promptText, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => handleSendAiMessage(promptText)}
                        disabled={isAiLoading}
                        className="w-full text-left p-2 rounded-xl bg-[#06080d] hover:bg-blue-950/50 border border-slate-800 text-[11px] text-slate-300 hover:text-white transition-colors"
                      >
                        → {promptText}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Live Chat Workspace (Spans 8 cols) */}
              <div className="lg:col-span-8 rounded-3xl bg-[#080d17] border border-blue-500/30 flex flex-col h-[650px] overflow-hidden">
                
                {/* Chat Top Banner */}
                <div className="p-4 bg-[#06080d] border-b border-blue-900/40 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-950 border border-blue-500/40 text-blue-400 flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs sm:text-sm flex items-center gap-2">
                        <span>SENSORSAE Copilot Studio</span>
                        <span className="px-1.5 py-0.2 rounded bg-blue-950 text-blue-400 font-mono text-[9px] border border-blue-800">
                          ON-PREMISES / CLOUD GATEWAY
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        POST dash.sensorsae.net/api/ai/generate (Default Gorq/OpenAI Model)
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setChatMessages([chatMessages[0]])}
                    className="text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Clear History
                  </button>
                </div>

                {/* Conversation Stream */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 font-sans text-xs">
                  {chatMessages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="w-7 h-7 rounded-xl bg-blue-950 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] rounded-2xl p-4 leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-blue-600 text-white shadow-glow-sm rounded-tr-none font-medium'
                            : 'bg-[#06080d] border border-blue-900/40 text-slate-200 rounded-tl-none font-normal'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                        <div className="flex items-center justify-between pt-2 mt-2 border-t border-white/10 text-[9px] font-mono text-slate-500">
                          <button
                            onClick={() => handleCopy(msg.content, 'Message')}
                            className="hover:text-blue-300 transition-colors flex items-center gap-1"
                          >
                            <Copy className="w-2.5 h-2.5" />
                            <span>Copy text</span>
                          </button>
                          <span>{msg.timestamp}</span>
                        </div>
                      </div>

                      {msg.role === 'user' && (
                        <div className="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}

                  {isAiLoading && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-[#06080d] border border-blue-900/40 text-blue-300 text-xs font-mono w-fit">
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                      <span>Inferencing FFT vibration harmonics...</span>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Chat Input */}
                <div className="p-4 bg-[#06080d] border-t border-blue-900/40">
                  <div className="flex items-center gap-2 bg-[#080d17] border border-slate-800 rounded-2xl p-2 focus-within:border-blue-500 transition-all">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleSendAiMessage(); }}
                      placeholder={`Query telemetry on ${selectedAsset.id} or ask plant maintenance procedures...`}
                      className="w-full bg-transparent px-3 py-1.5 text-xs text-white placeholder:text-slate-600 focus:outline-none"
                    />
                    <button
                      onClick={() => handleSendAiMessage()}
                      disabled={isAiLoading || !chatInput.trim()}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold text-xs transition-all flex items-center gap-1.5 shrink-0"
                    >
                      <span>Send</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 4: THERMAL VISION GUARD                                   */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'thermal' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-extrabold text-white">Thermal Vision Guard (Radiometric LWIR)</h2>
                  <p className="text-xs text-slate-400 font-mono">
                    Continuous non-contact infrared thermal imaging calibrated from -40°C to +1,200°C.
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono text-xs">
                  METROPOLIS™ DEEPSTREAM POE
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {assets.map(item => (
                  <div key={item.id} className="rounded-3xl bg-[#080d17] border border-blue-900/40 overflow-hidden">
                    {/* Simulated Thermal Heatmap Canvas */}
                    <div className="h-44 bg-gradient-to-tr from-blue-950 via-purple-900 to-amber-600 relative p-4 flex flex-col justify-between">
                      <div className="flex justify-between items-center text-[10px] font-mono text-white/90 bg-black/40 backdrop-blur px-2 py-1 rounded-lg w-fit">
                        <span>{item.id} • {item.thermalGuardZone}</span>
                      </div>

                      {/* Hotspot Target Crosshair */}
                      <div className="self-center flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full border-2 border-red-400/80 border-dashed animate-spin flex items-center justify-center">
                          <span className="w-2 h-2 rounded-full bg-red-400"></span>
                        </div>
                        <span className="font-mono text-xs font-bold text-white drop-shadow-md mt-1">
                          MAX: {item.temperature}°C (+{item.thermalDeltaT}°C Δ)
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-[9px] font-mono text-white/80 bg-black/40 backdrop-blur px-2 py-0.5 rounded">
                        <span>IR Range: 7.5 - 14 µm</span>
                        <span className={item.thermalDeltaT > 15 ? 'text-red-300 font-bold' : 'text-emerald-300'}>
                          {item.thermalDeltaT > 15 ? 'HOTSPOT ALARM' : 'NOMINAL GRADIENT'}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="font-bold text-white text-sm">{item.name}</div>
                      <div className="text-xs text-slate-400">{item.location}</div>
                      <div className="flex justify-between text-xs font-mono pt-2 border-t border-slate-800">
                        <span className="text-slate-500">Optical Emissivity:</span>
                        <span className="text-slate-200">ε = 0.95 (Machined Steel)</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 5: NVIDIA ORIN ENGINE CLUSTER                             */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'orin' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-base font-extrabold text-white">Nvidia Jetson Orin™ Industrial Acceleration Stack</h2>
                  <p className="text-xs text-slate-400 font-mono">
                    275 TOPS local neural compute engine inside the Edge-X1 hardware cluster.
                  </p>
                </div>

                <div className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-mono text-xs">
                  AIR-GAP AIRTIGHT: 0 EGRESS
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl bg-[#080d17] border border-blue-900/40 space-y-4">
                  <div className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">
                    TensorRT-LLM Ingestion
                  </div>
                  <div className="text-3xl font-extrabold text-white font-mono">3.64 ms</div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Sub-millisecond sliding-window FFT transforms computed across 48 concurrent accelerometer streams without CPU bottlenecking.
                  </p>
                  <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-500">
                    Model: INT8 TensorRT AWQ 14B
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-[#080d17] border border-blue-900/40 space-y-4">
                  <div className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">
                    RAPIDS cuDF GPU Streaming
                  </div>
                  <div className="text-3xl font-extrabold text-cyan-400 font-mono">184.2k /s</div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    GPU-accelerated dataframe pipelines aggregating rolling kurtosis, skewness, and crest factor time-series metrics.
                  </p>
                  <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-500">
                    NVMe Buffer: 1.8 TB Ring Cache
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-[#080d17] border border-blue-900/40 space-y-4">
                  <div className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">
                    Triton Multi-Model Server
                  </div>
                  <div className="text-3xl font-extrabold text-white font-mono">100% NOMINAL</div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Zero dropped packets across 14 consecutive weeks of continuous uninterrupted factory floor runtime.
                  </p>
                  <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-500">
                    SIL-3 Rated Hardware Watchdog
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 6: SPECTRAL FFT & DSP                                      */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'fft' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-extrabold text-white">192 kHz Acoustic &amp; Triaxial FFT DSP Studio</h2>
                <p className="text-xs text-slate-400 font-mono">
                  Spectral harmonic decomposition, PeakVue stress waves, and ISO 10816 velocity band validation.
                </p>
              </div>

              {/* Visualizer Card */}
              <div className="p-6 rounded-3xl bg-[#080d17] border border-blue-500/40 space-y-6">
                <div className="flex items-center justify-between font-mono text-xs">
                  <div>
                    <span className="text-slate-400">Target Asset:</span>{' '}
                    <strong className="text-white">{selectedAsset.name} [{selectedAsset.id}]</strong>
                  </div>
                  <div className="text-blue-400 font-bold">
                    Nyquist Bandwidth: 96,000 Hz
                  </div>
                </div>

                {/* Animated Graphic Spectrum Waterfall Bars with Hover Harmonic Feedback & Tier Gating */}
                <div className="relative">
                  <div className={`h-44 p-4 rounded-2xl bg-[#06080d] border border-blue-900/40 flex items-end justify-between gap-1 transition-all ${
                    !planCapabilities.fftEnabled ? 'filter blur-sm opacity-25 select-none pointer-events-none' : ''
                  }`}>
                    {[12, 28, 42, 65, 88, 54, 38, 22, 45, 95, 110, 48, 30, 68, 72, 85, 34, 45, 60, 28, 55, 78, 92, 40, 25, 48, 70, 85, 38, 52, 64, 98, 45, 30].map((val, idx) => {
                      const isHarmonicMatch = (hoveredHarmonicIdx === 0 && (idx === 3 || idx === 4)) ||
                                              (hoveredHarmonicIdx === 1 && (idx === 7 || idx === 8)) ||
                                              (hoveredHarmonicIdx === 2 && (idx === 10 || idx === 11)) ||
                                              (hoveredHarmonicIdx === 3 && (idx === 30 || idx === 31));

                      return (
                        <div 
                          key={idx}
                          className="w-full rounded-t-sm transition-all duration-300"
                          style={{
                            height: `${(val * (selectedAsset.vibrationRms > isoThresholdLimit ? 1.25 : 0.7)) % 90 + 10}%`,
                            backgroundColor: isHarmonicMatch ? '#38bdf8' : (idx === 10 || idx === 31) && selectedAsset.vibrationRms > isoThresholdLimit ? '#ef4444' : '#3b82f6',
                            boxShadow: isHarmonicMatch ? '0 0 14px #38bdf8' : (idx === 10 || idx === 31) && selectedAsset.vibrationRms > isoThresholdLimit ? '0 0 10px #ef4444' : 'none'
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* Tier Upsell Overlay for Starter Tier */}
                  {!planCapabilities.fftEnabled && (
                    <div className="absolute inset-0 bg-[#06080d]/85 backdrop-blur-sm rounded-2xl border border-blue-500/30 flex flex-col items-center justify-center p-6 text-center space-y-3 z-10">
                      <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center">
                        <Lock className="w-5 h-5" />
                      </div>
                      <div className="space-y-1 max-w-md">
                        <h4 className="text-white font-bold text-sm">192 kHz Sub-Second FFT Spectral Decomposition Locked</h4>
                        <p className="text-slate-400 text-xs font-sans">
                          Sub-second high-frequency FFT transforms, acoustic envelope demodulation, and bearing fault frequency tracking (BPFO, BPFI) are features of the <strong>Professional</strong> and <strong>Enterprise Mesh</strong> plans.
                        </p>
                      </div>
                      <button
                        onClick={() => handleUpgrade('professional')}
                        className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow-sm transition-all flex items-center gap-1.5"
                      >
                        <span>Upgrade to Professional ($119/mo)</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono text-xs">
                  {[
                    { label: "1X RUNNING SPEED", value: `${(selectedAsset.rpm / 60).toFixed(1)} Hz` },
                    { label: "2X LINE HARMONIC", value: `${((selectedAsset.rpm / 60) * 2).toFixed(1)} Hz` },
                    { label: "BEARING BPFO DEFECT", value: "1,240 Hz", alert: true },
                    { label: "ULTRASONIC CAVITATION", value: "38 kHz Peak", alert: true },
                  ].map((hItem, hIdx) => (
                    <div 
                      key={hIdx}
                      onMouseEnter={() => setHoveredHarmonicIdx(hIdx)}
                      onMouseLeave={() => setHoveredHarmonicIdx(null)}
                      className={`p-3 rounded-xl bg-[#06080d] border transition-all cursor-pointer ${
                        hoveredHarmonicIdx === hIdx ? 'border-blue-400 bg-blue-950/40 shadow-glow-sm' : 'border-slate-800'
                      }`}
                    >
                      <div className="text-slate-500 text-[10px]">{hItem.label}</div>
                      <div className={`font-bold mt-1 ${hItem.alert ? 'text-blue-400' : 'text-white'}`}>{hItem.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 7: INCIDENT LOGS & WORK ORDERS                            */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'incidents' && (
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
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 8: SUBSCRIPTION & FLEET QUOTAS (PLAN TAB)                 */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'plan' && (
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
          )}
          </>
        )}

        </main>
      </div>

      {/* Interactive Upgrade Modal */}
      {upgradeModal.isOpen && (
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
            {(() => {
              const targetPlan = availablePlans.find(p => (p.slug || '').toLowerCase().includes(upgradeModal.targetPlanSlug.toLowerCase())) || availablePlans[1];
              return (
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
              );
            })()}

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
      )}

    </div>
  );
};
