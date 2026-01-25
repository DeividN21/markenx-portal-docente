import React from 'react';
import { Edit, TopToolbar, useNotify } from 'react-admin';
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
  const notify = useNotify();

  return (
    <Edit 
      title="Editar Estudiante" 
      actions={<StudentEditToolbar />}
      mutationMode="pessimistic"
      mutationOptions={{
        onError: (error) => {
          const apiError = error as { body?: { userMessage?: string } };
          notify(
            apiError.body?.userMessage || 'Error al actualizar el estudiante',
            { type: 'error' }
          );
        },
      }}
    >
      <StudentForm />
    </Edit>
  );
};
