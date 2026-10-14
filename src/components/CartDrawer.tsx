import React, { useState } from 'react';
import { ShoppingBag, X, Trash2, Plus, Minus, Tag, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { CartItem, Language } from '../types';
import { LOCATIONS, TRANSLATIONS } from '../data/websiteData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (tireId: string, quantity: number) => void;
  onToggleInstallation: (tireId: string) => void;
  onRemoveItem: (tireId: string) => void;
  language: Language;
  appliedCouponCode: string;
  setAppliedCouponCode: (code: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onToggleInstallation,
  onRemoveItem,
  language,
  appliedCouponCode,
  setAppliedCouponCode,
}) => {
  const t = TRANSLATIONS[language];
  const [couponInput, setCouponInput] = useState<string>(appliedCouponCode);
  const [isQuoteSubmitted, setIsQuoteSubmitted] = useState<boolean>(false);
  const [quoteCustomerName, setQuoteCustomerName] = useState<string>('');
  const [quoteCustomerPhone, setQuoteCustomerPhone] = useState<string>('');
  const [selectedPickupLocation, setSelectedPickupLocation] = useState<string>(LOCATIONS[0].id);

  if (!isOpen) return null;

  // Calculate pricing
  const tiresSubtotal = cart.reduce((acc, item) => acc + item.tire.price * item.quantity, 0);
  const installationTotal = cart.reduce(
    (acc, item) => acc + (item.includeInstallation ? 20 * item.quantity : 0),
    0
  );

  let discountAmount = 0;
  let promoNote = '';
  const uppercaseCoupon = (appliedCouponCode || '').toUpperCase().trim();

  if (uppercaseCoupon === 'DELIVERY15') {
    discountAmount = tiresSubtotal * 0.15;
    promoNote = '15% Off FedEx / Amazon Commercial Discount Applied';
  } else if (uppercaseCoupon === 'RIDESHARE10') {
    discountAmount = tiresSubtotal * 0.10;
    promoNote = '10% Off Uber / Lyft Driver Discount Applied';
  } else if (uppercaseCoupon === 'GAS20NEW') {
    promoNote = 'Eligible for $20 Gasoline Gift Card with 4 New Tires!';
  } else if (uppercaseCoupon === 'ROTATELIFE') {
    promoNote = 'Free Lifetime Tire Rotation Activated on 4 Tires!';
  }

  const grandTotal = Math.max(0, tiresSubtotal + installationTotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedCouponCode(couponInput.trim());
  };

  const handleCheckoutQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteCustomerName || !quoteCustomerPhone) return;
    setIsQuoteSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border-l border-emerald-950 w-full max-w-lg h-full flex flex-col justify-between p-6 sm:p-8 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-black font-heading text-white uppercase italic tracking-tight">
              {t.cartTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isQuoteSubmitted ? (
          <div className="py-12 text-center space-y-4 my-auto">
            <div className="w-16 h-16 bg-emerald-950 border border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-black font-heading text-white">
              Quote Request Received!
            </h4>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              Our service advisors have reserved your tires. We will contact you at{' '}
              <span className="text-emerald-400 font-bold">{quoteCustomerPhone}</span> to confirm your installation time.
            </p>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-left max-w-xs mx-auto space-y-1.5 font-mono-num">
              <div className="flex justify-between text-slate-400">
                <span>Quote Total:</span>
                <span className="font-bold text-white">${grandTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Location:</span>
                <span className="text-white">
                  {LOCATIONS.find((l) => l.id === selectedPickupLocation)?.name}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsQuoteSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : cart.length === 0 ? (
          <div className="py-16 text-center space-y-4 my-auto">
            <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-600">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <p className="text-sm text-slate-400 max-w-xs mx-auto">
              {t.cartEmpty}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg bg-emerald-600 text-slate-950 font-heading font-black text-xs uppercase tracking-wider cursor-pointer"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="divide-y divide-slate-800 py-4 flex-1 overflow-y-auto space-y-4 pr-1">
              {cart.map((item) => (
                <div key={item.tire.id} className="pt-4 first:pt-0 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                        {item.tire.brand} · {item.tire.size}
                      </div>
                      <div className="text-sm font-bold text-white leading-tight">
                        {item.tire.model}
                      </div>
                      <div className="text-xs font-mono-num text-slate-400 mt-0.5">
                        ${item.tire.price} each · {item.tire.condition.toUpperCase()}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.tire.id)}
                      className="text-slate-500 hover:text-red-400 p-1 cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity Stepper & Subtotal */}
                  <div className="flex items-center justify-between bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.tire.id, item.quantity - 1)}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono-num font-bold text-sm text-white px-2">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.tire.id, item.quantity + 1)}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-sm font-black font-mono-num text-white">
                      ${item.tire.price * item.quantity}
                    </div>
                  </div>

                  {/* Mounting & Balancing Checkbox */}
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={item.includeInstallation}
                      onChange={() => onToggleInstallation(item.tire.id)}
                      className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 bg-slate-950"
                    />
                    <span>Include Mounting & Balancing ($20/tire)</span>
                  </label>
                </div>
              ))}
            </div>

            {/* Bottom Summary & Order Form */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              {/* Coupon Code Input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Enter Promo Code (e.g. GAS20NEW)"
                  className="flex-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg px-3 py-2 text-xs text-white uppercase font-mono tracking-wider focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-heading font-bold text-xs uppercase tracking-wider rounded-lg cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {promoNote && (
                <div className="p-2 rounded bg-emerald-950/80 border border-emerald-800/60 text-xs text-emerald-300 font-medium flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 shrink-0" />
                  <span>{promoNote}</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-400 font-mono-num">
                <div className="flex justify-between">
                  <span>Tires Subtotal:</span>
                  <span className="text-white">${tiresSubtotal.toFixed(2)}</span>
                </div>
                {installationTotal > 0 && (
                  <div className="flex justify-between">
                    <span>Mounting & Balancing:</span>
                    <span className="text-white">${installationTotal.toFixed(2)}</span>
                  </div>
                )}
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Promotional Discount:</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-slate-800">
                  <span>Estimated Total:</span>
                  <span className="text-emerald-400 text-base">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Pickup Location Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Preferred Location
                </label>
                <select
                  aria-label="Preferred pickup location"
                  value={selectedPickupLocation}
                  onChange={(e) => setSelectedPickupLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
                >
                  {LOCATIONS.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name} ({l.city}, {l.state})
                    </option>
                  ))}
                </select>
              </div>

              {/* Instant Contact Form for Quote */}
              <form onSubmit={handleCheckoutQuote} className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={quoteCustomerName}
                    onChange={(e) => setQuoteCustomerName(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={quoteCustomerPhone}
                    onChange={(e) => setQuoteCustomerPhone(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-slate-950 font-heading font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 cursor-pointer transition-colors"
                >
                  <span>{t.proceedQuote}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>1-Year Work Warranty Guarantee · No Payment Required Online</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
