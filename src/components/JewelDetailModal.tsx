import React, { useState } from 'react';
import { JewelItem, CurrencyConfig } from '../types/jewellery';
import { formatPrice, formatWeight, calculateBreakdown } from '../utils/formatters';
import { X, Scale, ShieldCheck, Bookmark, Check, Calendar, MessageCircle, Info, Sparkles, Send } from 'lucide-react';

interface JewelDetailModalProps {
  item: JewelItem | null;
  currency: CurrencyConfig;
  isSaved: boolean;
  onToggleSave: (item: JewelItem) => void;
  onClose: () => void;
  onBookAtelier: (item?: JewelItem) => void;
}

export const JewelDetailModal: React.FC<JewelDetailModalProps> = ({
  item,
  currency,
  isSaved,
  onToggleSave,
  onClose,
  onBookAtelier,
}) => {
  const [customWeightNote, setCustomWeightNote] = useState('');
  const [enquirySent, setEnquirySent] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'breakdown' | 'custom'>('specs');

  if (!item) return null;

  const breakdown = calculateBreakdown(item, currency);

  const handleSendCustomEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySent(true);
    setTimeout(() => {
      setEnquirySent(false);
      setCustomWeightNote('');
    }, 4000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Aurelia Atelier, I am interested in the "${item.name}" (SKU: ${item.sku}) with approx weight ${item.approxGrossWeightGrams}g priced at ${formatPrice(item.basePriceUSD, currency)}. Could you provide more details or an in-person viewing?`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#121417] border border-[#2e333e] rounded-xl shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Top Header bar with close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#22252c] bg-[#16181d]">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37]">
            <span>{item.collection}</span>
            <span aria-hidden="true" className="text-[#555a66]">/</span>
            <span className="font-mono text-[#9ca3af]">{item.sku}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9ca3af] hover:text-white hover:bg-[#252932] transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[80vh] overflow-y-auto">
          
          {/* Left Column: Image showcase with zoom feel */}
          <div className="md:col-span-6 bg-[#0a0b0d] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#22252c]">
            <div className="relative rounded-lg overflow-hidden border border-[#252831]">
              <img
                src={item.image}
                alt={item.name}
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover object-center"
              />
              <div className="absolute top-3 left-3 bg-[#0d0f11]/90 backdrop-blur-sm border border-[#2d323c] px-2.5 py-1 rounded text-[11px] font-mono text-[#d4af37]">
                {item.purity}
              </div>
            </div>

            {/* Quick summary strip */}
            <div className="mt-4 p-4 rounded bg-[#16181d] border border-[#282c35] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#8b919e] flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-[#d4af37]" />
                  Verified Gross Weight
                </span>
                <span className="font-mono text-base font-bold text-[#ede7dc]">
                  {formatWeight(item.approxGrossWeightGrams)}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-[#23272e] pt-2">
                <span className="text-xs uppercase tracking-wider text-[#8b919e]">
                  Approximate Valuation
                </span>
                <span className="font-mono text-lg font-bold text-[#f5e3a9]">
                  {formatPrice(item.basePriceUSD, currency)}
                </span>
              </div>
            </div>

            {/* Guarantee badge */}
            <div className="mt-4 flex items-center gap-2 text-xs text-[#959caa]">
              <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>Certified 100% BIS Hallmarked Gold with Laser Authenticity Engraving.</span>
            </div>
          </div>

          {/* Right Column: Detailed Specifications & Action Tabs */}
          <div className="md:col-span-6 p-6 flex flex-col justify-between space-y-6">
            
            {/* Title & Description */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#f8f5ee] leading-tight">
                {item.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#aea79a] leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Tab Navigation for Detailed Inspection */}
            <div className="flex items-center gap-1 p-1 bg-[#181a20] rounded-lg border border-[#272b34]">
              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                className={`flex-1 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                  activeTab === 'specs'
                    ? 'bg-[#d4af37] text-[#0d0f11] font-semibold'
                    : 'text-[#9fa6b2] hover:text-white'
                }`}
              >
                Specifications
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('breakdown')}
                className={`flex-1 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                  activeTab === 'breakdown'
                    ? 'bg-[#d4af37] text-[#0d0f11] font-semibold'
                    : 'text-[#9fa6b2] hover:text-white'
                }`}
              >
                Price Math
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('custom')}
                className={`flex-1 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                  activeTab === 'custom'
                    ? 'bg-[#d4af37] text-[#0d0f11] font-semibold'
                    : 'text-[#9fa6b2] hover:text-white'
                }`}
              >
                Custom Weight
              </button>
            </div>

            {/* Tab 1: Detailed Specifications Sheet */}
            {activeTab === 'specs' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded bg-[#181b21] border border-[#282c36]">
                    <span className="text-[#848b97] block text-[10px] uppercase tracking-wider">Gross Weight</span>
                    <span className="font-mono font-semibold text-white text-sm">
                      {formatWeight(item.approxGrossWeightGrams)}
                    </span>
                  </div>

                  <div className="p-3 rounded bg-[#181b21] border border-[#282c36]">
                    <span className="text-[#848b97] block text-[10px] uppercase tracking-wider">Net Gold Weight</span>
                    <span className="font-mono font-semibold text-[#f5e3a9] text-sm">
                      {formatWeight(item.approxNetGoldWeightGrams)}
                    </span>
                  </div>

                  <div className="p-3 rounded bg-[#181b21] border border-[#282c36]">
                    <span className="text-[#848b97] block text-[10px] uppercase tracking-wider">Purity Rating</span>
                    <span className="font-mono font-medium text-white">{item.purity}</span>
                  </div>

                  <div className="p-3 rounded bg-[#181b21] border border-[#282c36]">
                    <span className="text-[#848b97] block text-[10px] uppercase tracking-wider">Making / Crafting</span>
                    <span className="font-mono font-medium text-white">{item.approxMakingChargePercent}% of metal</span>
                  </div>
                </div>

                <div className="p-3 rounded bg-[#181b21] border border-[#282c36] text-xs space-y-1">
                  <span className="text-[#848b97] block text-[10px] uppercase tracking-wider">Dimensions & Sizing</span>
                  <p className="text-[#ded8ce]">{item.dimensions}</p>
                </div>

                <div className="p-3 rounded bg-[#181b21] border border-[#282c36] text-xs space-y-1">
                  <span className="text-[#848b97] block text-[10px] uppercase tracking-wider">Master Goldsmith Notes</span>
                  <p className="text-[#b4ada1] italic">{item.craftsmanshipNotes}</p>
                </div>
              </div>
            )}

            {/* Tab 2: Transparent Price Breakdown Math */}
            {activeTab === 'breakdown' && (
              <div className="space-y-3 p-4 rounded bg-[#16181e] border border-[#282c36] text-xs">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#f5e3a9]">
                  <Info className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Transparent Gold Valuation Formula</span>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#23272f]">
                  <div className="flex items-center justify-between text-[#a0a7b5]">
                    <span>Current 22KT Benchmark:</span>
                    <span className="font-mono text-white">
                      {currency.symbol}{breakdown.goldRatePerGram.toLocaleString()}/gram
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[#a0a7b5]">
                    <span>Net Gold Value ({formatWeight(item.approxNetGoldWeightGrams)}):</span>
                    <span className="font-mono text-white">
                      {currency.symbol}{breakdown.pureGoldValue.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[#a0a7b5]">
                    <span>Artisan Making Charges ({item.approxMakingChargePercent}%):</span>
                    <span className="font-mono text-white">
                      {currency.symbol}{breakdown.makingCharges.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[#a0a7b5]">
                    <span>Estimated Hallmark & Duties (approx 3%):</span>
                    <span className="font-mono text-white">
                      {currency.symbol}{breakdown.estimatedTaxes.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#2e333d] font-bold text-sm">
                    <span className="text-[#ede7dc]">Approx Total Estimate:</span>
                    <span className="font-mono text-[#f5e3a9]">
                      {currency.symbol}{breakdown.totalApproxPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-[#717885] pt-1">
                  *Final price is calibrated at checkout against the exact spot gold weight timestamp.
                </p>
              </div>
            )}

            {/* Tab 3: Custom Weight Request */}
            {activeTab === 'custom' && (
              <div className="p-4 rounded bg-[#16181e] border border-[#282c36] text-xs space-y-3">
                <div className="flex items-center gap-1.5 text-[#f5e3a9] font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Request Bespoke Weight or Custom Sizing</span>
                </div>
                <p className="text-[11px] text-[#9ca3af]">
                  Our hereditary goldsmiths can cast this piece in your custom preferred gold weight (e.g. 35g or 55g) or resize to your exact wrist/neck contour.
                </p>

                {enquirySent ? (
                  <div className="p-3 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-center font-medium">
                    Thank you! Your custom weight inquiry has been logged. Our chief metallurgist will connect with you.
                  </div>
                ) : (
                  <form onSubmit={handleSendCustomEnquiry} className="space-y-2">
                    <textarea
                      value={customWeightNote}
                      onChange={(e) => setCustomWeightNote(e.target.value)}
                      placeholder="e.g. Please quote this design in 38 grams 22K gold, with 2.4 bangle size..."
                      className="w-full p-2.5 rounded bg-[#101215] border border-[#2c3038] text-[#ede7dc] text-xs focus:outline-none focus:border-[#d4af37] resize-none h-20"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full py-2 rounded bg-[#d4af37] hover:bg-[#e2c149] text-[#0d0f11] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Custom Specification</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Action Bar */}
            <div className="space-y-2.5 pt-3 border-t border-[#22252c]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onBookAtelier(item);
                  }}
                  className="flex-1 py-3 px-4 rounded text-xs uppercase tracking-wider font-semibold text-[#0d0f11] bg-gradient-to-r from-[#d4af37] to-[#c49f34] hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/15"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Atelier Viewing</span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleSave(item)}
                  className={`p-3 rounded border transition-colors cursor-pointer ${
                    isSaved
                      ? 'bg-[#d4af37] text-[#0d0f11] border-[#d4af37]'
                      : 'bg-[#181a20] text-[#ded8ce] border-[#313540] hover:border-[#d4af37]'
                  }`}
                  title={isSaved ? 'In Selection Tray' : 'Save to Selection Tray'}
                >
                  {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                </button>
              </div>

              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="w-full py-2.5 px-4 rounded text-xs font-medium text-[#b5b0a3] hover:text-white bg-[#16181d] border border-[#2b2f38] hover:border-[#3d434f] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Enquire via WhatsApp Concierge</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
