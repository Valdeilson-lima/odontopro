export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length > 15) {
    return cleaned.slice(0, 15); // Retorna o número original se tiver mais de 15 dígitos
  }
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

export function extracPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length > 15) {
    return cleaned.slice(0, 15); // Retorna o número original se tiver mais de 15 dígitos
  }
  return cleaned;
}
