/**
 * Data Provider principal para React-Admin
 * Usa el servicio CRUD genérico con tipos TypeScript estrictos
 * 
 * Nota sobre `any` en retornos: React-Admin usa genéricos complejos que dificultan
 * el tipado estricto sin perder flexibilidad. Se usa `any` solo en las conversiones
 * de tipo finales para cumplir con la interfaz DataProvider.
 */

import type { DataProvider } from 'react-admin';
import { crudService } from '../services/crud.service';
import { normalizeEntity } from '../utils/normalizers';

export const dataProvider: DataProvider = {
  /**
   * Obtener lista de recursos (paginada)
   */
  getList: async (resource, params) => {
    // @ts-ignore - Conflict entre genéricos de React-Admin y normalización
    return crudService.list(resource, {
      page: params.pagination?.page || 1,
      perPage: params.pagination?.perPage || 10,
      sortField: params.sort?.field || 'id',
      sortOrder: params.sort?.order || 'ASC',
      filter: params.filter,
    }) as any;
  },

  /**
   * Obtener un recurso por ID
   */
  getOne: async (resource, params) => {
    const data = await crudService.get(resource, params.id);
    // @ts-ignore - Conflict entre genéricos de React-Admin y normalización
    return { data: normalizeEntity(data as Record<string, unknown>) } as any;
  },

  /**
   * Obtener múltiples recursos por IDs
   */
  getMany: async (resource, params) => {
    const promises = params.ids.map((id) => crudService.get(resource, id));
    const results = await Promise.all(promises);
    // @ts-ignore - Conflict entre genéricos de React-Admin y normalización
    return {
      data: results.map((item) => normalizeEntity(item as Record<string, unknown>)),
    } as any;
  },

  /**
   * Obtener lista referenciada (ej: tareas de un curso)
   */
  getManyReference: async (resource, params) => {
    // @ts-ignore - Conflict entre genéricos de React-Admin y normalización
    return crudService.list(resource, {
      page: params.pagination.page,
      perPage: params.pagination.perPage,
      sortField: params.sort.field,
      sortOrder: params.sort.order,
      filter: {
        ...params.filter,
        [params.target]: params.id,
      },
    }) as any;
  },

  /**
   * Crear un recurso
   */
  create: async (resource, params) => {
    const data = await crudService.create(resource, params.data);
    // @ts-ignore - Conflict entre genéricos de React-Admin y normalización
    return { data: normalizeEntity(data as Record<string, unknown>) } as any;
  },

  /**
   * Actualizar un recurso
   */
  update: async (resource, params) => {
    const data = await crudService.update(resource, params.id, params.data);
    // @ts-ignore - Conflict entre genéricos de React-Admin y normalización
    return { data: normalizeEntity(data as Record<string, unknown>) } as any;
  },

  /**
   * Actualizar múltiples recursos
   */
  updateMany: async (resource, params) => {
    const promises = params.ids.map((id) =>
      crudService.update(resource, id, params.data)
    );
    await Promise.all(promises);
    return { data: params.ids };
  },

  /**
   * Eliminar un recurso
   */
  delete: async (resource, params) => {
    await crudService.remove(resource, params.id);
    // @ts-ignore - Conflict entre genéricos de React-Admin
    return { data: { id: params.id } } as any;
  },

  /**
   * Eliminar múltiples recursos
   */
  deleteMany: async (resource, params) => {
    const promises = params.ids.map((id) => crudService.remove(resource, id));
    await Promise.all(promises);
    return { data: params.ids };
  },
};