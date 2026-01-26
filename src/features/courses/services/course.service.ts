import { apiService } from '../../../services/api.service';
import type { Course } from '../types/course.types';
import type { LifecycleStatus } from '../../../types/lifecycle.types';

/**
 * Servicio para operaciones específicas de Courses
 */

/**
 * Cambiar el estado del ciclo de vida de un curso
 * PATCH /api/courses/{id}/status
 */
export const changeCourseLifecycleStatus = async (
  courseId: string,
  newStatus: LifecycleStatus
): Promise<Course> => {
  const response = await apiService.patch<Course>(
    `/courses/${courseId}/status`,
    { status: newStatus }
  );
  return response.json;
};

/**
 * Cambiar el período académico de un curso
 * PUT /api/courses/{id}/change-academic-term
 */
export const changeAcademicTerm = async (
  courseId: string,
  newTermId: string
): Promise<Course> => {
  const response = await apiService.put<Course>(
    `/api/courses/${courseId}/change-academic-term`,
    { newAcademicTermId: newTermId }
  );
  return response.json;
};
