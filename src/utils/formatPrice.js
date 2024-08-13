export function formatPrice(priceInPence) {
    const priceInPounds = priceInPence / 100;
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(priceInPounds);
  }