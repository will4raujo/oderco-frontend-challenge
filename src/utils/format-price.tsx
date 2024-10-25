const formatPriceFromLabel = (price: number): string => {
  return `R$ ${price.toFixed(2).replace('.', ',')}`;
}

const formatPriceFromInput = (price: string) => {
  const numericValue = parseFloat(price.replace(/[^0-9]/g, '')) / 100;
  return numericValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export const formatPrice = {
  formatPriceFromLabel,
  formatPriceFromInput
}