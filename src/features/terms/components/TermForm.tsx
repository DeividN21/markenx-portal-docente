import { TextInput, DateInput, required } from 'react-admin';

/**
 * Formulario compartido para crear/editar períodos académicos
 * Solo incluye campos editables (label, startDate, endDate)
 * El estado se maneja a través de PATCH /status
 */
export const TermForm = () => (
  <>
    <TextInput 
      source="label" 
      label="Nombre del Período" 
      fullWidth 
      validate={required()}
      helperText="Ej: 2026-1, 2026-2"
    />
    <DateInput 
      source="startDate" 
      label="Fecha de Inicio" 
      fullWidth 
      validate={required()}
    />
    <DateInput 
      source="endDate" 
      label="Fecha de Finalización" 
      fullWidth 
      validate={required()}
    />
  </>
);
