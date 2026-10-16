import React, { useState } from 'react';
import { Truck, Phone, MapPin, Clock, ShieldCheck, Wrench, Fuel, CheckCircle2, Award, Calendar, ArrowRight, Zap, Sparkles, ZoomIn, Upload, Image as ImageIcon } from 'lucide-react';
import { Language } from '../types';
import { ProsperityLogo } from './ProsperityLogo';
import truckPhoto from '../assets/images/prosperity_mobile_truck.jpg';
import flyerImg from '../assets/images/prosperity_brand_flyer_1791972077350.jpg';

interface MobileTruckSectionProps {
  language: Language;
  onBookMobile: () => void;
}

export const MobileTruckSection: React.FC<MobileTruckSectionProps> = ({
  language,
  onBookMobile,
}) => {
  const [selectedService, setSelectedService] = useState('emergency-flat');
  const [zipCode, setZipCode] = useState('');
  const [zipChecked, setZipChecked] = useState(false);
  const [showFlyerZoom, setShowFlyerZoom] = useState(false);
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(null);

  const checkCoverage = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.trim()) {
      setZipChecked(true);
    }
  };

  const handleCustomPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomPhotoUrl(url);
    }
  };

  return (
    <section id="mobile-truck-service" className="py-16 bg-slate-950 border-b border-emerald-950 relative overflow-hidden">
      {/* Background carbon pattern */}
      <div className="absolute inset-0 bg-honeycomb opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/60 text-emerald-400 text-xs font-bold uppercase tracking-wider font-heading">
            <Truck className="w-4 h-4 text-emerald-400" />
            <span>Prosperity Mobile Tire Service · We Come To You</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-heading text-white uppercase italic tracking-tight">
            The Prosperity Mobile Truck{' '}
            <span className="text-emerald-400">At Your Doorstep</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {language === 'en'
              ? 'No need to wait at a tire shop! Our fully equipped Ford E-Series Mobile Tire Truck brings computerized balancing, precision tire mounting, and emergency roadside repairs directly to your home, office, or highway location across DC & Maryland.'
              : '¡No espere en el taller! Nuestro camión móvil Ford E-Series totalmente equipado lleva balanceo computarizado, montaje de llantas y reparación de emergencia a su casa, oficina o carretera.'}
          </p>
        </div>

        {/* The Mobile Truck Photographic Showcase with Actual Vehicle Livery & Attached Flyer */}
        <div className="bg-slate-900 border-2 border-emerald-500/60 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle lighting glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar with Fleet Status & Live Toll-Free Hotline */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-white font-heading">
                Official Mobile Service Fleet Vehicle · Ford E-Series Commercial Unit #1
              </span>
            </div>
            <div className="flex items-center gap-3">
              <label
                htmlFor="fleet-photo-upload"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 cursor-pointer font-medium"
                title="Preview specific fleet vehicle photo"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Swap Vehicle Photo</span>
                <input
                  id="fleet-photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleCustomPhotoUpload}
                  className="sr-only"
                />
              </label>
              <a
                href="tel:8883759048"
                className="text-xs sm:text-sm text-emerald-400 font-mono-num font-black hover:underline flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Direct Dispatch: (888) 375-9048</span>
              </a>
            </div>
          </div>

          {/* Actual Photograph of the Mobile Service Truck */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Main High-Res Truck Photo Container */}
            <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-emerald-500/40 shadow-2xl group min-h-[340px] sm:min-h-[420px] bg-slate-950 flex items-center justify-center">
              <img
                src={customPhotoUrl || truckPhoto}
                alt="Prosperity Tire Center Official Mobile Tire Service Truck"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Gradient scrim at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-transparent pointer-events-none" />

              {/* Top Fleet Unit Badge */}
              <div className="absolute top-4 left-4 bg-slate-950/90 border border-emerald-500/80 rounded-xl px-3.5 py-1.5 backdrop-blur-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-black font-heading tracking-wider uppercase text-white">
                  Mobile Unit #1 · On-Site Service
                </span>
              </div>

              {/* Bottom Quick Perks Strip */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-200">
                <div className="flex items-center gap-3">
                  <span className="bg-emerald-500 text-slate-950 font-black px-2.5 py-1 rounded text-[11px] uppercase tracking-wider font-heading">
                    We Come To You
                  </span>
                  <span className="font-semibold text-white hidden sm:inline">
                    Home · Work · Highway Roadside
                  </span>
                </div>
                <div className="text-emerald-400 font-mono-num font-bold">
                  Avg Response: Under 45 Mins
                </div>
              </div>
            </div>

            {/* Official Promotional Flyer Attached Card */}
            <div className="lg:col-span-4 flex flex-col justify-between bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-black text-emerald-400 font-heading uppercase tracking-wider">
                    Official Mobile Flyer
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowFlyerZoom(true)}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-emerald-400 cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Zoom</span>
                  </button>
                </div>

                {/* Clickable Flyer Thumbnail */}
                <div
                  onClick={() => setShowFlyerZoom(true)}
                  className="mt-3 relative rounded-xl overflow-hidden border border-emerald-500/40 cursor-pointer group/flyer shadow-lg"
                >
                  <img
                    src={flyerImg}
                    alt="Prosperity Promotional Flyer"
                    className="w-full h-44 object-cover object-top group-hover/flyer:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 group-hover/flyer:bg-slate-950/10 transition-colors flex items-center justify-center">
                    <span className="bg-slate-950/80 text-emerald-300 border border-emerald-500/50 rounded-lg px-2.5 py-1 text-xs font-bold uppercase tracking-wider">
                      Click to Expand Flyer
                    </span>
                  </div>
                </div>

                {/* Key Driver Deals on Truck */}
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold">
                    <Fuel className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                    <span>$20 Free Gasoline with 4 New Tires</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-300 font-bold">
                    <Wrench className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                    <span>Free Lifetime Rotation (every 5k miles)</span>
                  </div>
                  <div className="flex items-center gap-2 text-yellow-400 font-bold">
                    <Award className="w-3.5 h-3.5 shrink-0 text-yellow-400" />
                    <span>15% Off FedEx, Amazon & Delivery Drivers</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-300 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-blue-400" />
                    <span>No Credit Needed · 100-Day Payment</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onBookMobile}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black font-heading text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/80 cursor-pointer transition-transform hover:-translate-y-0.5"
              >
                Dispatch Mobile Unit Now
              </button>
            </div>
          </div>

          {/* Live Onboard Equipment Badges */}
          <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Hunter High-Speed Balancer</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Pneumatic Rim Clamping (Up to 24")</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>30-Gallon Industrial Air Tank</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>TPMS Programming & Diagnostics</span>
            </div>
          </div>

          {/* 2-Column: Quick Dispatch Tool & Service Options */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-slate-800/80 mt-8">
            {/* Left: Instant Dispatch Request Form */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-heading">
                Schedule The Mobile Truck
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-white uppercase italic tracking-tight">
                Where Do You Need Us?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Save hours of your time. Our Ford E-Series Mobile Tire Truck arrives at your driveway, corporate parking lot, or roadside breakdown with fresh tires, mounting, and balancing ready to go.
              </p>

              {/* Service Selection Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  {
                    id: 'emergency-flat',
                    title: 'Emergency Roadside Flat',
                    desc: 'Plug, patch, or spare installation on the spot',
                    icon: Zap,
                  },
                  {
                    id: 'mobile-install',
                    title: 'At-Home Tire Installation',
                    desc: 'Mount & balance up to 4 tires in your driveway',
                    icon: Wrench,
                  },
                  {
                    id: 'fleet-service',
                    title: 'Commercial Fleet Maintenance',
                    desc: 'Amazon, FedEx, Uber, Lyft & contractor vans',
                    icon: Truck,
                  },
                  {
                    id: 'seasonal-swap',
                    title: 'Seasonal Wheel Swap',
                    desc: 'Summer & winter tire set changeover',
                    icon: Clock,
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedService(item.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedService === item.id
                        ? 'bg-emerald-950/60 border-emerald-500 shadow-md shadow-emerald-950'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${selectedService === item.id ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-emerald-400'}`}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white font-heading">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Instant Call CTA */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onBookMobile}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black font-heading text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/80 cursor-pointer transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Mobile Service Booking</span>
                </button>
                <a
                  href="tel:8883759048"
                  className="px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 border border-emerald-500/40 text-emerald-400 font-bold font-mono-num text-xs uppercase tracking-wider cursor-pointer transition-colors flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call (888) 375-9048</span>
                </a>
              </div>
            </div>

            {/* Right: Coverage & Dispatch Zone Checker */}
            <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider font-heading">
                <MapPin className="w-4 h-4" />
                <span>Regional Coverage Radius</span>
              </div>

              <h4 className="text-lg font-bold text-white font-heading">
                Maryland & Washington DC Service Area
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed">
                We operate mobile units dispatched from our regional centers in Edgewater, Rockville, Brooklyn (Baltimore), and Northeast DC. Enter your ZIP code to verify immediate dispatch:
              </p>

              {/* ZIP Input form */}
              <form onSubmit={checkCoverage} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => {
                      setZipCode(e.target.value);
                      setZipChecked(false);
                    }}
                    placeholder="Enter 5-digit ZIP (e.g. 20002, 21037)"
                    maxLength={5}
                    className="flex-1 bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-colors shrink-0"
                  >
                    Check
                  </button>
                </div>

                {zipChecked && (
                  <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/50 flex items-start gap-2.5 text-xs text-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white">ZIP {zipCode} is in our primary dispatch corridor!</span>
                      <p className="text-[11px] text-emerald-300 mt-0.5">
                        Our Ford mobile tire unit can arrive at your location within 35 to 60 minutes.
                      </p>
                    </div>
                  </div>
                )}
              </form>

              {/* Service Corridors List */}
              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                <div className="font-bold text-white uppercase text-[11px] tracking-wider font-heading">
                  Active Service Corridors:
                </div>
                <ul className="grid grid-cols-2 gap-1 text-[11px] text-slate-400">
                  <li>• Washington, DC Metro</li>
                  <li>• Edgewater &amp; Annapolis</li>
                  <li>• Rockville &amp; Bethesda</li>
                  <li>• Baltimore &amp; Brooklyn</li>
                  <li>• I-495 Beltway Corridors</li>
                  <li>• I-95 &amp; Route 50 Highways</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Flyer Zoom Modal */}
      {showFlyerZoom && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setShowFlyerZoom(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-slate-900 border border-emerald-500 rounded-2xl overflow-hidden shadow-2xl p-2">
            <button
              type="button"
              onClick={() => setShowFlyerZoom(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-950/80 border border-emerald-500 text-white font-bold flex items-center justify-center cursor-pointer hover:bg-emerald-500 hover:text-slate-950 transition-colors"
            >
              ✕
            </button>
            <img
              src={flyerImg}
              alt="Prosperity Promotional Flyer High Resolution"
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </section>
  );
};
