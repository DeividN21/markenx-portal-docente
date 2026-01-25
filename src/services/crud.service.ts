/**
 * Servicio CRUD genérico para operaciones comunes
 * Maneja paginación de Spring Boot y normalización de respuestas
 */

import { apiService } from './api.service';
import type { PaginatedResponse } from '../types/common.types';

interface ListParams {
  page: number;
  perPage: number;
  sortField: string;
  sortOrder: string;
  filter?: Record<string, unknown>;
}

/**
 * Servicio CRUD genérico
 */
export const crudService = {
  /**
   * Listar recursos con paginación
   */
  async list<T>(resource: string, params: ListParams) {
    const query = new URLSearchParams({
      page: (params.page - 1).toString(),
      size: params.perPage.toString(),
      sort: `${params.sortField},${params.sortOrder}`,
    });

    if (params.filter) {
      Object.entries(params.filter).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          query.append(key, String(value));
        }
      });
    }

    const { json } = await apiService.get<PaginatedResponse<T> | T[]>(
      `/${resource}?${query}`
    );

    // Manejo de respuesta Spring Boot (Page<T>)
    if (json && typeof json === 'object' && 'content' in json) {
      const paginatedResponse = json as PaginatedResponse<T>;
      return {
        data: paginatedResponse.content,
        total: paginatedResponse.totalElements,
      };
    }

    // Manejo de lista simple
    if (Array.isArray(json)) {
      return {
        data: json,
        total: json.length,
      };
    }

    return { data: [], total: 0 };
  },

  /**
   * Obtener un recurso por ID
   */
  async get<T>(resource: string, id: string | number): Promise<T> {
    const { json } = await apiService.get<T>(`/${resource}/${id}`);
    return json;
  },

  /**
   * Crear un recurso
   */
  async create<T, D>(resource: string, data: D): Promise<T> {
    const { json } = await apiService.post<T>(`/${resource}`, data);
    return json;
  },

  /**
   * Actualizar un recurso
   */
  async update<T, D>(resource: string, id: string | number, data: D): Promise<T> {
    const { json } = await apiService.put<T>(`/${resource}/${id}`, data);
    return json;
  },

  /**
   * Eliminar un recurso (soft-delete via PATCH status para la mayoría)
   */
  async remove<T>(resource: string, id: string | number): Promise<T> {
    const { json } = await apiService.delete<T>(`/${resource}/${id}`);
    return json;
  },

  /**
   * Cambiar estado de un recurso (PATCH /status)
   */
  async changeStatus<T>(
    resource: string,
    id: string | number,
    status: string
  ): Promise<T> {
    const { json } = await apiService.patch<T>(`/${resource}/${id}/status`, {
      status,
    });
    return json;
  },
};
