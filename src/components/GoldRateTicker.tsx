import React from 'react';
import { CurrencyConfig, LIVE_GOLD_RATES_USD } from '../types/jewellery';
import { TrendingUp, ShieldCheck, Clock } from 'lucide-react';

interface GoldRateTickerProps {
  currency: CurrencyConfig;
  onOpenCalculator: () => void;
}

export const GoldRateTicker: React.FC<GoldRateTickerProps> = ({
  currency,
  onOpenCalculator,
}) => {
  const rate24K = Math.round(LIVE_GOLD_RATES_USD['24KT'] * currency.ratePerUSD);
  const rate22K = Math.round(LIVE_GOLD_RATES_USD['22KT'] * currency.ratePerUSD);
  const rate18K = Math.round(LIVE_GOLD_RATES_USD['18KT'] * currency.ratePerUSD);

  const formattedRate = (val: number) => {
    return `${currency.symbol}${val.toLocaleString()}/g`;
  };

  return (
    <div id="gold-rates" className="border-y border-[#23272e] bg-[#121417]/90 py-3 px-4 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Left: Live status indication */}
        <div className="flex items-center gap-2 text-[#9da5b0]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-medium uppercase tracking-wider text-[#ded8ce]">
            Live Gold Benchmark
          </span>
          <span className="text-[#6c727d] hidden sm:inline" aria-hidden="true">·</span>
          <span className="text-[#878e99] hidden sm:inline flex items-center gap-1">
            <Clock className="w-3 h-3 inline" />
            Updated Today
          </span>
        </div>

        {/* Center: Karat breakdown with tabular numerals */}
        <div className="flex items-center gap-4 sm:gap-8 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-[#9ea3ab]">24KT (99.9% Pure):</span>
            <span className="font-mono font-semibold text-[#f5e3a9]">
              {formattedRate(rate24K)}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-[#1b1e24] px-2.5 py-1 rounded border border-[#2e333d]">
            <span className="text-[#d4af37] font-medium">22KT (916 BIS Hallmark):</span>
            <span className="font-mono font-bold text-white">
              {formattedRate(rate22K)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#9ea3ab]">18KT (Fine Jewellery):</span>
            <span className="font-mono font-medium text-[#ded8ce]">
              {formattedRate(rate18K)}
            </span>
          </div>
        </div>

        {/* Right: Quick action */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenCalculator}
            className="flex items-center gap-1.5 text-[#d4af37] hover:text-[#f5e3a9] font-medium underline underline-offset-4 decoration-[#d4af37]/40 hover:decoration-[#d4af37] transition-all cursor-pointer whitespace-nowrap"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Calculate Custom Grams</span>
          </button>
          <span className="text-[#525866] hidden md:inline" aria-hidden="true">·</span>
          <span className="text-[#858c97] hidden md:flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
            100% Certified 916 Hallmark
          </span>
        </div>
      </div>
    </div>
  );
};
