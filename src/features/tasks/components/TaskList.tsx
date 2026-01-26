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
import { formatScore } from '../../../utils/formatters';
import type { Task } from '../types/task.types';

/**
 * Componente de lista de tareas
 */
export const TaskList = () => (
  <List
    title="Gestión de Tareas"
    sort={{ field: 'deadline', order: 'DESC' }}
    perPage={25}
  >
    <Datagrid 
      rowClick={false} 
      bulkActionButtons={false}
      sx={{
        '& .RaDatagrid-headerCell': {
          textAlign: 'center',
        },
        '& .RaDatagrid-rowCell': {
          textAlign: 'center',
        }
      }}
    >
      <FunctionField
        label="Título"
        sortable={false}
        render={(record: Task) => (
          record.title.length > 20 
            ? `${record.title.substring(0, 20)}...` 
            : record.title
        )}
      />
      
      <ReferenceField 
        source="courseId" 
        reference="courses" 
        label="Curso"
        link={false}
        sortable={false}
      >
        <TextField source="name" />
      </ReferenceField>

      <ReferenceField 
        source="scenarioId" 
        reference="scenarios" 
        label="Escenario Vinculado"
        link={false}
        sortable={false}
      >
        <FunctionField
          render={(record: any) => (
            record.title && record.title.length > 20 
              ? `${record.title.substring(0, 20)}...` 
              : record.title
          )}
        />
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
        sortable={false}
      />
      
      <FunctionField
        label="Nota Mínima"
        render={(record: Task) => formatScore(record.minScoreToPass)}
        sortable={false}
      />
      
      <NumberField source="maxAttempts" label="Intentos" sortable={false} />
      
      <FunctionField
        label="Acciones"
        sortable={false}
        render={() => <EditButton />}
      />
    </Datagrid>
  </List>
);
