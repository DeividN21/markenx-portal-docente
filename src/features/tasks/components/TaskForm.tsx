import { 
  TextInput, 
  ReferenceInput, 
  SelectInput, 
  DateTimeInput, 
  NumberInput,
  required,
  minValue,
  maxValue,
  FormDataConsumer
} from 'react-admin';
import { Box, Typography } from '@mui/material';
import { getTaskType, TASK_TYPE_LABELS, TASK_TYPE_COLORS } from '../types/task.types';

/**
 * Formulario compartido para crear/editar tareas
 * Incluye validación de minScoreToPass (0-1) y lógica EVALUATION vs ASSIGNMENT
 */
export const TaskForm = () => (
  <>
    <TextInput 
      source="title" 
      label="Título de la Tarea" 
      fullWidth 
      validate={required()}
    />
    <TextInput 
      source="summary" 
      label="Instrucciones para el estudiante" 
      multiline 
      fullWidth 
      rows={3}
      helperText="Descripción detallada de lo que el estudiante debe lograr"
    />
    
    <ReferenceInput 
      source="courseId" 
      reference="courses" 
      label="Asignar al Curso"
    >
      <SelectInput 
        optionText="name" 
        validate={required()} 
        fullWidth 
      />
    </ReferenceInput>

    <ReferenceInput 
      source="scenarioId" 
      reference="scenarios" 
      label="Escenario de Juego"
    >
      <SelectInput 
        optionText="title" 
        validate={required()} 
        fullWidth 
        helperText="Selecciona el escenario que los estudiantes deberán jugar"
      />
    </ReferenceInput>

    <DateTimeInput 
      source="deadline" 
      label="Fecha y Hora Límite" 
      validate={required()} 
      fullWidth
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
    />

    <NumberInput
      source="maxAttempts"
      label="Número de Intentos Permitidos"
      defaultValue={1}
      min={1}
      validate={[required(), minValue(1)]}
      fullWidth
      helperText="1 intento = Evaluación | Múltiples intentos = Práctica"
    />

    {/* Feedback visual dinámico sobre el tipo de tarea */}
    <FormDataConsumer>
      {({ formData }) => {
        const maxAttempts = formData?.maxAttempts || 1;
        const taskType = getTaskType(maxAttempts);
        const backgroundColor = TASK_TYPE_COLORS[taskType];
        const label = TASK_TYPE_LABELS[taskType];

        return (
          <Box
            sx={{
              padding: 2,
              marginTop: -1,
              marginBottom: 2,
              backgroundColor,
              borderRadius: 1,
              border: '1px solid #e0e0e0',
            }}
          >
            <Typography variant="body2" fontWeight="bold" color="text.primary">
              Tipo de Tarea: {label}
            </Typography>
          </Box>
        );
      }}
    </FormDataConsumer>
  </>
);
