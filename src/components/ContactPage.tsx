import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, ShieldCheck, CheckCircle2, AlertTriangle, HelpCircle, User, Car, Calendar } from 'lucide-react';
import { LOCATIONS, SERVICES } from '../data/websiteData';
import { Language } from '../types';

interface ContactPageProps {
  language: Language;
  onOpenSchedule: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ language, onOpenSchedule }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: LOCATIONS[0].name,
    service: SERVICES[0].name,
    vehicle: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-10 space-y-12">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-emerald-950 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 text-xs font-bold uppercase tracking-wider font-heading">
              <Phone className="w-3.5 h-3.5" />
              <span>Direct Customer Assistance</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-heading text-white uppercase italic tracking-tight">
              Contact & Schedule Your Visit
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {language === 'en'
                ? 'Whether you have a sudden flat, need a tire quote on a hard-to-find rim size, or want to schedule maintenance at one of our 4 DMV locations, our experienced technicians are ready to assist.'
                : 'Ya sea que tenga una ponchadura repentina, necesite una cotización de llantas para su vehículo o desee agendar servicio en una de nuestras 4 sedes, estamos listos para atenderle.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="tel:8883759048"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-950 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Toll-Free: (888) 375-9048</span>
              </a>

              <button
                type="button"
                onClick={onOpenSchedule}
                className="px-6 py-3 rounded-xl bg-slate-950 border border-slate-700 hover:border-emerald-500/60 text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Book Appointment Online
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Form + Fast Contact Options */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Message Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-heading text-white uppercase italic tracking-tight">
                Send Us an Online Inquiry
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Have questions about tire inventory, pricing, or fleet accounts? Send us a quick note and our shop manager will get back to you shortly.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-500/60 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white font-heading uppercase">
                  Inquiry Received!
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Thank you, <span className="text-emerald-400 font-semibold">{formData.name || 'Valued Customer'}</span>. General Manager Alexy and our technicians at {formData.location} will review your message and contact you via phone or email shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-5 py-2.5 rounded-lg bg-emerald-600 text-slate-950 font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1 uppercase">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Miller"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1 uppercase">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. (301) 555-0199"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1 uppercase">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1 uppercase">Preferred Location</label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      {LOCATIONS.map((loc) => (
                        <option key={loc.id} value={loc.name}>
                          {loc.name} ({loc.city}, {loc.state})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1 uppercase">Service Needed</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      {SERVICES.map((srv) => (
                        <option key={srv.id} value={srv.name}>
                          {srv.name} (from ${srv.priceStart})
                        </option>
                      ))}
                      <option value="New Tires Quote">New Tires Quote</option>
                      <option value="Used Tires Inspection">Used Tires Inspection</option>
                      <option value="Fleet Account Inquiry">Fleet Account Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1 uppercase">Vehicle Year / Make / Model</label>
                    <input
                      type="text"
                      value={formData.vehicle}
                      onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                      placeholder="e.g. 2018 Toyota Camry"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1 uppercase">Message / Tire Size / Questions</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you need, such as your tire size (e.g. 205/55R16) or specific symptoms..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-950 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: All 4 Branch Quick Dials & Emergency Advice */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-4">
              <h3 className="text-base font-bold uppercase tracking-wider text-white font-heading flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Our 4 Service Centers</span>
              </h3>

              <div className="space-y-3 divide-y divide-slate-800 text-xs">
                {LOCATIONS.map((loc) => (
                  <div key={loc.id} className="pt-3 first:pt-0 flex items-start justify-between gap-3">
                    <div>
                      <div className="font-heading font-black text-emerald-400 uppercase tracking-wide">
                        {loc.name}
                      </div>
                      <div className="text-slate-300">{loc.address}, {loc.city}, {loc.state} {loc.zip}</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">Manager: {loc.manager}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <a
                        href={`tel:${loc.phone}`}
                        className="inline-block px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-mono-num font-bold hover:bg-emerald-900/60 transition-colors"
                      >
                        {loc.phoneDisplay}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Flat Advice Box */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-amber-900/40 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold uppercase text-xs font-heading">
                <AlertTriangle className="w-4 h-4" />
                <span>Emergency Flat Tire Advice</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Got a puncture or nail? Do not drive on a flat tire as it irreparably damages the sidewall rubber and wheel rim. Pull safely to the shoulder, put on your hazard lights, mount your spare if possible, or call us for the nearest open bay.
              </p>
              <div className="text-[11px] text-emerald-400 font-semibold">
                ✓ Walk-ins are always welcomed for puncture emergency repairs.
              </div>
            </div>

            {/* Hours summary */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-white uppercase font-heading">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Operating Hours</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Monday – Saturday:</span>
                <span className="font-semibold text-white">8:30 AM – 6:30 PM</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Sunday:</span>
                <span className="font-semibold text-white">9:00 AM – 5:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
