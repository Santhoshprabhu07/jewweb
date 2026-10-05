import React, { useState } from 'react';
import { JewelItem, CurrencyConfig } from '../types/jewellery';
import { formatPrice, formatWeight } from '../utils/formatters';
import { X, Calendar, Clock, CheckCircle2, ShieldCheck, MapPin, Video } from 'lucide-react';

interface AtelierBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem?: JewelItem | null;
  currency: CurrencyConfig;
}

export const AtelierBookingModal: React.FC<AtelierBookingModalProps> = ({
  isOpen,
  onClose,
  selectedItem,
  currency,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [experienceType, setExperienceType] = useState<'boutique' | 'virtual'>('boutique');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `AUR-VT-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#121417] border border-[#2e333e] rounded-xl shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#23272e] bg-[#16181e]">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#d4af37]" />
            <h2 className="text-lg font-serif font-semibold text-[#f8f5ee]">
              Private Atelier Appointment
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

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center mx-auto text-[#d4af37]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-serif font-bold text-[#f8f5ee]">
                Viewing Reserved
              </h3>
              <p className="text-xs text-[#9aa1ae]">
                Your private session has been confirmed with our senior jewellery director.
              </p>
            </div>

            <div className="p-4 rounded bg-[#16181d] border border-[#292d37] space-y-2 text-left text-xs">
              <div className="flex justify-between">
                <span className="text-[#848b97]">Booking Reference:</span>
                <span className="font-mono font-bold text-[#d4af37]">{bookingRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#848b97]">Guest Name:</span>
                <span className="text-white font-medium">{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#848b97]">Date & Time:</span>
                <span className="text-white font-mono">{date || 'Upcoming'}, {timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#848b97]">Experience Mode:</span>
                <span className="text-white capitalize">
                  {experienceType === 'boutique' ? 'Private Boutique Suite' : 'HD Virtual Inspection'}
                </span>
              </div>
              {selectedItem && (
                <div className="flex justify-between border-t border-[#252832] pt-2">
                  <span className="text-[#848b97]">Reserved Jewel:</span>
                  <span className="text-[#f5e3a9] font-serif font-semibold truncate max-w-[200px]">
                    {selectedItem.name} ({formatWeight(selectedItem.approxGrossWeightGrams)})
                  </span>
                </div>
              )}
            </div>

            <p className="text-[11px] text-[#787f8d]">
              A verification concierge message has been dispatched to {phone || email}.
            </p>

            <button
              type="button"
              onClick={resetForm}
              className="w-full py-2.5 rounded bg-[#d4af37] hover:bg-[#e2c149] text-[#0d0f11] font-semibold text-xs transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* If a specific item was selected */}
            {selectedItem && (
              <div className="p-3 rounded bg-[#16181e] border border-[#282c36] flex items-center gap-3">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded object-cover border border-[#2a2e38]"
                />
                <div className="flex-1 min-w-0 text-xs">
                  <p className="text-[10px] uppercase text-[#d4af37]">Piece Reserved For Viewing</p>
                  <p className="font-serif font-semibold text-white truncate">{selectedItem.name}</p>
                  <p className="font-mono text-[#8a919e] text-[11px]">
                    {formatWeight(selectedItem.approxGrossWeightGrams)} · {formatPrice(selectedItem.basePriceUSD, currency)}
                  </p>
                </div>
              </div>
            )}

            {/* Experience Mode Toggle */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-[#8a919e] block">
                Appointment Experience
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setExperienceType('boutique')}
                  className={`p-3 rounded-lg border text-xs text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                    experienceType === 'boutique'
                      ? 'bg-[#1e2128] border-[#d4af37] text-white'
                      : 'bg-[#15171c] border-[#292d37] text-[#8e95a3] hover:text-white'
                  }`}
                >
                  <MapPin className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <div>
                    <span className="font-semibold block text-xs">Atelier Suite</span>
                    <span className="text-[10px] text-[#717885] block">Private showroom trial</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setExperienceType('virtual')}
                  className={`p-3 rounded-lg border text-xs text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                    experienceType === 'virtual'
                      ? 'bg-[#1e2128] border-[#d4af37] text-white'
                      : 'bg-[#15171c] border-[#292d37] text-[#8e95a3] hover:text-white'
                  }`}
                >
                  <Video className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <div>
                    <span className="font-semibold block text-xs">Virtual Viewing</span>
                    <span className="text-[10px] text-[#717885] block">HD video call consultation</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#8a919e] block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full p-2.5 rounded bg-[#101215] border border-[#2b2f38] text-white text-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#8a919e] block mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  className="w-full p-2.5 rounded bg-[#101215] border border-[#2b2f38] text-white text-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#8a919e] block mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vance@heritage.com"
                className="w-full p-2.5 rounded bg-[#101215] border border-[#2b2f38] text-white text-xs focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#8a919e] block mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2.5 rounded bg-[#101215] border border-[#2b2f38] text-white text-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#8a919e] block mb-1">
                  Time Window
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full p-2.5 rounded bg-[#101215] border border-[#2b2f38] text-white text-xs focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="11:00 AM">11:00 AM - 12:30 PM (Morning)</option>
                  <option value="02:30 PM">02:30 PM - 04:00 PM (Afternoon)</option>
                  <option value="05:30 PM">05:30 PM - 07:00 PM (Evening)</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#8a919e] block mb-1">
                Specific Jewel Requirements (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Looking for bridal necklace pairings, custom weight adjustments, or ring sizing..."
                rows={2}
                className="w-full p-2.5 rounded bg-[#101215] border border-[#2b2f38] text-white text-xs focus:outline-none focus:border-[#d4af37] resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded text-xs uppercase tracking-wider font-semibold text-[#0d0f11] bg-gradient-to-r from-[#d4af37] to-[#c49f34] hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-[#d4af37]/15"
              >
                Confirm Appointment Reservation
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#717885] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Complimentary one-on-one consultation with certified gemologists.</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
