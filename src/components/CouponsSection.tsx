import React, { useState } from 'react';
import { Scissors, Copy, Check, Fuel, RotateCw, Truck, Car, Percent, ShieldCheck, Printer } from 'lucide-react';
import { COUPONS, TRANSLATIONS } from '../data/websiteData';
import { Language, Coupon } from '../types';

interface CouponsSectionProps {
  language: Language;
  onApplyCoupon: (code: string) => void;
}

export const CouponsSection: React.FC<CouponsSectionProps> = ({ language, onApplyCoupon }) => {
  const t = TRANSLATIONS[language];
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeVoucher, setActiveVoucher] = useState<Coupon | null>(null);

  const handleCopy = (coupon: Coupon) => {
    navigator.clipboard.writeText(coupon.code);
    setCopiedCode(coupon.code);
    onApplyCoupon(coupon.code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const getCouponIcon = (id: string) => {
    switch (id) {
      case 'gas-card': return <Fuel className="w-5 h-5" />;
      case 'lifetime-rotation': return <RotateCw className="w-5 h-5" />;
      case 'delivery-drivers': return <Truck className="w-5 h-5" />;
      case 'rideshare-drivers': return <Car className="w-5 h-5" />;
      default: return <Percent className="w-5 h-5" />;
    }
  };

  return (
    <section id="coupons-deals" className="py-20 bg-slate-900/60 border-b border-emerald-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/40 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Scissors className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Official Prosperity Coupons' : 'Cupones Oficiales de Prosperity'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-white uppercase italic tracking-tight">
            {t.coupons}
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {language === 'en'
              ? 'Present these digital vouchers on your phone at checkout or quote online. Valid at all 4 Maryland & Washington DC locations.'
              : 'Presente estos cupones digitales en su celular al pagar o cotice en línea. Válidos en nuestras 4 sedes de Maryland y Washington DC.'}
          </p>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COUPONS.map((coupon) => {
            const isCopied = copiedCode === coupon.code;

            return (
              <div
                key={coupon.id}
                className="bg-slate-950 border-2 border-dashed border-emerald-600/40 hover:border-emerald-500 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-200 group shadow-lg"
              >
                {/* Decorative cut notches on sides */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-900 border-r-2 border-slate-800" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-900 border-l-2 border-slate-800" />

                <div className="space-y-4">
                  {/* Badge & Discount */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                      {coupon.badge}
                    </span>
                    <div className="text-emerald-400 p-2 rounded-lg bg-slate-900 border border-slate-800">
                      {getCouponIcon(coupon.id)}
                    </div>
                  </div>

                  <div>
                    <div className="text-2xl sm:text-3xl font-black font-heading text-white uppercase tracking-tight text-glow">
                      {coupon.discount}
                    </div>
                    <h3 className="text-base font-bold text-slate-200 mt-1">
                      {coupon.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {coupon.description}
                  </p>

                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-800/80">
                    <span className="font-semibold text-slate-400">Eligibility:</span> {coupon.eligibility}
                  </div>
                </div>

                {/* Coupon Code Strip and Claim Action */}
                <div className="pt-6 mt-6 border-t border-dashed border-slate-800 space-y-3">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider">
                      {coupon.code}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(coupon)}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        handleCopy(coupon);
                        setActiveVoucher(coupon);
                      }}
                      className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-slate-950 font-heading font-black text-xs uppercase tracking-wider text-center transition-colors cursor-pointer"
                    >
                      {t.claimDeal}
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveVoucher(coupon)}
                      className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-heading font-bold text-xs uppercase tracking-wider text-center transition-colors cursor-pointer"
                    >
                      View Voucher
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Printable / Screen Voucher Modal */}
      {activeVoucher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border-2 border-emerald-500 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-center">
            <button
              type="button"
              onClick={() => setActiveVoucher(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer"
            >
              ✕
            </button>

            {/* Header branding */}
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold font-heading">
                PROSPERITY TIRE CENTER VOUCHER
              </span>
              <div className="text-3xl font-black font-heading text-white uppercase italic text-glow">
                {activeVoucher.discount}
              </div>
              <p className="text-sm text-slate-300 font-semibold">{activeVoucher.title}</p>
            </div>

            {/* Voucher Barcode Representation */}
            <div className="p-4 bg-white rounded-xl text-slate-950 space-y-2">
              <div className="h-14 flex items-center justify-center gap-1 overflow-hidden px-2">
                {[...Array(38)].map((_, i) => (
                  <div
                    key={i}
                    className="h-full bg-slate-900"
                    style={{ width: i % 3 === 0 ? '4px' : i % 2 === 0 ? '2px' : '1px' }}
                  />
                ))}
              </div>
              <div className="font-mono text-sm font-black tracking-widest uppercase">
                {activeVoucher.code}
              </div>
            </div>

            <div className="text-xs text-slate-400 space-y-1">
              <p>{activeVoucher.description}</p>
              <p className="font-medium text-emerald-400">{activeVoucher.eligibility}</p>
              <p className="text-[11px] text-slate-500">Present this screen to your service advisor or mention code on the phone.</p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-heading font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Voucher</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onApplyCoupon(activeVoucher.code);
                  setActiveVoucher(null);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Apply to Cart</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
