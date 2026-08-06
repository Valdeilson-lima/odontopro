/**
 * Converts a currency amount in Brazilian Real format (e.g., "R$ 1.234,56") to cents.
 * @param {string} amount - The currency amount in Brazilian Real format.
 * @returns {number} The equivalent amount in cents.
 * @example
 * convertRealToCents("R$ 1.234,56"); // returns 123456
 */
export function convertRealToCents(amount: string) {
  const numericPrice = parseFloat(
    amount.replace(/[^\d,]/g, "").replace(",", ".")
  );
  const cents = Math.round(numericPrice * 100);
  return cents;
}
