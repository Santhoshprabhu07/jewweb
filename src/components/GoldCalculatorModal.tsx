import React, { useState } from 'react';
import { CurrencyConfig, LIVE_GOLD_RATES_USD, JewelItem } from '../types/jewellery';
import { formatPrice, formatWeight } from '../utils/formatters';
import { X, Scale, Calculator, ArrowRight, Sparkles } from 'lucide-react';

interface GoldCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyConfig;
  catalogue: JewelItem[];
  onSelectJewel: (item: JewelItem) => void;
}

export const GoldCalculatorModal: React.FC<GoldCalculatorModalProps> = ({
  isOpen,
  onClose,
  currency,
  catalogue,
  onSelectJewel,
}) => {
  const [weightGrams, setWeightGrams] = useState<number>(32);
  const [karat, setKarat] = useState<'24KT' | '22KT' | '18KT'>('22KT');
  const [makingChargePct, setMakingChargePct] = useState<number>(14);

  if (!isOpen) return null;

  const rateUSD = LIVE_GOLD_RATES_USD[karat];
  const ratePerGramInCurrency = Math.round(rateUSD * currency.ratePerUSD);
  
  const rawGoldValue = weightGrams * ratePerGramInCurrency;
  const makingCharges = rawGoldValue * (makingChargePct / 100);
  const estimatedTax = (rawGoldValue + makingCharges) * 0.03;
  const totalEstimatedPrice = Math.round(rawGoldValue + makingCharges + estimatedTax);

  // Find matching items within +- 10g in catalogue
  const matchingPieces = catalogue.filter(
    (item) => Math.abs(item.approxGrossWeightGrams - weightGrams) <= 12
  ).slice(0, 3);

  const presets = [
    { label: 'Delicate Ring / Pendant', grams: 8 },
    { label: 'Chandbali Earrings', grams: 18 },
    { label: 'Daily Wear Chain', grams: 24 },
    { label: 'Classic Temple Choker', grams: 48 },
    { label: 'Royal Kada Pair', grams: 64 },
    { label: 'Grand Bridal Suite', grams: 92 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#121417] border border-[#2e333e] rounded-xl shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#23272e] bg-[#16181e]">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#d4af37]" />
            <h2 className="text-lg font-serif font-semibold text-[#f8f5ee]">
              Live Gold Weight & Price Valuation Calculator
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9ca3af] hover:text-white hover:bg-[#252932] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Quick Preset Buttons */}
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#8a919e] block">
              Quick Weight Presets:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setWeightGrams(p.grams)}
                  className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer ${
                    weightGrams === p.grams
                      ? 'bg-[#d4af37] text-[#0d0f11] font-semibold'
                      : 'bg-[#181a20] text-[#c5beb3] hover:text-white border border-[#272b34]'
                  }`}
                >
                  {p.label} ({p.grams}g)
                </button>
              ))}
            </div>
          </div>

          {/* Input 1: Grams Slider and direct number */}
          <div className="p-4 rounded-lg bg-[#16181e] border border-[#282c36] space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="weight-range" className="text-xs uppercase tracking-wider text-[#9aa1ae] flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-[#d4af37]" />
                Target Gold Weight (Grams)
              </label>
              <div className="flex items-center gap-1 bg-[#101215] px-3 py-1 rounded border border-[#2f343f]">
                <input
                  type="number"
                  min="1"
                  max="300"
                  step="0.5"
                  value={weightGrams}
                  onChange={(e) => setWeightGrams(Math.max(1, Number(e.target.value) || 1))}
                  className="w-16 bg-transparent text-right font-mono font-bold text-white text-base focus:outline-none"
                />
                <span className="text-xs text-[#8c929e] font-mono">grams</span>
              </div>
            </div>

            <input
              id="weight-range"
              type="range"
              min="1"
              max="150"
              step="1"
              value={weightGrams}
              onChange={(e) => setWeightGrams(Number(e.target.value))}
              className="w-full accent-[#d4af37] cursor-pointer"
            />
          </div>

          {/* Input 2: Purity and Making Charges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Karat selector */}
            <div className="p-4 rounded-lg bg-[#16181e] border border-[#282c36] space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#9aa1ae] block">
                Gold Karat / Purity
              </span>
              <div className="grid grid-cols-3 gap-1">
                {(['24KT', '22KT', '18KT'] as const).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setKarat(k)}
                    className={`py-2 text-xs font-mono font-medium rounded transition-colors cursor-pointer ${
                      karat === k
                        ? 'bg-[#d4af37] text-[#0d0f11] font-bold'
                        : 'bg-[#101215] text-[#b0a99c] hover:text-white border border-[#262a33]'
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[#717885]">
                {karat === '22KT' && '91.6% Pure BIS Hallmark (Standard Jewellery)'}
                {karat === '24KT' && '99.9% Pure Investment Grade Gold Bullion'}
                {karat === '18KT' && '75.0% Fine Gold (Contemporary & Diamond Settings)'}
              </p>
            </div>

            {/* Making Charge selector */}
            <div className="p-4 rounded-lg bg-[#16181e] border border-[#282c36] space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="making-range" className="text-xs uppercase tracking-wider text-[#9aa1ae]">
                  Making Charges
                </label>
                <span className="font-mono text-xs font-bold text-[#f5e3a9]">
                  {makingChargePct}%
                </span>
              </div>
              <input
                id="making-range"
                type="range"
                min="8"
                max="25"
                step="0.5"
                value={makingChargePct}
                onChange={(e) => setMakingChargePct(Number(e.target.value))}
                className="w-full accent-[#d4af37] cursor-pointer"
              />
              <p className="text-[11px] text-[#717885]">
                Varies from 11% (chains) to 16% (intricate temple handiwork).
              </p>
            </div>

          </div>

          {/* Valuation Summary Card */}
          <div className="p-5 rounded-lg bg-gradient-to-br from-[#181b22] to-[#121418] border border-[#d4af37]/30 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#2a2f3a]">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold block">
                  Approximate Valuation Result
                </span>
                <span className="text-xs text-[#9aa1ae]">
                  Based on live rate: {currency.symbol}{ratePerGramInCurrency.toLocaleString()} / gram ({karat})
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] uppercase tracking-wider text-[#8f96a3] block">Approx Total</span>
                <span className="font-mono text-2xl font-bold text-[#f5e3a9] tabular-nums">
                  {currency.symbol}{totalEstimatedPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs pt-1">
              <div>
                <span className="text-[#7d8492] block text-[10px]">Pure Gold Value</span>
                <span className="font-mono font-medium text-white">
                  {currency.symbol}{Math.round(rawGoldValue).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[#7d8492] block text-[10px]">Making ({makingChargePct}%)</span>
                <span className="font-mono font-medium text-white">
                  {currency.symbol}{Math.round(makingCharges).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[#7d8492] block text-[10px]">Tax & Hallmark (3%)</span>
                <span className="font-mono font-medium text-white">
                  {currency.symbol}{Math.round(estimatedTax).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Matching pieces from catalogue */}
          {matchingPieces.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#d4af37] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Matching Designs in this Weight Band (~{weightGrams}g):</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {matchingPieces.map((jewel) => (
                  <div
                    key={jewel.id}
                    onClick={() => {
                      onClose();
                      onSelectJewel(jewel);
                    }}
                    className="p-3 rounded-lg bg-[#16181d] border border-[#292e38] hover:border-[#d4af37] cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div className="aspect-[4/3] rounded overflow-hidden mb-2 bg-black">
                      <img
                        src={jewel.image}
                        alt={jewel.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-serif font-semibold text-[#f8f5ee] truncate">
                        {jewel.name}
                      </p>
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#d4af37] mt-1">
                        <span>{formatWeight(jewel.approxGrossWeightGrams)}</span>
                        <span>{formatPrice(jewel.basePriceUSD, currency)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
