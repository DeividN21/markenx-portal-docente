import { DateInput, NumberInput, required, FormDataConsumer } from 'react-admin';
import { calculatePeriodYear } from '../types/term.types';

/**
 * Formulario compartido para crear/editar períodos académicos
 * - startDate y endDate son requeridos
 * - year se calcula automáticamente basado en las fechas:
 *   * Si están en el mismo año, usa ese año
 *   * Si están en años diferentes, usa el año de inicio (pero permite edición)
 */
export const TermForm = () => {
  return (
    <>
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
      
      <FormDataConsumer>
        {({ formData }) => {
          // Calcular año automáticamente si hay fechas
          const autoYear = formData.startDate && formData.endDate 
            ? calculatePeriodYear(formData.startDate, formData.endDate)
            : new Date().getFullYear();
          
          return (
            <NumberInput 
              source="year" 
              label="Año del Período" 
              fullWidth 
              validate={required()}
              helperText={`Se calcula automáticamente basado en las fechas${formData.startDate && formData.endDate ? `: ${autoYear}` : ''}. Edítalo solo si es necesario.`}
              defaultValue={autoYear}
            />
          );
        }}
      </FormDataConsumer>
    </>
  );
};
