import React from 'react';
import { heroJewelleryImage } from '../data/jewelleryCatalogue';
import { Scale, Sparkles, ChevronRight, Award } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenCalculator: () => void;
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onOpenCalculator,
  onOpenBooking,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0d0f11] via-[#121418] to-[#0d0f11] border-b border-[#23272e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            
            {/* Clean unboxed editorial kicker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#d4af37]">
              <span>Haute Joaillerie</span>
              <span aria-hidden="true" className="text-[#5b5242]">·</span>
              <span>22KT & 18KT Certified</span>
              <span aria-hidden="true" className="text-[#5b5242]">·</span>
              <span>BIS Hallmarked</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#fbf8f2] leading-[1.12] text-balance">
              The Sovereign Collection of Fine Gold Artistry
            </h1>

            {/* Description */}
            <p className="text-[#bbb3a5] text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              Explore our definitive 2026 catalogue of master-crafted heirloom necklaces, 
              filigree kadas, chandbalis, and cocktail rings. Every design displays certified 
              approximate gold weight in grams and transparent real-time valuations.
            </p>

            {/* Metrics & Key Specifications with tabular numerals */}
            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-[#262a33]">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#888e99]">Purity Grade</p>
                <p className="text-lg font-serif font-semibold text-[#f5e3a9]">91.6% Pure</p>
                <p className="text-[11px] text-[#717885]">BIS 916 Hallmark</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#888e99]">Weight Range</p>
                <p className="text-lg font-mono font-semibold text-[#ede7dc] tabular-nums">8g – 95g</p>
                <p className="text-[11px] text-[#717885]">Gram-wise precision</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#888e99]">Artisan Guild</p>
                <p className="text-lg font-serif font-semibold text-[#f5e3a9]">Heirloom</p>
                <p className="text-[11px] text-[#717885]">Generational karigars</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                type="button"
                onClick={onExploreClick}
                className="px-6 py-3.5 rounded text-xs uppercase tracking-[0.16em] font-semibold text-[#0d0f11] bg-gradient-to-r from-[#d4af37] via-[#e5c149] to-[#c49f34] hover:brightness-110 shadow-lg shadow-[#d4af37]/20 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Browse Catalogue</span>
                <ChevronRight className="w-4 h-4 text-[#0d0f11]" />
              </button>

              <button
                type="button"
                onClick={onOpenCalculator}
                className="px-5 py-3.5 rounded text-xs uppercase tracking-[0.16em] font-medium text-[#e2dcd1] bg-[#16181d] border border-[#303540] hover:border-[#d4af37]/70 hover:bg-[#1a1d23] transition-all cursor-pointer flex items-center gap-2"
              >
                <Scale className="w-4 h-4 text-[#d4af37]" />
                <span>Estimate by Grams</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Anchor with Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#2e333d] shadow-2xl shadow-black/80 group">
              <img
                src={heroJewelleryImage}
                alt="Aurelia Maharanis Grand Bridal Suite in handcrafted 22KT gold"
                referrerPolicy="no-referrer"
                className="w-full aspect-[16/10] sm:aspect-[16/9] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
              
              {/* Subtle luxury vignette gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f11]/90 via-[#0d0f11]/25 to-transparent pointer-events-none" />

              {/* Showcase Badge overlay with certified weights */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded bg-[#111317]/90 backdrop-blur-md border border-[#2e333d] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-[#d4af37] font-medium uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5" />
                    <span>Featured Masterpiece · Royal Bridal Suite</span>
                  </div>
                  <p className="text-sm font-serif font-semibold text-[#f8f5ee]">
                    The Maharani 22KT Gold Choker & Temple Necklace Suite
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-[#9299a5] block">Approx Weight</span>
                    <span className="font-mono text-sm font-bold text-[#f5e3a9] tabular-nums">92.50 g</span>
                  </div>
                  <button
                    type="button"
                    onClick={onExploreClick}
                    className="px-3 py-1.5 rounded text-[11px] uppercase tracking-wider font-semibold text-[#0d0f11] bg-[#d4af37] hover:bg-[#e0be48] transition-colors cursor-pointer"
                  >
                    View Specs
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
