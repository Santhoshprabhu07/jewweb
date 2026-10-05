export type JewelleryCategory = 
  | 'all'
  | 'necklaces'
  | 'bangles'
  | 'earrings'
  | 'rings'
  | 'bridal'
  | 'chains';

export type GoldPurity = '22KT (916 BIS)' | '18KT Fine Gold' | '24KT Pure Bullion';

export interface JewelItem {
  id: string;
  sku: string;
  name: string;
  category: 'necklaces' | 'bangles' | 'earrings' | 'rings' | 'bridal' | 'chains';
  collection: string;
  approxGrossWeightGrams: number;
  approxNetGoldWeightGrams: number;
  purity: GoldPurity;
  basePriceUSD: number; // Base valuation in USD
  approxMakingChargePercent: number;
  dimensions: string;
  image: string;
  galleryImages?: string[];
  description: string;
  craftsmanshipNotes: string;
  hallmarkCode: string;
  inStock: boolean;
  featured?: boolean;
  bestseller?: boolean;
  tags: string[];
}

export type CurrencyCode = 'USD' | 'INR' | 'AED' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  ratePerUSD: number; // conversion from USD
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', ratePerUSD: 1 },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', ratePerUSD: 86.5 },
  AED: { code: 'AED', symbol: 'AED', name: 'UAE Dirham', ratePerUSD: 3.67 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', ratePerUSD: 0.92 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', ratePerUSD: 0.79 },
};

// Benchmark Gold Rates per gram in USD
export const LIVE_GOLD_RATES_USD = {
  '24KT': 85.50,
  '22KT': 78.40,
  '18KT': 64.10,
  lastUpdated: 'Today, Live Bullion Spot'
};
