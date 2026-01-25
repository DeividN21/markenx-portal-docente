import { apiService } from '../../../services/api.service';
import type { Term, TermStatus } from '../types/term.types';

/**
 * Servicio para operaciones específicas de Terms
 */

/**
 * Cambiar el estado de un período académico
 * PATCH /api/academic-terms/{id}/status
 */
export const changeTermStatus = async (
  termId: string,
  newStatus: TermStatus
): Promise<Term> => {
  const response = await apiService.patch<Term>(
    `/api/academic-terms/${termId}/status`,
    { status: newStatus }
  );
  return response.json;
};
