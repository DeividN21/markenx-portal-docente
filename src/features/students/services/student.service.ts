import { apiService } from '../../../services/api.service';
import type { LifecycleStatus } from '../../../types/lifecycle.types';

/**
 * Cambia el estado del ciclo de vida de un estudiante
 */
export const changeStudentLifecycleStatus = async (
  id: string,
  status: LifecycleStatus
): Promise<void> => {
  await apiService.patch(`/students/${id}/status`, {
    status,
  });
};
