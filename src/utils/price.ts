export const formatPrice = (price: number): string => {
  return `¥${price.toFixed(0)}`;
};

export const formatPriceWithDecimal = (price: number): string => {
  return `¥${price.toFixed(2)}`;
};
