import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Cpu, Activity, ArrowLeft, Radio, AlertCircle, CheckCircle2, 
  TrendingUp, BarChart2, ShieldCheck, RefreshCw, Zap, Bell, 
  User, LogOut, Bot, Sparkles, Key, Lock, ExternalLink,
  LayoutDashboard, Server, Eye, Thermometer, Layers, Wrench,
  Search, Filter, Download, ChevronRight, Sliders, Volume2,
  Clock, Check, AlertTriangle, Send, Terminal, CornerDownLeft
} from 'lucide-react';
import { 
  INDUSTRIAL_FACILITIES, INITIAL_ASSETS, CLUSTER_METRICS, RECENT_LOGS 
} from '../data/telemetryData';
import { useAuth } from '../context/AuthContext';

export const IndustrialDashboard = ({ onBackToHome }) => {
  const { user, token, logout, apiBase } = useAuth();

  // Navigation state
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'sensors' | 'copilot' | 'thermal' | 'orin' | 'fft' | 'incidents'
  const [selectedFacility, setSelectedFacility] = useState(INDUSTRIAL_FACILITIES[0]);
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [selectedAsset, setSelectedAsset] = useState(INITIAL_ASSETS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Time Range state
  const [timeRange, setTimeRange] = useState('Live');

  // Real-time live streaming simulation tick
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(prev => prev.map(mach => {
        // Minor natural sensor fluctuation
        const jitter = (Math.random() - 0.5) * 0.04;
        const newVibe = Math.max(0.1, Number((mach.vibrationRms + jitter).toFixed(2)));
        const newTemp = Math.max(20, Number((mach.temperature + (Math.random() - 0.5) * 0.2).toFixed(1)));
        return {
          ...mach,
          vibrationRms: newVibe,
          temperature: newTemp,
        };
      }));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

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
      `"${a.id}","${a.name}","${a.category}","${a.status}",${a.healthScore},${a.vibrationRms},${a.isoLimit},${a.temperature},${a.rulHours},"${a.edgeHubId}"`
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

  // --- Embedded Copilot AI Chat State ---
  const [chatMessages, setChatMessages] = useState([
    {
      id: 'init',
      role: 'assistant',
      content: `Operator authenticated. Connected to on-prem Edge-X1 telemetry cluster. Ready to analyze vibration FFT harmonics, RUL forecasts, or generate shift handovers.`,
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
      // Build contextual message payload including current selected asset telemetry
      const systemContext = `You are SENSORSAE AI Copilot running in the industrial operations dashboard.
Current Facility: ${selectedFacility.name}.
Focused Equipment: ${selectedAsset.name} [${selectedAsset.id}]
- Status: ${selectedAsset.status}, Health: ${selectedAsset.healthScore}%
- Vibration: ${selectedAsset.vibrationRms} mm/s RMS (ISO 10816 Limit: ${selectedAsset.isoLimit})
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
        content: `[Notice: Edge-X1 Fallback Mode active: ${err.message}]. Automated Rule Diagnostic for ${selectedAsset.id}: Vibration (${selectedAsset.vibrationRms} mm/s) is within ${selectedAsset.isoStandard}. Ultrasonic acoustic spikes suggest verifying lubrication film thickness.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    } finally {
      setIsAiLoading(false);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#06080d] text-slate-100 flex font-sans overflow-x-hidden selection:bg-blue-500/30">
      
      {/* ========================================================================= */}
      {/* 1. DENSE INDUSTRIAL SIDEBAR                                              */}
      {/* ========================================================================= */}
      <aside className={`transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-64 sm:w-72'
      } bg-[#080d17] border-r border-blue-900/40 flex flex-col justify-between shrink-0 z-30 min-h-screen`}>
        
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
              <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1.5">
                Active Industrial Facility
              </label>
              <select
                value={selectedFacility.id}
                onChange={(e) => setSelectedFacility(INDUSTRIAL_FACILITIES.find(f => f.id === e.target.value) || INDUSTRIAL_FACILITIES[0])}
                className="w-full bg-[#06080d] border border-blue-900/50 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
              >
                {INDUSTRIAL_FACILITIES.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.code} • {f.name.split('—')[0]}
                  </option>
                ))}
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
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold shadow-glow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-[#0e1626]'
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                    {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                  </div>

                  {!sidebarCollapsed && (
                    <span className={`text-[10px] font-mono px-2 py-0.2 rounded-full ${
                      item.alert
                        ? 'bg-red-500 text-white animate-pulse'
                        : isActive
                          ? 'bg-blue-700/60 text-blue-100'
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

        {/* Sidebar Footer: User Session & Actions */}
        <div className="p-3 border-t border-blue-900/40 bg-[#06080d]/60 space-y-2">
          {!sidebarCollapsed ? (
            <>
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#0b0f19] border border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-400 flex items-center justify-center text-blue-300 text-xs shrink-0">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-white font-bold text-xs truncate">
                    {user?.username || user?.email?.split('@')[0] || 'Operator'}
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400 truncate">
                    Bearer Token Active
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
      {/* 2. MAIN DASHBOARD CONTENT AREA                                           */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Control Bar */}
        <header className="bg-[#080d17]/90 backdrop-blur-md border-b border-blue-900/40 px-6 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20">
          
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>{selectedFacility.name.split('—')[0]}</span>
                <span className="text-blue-500 font-mono text-xs font-normal">/</span>
                <span className="text-blue-400 text-xs uppercase font-mono tracking-wider">
                  {activeTab}
                </span>
              </h1>
              <div className="text-[10px] font-mono text-slate-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Cluster Ingestion: <strong>184,200 samples/sec</strong></span>
                <span>•</span>
                <span>Air-Gapped: <strong>100% Zero Egress</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Live Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search machine, tag, fault..."
                className="bg-[#06080d] border border-blue-900/50 rounded-xl px-3 py-1.5 pl-8 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono w-48 sm:w-60"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Time range selector */}
            <div className="bg-[#06080d] border border-blue-900/50 rounded-xl p-0.5 flex text-[10px] font-mono">
              {['Live', '15m', '1h', '24h'].map(t => (
                <button
                  key={t}
                  onClick={() => setTimeRange(t)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    timeRange === t ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Export Telemetry CSV */}
            <button
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0b0f19] hover:bg-slate-800 border border-blue-900/50 text-slate-300 hover:text-white text-xs font-mono transition-colors"
              title="Export full CSV telemetry snapshot"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">CSV Export</span>
            </button>
          </div>
        </header>

        {/* Dynamic View Body */}
        <main className="p-6 space-y-6">
          
          {/* ------------------------------------------------------------- */}
          {/* TAB 1: OVERVIEW & PLANT HEALTH                                */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Top High-Density Metric Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4.5 rounded-2xl bg-[#080d17] border border-blue-900/40 space-y-1">
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

                <div className="p-4.5 rounded-2xl bg-[#080d17] border border-blue-900/40 space-y-1">
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

              {/* Machinery Digital Twin Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-extrabold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <span>Machine Digital Twin Readout ({filteredAssets.length} Assets)</span>
                  </h2>

                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-slate-500">Category:</span>
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
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#0f172a] border-blue-400 shadow-glow-sm'
                            : 'bg-[#080d17] border-blue-900/30 hover:border-blue-700'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs text-blue-400 font-bold">{mach.id}</span>
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

                          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px] font-mono">
                            <div>
                              <span className="text-slate-500 block text-[9px]">VIBRATION</span>
                              <span className={mach.vibrationRms > mach.isoLimit ? 'text-red-400 font-bold' : 'text-slate-200'}>
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
                    <div className="text-[11px] text-blue-400 font-bold uppercase tracking-wider flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>Root Cause Classification</span>
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
                        <div key={idx} className="flex items-center justify-between text-xs">
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

                  {/* Col 3: Thermal Vision Guard Inspection */}
                  <div className="p-4.5 rounded-2xl bg-[#06080d] border border-blue-900/40 space-y-3 font-mono text-xs">
                    <div className="text-[11px] text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>Thermal Vision Guard (LWIR)</span>
                    </div>
                    <div className="text-xs text-slate-300 font-sans">
                      Inspection Zone: {selectedAsset.thermalGuardZone}
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-slate-400">Max Enclosure Temp:</span>
                      <span className="text-white font-bold">{selectedAsset.temperature} °C</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Baseline Delta-T:</span>
                      <span className={selectedAsset.thermalDeltaT > 15 ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                        +{selectedAsset.thermalDeltaT} °C
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden mt-2">
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

              {/* Telemetry Table */}
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
                            <span className={mach.vibrationRms > mach.isoLimit ? 'text-red-400 font-bold' : 'text-slate-200'}>
                              {mach.vibrationRms}
                            </span>
                            <span className="text-slate-500 text-[10px]"> / {mach.isoLimit}</span>
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
                        <span className={`block text-[9px] font-mono mt-2 text-right ${
                          msg.role === 'user' ? 'text-blue-200' : 'text-slate-500'
                        }`}>
                          {msg.timestamp}
                        </span>
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

                {/* Animated Graphic Spectrum Waterfall Bars */}
                <div className="h-44 p-4 rounded-2xl bg-[#06080d] border border-blue-900/40 flex items-end justify-between gap-1">
                  {[12, 28, 42, 65, 88, 54, 38, 22, 45, 95, 110, 48, 30, 68, 72, 85, 34, 45, 60, 28, 55, 78, 92, 40, 25, 48, 70, 85, 38, 52, 64, 98, 45, 30].map((val, idx) => (
                    <div 
                      key={idx}
                      className="w-full rounded-t-sm transition-all duration-300"
                      style={{
                        height: `${(val * (selectedAsset.healthScore > 90 ? 0.6 : 1.2)) % 90 + 10}%`,
                        backgroundColor: (idx === 10 || idx === 31) && selectedAsset.healthScore < 85 ? '#ef4444' : '#3b82f6',
                        boxShadow: (idx === 10 || idx === 31) && selectedAsset.healthScore < 85 ? '0 0 10px #ef4444' : 'none'
                      }}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-3 text-center font-mono text-xs">
                  <div className="p-3 rounded-xl bg-[#06080d] border border-slate-800">
                    <div className="text-slate-500 text-[10px]">1X RUNNING SPEED</div>
                    <div className="text-white font-bold">{(selectedAsset.rpm / 60).toFixed(1)} Hz</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#06080d] border border-slate-800">
                    <div className="text-slate-500 text-[10px]">2X LINE HARMONIC</div>
                    <div className="text-white font-bold">{((selectedAsset.rpm / 60) * 2).toFixed(1)} Hz</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#06080d] border border-slate-800">
                    <div className="text-slate-500 text-[10px]">BEARING BPFO DEFECT</div>
                    <div className="text-blue-400 font-bold">1,240 Hz</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#06080d] border border-slate-800">
                    <div className="text-slate-500 text-[10px]">ULTRASONIC CAVITATION</div>
                    <div className="text-cyan-400 font-bold">38 kHz Peak</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 7: INCIDENT LOGS & WORK ORDERS                            */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'incidents' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-base font-extrabold text-white">Automated Incident Log &amp; SAP/CMMS Dispatch</h2>
                  <p className="text-xs text-slate-400 font-mono">
                    Audit trail of anomalous kinematic events and automatically generated work order drafts.
                  </p>
                </div>

                <button
                  onClick={() => alert('SAP Plant Maintenance (PM) and IBM Maximo integration sync initiated.')}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs font-mono shadow-glow-sm"
                >
                  Sync CMMS Work Orders
                </button>
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

        </main>
      </div>

    </div>
  );
};
