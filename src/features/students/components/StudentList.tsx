import React from 'react';
import { 
  List, 
  Datagrid, 
  TextField, 
  EmailField, 
  ReferenceField,
  EditButton
} from 'react-admin';
import { StatusChip } from '../../../components/ui/StatusChip';

/**
 * Student list component
 * Displays all students with their courses and status
 */
export const StudentList: React.FC = () => {
  return (
    <List title="Estudiantes">
      <Datagrid rowClick="edit">
        <TextField source="fullName" label="Nombre Completo" sortable={false} />
        <EmailField source="email" label="Email" sortable={false} />
        <ReferenceField source="courseId" reference="courses" label="Curso" sortable={false}>
          <TextField source="name" />
        </ReferenceField>
        <StatusChip source="status" label="Estado" sortable={false} />
        <EditButton />
      </Datagrid>
    </List>
  );
};
