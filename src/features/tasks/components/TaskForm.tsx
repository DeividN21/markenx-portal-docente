import { 
  TextInput, 
  ReferenceInput, 
  SelectInput, 
  DateTimeInput, 
  NumberInput,
  required,
  minValue,
  maxValue
} from 'react-admin';

/**
 * Formulario compartido para crear/editar tareas
 * Incluye validación de minScoreToPass (0-1) y lógica EVALUATION vs ASSIGNMENT
 */
export const TaskForm = () => (
  <>
    <TextInput 
      source="title" 
      label="Título" 
      fullWidth 
      validate={required()}
      helperText="Nombre corto y descriptivo de la tarea"
      sx={{ mb: 2 }}
    />
    <TextInput 
      source="summary" 
      label="Instrucciones para el estudiante" 
      multiline 
      fullWidth 
      rows={3}
      helperText="Descripción detallada de lo que el estudiante debe lograr"
      sx={{ mb: 2 }}
    />
    
    <ReferenceInput 
      source="courseId" 
      reference="courses" 
      label="Curso"
    >
      <SelectInput 
        optionText="name" 
        validate={required()} 
        fullWidth
        helperText="Curso al que pertenece esta tarea"
        sx={{ mb: 2 }}
      />
    </ReferenceInput>

    <ReferenceInput 
      source="scenarioId" 
      reference="scenarios" 
      label="Escenario"
    >
      <SelectInput 
        optionText="title" 
        validate={required()} 
        fullWidth
        helperText="Escenario de juego que los estudiantes deberán completar"
        sx={{ mb: 2 }}
      />
    </ReferenceInput>

    <DateTimeInput 
      source="deadline" 
      label="Fecha y Hora Límite" 
      validate={required()} 
      fullWidth
      helperText="Fecha y hora máxima para completar la tarea"
      sx={{ mb: 2 }}
    />

    <NumberInput
      source="minScoreToPass"
      label="Nota Mínima para Aprobar"
      defaultValue={0.7}
      step={0.05}
      max={1}
      min={0}
      validate={[required(), minValue(0), maxValue(1)]}
      fullWidth
      helperText="Valor entre 0.0 y 1.0 (se mostrará como porcentaje: 0.7 = 70%)"
      sx={{ mb: 2 }}
    />

    <NumberInput
      source="maxAttempts"
      label="Número de Intentos Permitidos"
      defaultValue={1}
      min={1}
      validate={[required(), minValue(1)]}
      fullWidth
      helperText="1 intento = Evaluación | Múltiples intentos = Práctica"
      sx={{ mb: 2 }}
    />
  </>
);
