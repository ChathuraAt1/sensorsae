import React, { useState, useEffect } from 'react';
import { Cpu, Menu, X, ArrowRight, LayoutDashboard } from 'lucide-react';

export const Navbar = ({ currentView, setCurrentView, onRequestDemo, onOpenDashboard }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#06080d]/90 backdrop-blur-xl border-b border-blue-900/40 shadow-glow-sm py-3.5' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-blue-950/70 border border-blue-500/40 group-hover:border-blue-400 group-hover:shadow-glow-md transition-all duration-300">
            <Cpu className="w-5 h-5 text-blue-400 transition-transform group-hover:scale-110" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-wider text-white flex items-center gap-1">
              SENSOR<span className="text-blue-500 font-black">SAE</span>
            </span>
            <span className="font-mono text-[9px] tracking-widest text-slate-400 uppercase -mt-1 flex items-center gap-1">
              <span>PREDICTIVE IOT</span>
              <span className="text-blue-500">•</span>
              <span className="text-blue-400">NVIDIA ORIN</span>
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0b0f19]/80 backdrop-blur-md px-5 py-1.5 rounded-full border border-blue-900/50 shadow-sm">
          <button 
            onClick={() => handleNavClick('how-it-works')}
            className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-blue-950/50 rounded-full transition-all"
          >
            How It Works
          </button>
          <button 
            onClick={() => handleNavClick('features')}
            className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-blue-950/50 rounded-full transition-all"
          >
            Features
          </button>
          <button 
            onClick={() => handleNavClick('bento')}
            className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-blue-950/50 rounded-full transition-all"
          >
            Bento Grid
          </button>
          <button 
            onClick={() => handleNavClick('about-company')}
            className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-blue-950/50 rounded-full transition-all"
          >
            About Us
          </button>
          <button 
            onClick={() => handleNavClick('faq')}
            className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-blue-950/50 rounded-full transition-all"
          >
            FAQ
          </button>
          <button 
            onClick={() => {
              setCurrentView('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
              currentView === 'products'
                ? 'bg-blue-600 text-white font-bold'
                : 'text-slate-300 hover:text-white hover:bg-blue-950/50'
            }`}
          >
            Products
          </button>
        </nav>

        {/* Actions & Links */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Direct CTA to /dashboard */}
          <button
            onClick={onOpenDashboard}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0b0f19] hover:bg-blue-950 text-blue-300 hover:text-white text-xs font-mono border border-blue-500/30 hover:border-blue-400 transition-all shadow-sm"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-blue-400" />
            <span>Dashboard (/dashboard)</span>
          </button>

          {/* Lead Gen CTA */}
          <button
            onClick={onRequestDemo}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-glow-sm hover:shadow-glow-md transition-all duration-300 group"
          >
            <span>Claim Free Pilot</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenDashboard}
            className="px-3 py-1.5 text-xs font-mono rounded-full bg-blue-950 border border-blue-600 text-blue-300"
          >
            Dashboard
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white bg-blue-950/40 border border-blue-900/50 rounded-xl"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#06080d]/98 border-b border-blue-900/60 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3 font-medium text-base">
            <button 
              onClick={() => handleNavClick('about-company')} 
              className="text-left py-1 text-slate-200 hover:text-blue-400 transition-colors"
            >
              About SENSORSAE
            </button>
            <button 
              onClick={() => handleNavClick('features')} 
              className="text-left py-1 text-slate-200 hover:text-blue-400 transition-colors"
            >
              Core Product Features
            </button>
            <button 
              onClick={() => handleNavClick('faq')} 
              className="text-left py-1 text-slate-200 hover:text-blue-400 transition-colors"
            >
              Frequently Asked Questions (FAQ)
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setCurrentView('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className="text-left py-1 text-blue-400 font-mono text-sm"
            >
              → Product Line Deep Dives
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDashboard();
              }} 
              className="text-left py-1 text-blue-300 font-mono text-sm flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Launch Dashboard (/dashboard)</span>
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestDemo();
              }} 
              className="w-full mt-3 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-center text-sm shadow-glow-sm"
            >
              Claim 30-Day Free Pilot
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
