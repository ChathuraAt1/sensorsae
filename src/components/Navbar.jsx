import React, { useState, useEffect } from 'react';
import { Cpu, Menu, X, ArrowRight, Package } from 'lucide-react';

export const Navbar = ({ currentView, setCurrentView, onRequestDemo }) => {
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
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-blue-950/50 rounded-full transition-all"
          >
            How It Works
          </button>
          <button 
            onClick={() => handleNavClick('features')}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-blue-950/50 rounded-full transition-all"
          >
            Features
          </button>
          <button 
            onClick={() => handleNavClick('testimonials')}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-blue-950/50 rounded-full transition-all"
          >
            Testimonials
          </button>
          <button 
            onClick={() => handleNavClick('about-company')}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-blue-950/50 rounded-full transition-all"
          >
            About Us
          </button>
          <button 
            onClick={() => handleNavClick('faq')}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-blue-950/50 rounded-full transition-all"
          >
            FAQ
          </button>
          <button 
            onClick={() => handleNavClick('consultation')}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-blue-950/50 rounded-full transition-all"
          >
            Contact
          </button>
        </nav>

        {/* MAIN HEADER CTA: Product Page Toggle */}
        <div className="hidden lg:flex items-center gap-3">
          {currentView === 'home' ? (
            <button
              onClick={() => {
                setCurrentView('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-glow-sm hover:shadow-glow-md transition-all duration-300 group"
            >
              <Package className="w-4 h-4" />
              <span>Explore Products</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          ) : (
            <button
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-blue-400 hover:text-white text-xs font-bold border border-blue-500/30 hover:border-blue-400 shadow-glow-sm transition-all duration-300"
            >
              <span>← Back to Overview</span>
            </button>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => {
              if (currentView === 'home') {
                setCurrentView('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="px-3.5 py-1.5 text-xs font-bold rounded-full bg-blue-600 text-white"
          >
            {currentView === 'home' ? 'Products' : 'Home'}
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
              onClick={() => handleNavClick('how-it-works')} 
              className="text-left py-1 text-slate-200 hover:text-blue-400 transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => handleNavClick('features')} 
              className="text-left py-1 text-slate-200 hover:text-blue-400 transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => handleNavClick('testimonials')} 
              className="text-left py-1 text-slate-200 hover:text-blue-400 transition-colors"
            >
              Testimonials
            </button>
            <button 
              onClick={() => handleNavClick('about-company')} 
              className="text-left py-1 text-slate-200 hover:text-blue-400 transition-colors"
            >
              About SENSORSAE
            </button>
            <button 
              onClick={() => handleNavClick('faq')} 
              className="text-left py-1 text-slate-200 hover:text-blue-400 transition-colors"
            >
              FAQ
            </button>
            <button 
              onClick={() => handleNavClick('consultation')} 
              className="text-left py-1 text-slate-200 hover:text-blue-400 transition-colors"
            >
              Contact &amp; Location
            </button>
            
            {/* Primary Mobile CTA */}
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentView === 'home') {
                  setCurrentView('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  setCurrentView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }} 
              className="w-full mt-3 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-center text-sm shadow-glow-sm flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" />
              <span>{currentView === 'home' ? 'Explore Product Line' : 'Return to Overview'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
