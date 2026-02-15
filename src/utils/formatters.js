// FILE INI: Helper functions untuk formatting
// DIGUNAKAN DI: Semua halaman yang perlu format currency atau date
// KAPAN DIISI: Kapan saja ada kebutuhan formatting

/**
 * Format angka menjadi format Rupiah Indonesia
 * @param {number} amount - Jumlah uang
 * @returns {string} - Format: "Rp 1.000.000"
 */
export function formatCurrency(amount) {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

/**
 * Format date string menjadi format yang lebih readable
 * @param {string} dateString - Date dalam format YYYY-MM-DD
 * @returns {string} - Format: "15 February 2026"
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("id-ID", options);
}

/**
 * Format date untuk input field
 * @param {Date|string} date - Date object atau string
 * @returns {string} - Format: "YYYY-MM-DD"
 */
export function formatDateForInput(date) {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().split("T")[0];
}

/**
 * Validate amount input
 * @param {string|number} amount - Amount to validate
 * @returns {boolean} - True if valid
 */
export function isValidAmount(amount) {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
}

// CONTOH PENGGUNAAN:
// import { formatCurrency, formatDate } from '../utils/formatters';
//
// const formatted = formatCurrency(1000000); // "Rp 1.000.000"
// const date = formatDate("2026-02-15"); // "15 Februari 2026"
