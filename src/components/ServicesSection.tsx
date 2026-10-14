import React from 'react';
import { Disc, Compass, Wrench, Gauge, ShieldCheck, BatteryCharging, ShieldAlert, Clock, ArrowRight, Check } from 'lucide-react';
import { SERVICES, TRANSLATIONS } from '../data/websiteData';
import { Language, ServiceItem } from '../types';

interface ServicesSectionProps {
  language: Language;
  onBookService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ language, onBookService }) => {
  const t = TRANSLATIONS[language];

  // Map icons
  const getIcon = (name: string) => {
    switch (name) {
      case 'Disc': return <Disc className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Wrench': return <Wrench className="w-5 h-5" />;
      case 'Gauge': return <Gauge className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'BatteryCharging': return <BatteryCharging className="w-5 h-5" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5" />;
      default: return <Wrench className="w-5 h-5" />;
    }
  };

  return (
    <section id="services-section" className="bg-slate-950 border-t border-b border-emerald-950/60 py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-heading">
            {language === 'en' ? 'Factory-Trained Automotive Technicians' : 'Técnicos Automotrices Certificados'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-white uppercase italic tracking-tight mt-1">
            {language === 'en' ? 'Comprehensive Tire & Wheel Services' : 'Servicios Integrales de Llantas y Ruedas'}
          </h2>
          <p className="text-base text-slate-300 mt-2 leading-relaxed">
            {language === 'en'
              ? 'Every service is performed using touchless tire machines, Hunter computerized high-speed balancers, and multi-camera 3D laser alignment systems across all 4 locations.'
              : 'Cada servicio se realiza con desmontadoras touchless, balanceadoras computarizadas de alta velocidad y alineación láser 3D en nuestras 4 sedes.'}
          </p>
        </div>

        {/* Featured Showcase: Wheel Balancing & Warehouse Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Spotlight 1: Computerized Balancing */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col group hover:border-emerald-500/50 transition-colors">
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img
                src="/src/assets/images/tire_service_balancing_1791970740895.jpg"
                alt="Computerized Wheel Balancing Workshop"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
              <div className="absolute top-4 left-4 bg-emerald-950/90 border border-emerald-600/60 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Hunter Digital Balancers
              </div>
            </div>
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-2xl font-black font-heading text-white uppercase italic tracking-tight">
                  High-Speed Computerized Balancing
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {language === 'en'
                    ? 'Guaranteed vibration-free ride at 70+ MPH. Laser-guided weight placement eliminates steering wheel wobble and prevents premature cupping of new tire treads.'
                    : 'Garantía de manejo sin vibraciones a más de 70 MPH. Colocación láser de contrapesos para eliminar sacudidas en el volante.'}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Starting at</span>
                  <div className="text-2xl font-black font-mono-num text-emerald-400">$20 <span className="text-xs text-slate-400 font-normal">/ tire</span></div>
                </div>
                <button
                  type="button"
                  onClick={() => onBookService(SERVICES[0])}
                  className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider cursor-pointer transition-colors"
                >
                  Book Balancing
                </button>
              </div>
            </div>
          </div>

          {/* Spotlight 2: Certified Inspected Used Tires */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col group hover:border-emerald-500/50 transition-colors">
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img
                src="/src/assets/images/used_tires_warehouse_1791970740744.jpg"
                alt="Inspected Used Tires Warehouse"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
              <div className="absolute top-4 left-4 bg-emerald-950/90 border border-emerald-600/60 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Pressure Tested & Graded
              </div>
            </div>
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-2xl font-black font-heading text-white uppercase italic tracking-tight">
                  Certified Pre-Owned Tires (75%–90% Tread)
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {language === 'en'
                    ? 'Save up to 65% without compromising highway safety. Over 3,000 tested tires in inventory from Michelin, Goodyear, and Bridgestone with full 30-day exchange warranty.'
                    : 'Ahorre hasta un 65% sin arriesgar su seguridad. Más de 3,000 llantas verificadas con 30 días de garantía de cambio.'}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Starting at</span>
                  <div className="text-2xl font-black font-mono-num text-emerald-400">$45 <span className="text-xs text-slate-400 font-normal">/ tire</span></div>
                </div>
                <button
                  type="button"
                  onClick={() => onBookService(SERVICES[4])}
                  className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider cursor-pointer transition-colors"
                >
                  Browse Used Tires
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Grid of All Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all group"
            >
              <div className="space-y-4">
                {/* Icon & Time tag */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-950 border border-emerald-950 text-emerald-400 group-hover:border-emerald-500/50 transition-colors">
                    {getIcon(service.icon)}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{service.estimatedTime}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold font-heading text-white tracking-tight">
                    {service.name}
                  </h3>
                  <p className="text-xs font-medium text-emerald-400 mt-1">
                    {service.tagline}
                  </p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features checklist */}
                <ul className="space-y-1.5 pt-2 text-xs text-slate-300">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Price & Booking CTA */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">Estimated</span>
                  <div className="text-xl font-black font-mono-num text-white">
                    ${service.priceStart} <span className="text-xs text-slate-400 font-normal">from</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onBookService(service)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-950 hover:bg-emerald-600 hover:text-slate-950 border border-slate-700 hover:border-emerald-500 text-slate-200 font-heading font-black text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>{t.scheduleService}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
