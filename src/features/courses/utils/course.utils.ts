import type { Course } from '../types/course.types';

/**
 * Determina si un curso puede ser editado
 * Los cursos solo pueden cambiar su nombre vía PUT
 * El código y academicTermId se manejan por endpoints específicos
 */
export const canEdit = (_course: Course): boolean => {
  // Todos los cursos pueden editar su nombre
  return true;
};

/**
 * Determina si un curso puede cambiar de estado
 * Todos los cursos pueden hacer ACTIVE ↔ DISABLED
 */
export const canChangeStatus = (_course: Course): boolean => {
  return true;
};

/**
 * Determina si un curso puede cambiar de período académico
 * Solo cursos ACTIVE pueden cambiar de período
 */
export const canChangeAcademicTerm = (course: Course): boolean => {
  return course.status === 'ACTIVE';
};

/**
 * Valida que un curso tenga los campos requeridos
 */
export const validateCourseData = (data: Partial<Course>): string[] => {
  const errors: string[] = [];

  if (!data.name || data.name.trim() === '') {
    errors.push('El nombre es obligatorio');
  }

  if (!data.code || data.code.trim() === '') {
    errors.push('El código es obligatorio');
  }

  if (!data.academicTermId) {
    errors.push('Debe seleccionar un período académico');
  }

  return errors;
};
