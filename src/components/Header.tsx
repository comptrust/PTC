import React, { useState } from 'react';
import { Phone, Clock, MapPin, Globe, ShoppingBag, Menu, X, ShieldCheck } from 'lucide-react';
import { ProsperityLogo } from './ProsperityLogo';
import { LOCATIONS, TRANSLATIONS } from '../data/websiteData';
import { Language } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  cartCount: number;
  openCart: () => void;
  openScheduleModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  cartCount,
  openCart,
  openScheduleModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLocationIndex, setActiveLocationIndex] = useState(0);
  const t = TRANSLATIONS[language];
  const currentLocation = LOCATIONS[activeLocationIndex];

  const navLinks = [
    { id: 'home', label: language === 'en' ? 'Home' : 'Inicio' },
    { id: 'shop', label: language === 'en' ? 'Shop Tires' : 'Llantas' },
    { id: 'services', label: language === 'en' ? 'Services' : 'Servicios' },
    { id: 'mobile-truck', label: language === 'en' ? 'Mobile Truck' : 'Camión Móvil' },
    { id: 'used-tires', label: language === 'en' ? 'Used Tires' : 'Llantas Usadas' },
    { id: 'coupons', label: language === 'en' ? 'Coupons' : 'Cupones' },
    { id: 'locations', label: language === 'en' ? 'Locations' : 'Sedes' },
    { id: 'reviews', label: language === 'en' ? 'Reviews' : 'Reseñas' },
    { id: 'about', label: language === 'en' ? 'About' : 'Nosotros' },
    { id: 'contact', label: language === 'en' ? 'Contact' : 'Contacto' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-md border-b border-emerald-950/50">
      {/* Top utility bar */}
      <div className="bg-slate-900/90 text-xs text-slate-300 border-b border-slate-800/80 px-4 py-1.5 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Location & Hours ticker */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{currentLocation.name}:</span>
              <span className="text-slate-300 hidden sm:inline">{currentLocation.address}, {currentLocation.city} {currentLocation.state}</span>
              {/* Quick location switcher pills */}
              <select
                aria-label="Select location"
                value={activeLocationIndex}
                onChange={(e) => setActiveLocationIndex(Number(e.target.value))}
                className="bg-slate-800 text-slate-200 text-xs rounded border border-slate-700 px-1.5 py-0.5 ml-1 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                {LOCATIONS.map((loc, idx) => (
                  <option key={loc.id} value={idx}>
                    {loc.city}, {loc.state} ({loc.phoneDisplay})
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 text-slate-400 border-l border-slate-700 pl-4">
              <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Mon-Sat: 8:30AM–6:30PM · Sun: 9AM–5PM</span>
            </div>
          </div>

          {/* Contact & Language Switcher */}
          <div className="flex items-center gap-4 ml-auto">
            <a
              href={`tel:${currentLocation.phone}`}
              className="flex items-center gap-1.5 text-white hover:text-emerald-400 font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-mono-num">{currentLocation.phoneDisplay}</span>
            </a>

            <span className="text-slate-600 hidden md:inline">|</span>

            <a
              href="tel:8883759048"
              className="hidden md:flex items-center gap-1 text-slate-300 hover:text-emerald-400 transition-colors"
            >
              <span className="text-emerald-400 font-medium">{t.tollFree}:</span>
              <span className="font-mono-num font-semibold">(888) 375-9048</span>
            </a>

            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-slate-800/80 rounded px-1.5 py-0.5 border border-slate-700">
              <Globe className="w-3 h-3 text-emerald-400" />
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`text-[11px] font-semibold px-1 rounded transition-colors ${
                  language === 'en' ? 'text-emerald-400 bg-slate-700' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <span className="text-slate-600">/</span>
              <button
                type="button"
                onClick={() => setLanguage('es')}
                className={`text-[11px] font-semibold px-1 rounded transition-colors ${
                  language === 'es' ? 'text-emerald-400 bg-slate-700' : 'text-slate-400 hover:text-white'
                }`}
              >
                ES
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Row (Strict Top Bar Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-6">
        {/* Zone 1: Single element Brand Logo (Pure PNG emblem, no text after logo) */}
        <button
          type="button"
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl group shrink-0 cursor-pointer"
          title="Prosperity Tire Center - Home"
        >
          <ProsperityLogo size="md" allowUpload={false} />
        </button>

        {/* Zone 2: Single-line Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  setActiveTab(link.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative font-heading tracking-wide ${
                  isActive
                    ? 'text-emerald-400 font-bold'
                    : 'text-slate-300 hover:text-white hover:text-emerald-300'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Cart */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quote / Cart button */}
          <button
            type="button"
            onClick={openCart}
            aria-label="View Tire Cart and Quote"
            className="relative p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-600/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-slate-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center font-mono-num shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary CTA: Schedule Service */}
          <button
            type="button"
            onClick={openScheduleModal}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-slate-950 font-heading font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/40 hover:shadow-emerald-500/20 transition-all duration-150 whitespace-nowrap shrink-0"
          >
            {t.scheduleService}
          </button>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-emerald-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-emerald-950 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  activeTab === link.id
                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                    : 'text-slate-200 hover:bg-slate-900 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openScheduleModal();
              }}
              className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-heading font-black text-center text-sm uppercase tracking-wider shadow-md"
            >
              {t.scheduleService}
            </button>

            <a
              href={`tel:${currentLocation.phone}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-slate-900 border border-emerald-900/50 text-emerald-400 font-bold text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>{t.callUs}: {currentLocation.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
