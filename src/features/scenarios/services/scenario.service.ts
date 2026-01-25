import { apiService } from '../../../services/api.service';
import type { Scenario } from '../types/scenario.types';

/**
 * Scenario service
 * Note: Scenarios do not support status changes or soft-delete
 */

/**
 * Create a new scenario
 */
export const createScenario = async (data: Omit<Scenario, 'id'>): Promise<Scenario> => {
  const response = await apiService.post<Scenario>('/scenarios', data);
  return response.json;
};

/**
 * Update an existing scenario
 */
export const updateScenario = async (id: string, data: Omit<Scenario, 'id'>): Promise<Scenario> => {
  const response = await apiService.put<Scenario>(`/scenarios/${id}`, data);
  return response.json;
};
