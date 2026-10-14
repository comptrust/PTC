import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Wrench, Car, Phone, Mail, User, CheckCircle2, ShieldCheck, X } from 'lucide-react';
import { LOCATIONS, SERVICES, TRANSLATIONS } from '../data/websiteData';
import { Language, LocationInfo, ServiceItem } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialLocation?: LocationInfo | null;
  initialService?: ServiceItem | null;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  language,
  initialLocation,
  initialService,
}) => {
  const t = TRANSLATIONS[language];

  const [selectedLocationId, setSelectedLocationId] = useState<string>(
    initialLocation?.id || LOCATIONS[0].id
  );
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialService?.id || SERVICES[0].id
  );
  const [appointmentDate, setAppointmentDate] = useState<string>('2026-10-15');
  const [appointmentTime, setAppointmentTime] = useState<string>('10:00 AM');

  const [vehicleYear, setVehicleYear] = useState<string>('2022');
  const [vehicleMake, setVehicleMake] = useState<string>('Toyota');
  const [vehicleModel, setVehicleModel] = useState<string>('Camry');
  const [tireSize, setTireSize] = useState<string>('');

  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [confirmationCode, setConfirmationCode] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    const randomRef = 'PR-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmationCode(randomRef);
    setIsSubmitted(true);
  };

  const selectedLoc = LOCATIONS.find((l) => l.id === selectedLocationId) || LOCATIONS[0];
  const selectedServ = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-emerald-950 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-5">
            <div className="w-16 h-16 bg-emerald-950 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Service Appointment Confirmed
              </span>
              <h3 className="text-3xl font-black font-heading text-white tracking-tight">
                We Look Forward to Seeing You!
              </h3>
              <p className="text-sm text-slate-300">
                Your request has been booked with priority bay dispatch.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-left space-y-3 max-w-md mx-auto text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Confirmation Code:</span>
                <span className="font-mono text-base font-black text-emerald-400">{confirmationCode}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Facility Location:</span>
                <span className="font-bold text-white">{selectedLoc.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Address:</span>
                <span className="text-slate-300">{selectedLoc.address}, {selectedLoc.city}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Date & Time:</span>
                <span className="font-bold text-emerald-300">{appointmentDate} at {appointmentTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Service:</span>
                <span className="text-white font-medium">{selectedServ.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Vehicle:</span>
                <span className="text-slate-300">{vehicleYear} {vehicleMake} {vehicleModel}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-slate-400">Direct Shop Phone:</span>
                <a href={`tel:${selectedLoc.phone}`} className="font-mono font-bold text-emerald-400 hover:underline">
                  {selectedLoc.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider cursor-pointer"
              >
                Close & Return to Site
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider font-heading">
                <Wrench className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Online Service Scheduler' : 'Agendar Cita en Línea'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-white uppercase italic tracking-tight mt-1">
                {t.scheduleService}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {language === 'en'
                  ? 'Book your tire installation, balancing, alignment, or flat repair ahead of time for express zero-wait service.'
                  : 'Reserve su instalación de llantas, balanceo, alineación o reparación para atención express sin esperas.'}
              </p>
            </div>

            {/* Step 1: Location & Service */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>1. Choose Location *</span>
                </label>
                <select
                  aria-label="Appointment location"
                  value={selectedLocationId}
                  onChange={(e) => setSelectedLocationId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2.5 text-xs text-white font-medium focus:outline-none cursor-pointer"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} ({loc.city}, {loc.state})
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-slate-500 mt-1">{selectedLoc.address}</div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-emerald-400" />
                  <span>2. Service Type *</span>
                </label>
                <select
                  aria-label="Appointment service type"
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2.5 text-xs text-white font-medium focus:outline-none cursor-pointer"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} (from ${s.priceStart})
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-emerald-400 font-medium mt-1">Est. Duration: {selectedServ.estimatedTime}</div>
              </div>
            </div>

            {/* Step 2: Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>3. Preferred Date *</span>
                </label>
                <input
                  type="date"
                  aria-label="Appointment date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2.5 text-xs text-white font-mono-num focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>4. Preferred Time Slot *</span>
                </label>
                <select
                  aria-label="Appointment time slot"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2.5 text-xs text-white font-medium focus:outline-none cursor-pointer"
                >
                  {['8:30 AM', '9:30 AM', '10:30 AM', '11:30 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:30 PM', '5:30 PM'].map((tm) => (
                    <option key={tm} value={tm}>
                      {tm}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 3: Vehicle Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Year
                </label>
                <input
                  type="text"
                  value={vehicleYear}
                  onChange={(e) => setVehicleYear(e.target.value)}
                  placeholder="2022"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Make
                </label>
                <input
                  type="text"
                  value={vehicleMake}
                  onChange={(e) => setVehicleMake(e.target.value)}
                  placeholder="Toyota"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Model
                </label>
                <input
                  type="text"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  placeholder="Camry"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Step 4: Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Phone Number (for SMS Reminder) *
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="(301) 555-0199"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Special Requests or Symptoms (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="E.g., Vibration at 65 MPH, flat repair in rear passenger tire, etc."
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg p-3 text-xs text-white focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>1-Year Workmanship Warranty included</span>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/60 cursor-pointer transition-colors"
              >
                Confirm Appointment
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
