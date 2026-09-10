import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { ProductFeatures } from "./components/ProductFeatures";
import { Platform } from "./components/Platform";
import { AboutCompany } from "./components/AboutCompany";
import { Testimonials } from "./components/Testimonials";
import { Faq } from "./components/Faq";
import { Pricing } from "./components/Pricing";
import { Checkout } from "./components/Checkout";
import { AuthModal } from "./components/AuthModal";
import { OAuthCallback } from "./components/OAuthCallback";
import { AiChatWidget } from "./components/AiChatWidget";
import { CookieConsent } from "./components/CookieConsent";
import { ConsultationForm } from "./components/ConsultationForm";
import { ProductsPage } from "./components/ProductsPage";
import { IndustrialDashboard } from "./components/IndustrialDashboard";
import { Footer } from "./components/Footer";
import { useAuth } from "./context/AuthContext";
import { FALLBACK_PLANS } from "./services/subscriptionService";

export function App() {
  const { isAuthenticated, isLoading } = useAuth();

  const getInitialView = () => {
    const path = window.location.pathname;
    if (path.includes("/auth/complete")) return "auth/complete";
    if (path.includes("/checkout")) return "checkout";
    if (
      path.includes("/dashboard") ||
      path.includes("/alerts") ||
      path.includes("/incidents")
    )
      return "dashboard";
    if (path.includes("/products")) return "products";
    return "home";
  };

  const [currentView, setCurrentView] = useState(getInitialView);

  // Checkout Plan Selection State (with URL param auto-rehydration for initial visit & refresh)
  const [selectedPlan, setSelectedPlan] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const planSlug = (params.get("plan") || "").toLowerCase();
    if (planSlug) {
      return (
        FALLBACK_PLANS.find(
          (p) =>
            (p.slug || "").toLowerCase().includes(planSlug) ||
            (p.name || "").toLowerCase().includes(planSlug),
        ) || FALLBACK_PLANS[1]
      );
    }
    return null;
  });
  const [selectedBillingCycle, setSelectedBillingCycle] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("interval") || params.get("cycle") || "yearly";
  });

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login"); // 'login' | 'register' | 'forgot'
  const [intendedRedirect, setIntendedRedirect] = useState("dashboard");

  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getInitialView());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (view, path) => {
    setCurrentView(view);
    window.history.pushState({}, "", path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Protect Dashboard under authentication
  useEffect(() => {
    if (!isLoading && currentView === "dashboard" && !isAuthenticated) {
      setIntendedRedirect("dashboard");
      setAuthModalMode("login");
      setIsAuthModalOpen(true);
      navigateTo("home", "/");
    }
  }, [currentView, isAuthenticated, isLoading]);

  const handleRequestDemo = () => {
    if (currentView !== "home") {
      navigateTo("home", "/");
      setTimeout(() => {
        const el = document.getElementById("consultation");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      const el = document.getElementById("consultation");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExploreProducts = () => {
    navigateTo("products", "/products");
  };

  // Dashboard deep link parameters state
  const [dashboardOptions, setDashboardOptions] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const path = window.location.pathname;
    const isAlertRoute =
      path.includes("/alerts") || path.includes("/incidents");
    const tabParam = params.get("tab");
    return {
      tab: tabParam || (isAlertRoute ? "incidents" : "overview"),
      assetId: params.get("asset") || null,
    };
  });

  const handleOpenDashboard = (opts = {}) => {
    const nextTab = opts.tab || "overview";
    const nextAsset = opts.assetId || null;
    setDashboardOptions({ tab: nextTab, assetId: nextAsset });

    const query = new URLSearchParams();
    if (nextTab && nextTab !== "overview") query.set("tab", nextTab);
    if (nextAsset) query.set("asset", nextAsset);
    const path = query.toString()
      ? `/dashboard?${query.toString()}`
      : "/dashboard";

    if (isAuthenticated) {
      navigateTo("dashboard", path);
    } else {
      setIntendedRedirect("dashboard");
      setAuthModalMode("login");
      setIsAuthModalOpen(true);
    }
  };

  const handleBackToHome = () => {
    navigateTo("home", "/");
  };

  const handleSelectPlan = (plan, billingCycle = "yearly") => {
    setSelectedPlan(plan);
    setSelectedBillingCycle(billingCycle);
    navigateTo(
      "checkout",
      `/checkout?plan=${encodeURIComponent(plan.slug)}&interval=${billingCycle}`,
    );
  };

  const handleOpenAuth = (mode = "login", redirectTarget = "dashboard") => {
    setIntendedRedirect(redirectTarget);
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleSectionNavigate = (sectionId) => {
    if (currentView !== "home") {
      navigateTo("home", "/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // OAuth Finished Handler -> routes to dashboard or specified plan checkout
  const handleOAuthFinished = ({ planSlug, billingCycle }) => {
    if (planSlug) {
      navigateTo(
        "checkout",
        `/checkout?plan=${encodeURIComponent(planSlug)}&interval=${billingCycle || "yearly"}`,
      );
    } else {
      // Auth takes directly to the dashboard
      navigateTo("dashboard", "/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#06080d] text-slate-100 flex flex-col selection:bg-blue-500/30 selection:text-blue-200 font-sans relative">
      {/* Navigation (Hidden on standalone Dashboard and OAuth callback screen for seamless workspace experience) */}
      {currentView !== "auth/complete" && currentView !== "dashboard" && (
        <Navbar
          currentView={currentView}
          setCurrentView={(v) => {
            if (v === "dashboard") {
              handleOpenDashboard();
            } else {
              navigateTo(v, v === "home" ? "/" : `/${v}`);
            }
          }}
          onRequestDemo={handleRequestDemo}
          onOpenDashboard={handleOpenDashboard}
          onOpenAuth={(mode) => handleOpenAuth(mode, "dashboard")}
        />
      )}

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentView === "home" && (
          <>
            {/* 1. Hero Section with Industrial Background Image & Digital Twin Machine Card */}
            <Hero
              onExploreProducts={handleExploreProducts}
              onOpenDashboard={handleOpenDashboard}
              onRequestDemo={handleRequestDemo}
            />

            {/* 2. How It Works - Industrial Intelligence Workflow */}
            <HowItWorks
              onRequestDemo={handleRequestDemo}
              onExploreProducts={handleExploreProducts}
              onOpenDashboard={handleOpenDashboard}
            />

            {/* 3. Interactive Capabilities Studio */}
            <ProductFeatures
              onRequestDemo={handleRequestDemo}
              onExploreProducts={handleExploreProducts}
            />

            {/* 4. Creative Masonry / Bento Grid Feature Showcase */}
            <Platform
              onRequestDemo={handleRequestDemo}
              onOpenDashboard={handleOpenDashboard}
            />

            {/* 5. Dedicated About Company Section */}
            <AboutCompany
              onRequestDemo={handleRequestDemo}
              onExploreProducts={handleExploreProducts}
            />

            {/* 6. Transparent Industrial Pricing (Connected to dash.sensorsae.net) */}
            <Pricing
              onRequestDemo={handleRequestDemo}
              onSelectPlan={handleSelectPlan}
            />

            {/* 7. Customer Stories & Field Testimonials */}
            <Testimonials />

            {/* 8. Customer FAQ Section */}
            <Faq onRequestDemo={handleRequestDemo} />

            {/* 9. 30-Day Risk-Free Pilot Booking Form */}
            <ConsultationForm />
          </>
        )}

        {currentView === "checkout" && (
          <Checkout
            selectedPlan={selectedPlan}
            billingCycle={selectedBillingCycle}
            onBack={handleBackToHome}
            onOpenAuth={() => handleOpenAuth("login", "checkout")}
            onOpenDashboard={handleOpenDashboard}
          />
        )}

        {currentView === "products" && (
          <ProductsPage
            onBackToHome={handleBackToHome}
            onOpenDashboard={handleOpenDashboard}
            onRequestDemo={handleRequestDemo}
          />
        )}

        {currentView === "dashboard" && (
          <IndustrialDashboard
            onBackToHome={handleBackToHome}
            initialTab={dashboardOptions.tab}
            initialAssetId={dashboardOptions.assetId}
            onSelectPlan={handleSelectPlan}
          />
        )}

        {currentView === "auth/complete" && (
          <OAuthCallback onComplete={handleOAuthFinished} />
        )}
      </main>

      {/* Footer (Hidden on checkout, dashboard, and auth callback for focused flow) */}
      {currentView !== "checkout" &&
        currentView !== "auth/complete" &&
        currentView !== "dashboard" && (
          <Footer
            onNavigate={handleSectionNavigate}
            onExploreProducts={handleExploreProducts}
            onRequestDemo={handleRequestDemo}
          />
        )}

      {/* Floating AI Telemetry Copilot (Chat interface connected to /api/ai/generate without model) */}
      <AiChatWidget />

      {/* Industrial Cookie & Telemetry Consent Banner */}
      <CookieConsent />

      {/* Global Auth Modal for Login, Registration & Password Reset */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        planSlug={selectedPlan?.slug}
        billingCycle={selectedBillingCycle}
        onSuccess={() => {
          setIsAuthModalOpen(false);
          // Auth takes directly to the dashboard (or intended view)
          if (intendedRedirect === "checkout" && selectedPlan) {
            navigateTo(
              "checkout",
              `/checkout?plan=${encodeURIComponent(selectedPlan.slug)}&interval=${selectedBillingCycle}`,
            );
          } else {
            navigateTo("dashboard", "/dashboard");
          }
        }}
      />
    </div>
  );
}

export default App;
