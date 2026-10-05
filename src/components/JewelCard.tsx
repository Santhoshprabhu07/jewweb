import React from 'react';
import { JewelItem, CurrencyConfig } from '../types/jewellery';
import { formatPrice, formatWeight } from '../utils/formatters';
import { Scale, Bookmark, Eye, ShieldCheck, Check } from 'lucide-react';

interface JewelCardProps {
  item: JewelItem;
  currency: CurrencyConfig;
  isSaved: boolean;
  onToggleSave: (item: JewelItem) => void;
  onSelect: (item: JewelItem) => void;
}

export const JewelCard: React.FC<JewelCardProps> = ({
  item,
  currency,
  isSaved,
  onToggleSave,
  onSelect,
}) => {
  return (
    <article className="group bg-[#131518] rounded-lg border border-[#262a32] hover:border-[#d4af37]/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60">
      
      {/* Visual Slot: Image takes ~65% height on neutral dark backdrop */}
      <div className="relative aspect-[4/3] bg-[#0b0c0e] overflow-hidden cursor-pointer" onClick={() => onSelect(item)}>
        <img
          src={item.image}
          alt={item.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top subtle badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#d4af37] bg-[#0f1114]/85 backdrop-blur-sm px-2 py-0.5 rounded border border-[#2a2e37]">
            {item.purity}
          </span>

          {item.bestseller && (
            <span className="text-[10px] uppercase tracking-wider text-[#e6ded1] bg-[#1a1d24]/90 px-2 py-0.5 rounded border border-[#3b414f]">
              Connoisseur Choice
            </span>
          )}
        </div>

        {/* Quick Save to Tray icon */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(item);
          }}
          className={`absolute bottom-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
            isSaved
              ? 'bg-[#d4af37] text-[#0d0f11] border-[#d4af37]'
              : 'bg-[#121418]/80 text-[#cfc8bd] border-[#313642] hover:bg-[#d4af37] hover:text-[#0d0f11]'
          }`}
          title={isSaved ? 'Remove from Saved Tray' : 'Save to Tray'}
        >
          {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Card Body: Clean typography and explicit metrics */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Collection & SKU metadata */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-[#8c929e]">
            <span className="uppercase tracking-wider text-[11px]">{item.collection}</span>
            <span className="font-mono text-[11px]">{item.sku}</span>
          </div>

          {/* Jewel Name in elegant serif */}
          <h3 
            onClick={() => onSelect(item)} 
            className="text-lg sm:text-xl font-serif font-semibold text-[#f8f5ee] group-hover:text-[#d4af37] transition-colors cursor-pointer line-clamp-1"
          >
            {item.name}
          </h3>

          <p className="text-xs text-[#a39c90] line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Primary Spec Matrix: Approx Weight & Approx Price */}
        <div className="pt-3 border-t border-[#22252c] grid grid-cols-2 gap-3 items-end">
          
          {/* Approx Weight Specification */}
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase tracking-wider text-[#8b919e] flex items-center gap-1">
              <Scale className="w-3 h-3 text-[#d4af37]" />
              Approx Weight
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-base font-bold text-[#ede7dc] tabular-nums">
                {formatWeight(item.approxGrossWeightGrams)}
              </span>
              <span className="text-[10px] text-[#717885]">(Net Gold)</span>
            </div>
          </div>

          {/* Approx Price Specification */}
          <div className="space-y-0.5 text-right">
            <span className="text-[10px] uppercase tracking-wider text-[#8b919e] block">
              Approx Price
            </span>
            <div className="font-mono text-lg font-bold text-[#f5e3a9] tabular-nums">
              {formatPrice(item.basePriceUSD, currency)}
            </div>
          </div>
        </div>

        {/* Dimension & Certification Micro-row */}
        <div className="flex items-center justify-between text-[11px] text-[#7a818e] pt-1">
          <span className="truncate max-w-[180px]">{item.dimensions}</span>
          <span className="flex items-center gap-1 text-[#a69e90] shrink-0 font-mono text-[10px]">
            <ShieldCheck className="w-3 h-3 text-[#d4af37]" />
            BIS 916
          </span>
        </div>

        {/* Card Actions */}
        <div className="pt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSelect(item)}
            className="flex-1 py-2 px-3 rounded text-xs uppercase tracking-wider font-semibold text-[#0d0f11] bg-[#d4af37] hover:bg-[#e0be48] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Full Specs</span>
          </button>
          
          <button
            type="button"
            onClick={() => onToggleSave(item)}
            className={`py-2 px-3 rounded text-xs border transition-colors cursor-pointer ${
              isSaved
                ? 'bg-[#1f2228] text-[#d4af37] border-[#d4af37]'
                : 'bg-[#16181d] text-[#cdc6b8] border-[#2b303a] hover:border-[#d4af37]'
            }`}
            title="Save to Selection Tray"
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </article>
  );
};
