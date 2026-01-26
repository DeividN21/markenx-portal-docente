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
          if (!formData.startDate || !formData.endDate) {
            return null;
          }

          const startYear = new Date(formData.startDate).getFullYear();
          const endYear = new Date(formData.endDate).getFullYear();
          const autoYear = calculatePeriodYear(formData.startDate, formData.endDate);
          
          // Si están en el mismo año, enviar el valor calculado como campo oculto
          if (startYear === endYear) {
            return (
              <NumberInput 
                source="year" 
                defaultValue={autoYear}
                style={{ display: 'none' }}
              />
            );
          }
          
          // Si están en años diferentes, mostrar el campo para edición
          return (
            <NumberInput 
              source="year" 
              label="Año del Período" 
              fullWidth 
              validate={required()}
              defaultValue={autoYear}
            />
          );
        }}
      </FormDataConsumer>
    </>
  );
};
