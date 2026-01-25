import type { LifecycleStatus } from '../../../types/lifecycle.types';

/**
 * Tipo de tarea basado en intentos permitidos
 * - EVALUATION: maxAttempts === 1 (evaluación de oportunidad única)
 * - ASSIGNMENT: maxAttempts > 1 (práctica con múltiples intentos)
 */
export type TaskType = 'EVALUATION' | 'ASSIGNMENT';

/**
 * Interfaz para una tarea (Task)
 */
export interface Task {
  id: string;
  title: string;
  summary?: string;
  courseId: string;
  courseName?: string; // Datos denormalizados del backend
  scenarioId: string;
  scenarioTitle?: string; // Datos denormalizados del backend
  deadline: string; // ISO 8601 datetime
  minScoreToPass: number; // 0.0 - 1.0 (mostrar como %)
  maxAttempts: number; // 1 = EVALUATION, >1 = ASSIGNMENT
  status: LifecycleStatus;
}

/**
 * Datos del formulario de creación/edición
 */
export interface TaskFormData {
  title: string;
  summary?: string;
  courseId: string;
  scenarioId: string;
  deadline: string;
  minScoreToPass: number; // 0.0 - 1.0
  maxAttempts: number;
}

/**
 * Determina el tipo de tarea según maxAttempts
 */
export const getTaskType = (maxAttempts: number): TaskType => {
  return maxAttempts === 1 ? 'EVALUATION' : 'ASSIGNMENT';
};

/**
 * Labels para tipos de tarea
 */
export const TASK_TYPE_LABELS: Record<TaskType, string> = {
  EVALUATION: 'EVALUACIÓN (Examen de oportunidad única)',
  ASSIGNMENT: 'ASIGNACIÓN (Práctica con múltiples intentos)',
};

/**
 * Colores para tipos de tarea
 */
export const TASK_TYPE_COLORS: Record<TaskType, string> = {
  EVALUATION: '#e3f2fd', // Azul claro
  ASSIGNMENT: '#fff3e0', // Naranja claro
};
