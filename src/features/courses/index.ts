/**
 * Courses Feature
 * Gestión de cursos
 */

// Components
export { CourseList } from './components/CourseList';
export { CourseCreate } from './components/CourseCreate';
export { CourseEdit } from './components/CourseEdit';
export { CourseForm } from './components/CourseForm';

// Types
export type { Course, CourseFormData, ChangeAcademicTermData } from './types/course.types';

// Services
export { changeCourseStatus, changeAcademicTerm } from './services/course.service';

// Utils
export { 
  canEdit, 
  canChangeStatus,
  canChangeAcademicTerm,
  validateCourseData 
} from './utils/course.utils';
