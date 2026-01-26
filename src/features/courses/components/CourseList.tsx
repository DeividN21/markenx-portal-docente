import { 
  List, 
  Datagrid, 
  TextField, 
  EditButton,
  FunctionField
} from 'react-admin';
import type { Course } from '../types/course.types';
import { CourseLifecycleToggle } from './CourseLifecycleToggle';

/**
 * Componente de lista de cursos
 */
export const CourseList = () => (
  <List
    title="Cursos"
    sort={{ field: 'name', order: 'ASC' }}
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
      <TextField source="code" label="Código" sortable={false} />
      <TextField source="name" label="Nombre" sortable={false} />
      <FunctionField
        label="Acciones"
        sortable={false}
        render={() => <EditButton />}
      />
      <FunctionField
        label=""
        sortable={false}
        render={(record: Course) => (
          <CourseLifecycleToggle record={record} />
        )}
      />
    </Datagrid>
  </List>
);
