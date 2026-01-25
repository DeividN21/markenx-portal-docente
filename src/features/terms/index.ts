/**
 * Terms Feature
 * Gestión de períodos académicos
 */

// Components
export { TermList } from './components/TermList';
export { TermCreate } from './components/TermCreate';
export { TermEdit } from './components/TermEdit';
export { TermForm } from './components/TermForm';

// Types
export type { Term, TermFormData, TermStatus } from './types/term.types';
export { TERM_STATUS_LABELS, TERM_STATUS_COLORS } from './types/term.types';

// Services
export { changeTermStatus } from './services/term.service';

// Utils
export { 
  getStatusColor, 
  getStatusLabel, 
  canEdit, 
  canChangeStatus,
  getAvailableStatuses 
} from './utils/term.utils';
