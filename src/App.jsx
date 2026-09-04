import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AlternatingSections } from './components/AlternatingSections';
import { ProductFeatures } from './components/ProductFeatures';
import { MasonryBento } from './components/MasonryBento';
import { AboutCompany } from './components/AboutCompany';
import { Testimonials } from './components/Testimonials';
import { Faq } from './components/Faq';
import { ConsultationForm } from './components/ConsultationForm';
import { ProductsPage } from './components/ProductsPage';
import { DashboardPlaceholder } from './components/DashboardPlaceholder';
import { Footer } from './components/Footer';

export function App() {
  const getInitialView = () => {
    const path = window.location.pathname;
    if (path.includes('/dashboard')) return 'dashboard';
    if (path.includes('/products')) return 'products';
    return 'home';
  };

  const [currentView, setCurrentView] = useState(getInitialView);

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

  return (
    <div className="min-h-screen bg-[#06080d] text-slate-100 flex flex-col selection:bg-blue-500/30 selection:text-blue-200 font-sans">
      {/* Navigation */}
      <Navbar 
        currentView={currentView}
        setCurrentView={(v) => navigateTo(v, v === 'home' ? '/' : `/${v}`)}
        onRequestDemo={handleRequestDemo}
        onOpenDashboard={handleOpenDashboard}
      />

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

            {/* 3. Broken-Out Product Feature Sections with Industrial Photography */}
            <ProductFeatures 
              onRequestDemo={handleRequestDemo}
              onExploreProducts={handleExploreProducts}
            />

            {/* 4. Creative Masonry / Bento Grid Feature Showcase */}
            <MasonryBento 
              onRequestDemo={handleRequestDemo}
            />

            {/* 5. Dedicated About Company Section */}
            <AboutCompany 
              onRequestDemo={handleRequestDemo}
            />

            {/* 6. Customer Stories & Field Testimonials */}
            <Testimonials />

            {/* 7. Customer FAQ Section */}
            <Faq 
              onRequestDemo={handleRequestDemo}
            />

            {/* 8. 30-Day Risk-Free Pilot Booking Form */}
            <ConsultationForm />
          </>
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
      </main>

      {/* Footer */}
      <Footer 
        onNavigate={handleSectionNavigate}
        onExploreProducts={handleExploreProducts}
        onRequestDemo={handleRequestDemo}
      />
    </div>
  );
}

export default App;
