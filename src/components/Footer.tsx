import React from 'react';
import { Phone, MapPin, Clock, ShieldCheck, ArrowUp } from 'lucide-react';
import { ProsperityLogo } from './ProsperityLogo';
import { LOCATIONS, TRANSLATIONS } from '../data/websiteData';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onNavigate: (tab: string) => void;
  onOpenSchedule: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigate, onOpenSchedule }) => {
  const t = TRANSLATIONS[language];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 text-xs">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Col 1 & 2: Brand Lockup & Philosophy */}
        <div className="lg:col-span-2 space-y-4">
          <ProsperityLogo size="lg" variant="full" />
          <p className="text-slate-400 leading-relaxed max-w-sm pt-2">
            Maryland & Washington DC’s destination for high-quality new and inspected pre-owned tires, precision computerized balancing, laser alignments, and fast auto repairs.
          </p>

          <div className="pt-2 flex items-center gap-3 text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span className="text-white font-semibold">1-Year Full Workmanship Warranty on all services.</span>
          </div>

          <div className="pt-1">
            <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Toll-Free Nationwide Line:</span>
            <a href="tel:8883759048" className="text-base font-bold font-mono-num text-white hover:text-emerald-400 transition-colors">
              (888) 375-9048
            </a>
          </div>
        </div>

        {/* Col 3: Quick Navigation */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
            {language === 'en' ? 'Quick Navigation' : 'Navegación'}
          </h4>
          <ul className="space-y-2">
            {[
              { id: 'home', label: language === 'en' ? 'Home Page' : 'Inicio' },
              { id: 'shop', label: language === 'en' ? 'Shop Tires By Size' : 'Catálogo de Llantas' },
              { id: 'services', label: language === 'en' ? 'Automotive Services' : 'Servicios de Taller' },
              { id: 'mobile-truck', label: language === 'en' ? 'Mobile Tire Truck' : 'Camión Móvil a Domicilio' },
              { id: 'used-tires', label: language === 'en' ? 'Inspected Used Tires' : 'Llantas Usadas' },
              { id: 'coupons', label: language === 'en' ? 'Coupons & Gas Cards' : 'Cupones y Ofertas' },
              { id: 'locations', label: language === 'en' ? 'Store Locations' : 'Nuestras Sedes' },
              { id: 'reviews', label: language === 'en' ? 'Customer Reviews' : 'Reseñas de Clientes' },
              { id: 'about', label: language === 'en' ? 'About Our Team' : 'Sobre Nosotros' },
              { id: 'contact', label: language === 'en' ? 'Contact & Book' : 'Contacto y Citas' },
            ].map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate(link.id);
                    scrollToTop();
                  }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Store Locations & Phones */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
            {language === 'en' ? 'Our 4 Regional Locations' : 'Nuestras 4 Sedes'}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {LOCATIONS.map((loc) => (
              <div key={loc.id} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1">
                <div className="font-bold text-white text-[11px] uppercase tracking-wide">
                  {loc.name}
                </div>
                <div className="text-slate-400 text-[11px] leading-tight">
                  {loc.address}, {loc.city} {loc.state}
                </div>
                <a
                  href={`tel:${loc.phone}`}
                  className="text-emerald-400 hover:underline font-mono-num font-bold text-[11px] block pt-0.5"
                >
                  {loc.phoneDisplay}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment methods strip matching original website */}
      <div className="bg-slate-900/80 border-t border-slate-800/80 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
              {language === 'en' ? 'Payments Accepted & Flexible Financing:' : 'Métodos de Pago y Financiamiento:'}
            </span>
            <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap text-[11px] text-slate-400">
              <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-200 font-semibold">Visa</span>
              <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-200 font-semibold">MasterCard</span>
              <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-200 font-semibold">Maestro</span>
              <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-200 font-semibold">PayPal</span>
              <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-200 font-semibold">Cash</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-semibold">Acima Financing</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-semibold">Snap Finance</span>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-slate-950 py-4 px-4 border-t border-slate-900 text-slate-500 text-[11px]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            &copy; {new Date().getFullYear()} Prosperity Tires Center. Powered by COMPTRUST. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Fast Service. Safe Driving. Your Prosperity.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
