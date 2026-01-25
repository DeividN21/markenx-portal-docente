/**
 * Hook genérico para cambiar el estado de una entidad
 * Implementa PATCH /{resource}/{id}/status
 */

import { useNotify, useRefresh } from 'react-admin';
import { crudService } from '../services/crud.service';
import { useApiError } from './useApiError';

export const useChangeStatus = (resource: string) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const { handleError } = useApiError();

  /**
   * Cambia el estado de una entidad
   * @param id ID de la entidad
   * @param status Nuevo estado
   */
  const changeStatus = async (id: string, status: string): Promise<boolean> => {
    try {
      await crudService.changeStatus(resource, id, status);
      notify('Estado actualizado correctamente', { type: 'success' });
      refresh();
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  return { changeStatus };
};
