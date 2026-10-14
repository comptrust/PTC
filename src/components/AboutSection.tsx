import React from 'react';
import { Award, ShieldCheck, HeartHandshake, Star, Quote, CheckCircle2, CreditCard, Sparkles } from 'lucide-react';
import { GOOGLE_REVIEWS, TRANSLATIONS } from '../data/websiteData';
import { Language } from '../types';

interface AboutSectionProps {
  language: Language;
  onBookService: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ language, onBookService }) => {
  const t = TRANSLATIONS[language];

  return (
    <section id="about-section" className="py-20 bg-slate-950 border-b border-emerald-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Story & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-heading">
              {language === 'en' ? 'Our Commitment & Heritage' : 'Nuestro Compromiso y Trayectoria'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-white uppercase italic tracking-tight leading-tight">
              {language === 'en' ? (
                <>
                  Fast Service. Safe Driving.{' '}
                  <span className="text-emerald-400">Your Prosperity.</span>
                </>
              ) : (
                <>
                  Servicio Rápido. Conducción Segura.{' '}
                  <span className="text-emerald-400">Su Prosperidad.</span>
                </>
              )}
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              {language === 'en'
                ? 'Prosperity Tire Center was founded with a singular driving mission: provide honest, rapid, and dealership-grade automotive tire care without corporate dealership markups. Over the years, we have grown from our original Washington, DC location into a premier 4-location regional network serving Edgewater, Brooklyn, Rockville, and the entire Capital Beltway.'
                : 'Prosperity Tire Center nació con una misión clara: ofrecer servicio de llantas honesto, rápido y de calidad de agencia sin sobreprecios. Hemos crecido desde nuestra sede en Washington, DC hasta convertirnos en una red de 4 centros que atienden Edgewater, Brooklyn, Rockville y toda el área metropolitana.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                  <span>1-Year Full Warranty</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every installation, mounting, and balancing service is backed by our full 12-month workmanship coverage.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <HeartHandshake className="w-5 h-5 shrink-0" />
                  <span>Leadership You Can Trust</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Led by General Manager Alexy, our technicians treat your family’s vehicle with genuine care and transparency.
                </p>
              </div>
            </div>

            {/* General Manager Quote Signature */}
            <div className="pt-2 p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-900/50 flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="font-heading font-black italic text-base text-white">
                  &ldquo;We don&apos;t just sell tires — we protect the people riding on them.&rdquo;
                </div>
                <div className="text-xs text-emerald-400 font-semibold mt-1">
                  Alexy — General Manager, Prosperity Tire Center
                </div>
              </div>

              <button
                type="button"
                onClick={onBookService}
                className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider cursor-pointer transition-colors"
              >
                Schedule Visit
              </button>
            </div>
          </div>

          {/* Right: Financing Card Spotlight (Acima / Snap No Credit Needed) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/70 border-2 border-emerald-500/50 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/60 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero Credit Worries</span>
              </div>
              <h3 className="text-2xl font-black font-heading text-white uppercase italic tracking-tight">
                No Credit Needed Financing
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Need tires today but want flexible payments? We partner with Acima and Snap Finance so you can ride safely now and pay over 90 days with early buyout perks.
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant approvals up to $5,000</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>90-Day Purchase Option available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Only active checking account and photo ID needed</span>
              </div>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Apply in 5 minutes in-store or online</span>
              <span className="font-mono-num font-bold text-emerald-400 text-xs uppercase">Fast Approval</span>
            </div>
          </div>
        </div>

        {/* Real Customer Testimonials */}
        <div className="space-y-8 pt-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="flex items-center justify-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white uppercase italic tracking-tight">
              {language === 'en' ? 'What Our Drivers Say' : 'Lo Que Opinan Nuestros Clientes'}
            </h3>
            <p className="text-xs text-slate-400">
              Verified 5.0 Star Ratings on Google Reviews and Yelp across our Maryland & DC branches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GOOGLE_REVIEWS.slice(0, 4).map((test) => (
              <div
                key={test.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-amber-400">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-500">{test.date}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    &ldquo;{test.text}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80">
                  <div className="text-xs font-bold text-white">{test.author}</div>
                  <div className="text-[11px] text-emerald-400 font-medium">
                    {test.highlightService || 'Verified Customer'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
