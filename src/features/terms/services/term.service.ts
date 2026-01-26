import { apiService } from '../../../services/api.service';
import type { Term, TermStatusCode, LifecycleStatus } from '../types/term.types';

/**
 * Servicio para operaciones específicas de Terms
 */

/**
 * Cambiar el estado de un período académico
 * PATCH /api/academic-terms/{id}/status
 * El backend espera solo el código del estado
 */
export const changeTermStatus = async (
  termId: string,
  newStatusCode: TermStatusCode
): Promise<Term> => {
  const response = await apiService.patch<Term>(
    `/academic-terms/${termId}/status`,
    { status: newStatusCode }
  );
  return response.json;
};

/**
 * Cambiar el estado del ciclo de vida de un período académico
 * PATCH /api/academic-terms/{id}/status
 * El backend espera: { status: LifecycleStatus }
 */
export const changeTermLifecycleStatus = async (
  termId: string,
  newLifecycleStatus: LifecycleStatus
): Promise<Term> => {
  const response = await apiService.patch<Term>(
    `/academic-terms/${termId}/status`,
    { status: newLifecycleStatus }
  );
  return response.json;
};
