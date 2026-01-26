import { Edit, useNotify } from 'react-admin';
import { StudentEditForm } from './StudentEditForm';

/**
 * Student edit component
 * Uses StudentEditForm which only includes updatable fields (firstName, lastName, courseId)
 */
export const StudentEdit = () => {
  const notify = useNotify();

  return (
    <Edit 
      title="Editar Estudiante"
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
      <StudentEditForm />
    </Edit>
  );
};
