import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount, currency) => {
  return new Intl.NumberFormat('es-CU', {
    style: 'currency',
    currency: currency === 'USD' ? 'USD' : 'CUP',
  }).format(amount);
};

// Validates product name format (only letters, numbers and spaces after a letter)
export const validateProductName = (name) => {
  return typeof name === 'string' && /^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ0-9\s]*$/u.test(name.trim());
};

// Validates product code format (Tema 1)
export const validateProductCode = (code) => {
  return typeof code === 'string' && code.length === 6 && /^[A-Z]{3}\d{3}$/.test(code);
};
