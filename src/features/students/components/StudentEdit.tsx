import React from 'react';
import { Edit, TopToolbar } from 'react-admin';
import { StudentForm } from './StudentForm';
import { ChangeStatusButton } from '../../../components/shared/ChangeStatusButton';

/**
 * Edit toolbar with status change button
 */
const StudentEditToolbar: React.FC = () => {
  return (
    <TopToolbar>
      <ChangeStatusButton resource="students" />
    </TopToolbar>
  );
};

/**
 * Student edit component
 */
export const StudentEdit: React.FC = () => {
  return (
    <Edit title="Editar Estudiante" actions={<StudentEditToolbar />}>
      <StudentForm />
    </Edit>
  );
};
