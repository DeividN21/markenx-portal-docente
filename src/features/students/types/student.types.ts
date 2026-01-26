import type { LifecycleStatus } from '../../../types/lifecycle.types';

/**
 * Student entity from API
 * Represents a student registered in a course
 */
export interface Student {
  id: string;
  label: string;
  fullName: string;
  email: string;
  courseId: string;
  lifecycleStatus: LifecycleStatus;
}

/**
 * Form data for creating students
 */
export interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  courseId: string;
}

/**
 * Form data for updating students
 */
export interface StudentUpdateData {
  firstName: string;
  lastName: string;
}
