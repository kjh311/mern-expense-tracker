export const formattedCurrency = (amount) => {
  const absValue = Math.abs(amount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return amount < 0 ? `-$${absValue}` : `$${absValue}`;
};
