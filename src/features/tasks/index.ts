/**
 * Tasks Feature
 * Gestión de tareas (asignaciones y evaluaciones)
 */

// Components
export { TaskList } from './components/TaskList';
export { TaskCreate } from './components/TaskCreate';
export { TaskEdit } from './components/TaskEdit';
export { TaskForm } from './components/TaskForm';

// Types
export type { Task, TaskFormData, TaskType } from './types/task.types';
export { getTaskType, TASK_TYPE_LABELS, TASK_TYPE_COLORS } from './types/task.types';

// Services
export { changeTaskStatus } from './services/task.service';

// Utils
export { 
  canEdit, 
  canChangeStatus,
  getTaskTypeLabel,
  validateTaskData,
  validateMinScore
} from './utils/task.utils';
