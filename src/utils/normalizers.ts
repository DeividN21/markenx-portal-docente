/**
 * Utilidades para normalizar respuestas de la API
 */

/**
 * Normaliza una entidad individual para React-Admin
 * Asegura que tenga un campo 'id' y otros campos comunes
 */
export const normalizeEntity = <T extends Record<string, unknown>>(item: T): T & { id: string } => {
  return {
    ...item,
    // Asegurar que siempre haya un id (por si viene como studentId, etc.)
    id: (item.id || item.studentId || item.taskId || item.courseId || item.attemptId) as string,
  };
};

/**
 * Normaliza una lista de entidades
 */
export const normalizeList = <T extends Record<string, unknown>>(items: T[]): Array<T & { id: string }> => {
  return items.map(normalizeEntity);
};

/**
 * Limpia campos no deseados antes de enviar al backend
 * Elimina campos de auditoría y otros campos que el backend genera
 */
export const cleanEntityForSubmit = <T extends Record<string, unknown>>(data: T): Partial<T> => {
  const cleaned = { ...data };
  
  // Eliminar campos generados por el backend
  delete cleaned.id; // ID se pasa en la URL
  delete cleaned.createdAt;
  delete cleaned.updatedAt;
  delete cleaned.lifecycleStatus; // Puede que el backend no acepte este campo en actualizaciones
  
  return cleaned;
};
