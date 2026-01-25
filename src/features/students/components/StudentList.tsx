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
        <TextField source="fullName" label="Nombre Completo" />
        <EmailField source="email" label="Email" />
        <ReferenceField source="courseId" reference="courses" label="Curso">
          <TextField source="name" />
        </ReferenceField>
        <StatusChip source="status" label="Estado" />
        <EditButton />
      </Datagrid>
    </List>
  );
};
