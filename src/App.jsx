import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AlternatingSections } from './components/AlternatingSections';
import { ProductFeatures } from './components/ProductFeatures';
import { MasonryBento } from './components/MasonryBento';
import { AboutCompany } from './components/AboutCompany';
import { Testimonials } from './components/Testimonials';
import { Faq } from './components/Faq';
import { Pricing } from './components/Pricing';
import { Checkout } from './components/Checkout';
import { AuthModal } from './components/AuthModal';
import { OAuthCallback } from './components/OAuthCallback';
import { ConsultationForm } from './components/ConsultationForm';
import { ProductsPage } from './components/ProductsPage';
import { DashboardPlaceholder } from './components/DashboardPlaceholder';
import { Footer } from './components/Footer';

export function App() {
  const getInitialView = () => {
    const path = window.location.pathname;
    if (path.includes('/auth/complete')) return 'auth/complete';
    if (path.includes('/checkout')) return 'checkout';
    if (path.includes('/dashboard')) return 'dashboard';
    if (path.includes('/products')) return 'products';
    return 'home';
  };

  const [currentView, setCurrentView] = useState(getInitialView);

  // Checkout Plan Selection State
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedBillingCycle, setSelectedBillingCycle] = useState('yearly');

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register' | 'forgot'

  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (view, path) => {
    setCurrentView(view);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestDemo = () => {
    if (currentView !== 'home') {
      navigateTo('home', '/');
      setTimeout(() => {
        const el = document.getElementById('consultation');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById('consultation');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreProducts = () => {
    navigateTo('products', '/products');
  };

  const handleOpenDashboard = () => {
    navigateTo('dashboard', '/dashboard');
  };

  const handleBackToHome = () => {
    navigateTo('home', '/');
  };

  const handleSelectPlan = (plan, billingCycle = 'yearly') => {
    setSelectedPlan(plan);
    setSelectedBillingCycle(billingCycle);
    navigateTo('checkout', `/checkout?plan=${encodeURIComponent(plan.slug)}&interval=${billingCycle}`);
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleSectionNavigate = (sectionId) => {
    if (currentView !== 'home') {
      navigateTo('home', '/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOAuthFinished = ({ planSlug, billingCycle }) => {
    if (planSlug) {
      navigateTo('checkout', `/checkout?plan=${encodeURIComponent(planSlug)}&interval=${billingCycle || 'yearly'}`);
    } else {
      navigateTo('home', '/');
    }
  };

  return (
    <div className="min-h-screen bg-[#06080d] text-slate-100 flex flex-col selection:bg-blue-500/30 selection:text-blue-200 font-sans">
      {/* Navigation (Hidden on standalone OAuth callback screen for seamless flow) */}
      {currentView !== 'auth/complete' && (
        <Navbar 
          currentView={currentView}
          setCurrentView={(v) => navigateTo(v, v === 'home' ? '/' : `/${v}`)}
          onRequestDemo={handleRequestDemo}
          onOpenDashboard={handleOpenDashboard}
          onOpenAuth={handleOpenAuth}
        />
      )}

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* 1. Hero Section with Industrial Background Image & Digital Twin Machine Card */}
            <Hero 
              onExploreProducts={handleExploreProducts}
              onOpenDashboard={handleOpenDashboard}
              onRequestDemo={handleRequestDemo}
            />

            {/* 2. Alternating 2-Column Storytelling Sections (Zigzag) */}
            <AlternatingSections 
              onRequestDemo={handleRequestDemo}
              onExploreProducts={handleExploreProducts}
            />

            {/* 3. Interactive Capabilities Studio */}
            <ProductFeatures 
              onRequestDemo={handleRequestDemo}
              onExploreProducts={handleExploreProducts}
            />

            {/* 4. Dedicated About Company Section */}
            <AboutCompany 
              onRequestDemo={handleRequestDemo}
              onExploreProducts={handleExploreProducts}
            />

            {/* 5. Creative Masonry / Bento Grid Feature Showcase */}
            <MasonryBento 
              onRequestDemo={handleRequestDemo}
            />

            {/* 6. Transparent Industrial Pricing (Connected to dash.sensorsae.net) */}
            <Pricing 
              onRequestDemo={handleRequestDemo}
              onSelectPlan={handleSelectPlan}
            />

            {/* 7. Customer Stories & Field Testimonials */}
            <Testimonials />

            {/* 8. Customer FAQ Section */}
            <Faq 
              onRequestDemo={handleRequestDemo}
            />

            {/* 9. 30-Day Risk-Free Pilot Booking Form */}
            <ConsultationForm />
          </>
        )}

        {currentView === 'checkout' && (
          <Checkout 
            selectedPlan={selectedPlan}
            billingCycle={selectedBillingCycle}
            onBack={handleBackToHome}
            onOpenAuth={() => handleOpenAuth('login')}
          />
        )}

        {currentView === 'products' && (
          <ProductsPage 
            onBackToHome={handleBackToHome}
            onOpenDashboard={handleOpenDashboard}
            onRequestDemo={handleRequestDemo}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardPlaceholder 
            onBackToHome={handleBackToHome}
          />
        )}

        {currentView === 'auth/complete' && (
          <OAuthCallback 
            onComplete={handleOAuthFinished}
          />
        )}
      </main>

      {/* Footer (Hidden on checkout and auth callback for focused flow) */}
      {currentView !== 'checkout' && currentView !== 'auth/complete' && (
        <Footer 
          onNavigate={handleSectionNavigate}
          onExploreProducts={handleExploreProducts}
          onRequestDemo={handleRequestDemo}
        />
      )}

      {/* Global Auth Modal for Login, Registration & Password Reset */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        planSlug={selectedPlan?.slug}
        billingCycle={selectedBillingCycle}
        onSuccess={() => {
          // If we are currently on checkout, stay on checkout to complete order
          if (currentView !== 'checkout') {
            // Can redirect to dashboard or keep on current view
          }
        }}
      />
    </div>
  );
}

export default App;
