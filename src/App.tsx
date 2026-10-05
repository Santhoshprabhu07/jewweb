import React, { useState, useEffect } from 'react';
import { JEWELLERY_CATALOGUE } from './data/jewelleryCatalogue';
import { CURRENCIES, CurrencyConfig, JewelItem } from './types/jewellery';
import { Navbar } from './components/Navbar';
import { GoldRateTicker } from './components/GoldRateTicker';
import { HeroSection } from './components/HeroSection';
import { CatalogueView } from './components/CatalogueView';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { Footer } from './components/Footer';
import { JewelDetailModal } from './components/JewelDetailModal';
import { GoldCalculatorModal } from './components/GoldCalculatorModal';
import { SavedTrayDrawer } from './components/SavedTrayDrawer';
import { AtelierBookingModal } from './components/AtelierBookingModal';

export default function App() {
  const [currency, setCurrency] = useState<CurrencyConfig>(CURRENCIES.USD);
  const [savedItemIds, setSavedItemIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem('aurelia_saved_jewels');
      return stored ? new Set(JSON.parse(stored)) : new Set(['aur-01', 'aur-04']);
    } catch {
      return new Set(['aur-01', 'aur-04']);
    }
  });

  const [selectedJewel, setSelectedJewel] = useState<JewelItem | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingJewel, setBookingJewel] = useState<JewelItem | null>(null);

  // Sync saved items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aurelia_saved_jewels', JSON.stringify(Array.from(savedItemIds)));
    } catch (e) {
      console.warn('Failed to save tray state to storage', e);
    }
  }, [savedItemIds]);

  const toggleSave = (item: JewelItem) => {
    setSavedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(item.id)) {
        next.delete(item.id);
      } else {
        next.add(item.id);
      }
      return next;
    });
  };

  const removeItemFromTray = (id: string) => {
    setSavedItemIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const clearTray = () => {
    setSavedItemIds(new Set());
  };

  const savedItems = JEWELLERY_CATALOGUE.filter((item) => savedItemIds.has(item.id));
  const totalSavedWeight = savedItems.reduce((acc, item) => acc + item.approxGrossWeightGrams, 0);

  const handleOpenBooking = (item?: JewelItem) => {
    setBookingJewel(item || null);
    setIsBookingOpen(true);
  };

  const scrollToCatalogue = () => {
    const el = document.getElementById('catalogue');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f11] text-[#ede7dc] flex flex-col font-sans selection:bg-[#d4af37] selection:text-black">
      {/* 3-zone Header */}
      <Navbar
        currentCurrency={currency}
        onSelectCurrency={setCurrency}
        savedItemCount={savedItems.length}
        totalSavedWeightGrams={totalSavedWeight}
        onOpenTray={() => setIsTrayOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Live Gold Rate Ticker */}
      <GoldRateTicker
        currency={currency}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

      {/* Hero Section */}
      <HeroSection
        onExploreClick={scrollToCatalogue}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Interactive Catalogue with Granular Weight & Price Info */}
      <main className="flex-1">
        <CatalogueView
          catalogue={JEWELLERY_CATALOGUE}
          currency={currency}
          savedItemIds={savedItemIds}
          onToggleSave={toggleSave}
          onSelectJewel={setSelectedJewel}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
        />

        {/* Four Tenets of Craftsmanship & BIS Hallmark */}
        <CraftsmanshipSection />
      </main>

      {/* Compliant Footer */}
      <Footer
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Jewel Detail Specification Modal (PDP) */}
      <JewelDetailModal
        item={selectedJewel}
        currency={currency}
        isSaved={selectedJewel ? savedItemIds.has(selectedJewel.id) : false}
        onToggleSave={toggleSave}
        onClose={() => setSelectedJewel(null)}
        onBookAtelier={(item) => handleOpenBooking(item)}
      />

      {/* Gold Price & Weight Live Calculator */}
      <GoldCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        currency={currency}
        catalogue={JEWELLERY_CATALOGUE}
        onSelectJewel={setSelectedJewel}
      />

      {/* Saved Selection Tray & Estimate Quotation Memo */}
      <SavedTrayDrawer
        isOpen={isTrayOpen}
        onClose={() => setIsTrayOpen(false)}
        savedItems={savedItems}
        onRemoveItem={removeItemFromTray}
        onClearTray={clearTray}
        currency={currency}
        onBookAtelier={() => handleOpenBooking()}
      />

      {/* Private Atelier Booking Modal */}
      <AtelierBookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setBookingJewel(null);
        }}
        selectedItem={bookingJewel}
        currency={currency}
      />
    </div>
  );
}
