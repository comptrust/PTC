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
    <div className="bg-slate-900 border border-emerald-950 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-7xl mx-auto -mt-8 relative z-20">
      {/* Title & Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold font-heading">
            {language === 'en' ? 'Interactive Tire Fitment Engine' : 'Selector de Llantas Interactivo'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-white uppercase italic tracking-tight">
            {t.shopTires}
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('size')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-md uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'size'
                ? 'bg-emerald-600 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Disc className="w-4 h-4" />
            <span>{t.searchBySize}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('vehicle')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-md uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'vehicle'
                ? 'bg-emerald-600 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>{t.searchByVehicle}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('brand')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-md uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'brand'
                ? 'bg-emerald-600 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t.searchByBrand}</span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <div className="pt-6">
        {/* TAB 1: Search by Size */}
        {activeTab === 'size' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  1. {t.width} (mm)
                </label>
                <select
                  aria-label="Tire width"
                  value={selectedWidth}
                  onChange={(e) => setSelectedWidth(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3.5 py-3 text-sm text-white font-mono-num font-semibold focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="">{language === 'en' ? 'Select Width (e.g. 205)' : 'Seleccionar Ancho'}</option>
                  {widths.map((w) => (
                    <option key={w} value={w}>
                      {w} mm
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  2. {t.aspectRatio} (%)
                </label>
                <select
                  aria-label="Tire aspect ratio"
                  value={selectedRatio}
                  onChange={(e) => setSelectedRatio(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3.5 py-3 text-sm text-white font-mono-num font-semibold focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="">{language === 'en' ? 'Select Profile (e.g. 55)' : 'Seleccionar Perfil'}</option>
                  {ratios.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  3. {t.rimDiameter} (inches)
                </label>
                <select
                  aria-label="Tire rim diameter"
                  value={selectedRim}
                  onChange={(e) => setSelectedRim(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3.5 py-3 text-sm text-white font-mono-num font-semibold focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="">{language === 'en' ? 'Select Rim (e.g. 16")' : 'Seleccionar Rin'}</option>
                  {rims.map((rim) => (
                    <option key={rim} value={rim}>
                      {rim}&quot; Rim Diameter
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Popular Size Pills */}
            <div className="flex items-center gap-2 flex-wrap pt-1 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">{language === 'en' ? 'Common Sizes:' : 'Medidas Populares:'}</span>
              {COMMON_TIRE_SIZES.slice(0, 6).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => handleQuickSize(sz)}
                  className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 hover:border-emerald-500/80 hover:text-emerald-400 text-slate-300 font-mono-num transition-colors cursor-pointer"
                >
                  {sz}
                </button>
              ))}
            </div>

            {/* Search and Reset Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleSizeSearch}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>{t.findTiresBtn}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-heading font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.resetFilters}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Search by Vehicle */}
        {activeTab === 'vehicle' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  1. Year
                </label>
                <select
                  aria-label="Vehicle year"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3.5 py-3 text-sm text-white font-mono-num font-semibold focus:outline-none transition-colors cursor-pointer"
                >
                  {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2012, 2010].map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
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
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3.5 py-3 text-sm text-white font-semibold focus:outline-none transition-colors cursor-pointer"
                >
                  {VEHICLE_MAKES.map((mk) => (
                    <option key={mk} value={mk}>
                      {mk}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  3. Model
                </label>
                <select
                  aria-label="Vehicle model"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3.5 py-3 text-sm text-white font-semibold focus:outline-none transition-colors cursor-pointer"
                >
                  {(POPULAR_VEHICLES[selectedMake]?.models || ['Base Model', 'Sedan', 'SUV']).map((mdl) => (
                    <option key={mdl} value={mdl}>
                      {mdl}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleVehicleSearch}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>{language === 'en' ? `Show Tires for ${selectedYear} ${selectedMake} ${selectedModel}` : 'Buscar Llantas para este Vehículo'}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-heading font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.resetFilters}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: Search by Brand */}
        {activeTab === 'brand' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
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
                    className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400 font-bold shadow-lg shadow-emerald-950/50'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <span className="font-heading font-black uppercase tracking-wider text-sm">{b}</span>
                    {isSelected && <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1"><Check className="w-3 h-3" /> Selected</span>}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleBrandSearch}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>{language === 'en' ? 'Filter by Selected Brand' : 'Filtrar por Marca'}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-heading font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.resetFilters}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
