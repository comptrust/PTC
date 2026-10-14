import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Award, MapPin, Fuel, Wrench, CheckCircle2 } from 'lucide-react';
import { TRANSLATIONS } from '../data/websiteData';
import { Language } from '../types';

interface HeroProps {
  language: Language;
  onExploreTires: () => void;
  onBookService: () => void;
  onViewCoupons: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onExploreTires,
  onBookService,
  onViewCoupons,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <section className="relative overflow-hidden bg-slate-950 border-b border-emerald-950/60">
      {/* Top Banner Alert (Matching Flyer Promotions) */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-white text-xs py-2 px-4 border-b border-emerald-600/40 text-center font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <Fuel className="w-4 h-4 text-emerald-300 shrink-0" />
          <span className="font-bold tracking-wide uppercase">
            {language === 'en'
              ? 'Limited Time Offer: Get $20 Free Gasoline + Free Lifetime Rotation with 4 New Tires!'
              : '¡Oferta Especial: Obtén Tarjeta de Gasolina de $20 + Rotación Gratis de por Vida al comprar 4 Llantas!'}
          </span>
          <button
            type="button"
            onClick={onViewCoupons}
            className="underline hover:text-emerald-200 font-bold ml-1 cursor-pointer transition-colors"
          >
            {language === 'en' ? 'View Voucher' : 'Ver Cupón'} →
          </button>
        </div>
      </div>

      {/* Main Hero Viewport */}
      <div className="relative min-h-[580px] lg:min-h-[640px] flex items-center">
        {/* Background Image with High Contrast Automotive Dark Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_prosperity_tires_1791970739401.jpg"
            alt="Prosperity Tire Center modern workshop and showroom"
            className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
          {/* Gradients to blend into slate-950 */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          {/* Subtle green ambient glow */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl space-y-6">
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold tracking-wider uppercase font-heading">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.tagline}</span>
            </div>

            {/* Chiseled Bold Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white uppercase italic leading-[1.08] text-balance">
              Premium Tires.{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500 bg-clip-text text-transparent">
                Precision Service.
              </span>{' '}
              Unbeatable Value.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              {language === 'en'
                ? 'Washington DC & Maryland’s premier independent tire center. Same-day mounting, computerized laser balancing, factory alignments, and verified inspected used tires across 4 regional service centers.'
                : 'El centro de llantas independiente líder en Washington DC y Maryland. Montaje el mismo día, balanceo computarizado, alineación láser y llantas usadas inspeccionadas en nuestras 4 sedes.'}
            </p>

            {/* Quick action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={onExploreTires}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-slate-950 font-heading font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-950/60 transition-all duration-150 cursor-pointer"
              >
                <span>{language === 'en' ? 'Find Tires By Size' : 'Buscar Llantas'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onBookService}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/60 text-white font-heading font-bold text-sm uppercase tracking-wider transition-all duration-150 cursor-pointer"
              >
                <Wrench className="w-4 h-4 text-emerald-400" />
                <span>{t.scheduleService}</span>
              </button>

              <button
                type="button"
                onClick={onViewCoupons}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/60 text-emerald-300 font-semibold text-sm transition-all duration-150 cursor-pointer"
              >
                <span>{language === 'en' ? 'Deals & Gas Card' : 'Ver Cupones'}</span>
              </button>
            </div>

            {/* Key Service Highlights bullet list */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mounting & Balancing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Laser Wheel Alignment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Flat Tire Plug & Patch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Inspected Used Tires</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Credentials Strip (Below Hero) */}
      <div className="bg-slate-900/95 border-t border-slate-800 px-4 py-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-800/40 text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold text-white tracking-wide">1-Year Full Warranty</div>
              <div className="text-[11px] text-slate-400">All installations guaranteed</div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-2 py-1 pt-3 md:pt-1">
            <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-800/40 text-emerald-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold text-white tracking-wide">4 Regional Centers</div>
              <div className="text-[11px] text-slate-400">Edgewater, Brooklyn, Rockville, DC</div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-2 py-1 pt-3 md:pt-1">
            <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-800/40 text-emerald-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold text-white tracking-wide">5.0 ★ Google & Yelp</div>
              <div className="text-[11px] text-slate-400">Trusted by over 12,000 drivers</div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-2 py-1 pt-3 md:pt-1">
            <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-800/40 text-emerald-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold text-white tracking-wide">No Credit Needed</div>
              <div className="text-[11px] text-slate-400">Acima & Snap 90-day purchase option</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
