/**
 * Validadores para formularios de React-Admin
 */

import { required, minValue, maxValue, email, minLength, type Validator } from 'react-admin';

/**
 * Validador: Campo obligatorio
 */
export const validateRequired: Validator[] = [required('Campo obligatorio')];

/**
 * Validador: Email válido
 */
export const validateEmail: Validator[] = [
  required('Campo obligatorio'),
  email('Email inválido'),
];

/**
 * Validador: Score (0.0 - 1.0)
 */
export const validateScore: Validator[] = [
  required('Campo obligatorio'),
  minValue(0, 'Debe ser mayor o igual a 0'),
  maxValue(1, 'Debe ser menor o igual a 1'),
];

/**
 * Validador: Número positivo
 */
export const validatePositive: Validator[] = [
  required('Campo obligatorio'),
  minValue(1, 'Debe ser mayor a 0'),
];

/**
 * Validador: Número no negativo (incluye 0)
 */
export const validateNonNegative: Validator[] = [
  required('Campo obligatorio'),
  minValue(0, 'No puede ser negativo'),
];

/**
 * Validador: Probabilidad (0.0 - 1.0)
 */
export const validateProbability: Validator[] = [
  required('Campo obligatorio'),
  minValue(0, 'Debe ser mayor o igual a 0'),
  maxValue(1, 'Debe ser menor o igual a 1'),
];

/**
 * Validador: Texto mínimo
 */
export const validateMinLength = (min: number): Validator[] => [
  required('Campo obligatorio'),
  minLength(min, `Debe tener al menos ${min} caracteres`),
];

/**
 * Validador: Fecha futura
 */
export const validateFutureDate: Validator = (value: string) => {
  if (!value) return 'Campo obligatorio';
  const selectedDate = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selectedDate < today) {
    return 'La fecha debe ser futura';
  }
  return undefined;
};

/**
 * Validador: Fecha de fin después de fecha de inicio
 */
export const validateEndDateAfterStart = (startDateField: string = 'startDate'): Validator => {
  return (value: string, allValues: Record<string, unknown>) => {
    if (!value) return 'Campo obligatorio';
    const startDate = allValues[startDateField] as string;
    if (!startDate) return undefined;
    
    if (new Date(value) <= new Date(startDate)) {
      return 'La fecha de fin debe ser posterior a la fecha de inicio';
    }
    return undefined;
  };
};
