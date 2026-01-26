import { apiService } from '../../../services/api.service';
import type { Task } from '../types/task.types';
import type { LifecycleStatus } from '../../../types/lifecycle.types';

/**
 * Servicio para operaciones específicas de Tasks
 */

/**
 * Cambiar el estado de una tarea (ACTIVE ↔ DISABLED)
 * PATCH /api/tasks/{id}/status
 */
export const changeTaskStatus = async (
  taskId: string,
  newStatus: LifecycleStatus
): Promise<Task> => {
  const response = await apiService.patch<Task>(
    `/api/tasks/${taskId}/status`,
    { status: newStatus }
  );
  return response.json;
};
