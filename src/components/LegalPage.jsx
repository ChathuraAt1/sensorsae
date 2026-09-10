import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  FileText, 
  Cookie, 
  ArrowLeft, 
  Building2, 
  Globe, 
  Lock, 
  CheckCircle2, 
  AlertTriangle,
  Scale,
  Mail,
  Phone
} from 'lucide-react';

export const LegalPage = ({ initialTab = 'terms', onBackToHome }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const tabs = [
    { id: 'terms', label: 'Terms of Service', icon: FileText },
    { id: 'privacy', label: 'Privacy Policy', icon: Shield },
    { id: 'cookies', label: 'Cookie & Telemetry Policy', icon: Cookie },
  ];

  return (
    <div className="min-h-screen bg-[#06080d] text-slate-200 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Top Header & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-blue-900/30">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-blue-400" />
            <span>Return to Overview</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-xs text-slate-400">
              LEGAL &amp; COMPLIANCE FRAMEWORK • DUAL-JURISDICTION
            </span>
          </div>
        </div>

        {/* Dual Branch Entity Header Banner */}
        <div className="rounded-3xl bg-[#0b0f19] border border-blue-500/30 p-6 sm:p-8 shadow-glow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-2xl bg-[#06080d] border border-blue-900/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-blue-400 font-bold flex items-center gap-1.5 uppercase">
                <Building2 className="w-4 h-4" />
                United States Operations (HQ)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                Texas, USA
              </span>
            </div>
            <p className="text-xs text-slate-300 font-sans">
              <strong className="text-white block font-semibold">SENSORSAE Technologies Inc.</strong>
              600 Congress Avenue, Suite 1400, Austin, TX 78701, USA<br />
              Corporate Phone: <a href="tel:+15125553948" className="text-blue-400 hover:underline">+1 512 555 3948</a><br />
              Legal Dispatch: <a href="mailto:legal@sensorsae.net" className="text-blue-400 hover:underline">legal@sensorsae.net</a>
            </p>
            <span className="text-[10px] font-mono text-slate-500 block pt-1">
              Governing Jurisdiction: State of Texas &amp; US Federal Law
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#06080d] border border-blue-900/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-blue-400 font-bold flex items-center gap-1.5 uppercase">
                <Globe className="w-4 h-4" />
                Sri Lanka Operations (Engineering)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                Colombo / Western
              </span>
            </div>
            <p className="text-xs text-slate-300 font-sans">
              <strong className="text-white block font-semibold">SENSORSAE Technologies (Private) Limited</strong>
              19 Orchid Avenue, Dehiwala, Sri Lanka<br />
              Engineering Dispatch: <a href="tel:+94114637925" className="text-blue-400 hover:underline">+94 11 463 7925</a><br />
              Regional Legal: <a href="mailto:legal-sl@sensorsae.net" className="text-blue-400 hover:underline">legal-sl@sensorsae.net</a>
            </p>
            <span className="text-[10px] font-mono text-slate-500 block pt-1">
              Governing Jurisdiction: Democratic Socialist Republic of Sri Lanka
            </span>
          </div>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#0b0f19] border border-slate-800 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-glow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-blue-950/40'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Terms of Service */}
        {activeTab === 'terms' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase text-blue-400 font-bold">
                MASTER SERVICES AGREEMENT
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Terms of Service
              </h1>
              <p className="text-xs font-mono text-slate-400">
                Effective Date: September 10, 2026 • Version 3.4
              </p>
            </div>

            <div className="space-y-6 text-sm text-slate-300 leading-relaxed bg-[#0b0f19] p-8 sm:p-10 rounded-3xl border border-slate-800">
              
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Scale className="w-4 h-4 text-blue-400" />
                  1. Dual-Branch Corporate Structure &amp; Contracting Parties
                </h2>
                <p>
                  These Terms of Service ("Agreement") constitute a legally binding agreement between the customer or operating entity ("Customer", "Licensee", "You") and SENSORSAE Technologies:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs font-mono text-slate-400">
                  <li>For operations, billing, and purchases executed within North America and global accounts outside South Asia: <strong className="text-white">SENSORSAE Technologies Inc.</strong> (600 Congress Avenue, Suite 1400, Austin, TX 78701, USA).</li>
                  <li>For operations, field hardware deployments, and services contracted within South Asia / APAC: <strong className="text-white">SENSORSAE Technologies (Pvt) Ltd</strong> (19 Orchid Avenue, Dehiwala, Sri Lanka).</li>
                </ul>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-800">
                <h2 className="text-lg font-bold text-white">2. Permitted Use &amp; Industrial Operations Disclaimer</h2>
                <p>
                  The SENSORSAE platform, including the Edge-X1 Smart Sensor Hub, Wireless Sensor Pods, Thermal Vision Guard, Nvidia Orin compute stacks, and AI Plant Copilot, provides predictive analytics, condition monitoring, and early defect warnings based on acoustic ultrasound, vibration, and thermal parameters.
                </p>
                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Important Industrial Safety Notice:</strong>
                    SENSORSAE outputs, telemetry alarms, and diagnostic recommendations are predictive decision-support tools. SENSORSAE is not a substitute for certified emergency stop mechanisms, human safety interlocks, certified fire suppression systems, or mechanical overpressure relief valves. Operators retain sole responsibility for machine shutdowns and physical plant safety.
                  </div>
                </div>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-800">
                <h2 className="text-lg font-bold text-white">3. Subscription Quotas &amp; Commercial Terms</h2>
                <p>
                  Access to the live operations dashboard and edge telemetry mesh is governed by your active subscription plan (Starter, Professional, or Enterprise Fleet):
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300">
                  <li><strong>Starter Mesh:</strong> Up to 10 active sensor pods, 2.5-second polling interval, 7-day historical telemetry, single facility coverage.</li>
                  <li><strong>Professional Tier:</strong> Up to 50 active pods, sub-second polling, 1-Year historical data archive, full 192 kHz spectral FFT DSP and AI Diagnostics Copilot.</li>
                  <li><strong>Enterprise Mesh:</strong> Unlimited sensor nodes, multi-facility fleet governance, unlimited cold storage, direct SAP PM / IBM Maximo ERP work-order dispatch, air-gapped on-premises options.</li>
                </ul>
                <p className="text-xs text-slate-400">
                  Subscriptions auto-renew on monthly or annual intervals as selected at checkout. Payments are processed securely with 256-bit industrial TLS encryption.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-800">
                <h2 className="text-lg font-bold text-white">4. Hardware Warranty &amp; Mounting Guidelines</h2>
                <p>
                  Edge-X1 wireless sensor pods are engineered with IP67-rated industrial enclosures and magnetic breakaway mounts for rotary machinery housings. Customers must ensure that magnetic mounts are affixed to flat ferromagnetic surfaces within rated vibration envelopes (up to 50g shock, -40°C to +85°C ambient). SENSORSAE replaces defective hardware units under the 3-year hardware warranty included with active Professional and Enterprise subscriptions.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-800">
                <h2 className="text-lg font-bold text-white">5. Governing Law &amp; Dispute Resolution</h2>
                <p>
                  Agreements with SENSORSAE Technologies Inc. are governed by the laws of the State of Texas, USA, without regard to conflicts of law principles. Any dispute shall be resolved through binding commercial arbitration in Austin, Texas. Agreements with SENSORSAE Technologies (Pvt) Ltd are governed by the laws of the Democratic Socialist Republic of Sri Lanka, with jurisdiction in Colombo.
                </p>
              </section>

            </div>
          </div>
        )}

        {/* Tab 2: Privacy Policy */}
        {activeTab === 'privacy' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase text-blue-400 font-bold">
                DATA PROTECTION &amp; TELEMETRY PRIVACY
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Privacy Policy
              </h1>
              <p className="text-xs font-mono text-slate-400">
                Effective Date: September 10, 2026 • Version 3.4
              </p>
            </div>

            <div className="space-y-6 text-sm text-slate-300 leading-relaxed bg-[#0b0f19] p-8 sm:p-10 rounded-3xl border border-slate-800">
              
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  1. Fundamental Distinction: Machine Telemetry vs. Personal Data
                </h2>
                <p>
                  At SENSORSAE, we uphold strict architectural boundaries between operational equipment telemetry and personal data:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#06080d] border border-blue-900/40 space-y-1.5">
                    <span className="font-mono text-xs text-blue-400 font-bold">INDUSTRIAL TELEMETRY (IOT)</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Triaxial acceleration (g), 192 kHz acoustic waveforms, radiometric thermal matrices (°C), FFT harmonic bins, and rotational speed (RPM). This data contains zero personal identifiers and belongs exclusively to your operating facility.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#06080d] border border-blue-900/40 space-y-1.5">
                    <span className="font-mono text-xs text-emerald-400 font-bold">OPERATOR ACCOUNT DATA</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Operator name, company email, hashed authentication credentials, plant role, and notification destinations (SMS, WhatsApp, Slack). Used exclusively for account access and critical alert dispatch.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-800">
                <h2 className="text-lg font-bold text-white">2. Air-Gapped &amp; On-Premises Privacy Options</h2>
                <p>
                  For defense, semiconductor, and high-security manufacturing environments, SENSORSAE offers 100% air-gapped on-premises architectures. When deployed in air-gapped mode on Nvidia Jetson Orin edge nodes, machine telemetry never egresses the local plant firewall. No cloud connectivity or external AI APIs are invoked.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-800">
                <h2 className="text-lg font-bold text-white">3. Compliance with US &amp; Sri Lankan Privacy Regulations</h2>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300">
                  <li><strong>United States:</strong> Complies with the California Consumer Privacy Act (CCPA/CPRA) and Texas Data Privacy and Security Act (TDPSA). We do not sell or monetize personal information.</li>
                  <li><strong>Sri Lanka:</strong> Complies with the Personal Data Protection Act, No. 9 of 2022 (PDPA). Data processed through the Dehiwala engineering facility follows strict access-control and cryptographic safeguards.</li>
                  <li><strong>Global Customers:</strong> GDPR-aligned data transfer safeguards and Standard Contractual Clauses (SCCs).</li>
                </ul>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-800">
                <h2 className="text-lg font-bold text-white">4. Data Subject Rights &amp; Officer Contacts</h2>
                <p>
                  You have the right to inspect, export, correct, or delete operator account details at any time. For privacy inquiries or to contact our Data Protection Officer:
                </p>
                <div className="p-4 rounded-xl bg-[#06080d] border border-slate-800 font-mono text-xs space-y-1 text-slate-300">
                  <div>USA DPO: <span className="text-blue-400">dpo@sensorsae.net</span> • 600 Congress Ave, Suite 1400, Austin, TX</div>
                  <div>Sri Lanka DPO: <span className="text-blue-400">dpo-sl@sensorsae.net</span> • 19 Orchid Avenue, Dehiwala, Sri Lanka</div>
                </div>
              </section>

            </div>
          </div>
        )}

        {/* Tab 3: Cookie & Telemetry Policy */}
        {activeTab === 'cookies' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase text-blue-400 font-bold">
                COOKIE &amp; CLIENT-SIDE STORAGE
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Cookie &amp; Telemetry Policy
              </h1>
              <p className="text-xs font-mono text-slate-400">
                Effective Date: September 10, 2026 • Version 3.4
              </p>
            </div>

            <div className="space-y-6 text-sm text-slate-300 leading-relaxed bg-[#0b0f19] p-8 sm:p-10 rounded-3xl border border-slate-800">
              
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Cookie className="w-4 h-4 text-amber-400" />
                  1. How SENSORSAE Uses Cookies &amp; Local Storage
                </h2>
                <p>
                  SENSORSAE uses minimal, high-efficiency client-side cookies and browser local storage strictly necessary for industrial system operation, session persistence, and cyber defense:
                </p>

                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-2xl bg-[#06080d] border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-blue-400 font-bold">sensorsae_token / sensorsae_user</span>
                      <span className="text-emerald-400 uppercase">Strictly Necessary</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Stores encrypted Sanctum bearer tokens and operator profile sessions to authenticate API requests with the industrial telemetry gateway.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#06080d] border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-blue-400 font-bold">__cf_bm / cf-turnstile-response</span>
                      <span className="text-emerald-400 uppercase">Security &amp; Bot Defense</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Cloudflare Turnstile token validation and security heuristics protecting consultation requests, newsletter updates, and login forms from automated exploitation.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#06080d] border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-blue-400 font-bold">sensorsae_cookie_consent</span>
                      <span className="text-emerald-400 uppercase">Operator Preference</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Records your operational telemetry and cookie consent choice from the bottom banner.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-800">
                <h2 className="text-lg font-bold text-white">2. No Third-Party Advertising Trackers</h2>
                <p>
                  SENSORSAE does NOT employ cross-site tracking beacons, third-party advertising cookies, or behavioral ad-network scripts. As an industrial reliability platform, your operational usage and browsing metrics are never sold to external data brokers.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-slate-800">
                <h2 className="text-lg font-bold text-white">3. Managing Your Preferences</h2>
                <p>
                  You can clear or modify stored tokens at any time via your browser developer tools or settings. Note that disabling strictly necessary authentication tokens will require re-authenticating to access the live operations dashboard.
                </p>
              </section>

            </div>
          </div>
        )}

        {/* Footer Contact & Dual Office Inquiries */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            SENSORSAE Legal Counsel • Austin, TX &amp; Dehiwala, Sri Lanka
          </div>
          <button
            onClick={onBackToHome}
            className="text-blue-400 hover:text-blue-300 font-bold transition-colors"
          >
            ← Back to Home Page
          </button>
        </div>

      </div>
    </div>
  );
};
