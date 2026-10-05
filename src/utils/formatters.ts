import { CurrencyConfig, LIVE_GOLD_RATES_USD, JewelItem } from '../types/jewellery';

export function formatPrice(amountUSD: number, currency: CurrencyConfig): string {
  const converted = amountUSD * currency.ratePerUSD;
  
  if (currency.code === 'INR') {
    // Format in Indian numbering system
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(Math.round(converted));
  }

  return new Intl.NumberFormat(currency.code === 'USD' ? 'en-US' : 'en-GB', {
    style: 'currency',
    currency: currency.code,
    maximumFractionDigits: 0,
  }).format(Math.round(converted));
}

export function formatWeight(grams: number): string {
  return `${grams.toFixed(2)} g`;
}

export function getGoldRatePerGram(purity: string, currency: CurrencyConfig): number {
  let rateUSD = LIVE_GOLD_RATES_USD['22KT'];
  if (purity.includes('24KT')) {
    rateUSD = LIVE_GOLD_RATES_USD['24KT'];
  } else if (purity.includes('18KT')) {
    rateUSD = LIVE_GOLD_RATES_USD['18KT'];
  }
  return rateUSD * currency.ratePerUSD;
}

export interface PriceBreakdown {
  goldRatePerGram: number;
  pureGoldValue: number;
  makingCharges: number;
  estimatedTaxes: number;
  totalApproxPrice: number;
}

export function calculateBreakdown(item: JewelItem, currency: CurrencyConfig): PriceBreakdown {
  const ratePerGram = getGoldRatePerGram(item.purity, currency);
  const pureGoldValue = item.approxNetGoldWeightGrams * ratePerGram;
  const makingCharges = pureGoldValue * (item.approxMakingChargePercent / 100);
  const estimatedTaxes = (pureGoldValue + makingCharges) * 0.03; // ~3% standard precious metal duty/GST
  const totalApproxPrice = pureGoldValue + makingCharges + estimatedTaxes;

  return {
    goldRatePerGram: Math.round(ratePerGram),
    pureGoldValue: Math.round(pureGoldValue),
    makingCharges: Math.round(makingCharges),
    estimatedTaxes: Math.round(estimatedTaxes),
    totalApproxPrice: Math.round(totalApproxPrice),
  };
}
