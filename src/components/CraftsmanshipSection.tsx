import React from 'react';
import { ShieldCheck, Scale, Award, RefreshCw } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: '100% BIS 916 Hallmarking',
      description: 'Every single piece carries the official Bureau of Indian Standards hallmark, certifying 91.6% pure fine gold purity with unique HUID laser verification.'
    },
    {
      icon: Scale,
      title: 'Gram-Wise Weight Transparency',
      description: 'Zero hidden metal deductions. Gross weight, net gold weight, and exact alloy metrics are itemized down to the second decimal place on every valuation slip.'
    },
    {
      icon: Award,
      title: 'Hereditary Karigar Artistry',
      description: 'Cast, chased, and hand-granulated by master goldsmith guilds possessing centuries of royal royal court jewellery lineage.'
    },
    {
      icon: RefreshCw,
      title: 'Guaranteed Lifetime Buyback',
      description: 'Full transparency assurance with 100% gold value exchange against prevailing bullion spot rates at any authorized Aurelia atelier worldwide.'
    }
  ];

  return (
    <section id="craftsmanship" className="py-20 bg-[#101215] border-t border-[#23272e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#d4af37]">
            <span>Purity Standard</span>
            <span aria-hidden="true" className="text-[#555047]">·</span>
            <span>Atelier Guarantee</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#f8f5ee]">
            The Four Tenets of Sovereign Gold Integrity
          </h2>

          <p className="text-[#a0998e] text-sm sm:text-base leading-relaxed">
            Investing in fine gold jewellery requires uncompromising trust. We build our catalogue 
            on absolute metallurgical clarity, certified weights, and honest pricing.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={pillar.title}
                className="p-6 rounded-lg bg-[#14161a] border border-[#272b35] hover:border-[#d4af37]/40 transition-colors space-y-4"
              >
                <div className="w-12 h-12 rounded bg-[#1c1f26] border border-[#303541] flex items-center justify-center text-[#d4af37]">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#717885]">0{idx + 1}.</span>
                  <h3 className="text-lg font-serif font-semibold text-[#f8f5ee]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#9c9589] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hallmark explanation callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-xl bg-gradient-to-r from-[#171a22] to-[#121418] border border-[#2e333e] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-lg font-serif font-semibold text-[#f5e3a9]">
              How to Read Your Aurelia Gold Hallmark
            </h4>
            <p className="text-xs text-[#8c93a0] max-w-2xl">
              Look for the 3 distinct laser marks stamped on the inner shank or clasp: the BIS Triangular Mark, the 916 fineness stamp (22KT), and the unique 6-digit alphanumeric HUID code verifying batch authenticity.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0 font-mono text-xs text-[#d4af37] bg-[#0c0d10] px-4 py-2.5 rounded border border-[#2d323c]">
            <span>▲ BIS</span>
            <span aria-hidden="true" className="text-[#454a55]">|</span>
            <span className="font-bold text-white">916 (22K)</span>
            <span aria-hidden="true" className="text-[#454a55]">|</span>
            <span>HUID #HM7842</span>
          </div>
        </div>

      </div>
    </section>
  );
};
