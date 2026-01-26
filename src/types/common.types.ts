/**
 * Tipos comunes compartidos en toda la aplicación
 */

/**
 * Respuesta paginada de Spring Boot (Page<T>)
 */
export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

/**
 * Respuesta simple de API
 */
export interface ApiResponse<T> {
  data: T;
}

/**
 * Opción para selects de referencia
 */
export interface ReferenceOption {
  id: string;
  label: string;
}

/**
 * Parámetros de paginación
 */
export interface PaginationParams {
  page: number;
  perPage: number;
}

/**
 * Parámetros de ordenamiento
 */
export interface SortParams {
  field: string;
  order: 'ASC' | 'DESC';
}

/**
 * Filtros genéricos
 */
export interface FilterParams {
  [key: string]: string | number | boolean | undefined;
}
