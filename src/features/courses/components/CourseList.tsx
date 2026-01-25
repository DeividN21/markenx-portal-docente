import { 
  List, 
  Datagrid, 
  TextField, 
  ReferenceField, 
  EditButton
} from 'react-admin';
import { StatusChip } from '../../../components/ui/StatusChip';

/**
 * Componente de lista de cursos
 */
export const CourseList = () => (
  <List
    title="Cursos"
    sort={{ field: 'name', order: 'ASC' }}
    perPage={25}
  >
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="name" label="Nombre del Curso" />
      <TextField source="code" label="Código" />
      <ReferenceField 
        source="academicTermId" 
        reference="academic-terms" 
        label="Período Académico"
        link={false}
      >
        <TextField source="name" />
      </ReferenceField>
      <StatusChip source="status" label="Estado" />
      <EditButton />
    </Datagrid>
  </List>
);
