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
 */
export interface TermFormData {
  label: string;
  startDate: string;
  endDate: string;
}

/**
 * Colores para cada estado
 */
export const TERM_STATUS_COLORS: Record<TermStatusCode, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  UPCOMING: 'info',
  ACTIVE: 'success',
  ENDED: 'default',
};
