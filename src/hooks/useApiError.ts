/**
 * Hook para manejo de errores de API
 * Extrae el campo userMessage del error del backend y lo muestra al usuario
 */

import { useNotify } from 'react-admin';
import type { HttpError } from '../types/api.types';

export const useApiError = () => {
  const notify = useNotify();

  /**
   * Procesa y muestra un error de la API
   * Extrae userMessage si está disponible
   */
  const handleError = (error: unknown) => {
    console.error('API Error:', error);

    // Verificar si el error tiene la estructura esperada
    if (error && typeof error === 'object' && 'body' in error) {
      const httpError = error as HttpError;
      const apiError = httpError.body;

      if (apiError && apiError.userMessage) {
        notify(apiError.userMessage, { type: 'error' });
        return;
      }

      if (apiError && apiError.message) {
        notify(apiError.message, { type: 'error' });
        return;
      }
    }

    // Error genérico si no se pudo extraer información específica
    notify('Error al procesar la solicitud', { type: 'error' });
  };

  /**
   * Muestra un mensaje de éxito
   */
  const showSuccess = (message: string) => {
    notify(message, { type: 'success' });
  };

  /**
   * Muestra un mensaje de advertencia
   */
  const showWarning = (message: string) => {
    notify(message, { type: 'warning' });
  };

  /**
   * Muestra un mensaje informativo
   */
  const showInfo = (message: string) => {
    notify(message, { type: 'info' });
  };

  return {
    handleError,
    showSuccess,
    showWarning,
    showInfo,
  };
};
