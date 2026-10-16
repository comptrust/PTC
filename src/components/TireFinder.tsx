import React, { useState } from 'react';
import { Search, RotateCcw, Car, Disc, Layers, Check } from 'lucide-react';
import { VEHICLE_MAKES, POPULAR_VEHICLES, COMMON_TIRE_SIZES, TRANSLATIONS } from '../data/websiteData';
import { Language } from '../types';

interface TireFinderProps {
  language: Language;
  onFilterApply: (filters: {
    width?: number;
    ratio?: number;
    rim?: number;
    brand?: string;
    condition?: 'all' | 'new' | 'used';
  }) => void;
}

export const TireFinder: React.FC<TireFinderProps> = ({ language, onFilterApply }) => {
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<'size' | 'vehicle' | 'brand'>('size');

  // Search by size states
  const [selectedWidth, setSelectedWidth] = useState<string>('');
  const [selectedRatio, setSelectedRatio] = useState<string>('');
  const [selectedRim, setSelectedRim] = useState<string>('');

  // Search by vehicle states
  const [selectedMake, setSelectedMake] = useState<string>('Toyota');
  const [selectedModel, setSelectedModel] = useState<string>('Camry');
  const [selectedYear, setSelectedYear] = useState<string>('2022');

  // Search by brand state
  const [selectedBrand, setSelectedBrand] = useState<string>('');

  const widths = [175, 185, 195, 205, 215, 225, 235, 245, 255, 265, 275];
  const ratios = [40, 45, 50, 55, 60, 65, 70, 75];
  const rims = [14, 15, 16, 17, 18, 19, 20, 22];
  const brands = [
    'Michelin', 'Goodyear', 'Continental', 'Firestone', 'Fuzion',
    'Bridgestone', 'Pirelli', 'Dunlop', 'Hankook'
  ];

  const handleSizeSearch = () => {
    onFilterApply({
      width: selectedWidth ? Number(selectedWidth) : undefined,
      ratio: selectedRatio ? Number(selectedRatio) : undefined,
      rim: selectedRim ? Number(selectedRim) : undefined,
    });
  };

  const handleVehicleSearch = () => {
    const config = POPULAR_VEHICLES[selectedMake];
    if (config) {
      // Find matching size from vehicle
      const sizeStr = config.commonTire; // e.g. "205/55R16"
      const match = sizeStr.match(/(\d+)\/(\d+)R(\d+)/);
      if (match) {
        onFilterApply({
          width: Number(match[1]),
          ratio: Number(match[2]),
          rim: Number(match[3]),
        });
        return;
      }
    }
    onFilterApply({});
  };

  const handleBrandSearch = () => {
    onFilterApply({
      brand: selectedBrand || undefined,
    });
  };

  const handleReset = () => {
    setSelectedWidth('');
    setSelectedRatio('');
    setSelectedRim('');
    setSelectedBrand('');
    onFilterApply({});
  };

  const handleQuickSize = (sizeStr: string) => {
    const match = sizeStr.match(/(\d+)\/(\d+)R(\d+)/);
    if (match) {
      setSelectedWidth(match[1]);
      setSelectedRatio(match[2]);
      setSelectedRim(match[3]);
      onFilterApply({
        width: Number(match[1]),
        ratio: Number(match[2]),
        rim: Number(match[3]),
      });
    }
  };

  return (
    <div className="bg-slate-900 border border-emerald-950/80 rounded-2xl shadow-xl p-4 sm:p-6 max-w-7xl mx-auto relative z-20">
      {/* Title & Mode Switcher */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-emerald-400 font-bold font-heading">
            {language === 'en' ? 'Interactive Tire Fitment Engine' : 'Selector de Llantas Interactivo'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-heading text-white uppercase italic tracking-tight">
            {t.shopTires}
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 self-stretch sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('size')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'size'
                ? 'bg-emerald-600 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Disc className="w-3.5 h-3.5" />
            <span>{t.searchBySize}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('vehicle')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'vehicle'
                ? 'bg-emerald-600 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>{t.searchByVehicle}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('brand')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'brand'
                ? 'bg-emerald-600 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t.searchByBrand}</span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <div className="pt-4">
        {/* TAB 1: Search by Size */}
        {activeTab === 'size' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
              <div className="lg:col-span-3">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  1. {t.width} (mm)
                </label>
                <select
                  aria-label="Tire width"
                  value={selectedWidth}
                  onChange={(e) => setSelectedWidth(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white font-mono-num font-semibold focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="">{language === 'en' ? 'Select Width (e.g. 205)' : 'Seleccionar Ancho'}</option>
                  {widths.map((w) => (
                    <option key={w} value={w}>
                      {w} mm
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-3">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  2. {t.aspectRatio} (%)
                </label>
                <select
                  aria-label="Tire aspect ratio"
                  value={selectedRatio}
                  onChange={(e) => setSelectedRatio(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white font-mono-num font-semibold focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="">{language === 'en' ? 'Select Profile (e.g. 55)' : 'Seleccionar Perfil'}</option>
                  {ratios.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-3">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  3. {t.rimDiameter} (inches)
                </label>
                <select
                  aria-label="Tire rim diameter"
                  value={selectedRim}
                  onChange={(e) => setSelectedRim(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white font-mono-num font-semibold focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="">{language === 'en' ? 'Select Rim (e.g. 16")' : 'Seleccionar Rin'}</option>
                  {rims.map((rim) => (
                    <option key={rim} value={rim}>
                      {rim}&quot; Rim Diameter
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSizeSearch}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{t.findTiresBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  title={t.resetFilters}
                  className="p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Popular Size Pills */}
            <div className="flex items-center gap-2 flex-wrap pt-1 text-xs text-slate-400">
              <span className="font-semibold text-slate-300 text-[11px]">{language === 'en' ? 'Quick Sizes:' : 'Medidas Rápidas:'}</span>
              {COMMON_TIRE_SIZES.slice(0, 7).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => handleQuickSize(sz)}
                  className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 hover:border-emerald-500/80 hover:text-emerald-400 text-slate-300 font-mono-num text-[11px] transition-colors cursor-pointer"
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Search by Vehicle */}
        {activeTab === 'vehicle' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
              <div className="lg:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  1. Year
                </label>
                <select
                  aria-label="Vehicle year"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white font-mono-num font-semibold focus:outline-none transition-colors cursor-pointer"
                >
                  {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2012, 2010].map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-3">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  2. Make
                </label>
                <select
                  aria-label="Vehicle make"
                  value={selectedMake}
                  onChange={(e) => {
                    const make = e.target.value;
                    setSelectedMake(make);
                    if (POPULAR_VEHICLES[make]) {
                      setSelectedModel(POPULAR_VEHICLES[make].models[0]);
                    }
                  }}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white font-semibold focus:outline-none transition-colors cursor-pointer"
                >
                  {VEHICLE_MAKES.map((mk) => (
                    <option key={mk} value={mk}>
                      {mk}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-3">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  3. Model
                </label>
                <select
                  aria-label="Vehicle model"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white font-semibold focus:outline-none transition-colors cursor-pointer"
                >
                  {(POPULAR_VEHICLES[selectedMake]?.models || ['Base Model', 'Sedan', 'SUV']).map((mdl) => (
                    <option key={mdl} value={mdl}>
                      {mdl}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleVehicleSearch}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? `Show Tires for ${selectedMake}` : 'Buscar por Vehículo'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  title={t.resetFilters}
                  className="p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Search by Brand */}
        {activeTab === 'brand' && (
          <div className="space-y-3">
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
              {brands.map((b) => {
                const isSelected = selectedBrand === b;
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => {
                      setSelectedBrand(isSelected ? '' : b);
                      onFilterApply({ brand: isSelected ? undefined : b });
                    }}
                    className={`py-2 px-2 rounded-lg border text-center transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      isSelected
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-400 font-bold shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <span className="font-heading font-bold uppercase tracking-wider text-xs truncate">{b}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={handleBrandSearch}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Filter by Selected Brand' : 'Filtrar por Marca'}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                title={t.resetFilters}
                className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
