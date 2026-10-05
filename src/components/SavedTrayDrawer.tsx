import React, { useState } from 'react';
import { JewelItem, CurrencyConfig } from '../types/jewellery';
import { formatPrice, formatWeight } from '../utils/formatters';
import { X, Scale, Trash2, Printer, Calendar, ShieldCheck, CheckCircle } from 'lucide-react';

interface SavedTrayDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedItems: JewelItem[];
  onRemoveItem: (id: string) => void;
  onClearTray: () => void;
  currency: CurrencyConfig;
  onBookAtelier: () => void;
}

export const SavedTrayDrawer: React.FC<SavedTrayDrawerProps> = ({
  isOpen,
  onClose,
  savedItems,
  onRemoveItem,
  onClearTray,
  currency,
  onBookAtelier,
}) => {
  const [showQuotationSlip, setShowQuotationSlip] = useState(false);

  if (!isOpen) return null;

  const totalWeight = savedItems.reduce((acc, item) => acc + item.approxGrossWeightGrams, 0);
  const totalPrice = savedItems.reduce((acc, item) => acc + item.basePriceUSD, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121417] border-l border-[#2e333e] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#22252c] flex items-center justify-between bg-[#16181d]">
            <div>
              <h2 className="text-xl font-serif font-semibold text-[#f8f5ee]">
                Curated Selection Tray
              </h2>
              <p className="text-xs text-[#9aa1ae] mt-0.5">
                {savedItems.length} {savedItems.length === 1 ? 'Design' : 'Designs'} Selected
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#9ca3af] hover:text-white hover:bg-[#252932] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: Items List or Empty State */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Scale className="w-12 h-12 text-[#464c58] mx-auto" />
                <p className="text-base font-serif text-[#ded7cb]">Your Tray is Empty</p>
                <p className="text-xs text-[#828996] max-w-xs mx-auto">
                  Browse our catalogue and bookmark your favourite necklaces, bangles, and earrings to view combined weights and valuation estimates.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-[#8c929e] pb-2 border-b border-[#22252c]">
                  <span>Jewel Details & Weight</span>
                  <button
                    type="button"
                    onClick={onClearTray}
                    className="text-[#9ca3af] hover:text-red-400 transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-3">
                  {savedItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-lg bg-[#16181d] border border-[#262a33] flex items-center gap-3 justify-between group"
                    >
                      <div className="w-14 h-14 rounded overflow-hidden bg-black shrink-0 border border-[#2b2f38]">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-serif font-semibold text-[#f8f5ee] truncate">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-[#8e95a3] font-mono mt-0.5">
                          <span className="text-[#ede7dc] font-bold">{formatWeight(item.approxGrossWeightGrams)}</span>
                          <span aria-hidden="true">·</span>
                          <span>{item.purity}</span>
                        </div>
                        <div className="font-mono text-xs font-bold text-[#f5e3a9] mt-0.5">
                          {formatPrice(item.basePriceUSD, currency)}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 text-[#737a88] hover:text-red-400 hover:bg-[#20232a] rounded transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer & Totals */}
          {savedItems.length > 0 && (
            <div className="p-6 border-t border-[#22252c] bg-[#16181d] space-y-4">
              
              {/* Accumulated Totals Card */}
              <div className="p-4 rounded-lg bg-[#101215] border border-[#2e333e] space-y-2">
                <div className="flex items-center justify-between text-xs text-[#a0a6b4]">
                  <span className="flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-[#d4af37]" />
                    Total Combined Gold Weight:
                  </span>
                  <span className="font-mono text-base font-bold text-white tabular-nums">
                    {formatWeight(totalWeight)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-[#a0a6b4]">
                  <span>Approx Total Valuation:</span>
                  <span className="font-mono text-lg font-bold text-[#f5e3a9] tabular-nums">
                    {formatPrice(totalPrice, currency)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onBookAtelier();
                  }}
                  className="w-full py-3 px-4 rounded text-xs uppercase tracking-wider font-semibold text-[#0d0f11] bg-gradient-to-r from-[#d4af37] to-[#c49f34] hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/15"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve This Selection in Atelier</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowQuotationSlip(true)}
                  className="w-full py-2.5 px-4 rounded text-xs font-medium text-[#ded8ce] bg-[#1a1d23] border border-[#2d323c] hover:border-[#d4af37] transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Printer className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>View Printable Estimate Quotation</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* Printable Estimate Quotation Modal */}
      {showQuotationSlip && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-white text-slate-900 rounded-lg p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Header of memo */}
            <div className="flex items-start justify-between border-b pb-4 border-slate-200">
              <div>
                <h3 className="text-2xl font-serif font-bold tracking-widest uppercase text-amber-900">
                  AURELIA
                </h3>
                <p className="text-xs text-slate-500 uppercase tracking-widest mt-0.5">
                  Haute Joaillerie & Fine Goldsmiths
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowQuotationSlip(false)}
                className="text-slate-400 hover:text-slate-700 p-1 print:hidden cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="font-mono">REF: AUR-EST-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>

            {/* Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Itemized Valuation Estimate
              </h4>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-300 text-left text-slate-600">
                    <th className="py-2">Item / SKU</th>
                    <th className="py-2 text-right">Weight</th>
                    <th className="py-2 text-right">Purity</th>
                    <th className="py-2 text-right">Approx Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {savedItems.map((item) => (
                    <tr key={item.id} className="text-slate-800">
                      <td className="py-2">
                        <p className="font-medium">{item.name}</p>
                        <p className="font-mono text-[10px] text-slate-500">{item.sku}</p>
                      </td>
                      <td className="py-2 text-right font-mono font-semibold">
                        {formatWeight(item.approxGrossWeightGrams)}
                      </td>
                      <td className="py-2 text-right font-mono text-[11px] text-slate-600">
                        {item.purity.split(' ')[0]}
                      </td>
                      <td className="py-2 text-right font-mono font-semibold">
                        {formatPrice(item.basePriceUSD, currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Row */}
            <div className="p-4 bg-amber-50/60 rounded border border-amber-200/60 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-700">Total Net Gold Weight:</span>
                <span className="font-mono font-bold text-amber-900 text-sm">
                  {formatWeight(totalWeight)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-700">Total Estimated Valuation:</span>
                <span className="font-mono font-bold text-amber-900 text-base">
                  {formatPrice(totalPrice, currency)}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 italic text-center">
              All pieces come certified with BIS 916 Hallmark & individual micro-laser engraving.
            </p>

            {/* Print Action */}
            <div className="flex items-center gap-3 print:hidden">
              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 py-2.5 rounded bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Slip</span>
              </button>
              <button
                type="button"
                onClick={() => setShowQuotationSlip(false)}
                className="py-2.5 px-4 rounded border border-slate-300 text-slate-700 text-xs hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
