export type CurrencyCode = "INR" | "USD" | "EUR" | "AED" | "GBP";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateToInr: number; // 1 unit in INR
  label: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: { code: "INR", symbol: "₹", rateToInr: 1, label: "INR (₹) - Indian Rupee" },
  USD: { code: "USD", symbol: "$", rateToInr: 86.5, label: "USD ($) - US Dollar" },
  EUR: { code: "EUR", symbol: "€", rateToInr: 94.0, label: "EUR (€) - Euro" },
  AED: { code: "AED", symbol: "AED ", rateToInr: 23.5, label: "AED - UAE Dirham" },
  GBP: { code: "GBP", symbol: "£", rateToInr: 110.0, label: "GBP (£) - British Pound" },
};

export function formatCurrencyAmount(amountInInr: number, currency: CurrencyCode = "INR"): string {
  const conf = CURRENCIES[currency] || CURRENCIES.INR;
  const converted = amountInInr / conf.rateToInr;

  if (currency === "INR") {
    // Indian numbering format (Lakhs / Crores)
    if (amountInInr >= 10000000) {
      return `₹${(amountInInr / 10000000).toFixed(2)} Cr`;
    } else if (amountInInr >= 100000) {
      return `₹${(amountInInr / 100000).toFixed(2)} Lakh`;
    }
    return `₹${amountInInr.toLocaleString("en-IN")}`;
  }

  return `${conf.symbol}${Math.round(converted).toLocaleString("en-US")}`;
}
