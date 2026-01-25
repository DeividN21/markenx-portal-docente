/**
 * Tipos relacionados con el ciclo de vida de entidades
 */

/**
 * Estados del ciclo de vida (Habilitado/Deshabilitado)
 * Usado por: Courses, Tasks, Students
 */
export type LifecycleStatus = 'ACTIVE' | 'DISABLED';

/**
 * Etiquetas legibles para estados de ciclo de vida
 */
export const LIFECYCLE_STATUS_LABELS: Record<LifecycleStatus, string> = {
  ACTIVE: 'Habilitado',
  DISABLED: 'Deshabilitado',
};

/**
 * Colores para chips de estado
 */
export const LIFECYCLE_STATUS_COLORS: Record<LifecycleStatus, 'success' | 'default'> = {
  ACTIVE: 'success',
  DISABLED: 'default',
};
