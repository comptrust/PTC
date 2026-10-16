import React, { useState } from 'react';
import { Phone, QrCode, MapPin, CheckCircle2, RotateCw, ExternalLink, Wrench, Shield, Award, Fuel } from 'lucide-react';
import { Language } from '../types';
import { LOCATIONS } from '../data/websiteData';
import { ProsperityLogo } from './ProsperityLogo';
import flyerImg from '../assets/images/prosperity_brand_flyer_1791972077350.jpg';

interface BrandShowcaseProps {
  language: Language;
  onBookService: () => void;
  onClaimPromo: () => void;
}

export const BrandShowcase: React.FC<BrandShowcaseProps> = ({
  language,
  onBookService,
  onClaimPromo,
}) => {
  const [cardSide, setCardSide] = useState<'front' | 'back'>('front');

  return (
    <section className="py-16 bg-slate-950 border-b border-emerald-950/80 relative overflow-hidden">
      {/* Background carbon honeycomb accent */}
      <div className="absolute inset-0 bg-honeycomb opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>Official Brand Identity & Locations</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-heading text-white uppercase italic tracking-tight">
            Fast Service. Safe Driving.{' '}
            <span className="text-emerald-400">Your Prosperity.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            {language === 'en'
              ? 'Locally owned & operated under General Manager Alexy. Trusted throughout Maryland and Washington DC with factory-certified equipment, transparent pricing, and instant fleet discounts.'
              : 'Empresa local dirigida por el Gerente General Alexy. Servicio confiable en todo Maryland y Washington DC con equipos certificados y descuentos para flotas.'}
          </p>
        </div>

        {/* Feature Banner: Official Commercial Flyer Graphic */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/50 shadow-2xl group">
          <img
            src={flyerImg}
            alt="Prosperity Tire Center Official Driver Promotions & Service Offers"
            className="w-full h-auto object-cover max-h-[500px]"
            referrerPolicy="no-referrer"
          />
          {/* Subtle gradient overlay to enhance legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent lg:hidden" />

          {/* Quick claim overlay on desktop */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-3">
            <button
              type="button"
              onClick={onClaimPromo}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-heading font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-emerald-950 cursor-pointer transition-all transform hover:-translate-y-0.5"
            >
              Claim Special Offers Online
            </button>
          </div>
        </div>

        {/* 2-Column: Interactive Official Business Card & Hexagonal Services */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          {/* Left Column: Interactive Digital Business Card (Matching exact user business card upload) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-heading">
                Official Business Card (Click to Flip)
              </span>
              <button
                type="button"
                onClick={() => setCardSide(cardSide === 'front' ? 'back' : 'front')}
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-emerald-400 font-semibold cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Flip to {cardSide === 'front' ? 'Back (Locations)' : 'Front (Logo)'}</span>
              </button>
            </div>

            {/* Business Card Container */}
            <div
              onClick={() => setCardSide(cardSide === 'front' ? 'back' : 'front')}
              className="cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
            >
              {cardSide === 'front' ? (
                /* FRONT OF CARD */
                <div className="w-full rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-black border-2 border-emerald-500/80 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
                  {/* Subtle card lighting edge */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                  {/* Logo lockup with transparent vector logo */}
                  <div className="flex items-center justify-center">
                    <ProsperityLogo size="lg" />
                  </div>

                  {/* Hexagon Services Badges */}
                  <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-heading">
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <div className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-500/60 flex items-center justify-center text-[10px]">⚙</div>
                      <span>MOUNTING</span>
                    </div>
                    <span className="text-slate-600">|</span>
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <div className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-500/60 flex items-center justify-center text-[10px]">⚖</div>
                      <span>BALANCING</span>
                    </div>
                    <span className="text-slate-600">|</span>
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <div className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-500/60 flex items-center justify-center text-[10px]">🔧</div>
                      <span>REPAIR</span>
                    </div>
                  </div>

                  {/* Tagline */}
                  <div className="text-center font-heading font-black text-xs sm:text-sm tracking-widest text-emerald-400 uppercase">
                    FAST SERVICE. SAFE DRIVING. YOUR PROSPERITY.
                  </div>

                  {/* Bottom contacts & Alexy */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">
                        TOLL-FREE NUMBER
                      </span>
                      <a href="tel:8883759048" className="text-base sm:text-lg font-mono-num font-black text-white hover:text-emerald-400">
                        (888) 375-9048
                      </a>
                    </div>

                    <div className="text-right">
                      <div className="text-base sm:text-lg font-black font-heading tracking-wider uppercase text-white">
                        ALEXY
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                        GENERAL MANAGER
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* BACK OF CARD (Locations & QR codes) */
                <div className="w-full rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-black border-2 border-emerald-500/80 p-6 sm:p-7 space-y-4 shadow-2xl relative">
                  <div className="space-y-3 divide-y divide-slate-800 text-xs">
                    {/* Edgewater */}
                    <div className="pt-2 first:pt-0 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-emerald-400 font-heading font-black uppercase tracking-wider text-sm">
                          EDGEWATER LOCATION
                        </div>
                        <div className="text-slate-300 font-medium">192 Mayo Rd., Edgewater, MD 21037</div>
                        <a href="tel:3014791355" className="text-white font-mono-num font-bold hover:underline">
                          301-479-1355
                        </a>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="w-10 h-10 rounded bg-white text-slate-950 flex items-center justify-center p-1 font-mono text-[9px] font-bold">
                          [QR]
                        </div>
                        <span className="text-[9px] text-slate-500 block uppercase">Directions</span>
                      </div>
                    </div>

                    {/* Brooklyn */}
                    <div className="pt-3 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-emerald-400 font-heading font-black uppercase tracking-wider text-sm">
                          BROOKLYN LOCATION
                        </div>
                        <div className="text-slate-300 font-medium">6975 Baltimore Annapolis Blvd, Brooklyn, MD, 21225</div>
                        <a href="tel:4435481002" className="text-white font-mono-num font-bold hover:underline">
                          443-548-1002
                        </a>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="w-10 h-10 rounded bg-white text-slate-950 flex items-center justify-center p-1 font-mono text-[9px] font-bold">
                          [QR]
                        </div>
                        <span className="text-[9px] text-slate-500 block uppercase">Directions</span>
                      </div>
                    </div>

                    {/* Rockville */}
                    <div className="pt-3 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-emerald-400 font-heading font-black uppercase tracking-wider text-sm">
                          ROCKVILLE LOCATION
                        </div>
                        <div className="text-slate-300 font-medium">200 N Washington Street, Rockville, MD 20850</div>
                        <a href="tel:3016371780" className="text-white font-mono-num font-bold hover:underline">
                          Tel 301-637-1780
                        </a>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="w-10 h-10 rounded bg-white text-slate-950 flex items-center justify-center p-1 font-mono text-[9px] font-bold">
                          [QR]
                        </div>
                        <span className="text-[9px] text-slate-500 block uppercase">Directions</span>
                      </div>
                    </div>
                  </div>

                  {/* Web domain badge */}
                  <div className="pt-2 border-t border-slate-800 text-center">
                    <span className="font-heading font-bold text-emerald-400 text-sm tracking-wider">
                      https://prosperitytires.com
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Fleet & Driver Appreciation Perks (Matching flyer promotions) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-heading">
                  Exclusive Commercial & Driver Benefits
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-heading text-white uppercase italic tracking-tight">
                  Driving Prosperity For Everyday Workers
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We recognize that delivery drivers, rideshare operators, and local commuters keep our community moving. Take advantage of our active store discounts every day:
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400 shrink-0">
                    <Fuel className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white uppercase tracking-tight">
                      GET $20 FREE GASOLINE
                    </div>
                    <div className="text-xs text-slate-400">
                      When buying any set of 4 new tires at any location. Issued as a gas card upon installation.
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400 shrink-0">
                    <RotateCw className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white uppercase tracking-tight">
                      GET FREE LIFETIME ROTATION
                    </div>
                    <div className="text-xs text-slate-400">
                      Complimentary rotation every 5,000 miles for the lifespan of your 4 new tires.
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white uppercase tracking-tight">
                      15% OFF FEDEX & AMAZON DRIVERS
                    </div>
                    <div className="text-xs text-slate-400">
                      Plus 10% off for all Uber and Lyft drivers. Show your driver app profile to receive discount.
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  Pillars: <span className="text-emerald-400 font-semibold">Local & Reliable · Quality Service · Customer Focused</span>
                </div>
                <button
                  type="button"
                  onClick={onBookService}
                  className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider cursor-pointer transition-colors"
                >
                  Book Service Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
