import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, CheckCircle2, ShieldCheck, User, Calendar, ZoomIn, Building } from 'lucide-react';
import { LOCATIONS, TRANSLATIONS } from '../data/websiteData';
import { Language, LocationInfo } from '../types';
import storefrontImg from '../assets/images/storefront_6975_building.jpg';

interface LocationsSectionProps {
  language: Language;
  onSelectLocationForBooking: (location: LocationInfo) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({
  language,
  onSelectLocationForBooking,
}) => {
  const t = TRANSLATIONS[language];
  // Default to Brooklyn (6975 Baltimore Annapolis Blvd) so the authentic user building is immediately front and center!
  const [selectedLocationId, setSelectedLocationId] = useState<string>('brooklyn');
  const [showBuildingZoom, setShowBuildingZoom] = useState(false);

  const selectedLoc = LOCATIONS.find((l) => l.id === selectedLocationId) || LOCATIONS[1];

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
                ? 'Visit our flagship Brooklyn shop at 6975 Baltimore Annapolis Blvd or any of our 4 full-service centers for immediate tire mounting, balancing, and repairs.'
                : 'Visite nuestro taller principal en 6975 Baltimore Annapolis Blvd o cualquiera de nuestras 4 sedes para montaje y balanceo inmediato.'}
            </p>
          </div>

          {/* Quick Location Pills */}
          <div className="flex flex-wrap gap-2">
            {LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() => setSelectedLocationId(loc.id)}
                className={`px-4 py-2 rounded-xl text-xs font-heading font-black uppercase tracking-wider transition-all cursor-pointer ${
                  selectedLocationId === loc.id
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-950'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {loc.city}, {loc.state} {loc.id === 'brooklyn' && '★ 6975'}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Location Feature Card with Storefront Image */}
        <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0 relative">
          {/* Left: Storefront Photo */}
          <div
            onClick={() => setShowBuildingZoom(true)}
            className="lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] lg:min-h-full cursor-pointer group overflow-hidden bg-slate-950"
          >
            <img
              src={storefrontImg}
              alt="Prosperity Tire Center 6975 Baltimore Annapolis Blvd Building"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900/60" />

            {/* Click to Zoom Pill */}
            <div className="absolute top-4 right-4 bg-slate-950/80 border border-emerald-500/60 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-1.5 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Expand Photo</span>
            </div>

            {/* Authentic Address & Signboard Pill */}
            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 border border-emerald-500/80 rounded-2xl p-3.5 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] uppercase font-black text-emerald-400 font-heading tracking-wider">
                  Official Storefront Building · #6975
                </span>
              </div>
              <div className="text-base font-black font-heading text-white mt-0.5">
                6975 Baltimore Annapolis Blvd, Brooklyn, MD 21225
              </div>
              <div className="text-xs text-slate-300 font-mono-num mt-1 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-bold text-emerald-300">(443) 548-1002</span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-400">Mounting · Balancing · Repair</span>
              </div>
            </div>
          </div>

          {/* Right: Detailed Location Information */}
          <div className="lg:col-span-6 p-6 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2 font-heading">
                  <Building className="w-3.5 h-3.5" />
                  <span>{selectedLoc.city}, {selectedLoc.state} Regional Facility</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black font-heading text-white uppercase italic tracking-tight">
                  {selectedLoc.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Full-service tire warehouse, mounting bays, computerized balancing, and road-force diagnostics.
                </p>
              </div>

              {/* Address & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Street Address</span>
                  </div>
                  <div className="text-white font-medium text-sm leading-snug">
                    {selectedLoc.address}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    {selectedLoc.city}, {selectedLoc.state} {selectedLoc.zip}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Shop Direct Phone</span>
                  </div>
                  <div>
                    <a
                      href={`tel:${selectedLoc.phone}`}
                      className="text-white hover:text-emerald-400 font-mono-num font-black text-base transition-colors"
                    >
                      {selectedLoc.phoneDisplay}
                    </a>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Toll-Free: {selectedLoc.tollFree}
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Shop Operating Hours (7 Days / Week)</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Mon – Fri</span>
                    <span className="font-mono-num font-bold text-white">{selectedLoc.hoursWeekday}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Saturday</span>
                    <span className="font-mono-num font-bold text-white">{selectedLoc.hoursSaturday}</span>
                  </div>
                </div>
              </div>

              {/* Key Features checklist */}
              <div className="space-y-2">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold font-heading">
                  Facility Equipment &amp; Amenities:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {selectedLoc.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onSelectLocationForBooking(selectedLoc)}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-heading font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-950 cursor-pointer transition-transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Service at {selectedLoc.city}</span>
              </button>

              <a
                href={selectedLoc.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors flex items-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                <span>Google Maps GPS</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Building Photo Fullscreen Zoom Modal */}
      {showBuildingZoom && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setShowBuildingZoom(false)}
        >
          <div className="relative max-w-5xl max-h-[92vh] bg-slate-900 border-2 border-emerald-500 rounded-3xl overflow-hidden shadow-2xl p-2">
            <button
              type="button"
              onClick={() => setShowBuildingZoom(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-950/80 border border-emerald-500 text-white font-bold flex items-center justify-center cursor-pointer hover:bg-emerald-500 hover:text-slate-950 transition-colors"
            >
              ✕
            </button>
            <img
              src={storefrontImg}
              alt="Prosperity Tire Center 6975 Baltimore Annapolis Blvd Full View"
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="text-white font-bold font-heading">
                6975 Baltimore Annapolis Blvd, Brooklyn, MD 21225 · Prosperity Tire Center
              </div>
              <div className="text-emerald-400 font-mono-num font-bold">
                Direct Phone: (443) 548-1002
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
