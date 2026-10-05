import React from 'react';
import { CurrencyCode, CurrencyConfig, CURRENCIES } from '../types/jewellery';
import { Scale, Bookmark, Calendar, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentCurrency: CurrencyConfig;
  onSelectCurrency: (currency: CurrencyConfig) => void;
  savedItemCount: number;
  totalSavedWeightGrams: number;
  onOpenTray: () => void;
  onOpenCalculator: () => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  onSelectCurrency,
  savedItemCount,
  totalSavedWeightGrams,
  onOpenTray,
  onOpenCalculator,
  onOpenBooking,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0d0f11]/95 backdrop-blur-md border-b border-[#24272c] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="text-2xl sm:text-3xl font-serif tracking-[0.2em] font-semibold text-[#f5e3a9] hover:text-[#d4af37] transition-colors uppercase whitespace-nowrap"
        >
          AURELIA
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.16em] font-medium text-[#c5beb3]">
          <a href="#catalogue" className="hover:text-[#d4af37] transition-colors relative py-1 hover:border-b hover:border-[#d4af37]">
            Catalogue
          </a>
          <a href="#gold-rates" className="hover:text-[#d4af37] transition-colors relative py-1 hover:border-b hover:border-[#d4af37]">
            Gold Rates
          </a>
          <button 
            type="button"
            onClick={onOpenCalculator}
            className="hover:text-[#d4af37] transition-colors flex items-center gap-1.5 cursor-pointer py-1"
          >
            <Scale className="w-3.5 h-3.5 text-[#d4af37]" />
            Weight Calculator
          </button>
          <a href="#craftsmanship" className="hover:text-[#d4af37] transition-colors relative py-1 hover:border-b hover:border-[#d4af37]">
            Craftsmanship
          </a>
          <a href="#atelier" className="hover:text-[#d4af37] transition-colors relative py-1 hover:border-b hover:border-[#d4af37]">
            Atelier
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Currency selector dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-1.5 text-xs font-mono font-medium px-2.5 py-1.5 rounded bg-[#16181c] border border-[#2b2f36] text-[#e5dfd5] hover:border-[#d4af37]/60 transition-colors cursor-pointer"
              title="Change Currency"
            >
              <span className="text-[#d4af37] font-semibold">{currentCurrency.symbol}</span>
              <span>{currentCurrency.code}</span>
              <ChevronDown className="w-3 h-3 text-[#9ca3af]" />
            </button>
            <div className="absolute right-0 mt-1 w-36 py-1 bg-[#14161a] border border-[#2e333d] rounded-md shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
                const c = CURRENCIES[code];
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => onSelectCurrency(c)}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#202329] transition-colors cursor-pointer ${
                      currentCurrency.code === code ? 'text-[#d4af37] font-semibold bg-[#1a1d22]' : 'text-[#ded7cb]'
                    }`}
                  >
                    <span>{c.code} ({c.symbol})</span>
                    <span className="text-[10px] text-[#8c857b] font-mono">{c.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Saved Tray / Wishlist Button */}
          <button
            type="button"
            onClick={onOpenTray}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#181a1f] border border-[#30353e] hover:border-[#d4af37] transition-all cursor-pointer text-xs font-medium text-[#ede7dc]"
            title="Saved Selection & Total Gold Weight"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="hidden sm:inline">Tray</span>
            {savedItemCount > 0 && (
              <span className="font-mono text-[11px] text-[#d4af37] font-bold">
                ({savedItemCount} · {totalSavedWeightGrams.toFixed(1)}g)
              </span>
            )}
          </button>

          {/* Primary CTA: Book Viewing */}
          <button
            type="button"
            onClick={onOpenBooking}
            className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs uppercase tracking-wider font-semibold rounded bg-gradient-to-r from-[#d4af37] to-[#b38f28] hover:from-[#e5c149] hover:to-[#c49f34] text-[#0d0f11] shadow-md shadow-[#d4af37]/10 transition-all cursor-pointer whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5 text-[#0d0f11]" />
            <span className="hidden lg:inline">Book Atelier Visit</span>
            <span className="lg:hidden">Enquire</span>
          </button>
        </div>
      </div>
    </header>
  );
};
