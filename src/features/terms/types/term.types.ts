/**
 * Estados de un período académico
 * - UPCOMING: Próximo a iniciar
 * - ACTIVE: En curso
 * - ARCHIVED: Finalizado
 */
export type TermStatus = 'UPCOMING' | 'ACTIVE' | 'ARCHIVED';

/**
 * Interfaz para un período académico (Academic Term)
 */
export interface Term {
  id: string;
  name: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  status: TermStatus;
}

/**
 * Datos del formulario de creación/edición
 */
export interface TermFormData {
  name: string;
  startDate: string;
  endDate: string;
}

/**
 * Labels para cada estado
 */
export const TERM_STATUS_LABELS: Record<TermStatus, string> = {
  UPCOMING: 'Próximo',
  ACTIVE: 'Activo',
  ARCHIVED: 'Archivado',
};

/**
 * Colores para cada estado
 */
export const TERM_STATUS_COLORS: Record<TermStatus, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  UPCOMING: 'info',
  ACTIVE: 'success',
  ARCHIVED: 'default',
};
