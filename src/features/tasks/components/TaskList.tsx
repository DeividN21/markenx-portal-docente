import { 
  List, 
  Datagrid, 
  TextField, 
  ReferenceField,
  DateField,
  NumberField,
  EditButton,
  FunctionField
} from 'react-admin';
import { Chip } from '@mui/material';
import { StatusChip } from '../../../components/ui/StatusChip';
import { formatScore } from '../../../utils/formatters';
import type { Task } from '../types/task.types';
import { getTaskType } from '../types/task.types';

/**
 * Componente de lista de tareas
 */
export const TaskList = () => (
  <List
    title="Gestión de Tareas"
    sort={{ field: 'deadline', order: 'DESC' }}
    perPage={25}
  >
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="title" label="Título" />
      
      <ReferenceField 
        source="courseId" 
        reference="courses" 
        label="Curso"
        link={false}
      >
        <TextField source="name" />
      </ReferenceField>

      <ReferenceField 
        source="scenarioId" 
        reference="scenarios" 
        label="Escenario Vinculado"
        link={false}
      >
        <TextField source="title" />
      </ReferenceField>

      <DateField 
        source="deadline" 
        label="Fecha Límite" 
        showTime 
        locales="es-ES"
        options={{ 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }}
      />
      
      <FunctionField
        label="Nota Mínima"
        render={(record: Task) => formatScore(record.minScoreToPass)}
      />
      
      <NumberField source="maxAttempts" label="Intentos" />
      
      <FunctionField
        label="Tipo"
        render={(record: Task) => {
          const taskType = getTaskType(record.maxAttempts);
          return (
            <Chip 
              label={taskType === 'EVALUATION' ? 'Evaluación' : 'Práctica'}
              color={taskType === 'EVALUATION' ? 'primary' : 'default'}
              size="small"
            />
          );
        }}
      />

      <StatusChip source="status" label="Estado" />
      
      <EditButton />
    </Datagrid>
  </List>
);
