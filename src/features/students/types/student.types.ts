import type { LifecycleStatus } from '../../../types/lifecycle.types';

/**
 * Student entity
 * Represents a student registered in a course
 */
export interface Student {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  courseId: string;
  status: LifecycleStatus;
}

/**
 * Form data for creating/editing students
 */
export interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  courseId: string;
}
