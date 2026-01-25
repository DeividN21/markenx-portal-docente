import type { Student } from '../types/student.types';
import type { LifecycleStatus } from '../../../types/lifecycle.types';

/**
 * Check if student can be edited
 * Students can be edited regardless of status
 */
export const canEdit = (_student: Student): boolean => {
  return true;
};

/**
 * Check if student status can be changed
 * Status can always be changed (toggle between ACTIVE/DISABLED)
 */
export const canChangeStatus = (_student: Student): boolean => {
  return true;
};

/**
 * Get available status transitions for a student
 */
export const getAvailableStatuses = (currentStatus: LifecycleStatus): LifecycleStatus[] => {
  return currentStatus === 'ACTIVE'
    ? ['DISABLED']
    : ['ACTIVE'];
};

/**
 * Validate student email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate student form data
 */
export const validateStudentData = (data: {
  firstName?: string;
  lastName?: string;
  email?: string;
  courseId?: string;
}): string[] => {
  const errors: string[] = [];

  if (!data.firstName?.trim()) {
    errors.push('El nombre es requerido');
  }

  if (!data.lastName?.trim()) {
    errors.push('El apellido es requerido');
  }

  if (!data.email?.trim()) {
    errors.push('El correo electrónico es requerido');
  } else if (!isValidEmail(data.email)) {
    errors.push('El formato del correo electrónico es inválido');
  }

  if (!data.courseId) {
    errors.push('El curso es requerido');
  }

  return errors;
};
