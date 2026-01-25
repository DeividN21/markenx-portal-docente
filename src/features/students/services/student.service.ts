import { apiService } from '../../../services/api.service';
import type { LifecycleStatus } from '../../../types/lifecycle.types';
import type { Student } from '../types/student.types';

/**
 * Change student status (ACTIVE/DISABLED)
 * Used for soft-delete functionality
 */
export const changeStudentStatus = async (
  id: string,
  status: LifecycleStatus
): Promise<Student> => {
  const response = await apiService.patch<Student>(`/students/${id}/status`, { status });
  return response.json;
};
