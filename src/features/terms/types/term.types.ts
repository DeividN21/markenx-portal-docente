/**
 * Estados de un período académico (códigos de la API)
 * - UPCOMING: Próximo a iniciar
 * - ACTIVE: En curso
 * - ENDED: Finalizado
 */
export type TermStatusCode = 'UPCOMING' | 'ACTIVE' | 'ENDED';

/**
 * Objeto de estado devuelto por la API
 */
export interface TermStatus {
  code: TermStatusCode;
  label: string;
}

/**
 * Interfaz para un período académico (Academic Term)
 * Refleja la estructura exacta de la API
 */
export interface Term {
  id: string;
  label: string;        // Nombre del período (ej: "2026-2")
  startDate: string;    // YYYY-MM-DD
  endDate: string;      // YYYY-MM-DD
  status: TermStatus;   // Objeto con code y label
}

/**
 * Datos del formulario de creación/edición
 * Coincide con CreateTermRequestDTO del backend
 */
export interface TermFormData {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  year: number;      // Año del período
}

/**
 * Colores para cada estado
 */
export const TERM_STATUS_COLORS: Record<TermStatusCode, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  UPCOMING: 'info',
  ACTIVE: 'success',
  ENDED: 'default',
};

/**
 * Calcula el año del período académico
 * - Si las fechas están en el mismo año, retorna ese año
 * - Si las fechas están en años diferentes, retorna el año de inicio por defecto
 */
export const calculatePeriodYear = (startDate: string, endDate: string): number => {
  const startYear = new Date(startDate).getFullYear();
  const endYear = new Date(endDate).getFullYear();
  
  // Si están en el mismo año, usar ese
  if (startYear === endYear) {
    return startYear;
  }
  
  // Si son diferentes, usar el año de inicio
  return startYear;
};
