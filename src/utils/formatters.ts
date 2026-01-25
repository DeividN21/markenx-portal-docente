/**
 * Utilidades para formateo de datos
 */

/**
 * Convierte un score decimal (0.0 - 1.0) a porcentaje (0% - 100%)
 * @param score Score en formato decimal
 * @returns String formateado como porcentaje
 * @example formatScore(0.7) → "70%"
 */
export const formatScore = (score: number | null | undefined): string => {
  if (score === null || score === undefined) {
    return '0%';
  }
  return `${Math.round(score * 100)}%`;
};

/**
 * Convierte un porcentaje (70%) a score decimal (0.7)
 * @param scoreStr String en formato porcentaje
 * @returns Número decimal entre 0.0 y 1.0
 * @example parseScore("70%") → 0.7
 */
export const parseScore = (scoreStr: string): number => {
  const cleaned = scoreStr.replace('%', '').trim();
  const num = parseFloat(cleaned);
  if (isNaN(num)) {
    return 0;
  }
  return num / 100;
};

/**
 * Formatea una fecha ISO a formato local
 * @param date Fecha en formato ISO
 * @returns Fecha formateada
 */
export const formatDate = (date: string | null | undefined): string => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Formatea una fecha y hora ISO a formato local
 * @param datetime Fecha y hora en formato ISO
 * @returns Fecha y hora formateada
 */
export const formatDateTime = (datetime: string | null | undefined): string => {
  if (!datetime) return '-';
  return new Date(datetime).toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Convierte un número a formato de moneda
 * @param amount Cantidad numérica
 * @returns String formateado como moneda
 */
export const formatCurrency = (amount: number | null | undefined): string => {
  if (amount === null || amount === undefined) {
    return '$0.00';
  }
  return new Intl.NumberFormat('es-EC', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Trunca un texto largo
 * @param text Texto a truncar
 * @param maxLength Longitud máxima
 * @returns Texto truncado con ellipsis
 */
export const truncateText = (
  text: string | null | undefined,
  maxLength: number = 50
): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};
