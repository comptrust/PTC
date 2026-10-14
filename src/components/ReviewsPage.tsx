import React, { useState, useMemo } from 'react';
import { Star, CheckCircle2, MessageSquare, ExternalLink, Search, Filter, ShieldCheck, Heart, ThumbsUp } from 'lucide-react';
import { GOOGLE_REVIEWS } from '../data/websiteData';
import { Language } from '../types';

interface ReviewsPageProps {
  language: Language;
  onBookService: () => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ language, onBookService }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'replied' | 'unreplied' | 'fiveStar'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const googleSearchUrl =
    'https://www.google.com/search?q=Prosperity+Tire+Center&stick=H4sIAAAAAAAA_-NgU1I1qLCwTDJPNrdITU0xs0hLTE6zMqgwS0kyMTQwNjA2NzZKTTMzWMQqFlCUX1yQWpRZUqkQklmUquCcmleSWgQAFFIccUIAAAA&hl=en-GB#mpd=~4865501154183596513/customers/reviews';

  const filteredReviews = useMemo(() => {
    return GOOGLE_REVIEWS.filter((rev) => {
      // Tab filter
      if (activeFilter === 'replied' && !rev.ownerResponse) return false;
      if (activeFilter === 'unreplied' && rev.ownerResponse) return false;
      if (activeFilter === 'fiveStar' && rev.rating !== 5) return false;

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesAuthor = rev.author.toLowerCase().includes(q);
        const matchesText = rev.text.toLowerCase().includes(q);
        const matchesTag = rev.highlightService?.toLowerCase().includes(q);
        const matchesResponse = rev.ownerResponse?.text.toLowerCase().includes(q);
        if (!matchesAuthor && !matchesText && !matchesTag && !matchesResponse) return false;
      }

      return true;
    });
  }, [activeFilter, searchQuery]);

  const repliedCount = GOOGLE_REVIEWS.filter((r) => !!r.ownerResponse).length;
  const unrepliedCount = GOOGLE_REVIEWS.filter((r) => !r.ownerResponse).length;

  return (
    <div className="py-10 space-y-12">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-emerald-950 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 text-xs font-bold uppercase tracking-wider font-heading">
              <Star className="w-3.5 h-3.5 fill-emerald-400" />
              <span>Verified Google Customer Reviews</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-heading text-white uppercase italic tracking-tight">
              Real Reviews From Real Drivers
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {language === 'en'
                ? 'Read genuine feedback directly from our Google business profile. From 10-minute nail puncture plugs to full sets of high-mileage new tires, see why local commuters and commercial fleets trust Prosperity Tire Center across Washington DC & Maryland.'
                : 'Lea testimonios auténticos de nuestro perfil de Google. Desde reparaciones rápidas de ponchaduras en 10 minutos hasta juegos completos de llantas nuevas, descubra por qué conductores particulares y flotas confían en Prosperity Tire Center.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={googleSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-950/60"
              >
                <span>View Live on Google</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onBookService}
                className="px-5 py-3 rounded-xl bg-slate-950 border border-slate-700 hover:border-emerald-500/60 text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Book Your Tire Fitting
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Aggregate Score Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-slate-800 pb-4 md:pb-0 md:pr-4">
            <div className="text-4xl sm:text-5xl font-black font-heading text-emerald-400">4.8</div>
            <div>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-slate-400 mt-1 block">Based on 140+ Google Ratings</span>
            </div>
          </div>

          <div className="space-y-1 border-b md:border-b-0 md:border-r border-slate-800 pb-4 md:pb-0 md:pr-4">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Owner Dedication</span>
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Bertin & Alexy Owner Replies</span>
            </div>
            <p className="text-xs text-slate-400">Personal follow-up on every customer visit</p>
          </div>

          <div className="space-y-1 border-b md:border-b-0 md:border-r border-slate-800 pb-4 md:pb-0 md:pr-4">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Turnaround Standard</span>
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Under 30-Min Tire Swap</span>
            </div>
            <p className="text-xs text-slate-400">Fast express bays for busy commuters</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Multilingual Team</span>
            <div className="text-sm font-bold text-white">English · Spanish · French · Creole</div>
            <p className="text-xs text-slate-400">Welcoming every DMV community member</p>
          </div>
        </div>
      </div>

      {/* Google Interactive Filters & Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          {/* Tab buttons like Google Reviews */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-heading uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                activeFilter === 'all'
                  ? 'bg-emerald-600 text-slate-950 shadow-md shadow-emerald-950'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              All Reviews ({GOOGLE_REVIEWS.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('replied')}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-heading uppercase tracking-wider transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                activeFilter === 'replied'
                  ? 'bg-emerald-600 text-slate-950 shadow-md shadow-emerald-950'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Replied by Owner ({repliedCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('unreplied')}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-heading uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                activeFilter === 'unreplied'
                  ? 'bg-emerald-600 text-slate-950 shadow-md shadow-emerald-950'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              Unreplied ({unrepliedCount})
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('fiveStar')}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-heading uppercase tracking-wider transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                activeFilter === 'fiveStar'
                  ? 'bg-emerald-600 text-slate-950 shadow-md shadow-emerald-950'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>5-Star Only</span>
            </button>
          </div>

          {/* Keyword Search Input */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reviews (e.g. used, patch, Bertin)..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800/90 flex flex-col justify-between space-y-4 hover:border-emerald-500/50 transition-all duration-200"
            >
              {/* Header: Author & Rating */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-600 to-green-800 text-slate-950 font-black font-heading flex items-center justify-center text-sm shadow-inner">
                      {rev.avatarText || rev.author.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white font-heading tracking-wide flex items-center gap-1.5">
                        <span>{rev.author}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        {rev.isLocalGuide && (
                          <span className="text-amber-400 font-semibold">Local Guide ·</span>
                        )}
                        <span>{rev.reviewsCount} reviews</span>
                        {rev.photosCount ? <span>· {rev.photosCount} photos</span> : null}
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] text-slate-400 shrink-0 font-medium">
                    {rev.date}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                  <span className="text-xs text-slate-400 ml-1 font-semibold">{rev.rating}.0</span>
                </div>

                {/* Service Tag */}
                {rev.highlightService && (
                  <div className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-800/50 text-[10px] text-emerald-300 font-semibold uppercase tracking-wider">
                    {rev.highlightService}
                  </div>
                )}

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              {/* Owner Response Box (if applicable) */}
              {rev.ownerResponse && (
                <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-emerald-900/60 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{rev.ownerResponse.author}</span>
                    </div>
                    <span className="text-slate-400">{rev.ownerResponse.date}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-snug">
                    "{rev.ownerResponse.text}"
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-16 p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <Search className="w-8 h-8 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white font-heading">No matching reviews found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your search terms or clearing the filter tabs.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="mt-2 px-4 py-2 rounded-lg bg-emerald-600 text-slate-950 font-bold text-xs uppercase"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Review Submission CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950/50 to-slate-900 border border-emerald-500/40 text-center space-y-4">
          <h3 className="text-2xl font-black font-heading text-white uppercase italic tracking-tight">
            Had Your Tires Serviced Recently?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Your review helps fellow Maryland and Washington DC drivers find fair prices and honest workmanship. We reply to all reviews personally!
          </p>
          <div>
            <a
              href={googleSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-heading font-black text-xs uppercase tracking-wider shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Star className="w-4 h-4 fill-slate-950" />
              <span>Write a Google Review</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
