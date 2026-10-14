import React, { useState, useMemo } from 'react';
import { Star, ShieldCheck, Check, Info, Plus, Calendar, Fuel, Tag } from 'lucide-react';
import { TireProduct, Language } from '../types';
import { TRANSLATIONS } from '../data/websiteData';

interface TireCatalogProps {
  tires: TireProduct[];
  language: Language;
  onAddToCart: (tire: TireProduct, quantity?: number) => void;
  onBookWithTire: (tire: TireProduct) => void;
  activeFilters: {
    width?: number;
    ratio?: number;
    rim?: number;
    brand?: string;
    condition?: 'all' | 'new' | 'used';
  };
  setActiveFilters: React.Dispatch<React.SetStateAction<{
    width?: number;
    ratio?: number;
    rim?: number;
    brand?: string;
    condition?: 'all' | 'new' | 'used';
  }>>;
}

export const TireCatalog: React.FC<TireCatalogProps> = ({
  tires,
  language,
  onAddToCart,
  onBookWithTire,
  activeFilters,
  setActiveFilters,
}) => {
  const t = TRANSLATIONS[language];
  const [conditionTab, setConditionTab] = useState<'all' | 'new' | 'used'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedTireForModal, setSelectedTireForModal] = useState<TireProduct | null>(null);

  // Filter and sort tires
  const filteredTires = useMemo(() => {
    return tires
      .filter((tire) => {
        // Condition filter
        if (conditionTab !== 'all' && tire.condition !== conditionTab) return false;
        // Width filter
        if (activeFilters.width && tire.width !== activeFilters.width) return false;
        // Ratio filter
        if (activeFilters.ratio && tire.ratio !== activeFilters.ratio) return false;
        // Rim filter
        if (activeFilters.rim && tire.rim !== activeFilters.rim) return false;
        // Brand filter
        if (activeFilters.brand && !tire.brand.toLowerCase().includes(activeFilters.brand.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [tires, conditionTab, activeFilters, sortBy]);

  return (
    <section id="shop-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 tracking-wider uppercase font-heading">
            <Tag className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Direct Warehouse Inventory' : 'Inventario de Bodega Directo'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-white uppercase italic tracking-tight mt-1">
            {language === 'en' ? 'Available Tire Inventory' : 'Catálogo de Llantas Disponibles'}
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            {language === 'en'
              ? 'Browse premium new tire brands and certified inspected pre-owned tires ready for immediate mounting at our 4 service centers.'
              : 'Explore marcas líderes nuevas y llantas usadas inspeccionadas listas para instalación inmediata en nuestras 4 sedes.'}
          </p>
        </div>

        {/* Filter controls bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Condition selector segmented control */}
          <div className="flex items-center p-1 bg-slate-900 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => setConditionTab('all')}
              className={`px-3 py-1.5 text-xs font-bold uppercase rounded-md transition-colors cursor-pointer ${
                conditionTab === 'all'
                  ? 'bg-emerald-600 text-slate-950 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.allConditions}
            </button>
            <button
              type="button"
              onClick={() => setConditionTab('new')}
              className={`px-3 py-1.5 text-xs font-bold uppercase rounded-md transition-colors cursor-pointer ${
                conditionTab === 'new'
                  ? 'bg-emerald-600 text-slate-950 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.newTiresOnly}
            </button>
            <button
              type="button"
              onClick={() => setConditionTab('used')}
              className={`px-3 py-1.5 text-xs font-bold uppercase rounded-md transition-colors cursor-pointer ${
                conditionTab === 'used'
                  ? 'bg-emerald-600 text-slate-950 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.usedTiresOnly}
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            aria-label="Sort tires by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="featured">{language === 'en' ? 'Sort: Featured' : 'Ordenar: Destacados'}</option>
            <option value="price-asc">{t.priceLowHigh}</option>
            <option value="price-desc">{t.priceHighLow}</option>
            <option value="rating">{t.ratingHigh}</option>
          </select>
        </div>
      </div>

      {/* Active Filter Indicators */}
      {(activeFilters.width || activeFilters.rim || activeFilters.brand) && (
        <div className="flex items-center gap-2 pt-4 flex-wrap text-xs text-slate-300">
          <span className="font-semibold text-emerald-400">{language === 'en' ? 'Active Filters:' : 'Filtros Activos:'}</span>
          {activeFilters.width && (
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-white font-mono-num">
              Width: {activeFilters.width}mm
            </span>
          )}
          {activeFilters.ratio && (
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-white font-mono-num">
              Ratio: {activeFilters.ratio}%
            </span>
          )}
          {activeFilters.rim && (
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-white font-mono-num">
              Rim: {activeFilters.rim}&quot;
            </span>
          )}
          {activeFilters.brand && (
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-white">
              Brand: {activeFilters.brand}
            </span>
          )}
          <button
            type="button"
            onClick={() => setActiveFilters({})}
            className="text-emerald-400 hover:underline text-xs font-bold ml-2 cursor-pointer"
          >
            {language === 'en' ? 'Clear All Filters' : 'Borrar Filtros'}
          </button>
        </div>
      )}

      {/* Tire Grid */}
      {filteredTires.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800 mt-6">
          <p className="text-base text-slate-300 font-semibold">
            {language === 'en'
              ? 'No exact matches found for the selected specifications.'
              : 'No se encontraron llantas exactas con esas medidas.'}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'en'
              ? 'We have thousands of tires in our warehouse. Call us at (888) 375-9048 or reset your filters.'
              : 'Contamos con miles de llantas en bodega. Llámenos al (888) 375-9048 o restablezca los filtros.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveFilters({});
              setConditionTab('all');
            }}
            className="mt-4 px-4 py-2 bg-emerald-600 text-slate-950 font-heading font-black text-xs uppercase tracking-wider rounded-lg"
          >
            {t.resetFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
          {filteredTires.map((tire) => {
            const setOfFourPrice = tire.price * 4;
            const isEligibleForFreeGas = tire.condition === 'new';

            return (
              <div
                key={tire.id}
                className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 group relative"
              >
                {/* Condition Tag */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono-num font-bold text-emerald-400 uppercase tracking-wider">
                      {tire.condition === 'new' ? 'Brand New Tire' : 'Inspected Pre-Owned'}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400 uppercase text-[11px] font-medium">{tire.category}</span>
                  </div>

                  {tire.condition === 'used' && tire.treadDepth && (
                    <span className="text-[11px] font-mono-num font-bold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60 text-emerald-300">
                      {tire.treadDepth}
                    </span>
                  )}
                </div>

                {/* Tire Visual & Title */}
                <div className="py-4 space-y-3">
                  {/* Tire Graphical Representation */}
                  <div className="w-full h-36 bg-slate-950/80 rounded-xl flex items-center justify-center relative overflow-hidden border border-slate-800/60 p-3">
                    {/* Stylized tire visual graphic */}
                    <div className="relative w-28 h-28 rounded-full border-8 border-slate-800 flex items-center justify-center shadow-inner group-hover:border-slate-700 transition-colors">
                      <div className="w-16 h-16 rounded-full border-4 border-slate-700 flex items-center justify-center bg-slate-900">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                          <span className="text-[8px] font-mono-num font-black text-emerald-400">{tire.rim}&quot;</span>
                        </div>
                      </div>
                      {/* Tread notches */}
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/30" />
                    </div>

                    {/* Promo sticker on cards */}
                    {isEligibleForFreeGas && (
                      <div className="absolute top-2 right-2 bg-emerald-950/90 border border-emerald-600/50 rounded px-2 py-0.5 text-[10px] font-bold text-emerald-300 flex items-center gap-1 shadow">
                        <Fuel className="w-3 h-3 text-emerald-400" />
                        <span>+$20 Gas Card on 4</span>
                      </div>
                    )}
                  </div>

                  {/* Brand & Model */}
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{tire.brand}</div>
                    <h3 className="text-lg font-black font-heading text-white tracking-tight leading-snug">
                      {tire.model}
                    </h3>
                  </div>

                  {/* Size Specs Pill / Badge */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-white font-mono-num font-bold text-xs tracking-wider">
                      {tire.size}
                    </span>
                    <span className="text-xs font-mono-num text-slate-400">
                      Speed: {tire.speedRating}
                    </span>
                    {tire.warrantyMiles > 0 && (
                      <span className="text-xs text-slate-400">
                        · {tire.warrantyMiles.toLocaleString()} Mi. Warranty
                      </span>
                    )}
                  </div>

                  {/* Customer Rating */}
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="font-mono-num font-semibold text-slate-300">{tire.rating.toFixed(1)}</span>
                    <span>({tire.reviewsCount} verified reviews)</span>
                  </div>

                  {/* Brief Description */}
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {tire.description}
                  </p>
                </div>

                {/* Pricing & Actions */}
                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-black font-mono-num text-white">${tire.price}</span>
                        <span className="text-xs text-slate-400">{t.perTire}</span>
                        {tire.originalPrice && (
                          <span className="text-xs font-mono-num text-slate-500 line-through ml-1">
                            ${tire.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-emerald-400 font-mono-num font-medium">
                        Set of 4: <span className="font-bold">${setOfFourPrice}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedTireForModal(tire)}
                      className="text-xs text-slate-400 hover:text-emerald-400 underline font-medium cursor-pointer"
                    >
                      {language === 'en' ? 'View Specs' : 'Ver Detalles'}
                    </button>
                  </div>

                  {/* Action CTA Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onAddToCart(tire, 4)}
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-slate-950 font-heading font-black text-xs uppercase tracking-wider shadow transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Quote Set (4)' : 'Cotizar 4'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onBookWithTire(tire)}
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/60 text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{language === 'en' ? 'Install Here' : 'Instalar'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tire Spec Modal */}
      {selectedTireForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-emerald-950 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setSelectedTireForModal(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer"
            >
              ✕
            </button>

            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {selectedTireForModal.brand} · {selectedTireForModal.condition.toUpperCase()}
              </span>
              <h3 className="text-2xl font-black font-heading text-white tracking-tight">
                {selectedTireForModal.model}
              </h3>
              <p className="text-xs font-mono-num text-slate-300 mt-0.5">
                Size: {selectedTireForModal.size} | Speed Index: {selectedTireForModal.speedRating}
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
              {selectedTireForModal.description}
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Engineering Features:</span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedTireForModal.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-2xl font-black font-mono-num text-white">${selectedTireForModal.price} <span className="text-xs text-slate-400 font-normal">{t.perTire}</span></div>
                <div className="text-xs text-emerald-400 font-mono-num">Set of 4: ${selectedTireForModal.price * 4}</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(selectedTireForModal, 4);
                    setSelectedTireForModal(null);
                  }}
                  className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider cursor-pointer"
                >
                  Add 4 to Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
