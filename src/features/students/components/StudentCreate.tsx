import React from 'react';
import { Create, useNotify } from 'react-admin';
import { StudentForm } from './StudentForm';

/**
 * Student creation component
 */
export const StudentCreate: React.FC = () => {
  const notify = useNotify();

  return (
    <Create 
      title="Registrar Estudiante" 
      redirect="list"
      mutationOptions={{
        onError: (error) => {
          const apiError = error as { body?: { userMessage?: string } };
          notify(
            apiError.body?.userMessage || 'Error al registrar el estudiante',
            { type: 'error' }
          );
        },
      }}
    >
      <StudentForm />
    </Create>
  );
};
