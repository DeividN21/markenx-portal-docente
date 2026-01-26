import type { Term, TermStatusCode } from '../types/term.types';
import { TERM_STATUS_COLORS } from '../types/term.types';

/**
 * Obtiene el color del chip para un código de estado
 */
export const getStatusColor = (statusCode: TermStatusCode): 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' => {
  return TERM_STATUS_COLORS[statusCode];
};

/**
 * Determina si un term puede ser editado
 * Solo los terms con estado UPCOMING pueden ser editados
 */
export const canEdit = (term: Term): boolean => {
  return term.status.code === 'UPCOMING';
};

/**
 * Determina si un term puede cambiar de estado
 * Todos los terms pueden cambiar de estado
 */
export const canChangeStatus = (_term: Term): boolean => {
  return true;
};

/**
 * Obtiene los códigos de estado disponibles para transición desde el estado actual
 */
export const getAvailableStatuses = (currentStatusCode: TermStatusCode): TermStatusCode[] => {
  switch (currentStatusCode) {
    case 'UPCOMING':
      return ['ACTIVE', 'ENDED'];
    case 'ACTIVE':
      return ['ENDED'];
    case 'ENDED':
      return ['ACTIVE']; // Puede reactivarse si es necesario
    default:
      return [];
  }
};
