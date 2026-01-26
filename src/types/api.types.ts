/**
 * Tipos relacionados con errores y respuestas de la API
 */

/**
 * Violación de campo en validación
 */
export interface FieldViolation {
  field: string;
  message: string;
}

/**
 * Estructura de error del backend
 */
export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  code: string;
  message: string;
  userMessage: string; // ← Este es el que mostramos al usuario
  path: string;
  violations?: FieldViolation[];
}

/**
 * Error HTTP que incluye el body
 */
export interface HttpError extends Error {
  status?: number;
  body?: ApiError;
}

/**
 * Request para cambio de estado
 */
export interface ChangeStatusRequest {
  status: string;
}
