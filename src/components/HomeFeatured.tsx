import React from 'react';
import { ArrowRight, Wrench, ShieldCheck, MapPin, Phone, Star, Truck, CheckCircle2, Sparkles, Clock, ChevronRight } from 'lucide-react';
import { TIRE_PRODUCTS, LOCATIONS, SERVICES, GOOGLE_REVIEWS } from '../data/websiteData';
import { TireProduct, LocationInfo, ServiceItem, Language } from '../types';
import storefrontImg from '../assets/images/storefront_6975_building.jpg';

interface HomeFeaturedProps {
  language: Language;
  onAddToCart: (tire: TireProduct, quantity?: number) => void;
  onBookWithTire: (tire: TireProduct) => void;
  onBookService: (service: ServiceItem) => void;
  onSelectLocationForBooking: (loc: LocationInfo) => void;
  setActiveTab: (tab: string) => void;
}

export const HomeFeatured: React.FC<HomeFeaturedProps> = ({
  language,
  onAddToCart,
  onBookWithTire,
  onBookService,
  onSelectLocationForBooking,
  setActiveTab,
}) => {
  const isEn = language === 'en';
  const flagshipLocation = LOCATIONS.find((l) => l.id === 'brooklyn') || LOCATIONS[1];
  const featuredTires = TIRE_PRODUCTS.slice(0, 3);
  const coreServices = SERVICES.slice(0, 4);
  const topReviews = GOOGLE_REVIEWS.slice(0, 2);

  return (
    <div className="space-y-16 py-10">
      {/* 1. FAST CATEGORY GATEWAYS (4 Clean Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Shop Tires */}
          <div
            onClick={() => setActiveTab('shop')}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/60 transition-all duration-200 cursor-pointer group flex flex-col justify-between hover:shadow-lg hover:shadow-emerald-950/40"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-black text-lg text-white uppercase italic group-hover:text-emerald-400 transition-colors">
                {isEn ? 'New Tires Catalog' : 'Catálogo de Llantas'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isEn ? 'Top tier brands in stock with same-day mounting & computerized balancing.' : 'Marcas líderes con montaje y balanceo el mismo día.'}
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider font-heading">
              <span>{isEn ? 'Browse 50+ Sizes' : 'Ver Tamaños'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Inspected Used Tires */}
          <div
            onClick={() => setActiveTab('used-tires')}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/60 transition-all duration-200 cursor-pointer group flex flex-col justify-between hover:shadow-lg hover:shadow-emerald-950/40"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-black text-lg text-white uppercase italic group-hover:text-emerald-400 transition-colors">
                {isEn ? 'Inspected Used Tires' : 'Llantas Usadas'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isEn ? 'Pressure-tested & tread-certified pre-owned tires starting at just $45.' : 'Llantas certificadas y probadas desde $45.'}
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider font-heading">
              <span>{isEn ? 'Shop Used Stock' : 'Ver Usadas'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Auto Repair & Services */}
          <div
            onClick={() => setActiveTab('services')}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/60 transition-all duration-200 cursor-pointer group flex flex-col justify-between hover:shadow-lg hover:shadow-emerald-950/40"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-black text-lg text-white uppercase italic group-hover:text-emerald-400 transition-colors">
                {isEn ? 'Shop Auto Services' : 'Servicios de Taller'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isEn ? 'Laser alignments, brake service, TPMS sensors, and flat repairs.' : 'Alineación láser, frenos, sensores TPMS y reparación.'}
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider font-heading">
              <span>{isEn ? 'View Services & Rates' : 'Ver Tarifas'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Mobile Tire Truck */}
          <div
            onClick={() => setActiveTab('mobile-truck')}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/60 transition-all duration-200 cursor-pointer group flex flex-col justify-between hover:shadow-lg hover:shadow-emerald-950/40"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-black text-lg text-white uppercase italic group-hover:text-emerald-400 transition-colors">
                {isEn ? 'Mobile Tire Truck' : 'Camión Móvil'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isEn ? 'We come to your home or office with our fully-equipped Ford mobile van.' : 'Vamos a tu casa u oficina con nuestra unidad móvil.'}
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider font-heading">
              <span>{isEn ? 'Book Mobile Van' : 'Reservar Móvil'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR TIRES IN STOCK (Crisp 3-Card Row) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider font-heading">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{isEn ? 'Featured Inventory' : 'Inventario Destacado'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-white uppercase italic tracking-tight">
              {isEn ? 'Popular Tires Ready Today' : 'Llantas Populares Listas Hoy'}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('shop')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-wider font-heading cursor-pointer self-start sm:self-auto"
          >
            <span>{isEn ? 'View All 50+ In Stock' : 'Ver Todas las 50+'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTires.map((tire) => (
            <div
              key={tire.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-5 flex flex-col justify-between transition-all duration-200 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider font-heading bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    {tire.brand}
                  </span>
                  <span className="text-xs text-slate-400 font-mono-num font-bold">
                    {tire.size}
                  </span>
                </div>

                <div className="h-36 bg-slate-950/80 rounded-xl flex items-center justify-center relative overflow-hidden border border-slate-800/60 p-3">
                  <div className="relative w-24 h-24 rounded-full border-8 border-slate-800 flex items-center justify-center shadow-inner group-hover:border-slate-700 transition-colors">
                    <div className="w-14 h-14 rounded-full border-4 border-slate-700 flex items-center justify-center bg-slate-900">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                        <span className="text-[9px] font-mono-num font-black text-emerald-400">{tire.rim}&quot;</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/30" />
                  </div>

                  <span className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-black uppercase font-heading ${
                    tire.condition === 'new' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-emerald-300'
                  }`}>
                    {tire.condition === 'new' ? 'NEW' : 'USED'}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-black text-white text-base uppercase leading-snug line-clamp-1">
                    {tire.model}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                    {isEn ? tire.category : 'Toda Temporada'} · {tire.warrantyMiles ? `${tire.warrantyMiles.toLocaleString()} mi` : 'Guaranteed'}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <div>
                  <div className="text-xl font-black font-heading text-white font-mono-num">
                    ${tire.price}
                    <span className="text-[11px] font-normal text-slate-400 font-sans">/ea</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold">
                    ✓ {isEn ? 'In Stock · Same Day' : 'En Existencia'}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onAddToCart(tire, 4)}
                    className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    {isEn ? 'Add 4' : '+4 Llantas'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onBookWithTire(tire)}
                    className="px-2.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-heading font-bold cursor-pointer transition-colors"
                    title={isEn ? 'Book Installation' : 'Reservar Montaje'}
                  >
                    {isEn ? 'Install' : 'Montar'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CORE SERVICES SNAPSHOT (4 Compact Service Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider font-heading">
              <Wrench className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isEn ? 'Certified Auto Shop' : 'Taller Mecánico Certificado'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-white uppercase italic tracking-tight">
              {isEn ? 'Fast Turnaround Services' : 'Servicios Rápidos'}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('services')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-wider font-heading cursor-pointer self-start sm:self-auto"
          >
            <span>{isEn ? 'All 8 Services & Pricing' : 'Ver Todos los Servicios'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {coreServices.map((svc) => (
            <div
              key={svc.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono-num font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    From ${svc.priceStart.toFixed(2)}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{svc.estimatedTime}</span>
                  </span>
                </div>
                <h3 className="font-heading font-black text-white text-base uppercase leading-snug group-hover:text-emerald-300 transition-colors">
                  {svc.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {svc.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onBookService(svc)}
                className="mt-4 w-full py-2 rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-slate-950 text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
              >
                {isEn ? 'Book Service' : 'Reservar Cita'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FLAGSHIP STOREFRONT & 4 REGIONAL LOCATIONS (Spotlight Banner) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 border border-emerald-500/40 p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-950 border border-slate-800 shadow-xl group">
            <img
              src={storefrontImg}
              alt="Prosperity Tire Center 6975 Baltimore Annapolis Blvd Storefront Building"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-md rounded-xl p-2.5 border border-emerald-500/50 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-black text-emerald-400 font-heading">
                  Flagship Storefront
                </div>
                <div className="text-xs font-bold text-white font-heading">
                  6975 Baltimore Annapolis Blvd, MD
                </div>
              </div>
              <a
                href="tel:4435481002"
                className="px-2.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold font-heading flex items-center gap-1 hover:bg-emerald-400"
              >
                <Phone className="w-3 h-3" />
                <span>Call</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider font-heading mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>{isEn ? '4 Convenient Locations Across MD & DC' : '4 Ubicaciones en MD y DC'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-white uppercase italic tracking-tight">
                {isEn ? 'Visit Us Or We Come To You' : 'Visítanos o Vamos a Ti'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                {isEn
                  ? 'Drive in for immediate same-day service or schedule your slot online. Modern bays equipped with Corghi touchless tire changers and Hunter laser balancers.'
                  : 'Atención inmediata el mismo día o agenda tu cita en línea en cualquiera de nuestras 4 sedes regionales.'}
              </p>
            </div>

            {/* Quick 4 Locations Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              {LOCATIONS.map((loc) => (
                <div
                  key={loc.id}
                  onClick={() => {
                    onSelectLocationForBooking(loc);
                  }}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    loc.id === 'brooklyn'
                      ? 'bg-emerald-950/60 border-emerald-500/60 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold font-heading uppercase text-xs flex items-center gap-1 text-emerald-400">
                    <span>{loc.city}</span>
                    {loc.id === 'brooklyn' && <span className="text-[10px]">★ #6975</span>}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono-num mt-0.5">
                    {loc.phone}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onSelectLocationForBooking(flagshipLocation)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider cursor-pointer shadow-md transition-colors"
              >
                {isEn ? 'Book At Flagship Store' : 'Reservar en Sede Principal'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('locations')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white uppercase tracking-wider font-heading cursor-pointer"
              >
                <span>{isEn ? 'View Maps & Hours' : 'Ver Mapas y Horarios'}</span>
                <ChevronRight className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED GOOGLE REVIEWS & WARRANTY TRUST BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
              <span className="font-heading font-black text-white text-sm ml-1.5">4.9 / 5.0</span>
            </div>
            <div className="text-xs text-slate-300">
              <span className="font-bold text-white">400+ Verified DMV Drivers</span> on Google Reviews · <span className="text-emerald-400 font-semibold">1-Year Full Workmanship Warranty</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-xs text-slate-400 italic max-w-md">
            "{topReviews[0]?.text.slice(0, 110)}..."
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-heading font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors shrink-0"
          >
            {isEn ? 'Read All Reviews' : 'Leer Reseñas'} →
          </button>
        </div>
      </section>
    </div>
  );
};
