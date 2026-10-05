import React, { useState, useMemo } from 'react';
import { JewelItem, JewelleryCategory, CurrencyConfig } from '../types/jewellery';
import { JewelCard } from './JewelCard';
import { formatPrice, formatWeight } from '../utils/formatters';
import { 
  Search, 
  SlidersHorizontal, 
  LayoutGrid, 
  Table, 
  Scale, 
  Eye, 
  Bookmark, 
  Check, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface CatalogueViewProps {
  catalogue: JewelItem[];
  currency: CurrencyConfig;
  savedItemIds: Set<string>;
  onToggleSave: (item: JewelItem) => void;
  onSelectJewel: (item: JewelItem) => void;
  onOpenCalculator: () => void;
}

export const CatalogueView: React.FC<CatalogueViewProps> = ({
  catalogue,
  currency,
  savedItemIds,
  onToggleSave,
  onSelectJewel,
  onOpenCalculator,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<JewelleryCategory>('all');
  const [selectedWeightRange, setSelectedWeightRange] = useState<string>('all');
  const [selectedPurity, setSelectedPurity] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const categories: { id: JewelleryCategory; label: string }[] = [
    { id: 'all', label: 'All Creations' },
    { id: 'necklaces', label: 'Necklaces & Chokers' },
    { id: 'bangles', label: 'Bangles & Kadas' },
    { id: 'earrings', label: 'Earrings & Drops' },
    { id: 'rings', label: 'Rings & Bands' },
    { id: 'bridal', label: 'Bridal Sets' },
    { id: 'chains', label: 'Chains & Pendants' },
  ];

  // Filtering logic
  const filteredItems = useMemo(() => {
    return catalogue.filter((item) => {
      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query) ||
        item.collection.toLowerCase().includes(query) ||
        item.tags.some((t) => t.toLowerCase().includes(query));

      if (!matchesSearch) return false;

      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Purity match
      if (selectedPurity !== 'all') {
        if (selectedPurity === '22KT' && !item.purity.includes('22KT')) return false;
        if (selectedPurity === '18KT' && !item.purity.includes('18KT')) return false;
      }

      // Weight range match
      const w = item.approxGrossWeightGrams;
      if (selectedWeightRange === 'under15' && w >= 15) return false;
      if (selectedWeightRange === '15to35' && (w < 15 || w > 35)) return false;
      if (selectedWeightRange === '35to60' && (w < 35 || w > 60)) return false;
      if (selectedWeightRange === 'above60' && w <= 60) return false;

      return true;
    });
  }, [catalogue, searchQuery, selectedCategory, selectedPurity, selectedWeightRange]);

  // Sorting logic
  const sortedItems = useMemo(() => {
    const list = [...filteredItems];
    switch (sortBy) {
      case 'weightAsc':
        return list.sort((a, b) => a.approxGrossWeightGrams - b.approxGrossWeightGrams);
      case 'weightDesc':
        return list.sort((a, b) => b.approxGrossWeightGrams - a.approxGrossWeightGrams);
      case 'priceAsc':
        return list.sort((a, b) => a.basePriceUSD - b.basePriceUSD);
      case 'priceDesc':
        return list.sort((a, b) => b.basePriceUSD - a.basePriceUSD);
      case 'featured':
      default:
        return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [filteredItems, sortBy]);

  const totalFilteredWeight = sortedItems.reduce((acc, i) => acc + i.approxGrossWeightGrams, 0);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedWeightRange('all');
    setSelectedPurity('all');
    setSortBy('featured');
  };

  return (
    <section id="catalogue" className="py-16 sm:py-20 bg-[#0d0f11] text-[#ede7dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header with Category Tabs */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#23272f] pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#d4af37]">
                <span>Curated Catalogue</span>
                <span aria-hidden="true" className="text-[#5b5242]">·</span>
                <span>2026 Sovereign Editions</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#f8f5ee]">
                Master Jewel Collection & Valuations
              </h2>
              <p className="text-xs sm:text-sm text-[#9c9689] max-w-xl">
                Browse every handcrafted jewel with certified approximate gold weights in grams and live transparent market pricing.
              </p>
            </div>

            {/* Quick Link to Custom Calculator */}
            <button
              type="button"
              onClick={onOpenCalculator}
              className="flex items-center gap-2 px-4 py-2.5 rounded text-xs font-medium text-[#f5e3a9] bg-[#16181e] border border-[#2e333d] hover:border-[#d4af37] transition-colors cursor-pointer self-start md:self-auto"
            >
              <Scale className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Weight & Price Calculator</span>
            </button>
          </div>

          {/* Category Tabs (Segmented control) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-md whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#d4af37] text-[#0d0f11] font-bold shadow-md shadow-[#d4af37]/20'
                    : 'bg-[#15171b] text-[#aba496] hover:text-white hover:bg-[#1c1f25] border border-[#272b34]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="p-4 rounded-lg bg-[#14161a] border border-[#242831] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            
            {/* Search Box */}
            <div className="lg:col-span-4 relative">
              <Search className="w-4 h-4 text-[#8a919e] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jewels by name, style, or SKU..."
                className="w-full pl-9 pr-3 py-2 rounded bg-[#0f1114] border border-[#292e38] text-xs text-white placeholder-[#787f8d] focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* Weight Filter */}
            <div className="lg:col-span-3">
              <select
                value={selectedWeightRange}
                onChange={(e) => setSelectedWeightRange(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#0f1114] border border-[#292e38] text-xs text-[#ded8ce] focus:outline-none focus:border-[#d4af37] cursor-pointer"
              >
                <option value="all">All Gold Weights (Grams)</option>
                <option value="under15">Delicate: Under 15 grams</option>
                <option value="15to35">Medium: 15g – 35 grams</option>
                <option value="35to60">Statement: 35g – 60 grams</option>
                <option value="above60">Heirloom / Heavy: 60+ grams</option>
              </select>
            </div>

            {/* Purity Filter */}
            <div className="lg:col-span-2">
              <select
                value={selectedPurity}
                onChange={(e) => setSelectedPurity(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#0f1114] border border-[#292e38] text-xs text-[#ded8ce] focus:outline-none focus:border-[#d4af37] cursor-pointer"
              >
                <option value="all">All Gold Purities</option>
                <option value="22KT">22KT (916 BIS Hallmark)</option>
                <option value="18KT">18KT Fine Gold</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="lg:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#0f1114] border border-[#292e38] text-xs text-[#ded8ce] focus:outline-none focus:border-[#d4af37] cursor-pointer"
              >
                <option value="featured">Sort: Featured Collection</option>
                <option value="weightAsc">Weight: Lightest to Heaviest</option>
                <option value="weightDesc">Weight: Heaviest to Lightest</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="lg:col-span-1 flex items-center justify-end gap-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded border transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#d4af37] text-[#0d0f11] border-[#d4af37]'
                    : 'bg-[#0f1114] text-[#8e95a3] border-[#292e38] hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-2 rounded border transition-colors cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-[#d4af37] text-[#0d0f11] border-[#d4af37]'
                    : 'bg-[#0f1114] text-[#8e95a3] border-[#292e38] hover:text-white'
                }`}
                title="Detailed Spec Sheet View"
              >
                <Table className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Active Filter Metrics & Reset Row */}
          <div className="flex items-center justify-between text-xs text-[#8c929e] pt-2 border-t border-[#20232a]">
            <div className="flex items-center gap-3">
              <span>
                Showing <strong className="text-white">{sortedItems.length}</strong> creations
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Scale className="w-3 h-3 text-[#d4af37]" />
                Total Gold Weight in view:{' '}
                <strong className="text-[#f5e3a9] font-mono">{formatWeight(totalFilteredWeight)}</strong>
              </span>
            </div>

            {(searchQuery || selectedCategory !== 'all' || selectedWeightRange !== 'all' || selectedPurity !== 'all' || sortBy !== 'featured') && (
              <button
                type="button"
                onClick={resetFilters}
                className="flex items-center gap-1 text-[#d4af37] hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Catalogue Content: Grid View or Spec Sheet View */}
        {sortedItems.length === 0 ? (
          <div className="text-center py-20 p-8 rounded-lg bg-[#14161a] border border-[#242831] space-y-4">
            <Scale className="w-12 h-12 text-[#464c58] mx-auto" />
            <h3 className="text-xl font-serif text-[#ede7dc]">No matching jewellery found</h3>
            <p className="text-xs text-[#888f9e] max-w-sm mx-auto">
              We couldn't find designs matching your current weight or category criteria. Try resetting the filters or adjust your search.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-4 py-2 rounded text-xs font-semibold text-[#0d0f11] bg-[#d4af37] hover:bg-[#e2c149] transition-colors cursor-pointer"
            >
              Show All Jewels
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* 3-column desktop product grid with uniform gap and baseline */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sortedItems.map((item) => (
              <JewelCard
                key={item.id}
                item={item}
                currency={currency}
                isSaved={savedItemIds.has(item.id)}
                onToggleSave={onToggleSave}
                onSelect={onSelectJewel}
              />
            ))}
          </div>
        ) : (
          /* Detailed Tabular Spec Sheet View for Connoisseurs */
          <div className="rounded-lg bg-[#14161a] border border-[#242831] overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#282d38] bg-[#171a20] text-[#9ba2af] uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Jewel Design</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Purity</th>
                  <th className="py-3 px-3 text-right">Approx Weight</th>
                  <th className="py-3 px-3 text-right">Making %</th>
                  <th className="py-3 px-4 text-right">Approx Price</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e2129]">
                {sortedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-[#181b22] transition-colors group">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded object-cover border border-[#2b2f38] bg-black shrink-0"
                        />
                        <div>
                          <p 
                            onClick={() => onSelectJewel(item)} 
                            className="font-serif font-semibold text-sm text-[#f8f5ee] group-hover:text-[#d4af37] transition-colors cursor-pointer"
                          >
                            {item.name}
                          </p>
                          <span className="font-mono text-[10px] text-[#717885]">{item.sku}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-[#b4ada0] capitalize">
                      {item.category}
                    </td>

                    <td className="py-3 px-3 font-mono text-[11px] text-[#f5e3a9]">
                      {item.purity}
                    </td>

                    <td className="py-3 px-3 text-right font-mono font-bold text-white text-sm tabular-nums">
                      {formatWeight(item.approxGrossWeightGrams)}
                    </td>

                    <td className="py-3 px-3 text-right font-mono text-[#9ca3af]">
                      {item.approxMakingChargePercent}%
                    </td>

                    <td className="py-3 px-4 text-right font-mono font-bold text-[#f5e3a9] text-base tabular-nums">
                      {formatPrice(item.basePriceUSD, currency)}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => onSelectJewel(item)}
                          className="p-1.5 rounded bg-[#1e222b] hover:bg-[#d4af37] hover:text-[#0d0f11] text-[#ded8ce] transition-colors cursor-pointer"
                          title="View Specs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onToggleSave(item)}
                          className={`p-1.5 rounded border transition-colors cursor-pointer ${
                            savedItemIds.has(item.id)
                              ? 'bg-[#d4af37] text-[#0d0f11] border-[#d4af37]'
                              : 'bg-[#1e222b] text-[#ded8ce] border-[#2f343f] hover:border-[#d4af37]'
                          }`}
                          title="Save to Tray"
                        >
                          {savedItemIds.has(item.id) ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </section>
  );
};
