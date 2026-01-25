/**
 * Terms Feature
 * Gestión de períodos académicos
 */

// Components
export { TermList } from './components/TermList';
export { TermCreate } from './components/TermCreate';
export { TermEdit } from './components/TermEdit';
export { TermForm } from './components/TermForm';
export { TermChangeStatusButton } from './components/TermChangeStatusButton';

// Types
export type { Term, TermFormData, TermStatus, TermStatusCode } from './types/term.types';
export { TERM_STATUS_COLORS, calculatePeriodYear } from './types/term.types';

// Services
export { changeTermStatus } from './services/term.service';

// Utils
export { 
  getStatusColor, 
  canEdit, 
  canChangeStatus,
  getAvailableStatuses 
} from './utils/term.utils';
