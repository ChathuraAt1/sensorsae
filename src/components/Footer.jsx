import React, { useState, useEffect, useRef } from "react";
import {
  Cpu,
  ArrowUp,
  Send,
  CheckCircle2,
  Building2,
  FileText,
  Download,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Globe,
} from "lucide-react";
import { FaLinkedinIn, FaXTwitter, FaYoutube, FaGithub } from "react-icons/fa6";

const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_TURNSTILE_SITE_KEY || "0x4AAAAAAEnOVjqrpsm3StEA";
const API_BASE = "https://dash.sensorsae.net";

export const Footer = ({
  onNavigate,
  onExploreProducts,
  onRequestDemo,
  onOpenDashboard,
  onNavigateLegal,
}) => {
  const [emailInput, setEmailInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const turnstileContainerRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    let intervalId = null;

    const renderWidget = () => {
      if (
        window.turnstile &&
        turnstileContainerRef.current &&
        widgetIdRef.current === null
      ) {
        try {
          widgetIdRef.current = window.turnstile.render(
            turnstileContainerRef.current,
            {
              sitekey: TURNSTILE_SITE_KEY,
              action: "newsletter",
              theme: "dark",
              callback: (token) => {
                setTurnstileToken(token);
                setErrorMessage("");
              },
              "expired-callback": () => {
                setTurnstileToken("");
              },
              "error-callback": () => {
                setTurnstileToken("");
                setErrorMessage(
                  "Turnstile security verification encountered an issue. Please refresh or retry."
                );
              },
            }
          );
        } catch (err) {
          console.warn("Newsletter Turnstile render warning:", err);
        }
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      intervalId = setInterval(() => {
        if (window.turnstile) {
          clearInterval(intervalId);
          renderWidget();
        }
      }, 200);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (widgetIdRef.current !== null && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        } catch (_) {}
      }
    };
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    if (!turnstileToken) {
      setErrorMessage("Please complete the security check below before subscribing.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch(`${API_BASE}/api/mail/newsletter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email: emailInput.trim(),
          turnstile_token: turnstileToken,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data.errors) {
          const firstErr = Object.values(data.errors).flat()[0];
          throw new Error(firstErr || data.message || "Newsletter subscription failed");
        }
        throw new Error(data.message || `Server responded with status ${res.status}`);
      }

      setSuccessMessage(data.message || "Newsletter signup processed. Please check your email to verify.");
      setEmailInput("");
      setTurnstileToken("");

      if (window.turnstile && widgetIdRef.current !== null) {
        try {
          window.turnstile.reset(widgetIdRef.current);
        } catch (_) {}
      }
    } catch (err) {
      console.error("Newsletter submission error:", err);
      setErrorMessage(err.message || "Failed to subscribe to newsletter. Please try again.");

      // Reset Turnstile so user can generate a fresh token
      if (window.turnstile && widgetIdRef.current !== null) {
        try {
          window.turnstile.reset(widgetIdRef.current);
          setTurnstileToken("");
        } catch (_) {}
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#05070a] border-t border-blue-900/30 pt-16 pb-12 text-slate-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Custom Top Newsletter / Engineering Briefing Bar */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-950/40 via-[#0b0f19] to-blue-950/40 border border-blue-500/30 p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-glow-sm">
          <div className="space-y-2 max-w-lg text-left">
            <span className="font-mono text-[11px] uppercase tracking-widest text-blue-400 font-bold px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 inline-block">
              SENSORSAE UPDATES
            </span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight uppercase">
              RECEIVE INDUSTRIAL MONITORING INSIGHTS
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Get product updates, maintenance insights, and selected customer stories.
            </p>
          </div>

          <div className="w-full lg:w-auto flex-1 max-w-md">
            {successMessage ? (
              <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs font-mono space-y-2 animate-in fade-in">
                <div className="flex items-center gap-2 font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Subscription Processed</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {successMessage}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSuccessMessage("");
                    setTurnstileToken("");
                    if (window.turnstile && widgetIdRef.current !== null) {
                      try {
                        window.turnstile.reset(widgetIdRef.current);
                      } catch (_) {}
                    }
                  }}
                  className="mt-1 text-[11px] text-blue-400 hover:text-blue-300 underline font-sans"
                >
                  Subscribe another email
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="space-y-3 w-full"
              >
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs font-mono flex items-start gap-2 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="flex w-full rounded-full bg-[#06080d] border border-slate-800 p-1 focus-within:border-blue-500 transition-all">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your work email..."
                    className="bg-transparent px-4 py-2 text-white placeholder:text-slate-600 focus:outline-none text-xs w-full"
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !turnstileToken}
                    className={`px-5 py-2 rounded-full font-semibold text-xs transition-all shrink-0 flex items-center gap-1.5 ${
                      !turnstileToken || isSubmitting
                        ? "bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-500 text-white shadow-glow-sm cursor-pointer"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-3 h-3 animate-spin text-blue-300" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <Send className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>

                {/* Cloudflare Turnstile Verification */}
                <div className="pt-1 flex flex-col items-center sm:items-start justify-center">
                  <div
                    ref={turnstileContainerRef}
                    className="min-h-[65px] flex items-center"
                    data-action="newsletter"
                  ></div>
                  <input
                    type="hidden"
                    name="cf-turnstile-response"
                    value={turnstileToken}
                  />
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Main Custom Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Mission Column (Spans 4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-blue-950 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-glow-sm">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-wider text-white">
                SENSOR<span className="text-blue-500 font-black">SAE</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Sensor Intelligence &amp; Predictive Monitoring Platform.
              Zero-downtime manufacturing powered by local on-premises Nvidia
              Orin AI.
            </p>

            {/* Live Mesh Status Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/40 border border-blue-500/20 text-slate-300 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
              <span>
                Global Industrial Mesh:{" "}
                <strong className="text-blue-400 font-semibold">
                  100% NOMINAL
                </strong>
              </span>
            </div>
          </div>

          {/* Navigation Column (Spans 2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate("how-it-works")}
                  className="hover:text-blue-400 transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("features")}
                  className="hover:text-blue-400 transition-colors"
                >
                  Capabilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("platform")}
                  className="hover:text-blue-400 transition-colors"
                >
                  Platform Highlights
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("testimonials")}
                  className="hover:text-blue-400 transition-colors"
                >
                  Customer Stories
                </button>
              </li>
              {/* <li>
                <button
                  onClick={() => onNavigate("about-company")}
                  className="hover:text-blue-400 transition-colors"
                >
                  About SENSORSAE
                </button>
              </li> */}
              <li>
                <button
                  onClick={() => onNavigate("faq")}
                  className="hover:text-blue-400 transition-colors"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Product Line Column (Spans 3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Product Suite
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onOpenDashboard ? onOpenDashboard({ tab: "sensors" }) : onExploreProducts()}
                  className="hover:text-blue-400 transition-colors text-left flex items-center justify-between w-full group"
                >
                  <span>Edge-X1 Wireless Sensor Pods</span>
                  <span className="text-[10px] font-mono text-slate-500 group-hover:text-blue-400">Mesh</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onExploreProducts}
                  className="hover:text-blue-400 transition-colors text-left flex items-center justify-between w-full group"
                >
                  <span>Edge-X1 Smart Gateway Hub</span>
                  <span className="text-[10px] font-mono text-slate-500 group-hover:text-blue-400">Gateway</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDashboard ? onOpenDashboard({ tab: "copilot" }) : onExploreProducts()}
                  className="hover:text-blue-400 transition-colors text-left flex items-center justify-between w-full group"
                >
                  <span>AI Copilot Diagnostics Studio</span>
                  <span className="text-[10px] font-mono text-blue-400">AI</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDashboard ? onOpenDashboard({ tab: "thermal" }) : onExploreProducts()}
                  className="hover:text-blue-400 transition-colors text-left flex items-center justify-between w-full group"
                >
                  <span>Thermal Vision Guard (LWIR)</span>
                  <span className="text-[10px] font-mono text-slate-500 group-hover:text-blue-400">Optics</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDashboard ? onOpenDashboard({ tab: "orin" }) : onExploreProducts()}
                  className="hover:text-blue-400 transition-colors text-left flex items-center justify-between w-full group"
                >
                  <span>Nvidia Jetson Orin™ Compute Stack</span>
                  <span className="text-[10px] font-mono text-slate-500 group-hover:text-blue-400">Edge AI</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDashboard ? onOpenDashboard({ tab: "fft" }) : onExploreProducts()}
                  className="hover:text-blue-400 transition-colors text-left flex items-center justify-between w-full group"
                >
                  <span>192 kHz Spectral FFT &amp; DSP Engine</span>
                  <span className="text-[10px] font-mono text-slate-500 group-hover:text-blue-400">DSP</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDashboard ? onOpenDashboard({ tab: "incidents" }) : onExploreProducts()}
                  className="hover:text-blue-400 transition-colors text-left flex items-center justify-between w-full group"
                >
                  <span>Incident Dispatch &amp; CMMS</span>
                  <span className="text-[10px] font-mono text-slate-500 group-hover:text-blue-400">ERP</span>
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={onRequestDemo}
                  className="text-blue-400 hover:text-blue-300 font-bold transition-colors block text-left"
                >
                  → Request 30-Day Evaluation Kit
                </button>
              </li>
            </ul>
          </div>

          {/* Company Profile Column (Spans 3 cols) - strictly LinkedIn, Crunchbase, F6S */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Company Profile
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <a
                  href="https://www.linkedin.com/company/sensorsae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#06080d] border border-slate-800 hover:border-blue-500/50 hover:bg-blue-950/40 text-slate-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <FaLinkedinIn className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-white">LinkedIn Profile</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.crunchbase.com/organization/sensorsae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#06080d] border border-slate-800 hover:border-blue-500/50 hover:bg-blue-950/40 text-slate-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-white">Crunchbase Profile</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.f6s.com/sensorsae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#06080d] border border-slate-800 hover:border-blue-500/50 hover:bg-blue-950/40 text-slate-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-white">F6S Profile</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 font-mono text-[11px]">
          <div>
            © {new Date().getFullYear()} SENSORSAE Technologies Inc. • Austin, TX &amp; Dehiwala, Sri Lanka • All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-sans text-xs">
            <button
              onClick={() => onNavigateLegal ? onNavigateLegal("terms") : (window.location.href = "/terms")}
              className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => onNavigateLegal ? onNavigateLegal("privacy") : (window.location.href = "/privacy")}
              className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => onNavigateLegal ? onNavigateLegal("cookies") : (window.location.href = "/cookies")}
              className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
            >
              Cookie Policy
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
