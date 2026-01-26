/**
 * Servicio HTTP base para comunicación con la API
 * Usa cookies de sesión (credentials: include) para autenticación OAuth via BFF
 */

import { fetchUtils } from 'react-admin';

const apiUrl = import.meta.env.VITE_API_URL;

/**
 * Cliente HTTP con manejo de cookies y headers
 */
export const httpClient = async (
  url: string,
  options: fetchUtils.Options = {}
): Promise<{ status: number; headers: Headers; body: string; json: unknown }> => {
  if (!options.headers) {
    options.headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
  }

  // Usar cookies de sesión para autenticación (BFF OAuth)
  options.credentials = 'include';

  try {
    return await fetchUtils.fetchJson(url, options);
  } catch (error) {
    // El error ya viene procesado por fetchUtils
    throw error;
  }
};

/**
 * Servicio API con métodos tipados
 */
export const apiService = {
  /**
   * GET request
   */
  get: <T>(path: string): Promise<{ json: T }> => {
    return httpClient(`${apiUrl}${path}`) as Promise<{ json: T }>;
  },

  /**
   * POST request
   */
  post: <T>(path: string, body: unknown): Promise<{ json: T }> => {
    return httpClient(`${apiUrl}${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
    }) as Promise<{ json: T }>;
  },

  /**
   * PUT request
   */
  put: <T>(path: string, body: unknown): Promise<{ json: T }> => {
    return httpClient(`${apiUrl}${path}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }) as Promise<{ json: T }>;
  },

  /**
   * PATCH request (usado para cambios de estado)
   */
  patch: <T>(path: string, body: unknown): Promise<{ json: T }> => {
    return httpClient(`${apiUrl}${path}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }) as Promise<{ json: T }>;
  },

  /**
   * DELETE request
   */
  delete: <T>(path: string): Promise<{ json: T }> => {
    return httpClient(`${apiUrl}${path}`, {
      method: 'DELETE',
    }) as Promise<{ json: T }>;
  },
};
