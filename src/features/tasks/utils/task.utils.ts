import type { Task } from '../types/task.types';
import { getTaskType, TASK_TYPE_LABELS } from '../types/task.types';

/**
 * Determina si una tarea puede ser editada
 * Todas las tareas pueden editarse
 */
export const canEdit = (_task: Task): boolean => {
  return true;
};

/**
 * Determina si una tarea puede cambiar de estado
 * Todas las tareas pueden hacer ACTIVE ↔ DISABLED
 */
export const canChangeStatus = (_task: Task): boolean => {
  return true;
};

/**
 * Obtiene el tipo de tarea basado en maxAttempts
 */
export const getTaskTypeLabel = (maxAttempts: number): string => {
  const type = getTaskType(maxAttempts);
  return TASK_TYPE_LABELS[type];
};

/**
 * Valida que una tarea tenga los campos requeridos
 */
export const validateTaskData = (data: Partial<Task>): string[] => {
  const errors: string[] = [];

  if (!data.title || data.title.trim() === '') {
    errors.push('El título es obligatorio');
  }

  if (!data.courseId) {
    errors.push('Debe seleccionar un curso');
  }

  if (!data.scenarioId) {
    errors.push('Debe seleccionar un escenario');
  }

  if (!data.deadline) {
    errors.push('La fecha límite es obligatoria');
  }

  if (data.minScoreToPass === undefined || data.minScoreToPass < 0 || data.minScoreToPass > 1) {
    errors.push('La nota mínima debe estar entre 0.0 y 1.0');
  }

  if (!data.maxAttempts || data.maxAttempts < 1) {
    errors.push('El número de intentos debe ser al menos 1');
  }

  return errors;
};

/**
 * Valida que el minScoreToPass esté en el rango correcto
 */
export const validateMinScore = (value: number): boolean => {
  return value >= 0 && value <= 1;
};
