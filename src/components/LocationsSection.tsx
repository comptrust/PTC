import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, CheckCircle2, ShieldCheck, User, Calendar } from 'lucide-react';
import { LOCATIONS, TRANSLATIONS } from '../data/websiteData';
import { Language, LocationInfo } from '../types';

interface LocationsSectionProps {
  language: Language;
  onSelectLocationForBooking: (location: LocationInfo) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({
  language,
  onSelectLocationForBooking,
}) => {
  const t = TRANSLATIONS[language];
  const [selectedLocationId, setSelectedLocationId] = useState<string>(LOCATIONS[0].id);

  const selectedLoc = LOCATIONS.find((l) => l.id === selectedLocationId) || LOCATIONS[0];

  return (
    <section id="locations-section" className="py-20 bg-slate-950 border-b border-emerald-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-heading">
              {language === 'en' ? 'Serving Maryland & Washington DC' : 'Atendiendo Maryland y Washington DC'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-white uppercase italic tracking-tight mt-1">
              {language === 'en' ? 'Our Service Center Locations' : 'Nuestras Sedes de Servicio'}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              {language === 'en'
                ? 'Visit any of our 4 modern facilities for immediate tire mounting, balancing, repairs, and alignments with zero wait times.'
                : 'Visite cualquiera de nuestras 4 modernas sedes para montaje, balanceo, reparación y alineación de llantas sin demoras.'}
            </p>
          </div>

          <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-lg border border-slate-800 overflow-x-auto">
            {LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() => setSelectedLocationId(loc.id)}
                className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  selectedLocationId === loc.id
                    ? 'bg-emerald-600 text-slate-950 font-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {loc.city}, {loc.state}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Location Feature Card with Storefront Image */}
        <div className="bg-slate-900 border border-emerald-950 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left: Storefront Photo */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
            <img
              src="/src/assets/images/storefront_modern_service_1791970740906.jpg"
              alt={`${selectedLoc.name} facility`}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900" />
            <div className="absolute bottom-4 left-4 bg-slate-950/90 border border-emerald-600/60 rounded-xl px-4 py-2 backdrop-blur-sm">
              <span className="text-[10px] uppercase font-bold text-emerald-400">Official Facility</span>
              <div className="text-sm font-black font-heading text-white">{selectedLoc.name}</div>
            </div>
          </div>

          {/* Right: Detailed Location Information */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-heading">
                  {selectedLoc.city}, {selectedLoc.state} Regional Hub
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-heading text-white uppercase italic tracking-tight">
                  {selectedLoc.name}
                </h3>
              </div>

              {/* Address & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Physical Address</span>
                  </div>
                  <div className="text-white font-semibold text-sm">{selectedLoc.address}</div>
                  <div className="text-slate-400">{selectedLoc.city}, {selectedLoc.state} {selectedLoc.zip}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Direct Shop Line</span>
                  </div>
                  <a
                    href={`tel:${selectedLoc.phone}`}
                    className="text-emerald-400 hover:underline font-mono-num font-bold text-base block"
                  >
                    {selectedLoc.phoneDisplay}
                  </a>
                  <div className="text-[11px] text-slate-400">Toll-Free: {selectedLoc.tollFree}</div>
                </div>
              </div>

              {/* Hours & Management */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Operating Hours</span>
                  </div>
                  <div className="text-slate-200">
                    <span className="font-semibold text-white">Mon–Sat:</span> {selectedLoc.hoursWeekday}
                  </div>
                  <div className="text-slate-200">
                    <span className="font-semibold text-white">Sunday:</span> {selectedLoc.hoursSunday}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                    <User className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Store Leadership</span>
                  </div>
                  <div className="text-white font-semibold text-sm">{selectedLoc.manager}</div>
                  <div className="text-[11px] text-emerald-400 font-medium">Bilingual Staff (English & Spanish)</div>
                </div>
              </div>

              {/* Facility Features */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Location Highlights:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {selectedLoc.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-3">
              <a
                href={selectedLoc.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/60 text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-emerald-400" />
                <span>Get Directions (Google Maps)</span>
              </a>

              <a
                href={`tel:${selectedLoc.phone}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 font-heading font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Call Shop ({selectedLoc.phoneDisplay})</span>
              </a>

              <button
                type="button"
                onClick={() => onSelectLocationForBooking(selectedLoc)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/50 transition-colors cursor-pointer ml-auto"
              >
                <Calendar className="w-4 h-4" />
                <span>Book at {selectedLoc.city}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Location Cards Mini Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {LOCATIONS.map((loc) => {
            const isCurrent = loc.id === selectedLocationId;
            return (
              <div
                key={loc.id}
                onClick={() => setSelectedLocationId(loc.id)}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  isCurrent
                    ? 'bg-slate-900 border-emerald-500 shadow-md shadow-emerald-950/40'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  {loc.city}, {loc.state}
                </div>
                <div className="text-sm font-bold text-white mt-0.5">{loc.address}</div>
                <div className="text-xs font-mono-num text-slate-400 mt-2 flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-emerald-500" />
                  <span>{loc.phoneDisplay}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
