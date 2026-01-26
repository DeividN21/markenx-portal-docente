import type { TermFormData } from '../types/term.types';

/**
 * Transforma los datos del formulario de edición para enviar solo los campos requeridos
 * La API espera: { startDate, endDate, year }
 * El id va en la URL, no en el body
 */
export const transformTermForUpdate = (data: any): TermFormData => {
  return {
    startDate: data.startDate,
    endDate: data.endDate,
    year: data.year,
  };
};
