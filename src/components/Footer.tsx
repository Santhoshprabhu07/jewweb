import React from 'react';
import { Scale, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  onOpenCalculator: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCalculator,
  onOpenBooking,
}) => {
  return (
    <footer id="atelier" className="bg-[#0a0b0d] border-t border-[#22252c] text-[#9ca3af] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <span className="text-xl font-serif tracking-[0.2em] font-semibold text-[#f5e3a9] uppercase block">
              AURELIA
            </span>
            <p className="text-xs text-[#828894] leading-relaxed">
              Curators of fine 22KT and 18KT gold jewellery with uncompromised metallurgical standards, individual laser HUID hallmarking, and transparent gram-based valuations.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#d4af37] pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified BIS 916 Assayed</span>
            </div>
          </div>

          {/* Quick Catalogue Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#ded8ce]">
              Catalogue Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#catalogue" className="hover:text-[#d4af37] transition-colors">
                  Temple & Antique Chokers
                </a>
              </li>
              <li>
                <a href="#catalogue" className="hover:text-[#d4af37] transition-colors">
                  Solid Filigree Bangles & Kadas
                </a>
              </li>
              <li>
                <a href="#catalogue" className="hover:text-[#d4af37] transition-colors">
                  Royal Mayura Chandbali Drops
                </a>
              </li>
              <li>
                <a href="#catalogue" className="hover:text-[#d4af37] transition-colors">
                  Sculpted Cocktail Bands
                </a>
              </li>
              <li>
                <a href="#catalogue" className="hover:text-[#d4af37] transition-colors">
                  Auspicious Kasu Mala Suites
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Services & Utilities */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#ded8ce]">
              Transparency & Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={onOpenCalculator}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer text-left"
                >
                  Live Gold Weight Calculator
                </button>
              </li>
              <li>
                <a href="#gold-rates" className="hover:text-[#d4af37] transition-colors">
                  Daily Bullion Spot Benchmark
                </a>
              </li>
              <li>
                <a href="#craftsmanship" className="hover:text-[#d4af37] transition-colors">
                  Hallmark Verification Guide
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer text-left"
                >
                  Book Private Atelier Viewing
                </button>
              </li>
              <li>
                <span className="text-[#6d7380]">Lifetime Buyback Terms (100% Metal)</span>
              </li>
            </ul>
          </div>

          {/* Atelier Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#ded8ce]">
              Flagship Atelier
            </h4>
            <div className="space-y-2 text-xs text-[#828894]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>42 Goldsmith Row, Royal Heritage Quarter, Mumbai & London Ateliers</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>+1 (800) 412-AURELIA / +91 (22) 2840-9160</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>concierge@aureliajewels.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#1d2027] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#636a77]">
          <p>© {new Date().getFullYear()} Aurelia Fine Gold & Haute Joaillerie. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>BIS Hallmarking License #HM-916-IND-2026</span>
            <span aria-hidden="true">·</span>
            <span>Ethically Mined Precious Metals</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
