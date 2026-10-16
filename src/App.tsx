import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandShowcase } from './components/BrandShowcase';
import { TireFinder } from './components/TireFinder';
import { TireCatalog } from './components/TireCatalog';
import { ServicesSection } from './components/ServicesSection';
import { CouponsSection } from './components/CouponsSection';
import { LocationsSection } from './components/LocationsSection';
import { AboutSection } from './components/AboutSection';
import { ReviewsPage } from './components/ReviewsPage';
import { ContactPage } from './components/ContactPage';
import { MobileTruckSection } from './components/MobileTruckSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { AppointmentModal } from './components/AppointmentModal';
import { TIRE_PRODUCTS, LOCATIONS, SERVICES, TRANSLATIONS, GOOGLE_REVIEWS } from './data/websiteData';
import { TireProduct, LocationInfo, ServiceItem, Language, CartItem } from './types';
import { Phone, Calendar, ShieldCheck, Fuel, ArrowRight, Wrench, Search, MapPin, Mail, Clock, Star, MessageSquare, Truck } from 'lucide-react';

export default function App() {
  // Sync page routing with URL hash for true multi-page navigation
  const getInitialTab = (): string => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    const validTabs = ['home', 'shop', 'services', 'mobile-truck', 'used-tires', 'coupons', 'locations', 'reviews', 'about', 'contact'];
    return validTabs.includes(hash) ? hash : 'home';
  };

  const [activeTab, setActiveTabState] = useState<string>(getInitialTab);
  const [language, setLanguage] = useState<Language>('en');

  // Change tab and sync with browser URL history
  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    if (tab === 'home') {
      window.history.pushState(null, '', window.location.pathname);
    } else {
      window.location.hash = `#/${tab}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validTabs = ['home', 'shop', 'services', 'mobile-truck', 'used-tires', 'coupons', 'locations', 'reviews', 'about', 'contact'];
      if (validTabs.includes(hash)) {
        setActiveTabState(hash);
      } else if (!hash) {
        setActiveTabState('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Cart & Quote State
  const [cart, setCart] = useState<CartItem[]>([
    {
      tire: TIRE_PRODUCTS[0],
      quantity: 4,
      includeInstallation: true,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [appliedCouponCode, setAppliedCouponCode] = useState<string>('GAS20NEW');

  // Appointment Modal State
  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(false);
  const [selectedBookingLocation, setSelectedBookingLocation] = useState<LocationInfo | null>(null);
  const [selectedBookingService, setSelectedBookingService] = useState<ServiceItem | null>(null);

  // Active filters for tire catalog
  const [activeFilters, setActiveFilters] = useState<{
    width?: number;
    ratio?: number;
    rim?: number;
    brand?: string;
    condition?: 'all' | 'new' | 'used';
  }>({});

  const t = TRANSLATIONS[language];

  // Cart actions
  const handleAddToCart = (tire: TireProduct, quantity: number = 4) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.tire.id === tire.id);
      if (existing) {
        return prev.map((item) =>
          item.tire.id === tire.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { tire, quantity, includeInstallation: true }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (tireId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(tireId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.tire.id === tireId ? { ...item, quantity } : item))
    );
  };

  const handleToggleInstallation = (tireId: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.tire.id === tireId ? { ...item, includeInstallation: !item.includeInstallation } : item
      )
    );
  };

  const handleRemoveFromCart = (tireId: string) => {
    setCart((prev) => prev.filter((item) => item.tire.id !== tireId));
  };

  const handleBookWithTire = (tire: TireProduct) => {
    handleAddToCart(tire, 4);
    setSelectedBookingService(SERVICES[0]); // Mounting & balancing
    setIsScheduleOpen(true);
  };

  const handleBookService = (service: ServiceItem) => {
    setSelectedBookingService(service);
    setIsScheduleOpen(true);
  };

  const handleSelectLocationForBooking = (loc: LocationInfo) => {
    setSelectedBookingLocation(loc);
    setIsScheduleOpen(true);
  };

  const handleApplyCoupon = (code: string) => {
    setAppliedCouponCode(code);
    setIsCartOpen(true);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Header with Top Bar Contract, Multi-Page navigation, & Standalone Large Logo */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
        openScheduleModal={() => {
          setSelectedBookingService(null);
          setIsScheduleOpen(true);
        }}
      />

      {/* Main Multi-Page Content Area */}
      <main className="flex-1">
        {/* ========================================================= */}
        {/* PAGE 1: HOME                                              */}
        {/* ========================================================= */}
        {activeTab === 'home' && (
          <>
            <Hero
              language={language}
              onExploreTires={() => {
                setActiveTab('shop');
              }}
              onBookService={() => {
                setSelectedBookingService(null);
                setIsScheduleOpen(true);
              }}
              onViewCoupons={() => {
                setActiveTab('coupons');
              }}
            />

            {/* Interactive Tire Finder */}
            <div className="px-4">
              <TireFinder
                language={language}
                onFilterApply={(filters) => {
                  setActiveFilters(filters);
                  setActiveTab('shop');
                }}
              />
            </div>

            {/* Tire Catalog Featured Preview */}
            <div className="pt-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-heading">
                    Current Featured Stock
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black font-heading text-white uppercase italic">
                    Popular Tires In Stock Today
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('shop')}
                  className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-wider font-heading cursor-pointer"
                >
                  <span>View All 50+ Tires</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <TireCatalog
                tires={TIRE_PRODUCTS.slice(0, 6)}
                language={language}
                onAddToCart={handleAddToCart}
                onBookWithTire={handleBookWithTire}
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
              />
            </div>

            {/* Official Brand Showcase with Flyer and Digital Business Card */}
            <BrandShowcase
              language={language}
              onBookService={() => {
                setSelectedBookingService(null);
                setIsScheduleOpen(true);
              }}
              onClaimPromo={() => {
                handleApplyCoupon('GAS20NEW');
              }}
            />

            {/* Core Automotive Services Preview */}
            <ServicesSection
              language={language}
              onBookService={handleBookService}
            />

            {/* The Prosperity Mobile Tire Truck (Ford E-Series Mobile Unit) */}
            <MobileTruckSection
              language={language}
              onBookMobile={() => setIsScheduleOpen(true)}
            />

            {/* Verified Google Reviews Strip on Homepage */}
            <section className="py-16 bg-slate-900/60 border-y border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider font-heading mb-1">
                      <Star className="w-4 h-4 fill-emerald-400" />
                      <span>Verified Google Business Reviews</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-black font-heading text-white uppercase italic tracking-tight">
                      What DMV Drivers Say About Us
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab('reviews')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider cursor-pointer shadow-md transition-colors"
                  >
                    <span>Read All {GOOGLE_REVIEWS.length} Reviews</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {GOOGLE_REVIEWS.slice(0, 3).map((rev) => (
                    <div
                      key={rev.id}
                      className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-bold text-white text-sm font-heading">{rev.author}</div>
                          <span className="text-[11px] text-slate-400">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed italic">
                          "{rev.text}"
                        </p>
                      </div>

                      {rev.ownerResponse && (
                        <div className="pt-3 border-t border-slate-900 text-[11px] text-emerald-400 font-medium">
                          ✓ Owner replied: "{rev.ownerResponse.text}"
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Official Coupons & Deals Strip */}
            <CouponsSection
              language={language}
              onApplyCoupon={handleApplyCoupon}
            />

            {/* Regional Service Centers (Edgewater, Brooklyn, Rockville, DC) */}
            <LocationsSection
              language={language}
              onSelectLocationForBooking={handleSelectLocationForBooking}
            />

            {/* About & Trust */}
            <AboutSection
              language={language}
              onBookService={() => setIsScheduleOpen(true)}
            />
          </>
        )}

        {/* ========================================================= */}
        {/* PAGE 2: SHOP TIRES                                        */}
        {/* ========================================================= */}
        {activeTab === 'shop' && (
          <div className="py-8 space-y-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                <button type="button" onClick={() => setActiveTab('home')} className="hover:text-emerald-400">
                  Home
                </button>
                <span>/</span>
                <span className="text-emerald-400 font-bold">Shop For Tires</span>
              </div>

              <div className="bg-slate-900 border border-emerald-950 rounded-3xl p-8 sm:p-10 mb-8 relative overflow-hidden">
                <div className="max-w-2xl space-y-3">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-heading">
                    Full Inventory Catalog
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black font-heading text-white uppercase italic tracking-tight">
                    Shop New & Inspected Used Tires
                  </h1>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Filter by exact tire width, aspect ratio, rim diameter, or vehicle make. Every tire order includes our store fitment guarantee and same-day installation option across our 4 regional shops.
                  </p>
                </div>
              </div>

              <TireFinder
                language={language}
                onFilterApply={(filters) => setActiveFilters(filters)}
              />
            </div>

            <TireCatalog
              tires={TIRE_PRODUCTS}
              language={language}
              onAddToCart={handleAddToCart}
              onBookWithTire={handleBookWithTire}
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 3: SERVICES                                          */}
        {/* ========================================================= */}
        {activeTab === 'services' && (
          <div className="py-8 space-y-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                <button type="button" onClick={() => setActiveTab('home')} className="hover:text-emerald-400">
                  Home
                </button>
                <span>/</span>
                <span className="text-emerald-400 font-bold">Services</span>
              </div>

              <div className="bg-slate-900 border border-emerald-950 rounded-3xl p-8 sm:p-10 relative overflow-hidden mb-8">
                <div className="max-w-2xl space-y-3">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-heading">
                    Factory Certified Equipment
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black font-heading text-white uppercase italic tracking-tight">
                    Complete Automotive & Tire Services
                  </h1>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    From precision Hunter Road Force wheel balancing and laser alignments to fast puncture repairs and TPMS programming, our shops keep your vehicle driving safe and smooth.
                  </p>
                </div>
              </div>
            </div>

            <ServicesSection
              language={language}
              onBookService={handleBookService}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE: MOBILE TRUCK (DEDICATED FLEET PAGE)                 */}
        {/* ========================================================= */}
        {activeTab === 'mobile-truck' && (
          <div className="py-8 space-y-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                <button type="button" onClick={() => setActiveTab('home')} className="hover:text-emerald-400">
                  Home
                </button>
                <span>/</span>
                <span className="text-emerald-400 font-bold">Mobile Tire Service Truck</span>
              </div>
            </div>

            <MobileTruckSection
              language={language}
              onBookMobile={() => setIsScheduleOpen(true)}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 4: USED TIRES DEDICATED                              */}
        {/* ========================================================= */}
        {activeTab === 'used-tires' && (
          <div className="py-8 space-y-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                <button type="button" onClick={() => setActiveTab('home')} className="hover:text-emerald-400">
                  Home
                </button>
                <span>/</span>
                <span className="text-emerald-400 font-bold">Used Tires</span>
              </div>

              <div className="bg-slate-900 border border-emerald-950 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
                <div className="max-w-3xl space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 text-xs font-bold uppercase tracking-wider font-heading">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Certified Safety Standards</span>
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-black font-heading text-white uppercase italic tracking-tight">
                    Premium Inspected Used Tires
                  </h1>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Why pay $180+ per tire at retail dealership prices? Every single pre-owned tire at Prosperity Tire Center undergoes rigorous testing: submerged in water pressure tanks at 45 PSI to verify bead and casing integrity, tread depth certified between 75% to 90%, and backed by our store replacement guarantee.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsScheduleOpen(true)}
                      className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-emerald-950/60"
                    >
                      Book Used Tire Fitting
                    </button>
                    <a
                      href="tel:8883759048"
                      className="px-5 py-3 rounded-xl bg-slate-950 border border-slate-700 hover:border-emerald-500 text-white font-bold text-xs uppercase tracking-wider"
                    >
                      Check Inventory: (888) 375-9048
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Inspection Checklist Card */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="space-y-2">
                  <div className="text-emerald-400 font-heading font-bold text-sm uppercase">1. Water Immersion Tested</div>
                  <p className="text-xs text-slate-300">
                    Pressurized to 45 PSI in our hydraulic dunk tank to catch microscopic pinholes, bead leaks, and structural separation.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-emerald-400 font-heading font-bold text-sm uppercase">2. 75% to 90% Tread Depth</div>
                  <p className="text-xs text-slate-300">
                    Digitally measured with depth gauges across all three rib zones to guarantee safe braking distance and wet weather traction.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-emerald-400 font-heading font-bold text-sm uppercase">3. 30-Day Hassle-Free Warranty</div>
                  <p className="text-xs text-slate-300">
                    Drive with 100% peace of mind. If any inspected pre-owned tire develops an anomaly, we exchange it immediately at no cost.
                  </p>
                </div>
              </div>
            </div>

            {/* Pre-Filtered Catalog of Used Tires */}
            <TireCatalog
              tires={TIRE_PRODUCTS.filter((t) => t.condition === 'used')}
              language={language}
              onAddToCart={handleAddToCart}
              onBookWithTire={handleBookWithTire}
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 5: COUPONS & DEALS                                   */}
        {/* ========================================================= */}
        {activeTab === 'coupons' && (
          <div className="py-8 space-y-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                <button type="button" onClick={() => setActiveTab('home')} className="hover:text-emerald-400">
                  Home
                </button>
                <span>/</span>
                <span className="text-emerald-400 font-bold">Coupons & Deals</span>
              </div>
            </div>

            <CouponsSection
              language={language}
              onApplyCoupon={handleApplyCoupon}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 6: LOCATIONS                                         */}
        {/* ========================================================= */}
        {activeTab === 'locations' && (
          <div className="py-8 space-y-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                <button type="button" onClick={() => setActiveTab('home')} className="hover:text-emerald-400">
                  Home
                </button>
                <span>/</span>
                <span className="text-emerald-400 font-bold">Locations</span>
              </div>
            </div>

            <LocationsSection
              language={language}
              onSelectLocationForBooking={handleSelectLocationForBooking}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 7: REVIEWS (NEW DEDICATED GOOGLE REVIEWS PAGE)       */}
        {/* ========================================================= */}
        {activeTab === 'reviews' && (
          <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                <button type="button" onClick={() => setActiveTab('home')} className="hover:text-emerald-400">
                  Home
                </button>
                <span>/</span>
                <span className="text-emerald-400 font-bold">Customer Reviews</span>
              </div>
            </div>

            <ReviewsPage
              language={language}
              onBookService={() => setIsScheduleOpen(true)}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 8: ABOUT US                                          */}
        {/* ========================================================= */}
        {activeTab === 'about' && (
          <div className="py-8 space-y-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                <button type="button" onClick={() => setActiveTab('home')} className="hover:text-emerald-400">
                  Home
                </button>
                <span>/</span>
                <span className="text-emerald-400 font-bold">About Us</span>
              </div>
            </div>

            <AboutSection
              language={language}
              onBookService={() => setIsScheduleOpen(true)}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 9: CONTACT & APPOINTMENT                             */}
        {/* ========================================================= */}
        {activeTab === 'contact' && (
          <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                <button type="button" onClick={() => setActiveTab('home')} className="hover:text-emerald-400">
                  Home
                </button>
                <span>/</span>
                <span className="text-emerald-400 font-bold">Contact & Book</span>
              </div>
            </div>

            <ContactPage
              language={language}
              onOpenSchedule={() => setIsScheduleOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Persistent Bottom Quick-Contact / Scheduling Bar (Mobile & Desktop) */}
      <aside aria-label="Quick contact and booking bar" className="sticky bottom-0 z-30 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs">
            <span className="hidden sm:inline text-slate-400">Questions or need immediate tire fitting?</span>
            <a
              href="tel:8883759048"
              className="flex items-center gap-1.5 text-emerald-400 font-bold hover:underline font-mono-num"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>(888) 375-9048</span>
            </a>
            <span className="text-slate-600 hidden md:inline">·</span>
            <span className="text-slate-400 hidden md:inline">Open Mon–Sat 8:30AM–6:30PM · Sun 9AM–5PM</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSelectedBookingService(null);
                setIsScheduleOpen(true);
              }}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider shadow-md transition-colors cursor-pointer"
            >
              {t.scheduleService}
            </button>
          </div>
        </div>
      </aside>

      {/* Footer */}
      <Footer
        language={language}
        onNavigate={(tab) => {
          setActiveTab(tab);
        }}
        onOpenSchedule={() => setIsScheduleOpen(true)}
      />

      {/* Cart / Quote Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onToggleInstallation={handleToggleInstallation}
        onRemoveItem={handleRemoveFromCart}
        language={language}
        appliedCouponCode={appliedCouponCode}
        setAppliedCouponCode={setAppliedCouponCode}
      />

      {/* Service Scheduling Modal */}
      <AppointmentModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        language={language}
        initialLocation={selectedBookingLocation}
        initialService={selectedBookingService}
      />
    </div>
  );
}
