import { TextInput, DateInput, required } from 'react-admin';

/**
 * Formulario compartido para crear/editar períodos académicos
 * Solo incluye campos editables (name, startDate, endDate)
 * El estado se maneja a través de PATCH /status
 */
export const TermForm = () => (
  <>
    <TextInput 
      source="name" 
      label="Nombre del Período" 
      fullWidth 
      validate={required()}
      helperText="Ej: Período 2024-1, Semestre Otoño 2024"
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
