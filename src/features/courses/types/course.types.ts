import type { LifecycleStatus } from '../../../types/lifecycle.types';

/**
 * Interfaz para un curso
 */
export interface Course {
  id: string;
  name: string;
  code: string;
  termId: string;
  lifecycleStatus: LifecycleStatus;
}

/**
 * Datos del formulario de creación/edición
 * Solo se puede editar el nombre
 */
export interface CourseFormData {
  name: string;
  code: string;
  academicTermId: string;
}

/**
 * Datos para cambiar el período académico de un curso
 */
export interface ChangeAcademicTermData {
  newAcademicTermId: string;
}
