interface FormatCurrencyOptions {
  currency?: string;
  locale?: string;
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
}

export function formatCurrency(amount: number, options: FormatCurrencyOptions = {}) {
  const {
    currency = 'USD',
    locale = 'en-US',
    maximumFractionDigits = 0,
    minimumFractionDigits = 0,
  } = options;

  return new Intl.NumberFormat(locale, {
    currency,
    maximumFractionDigits,
    minimumFractionDigits,
    style: 'currency',
  }).format(amount);
}

