import { Create, SimpleForm, useNotify } from 'react-admin';
import { CourseForm } from './CourseForm';

/**
 * Componente de creación de cursos
 * Restricción: Solo se puede crear cursos en períodos UPCOMING (validado por backend)
 */
export const CourseCreate = () => {
  const notify = useNotify();

  return (
    <Create 
      redirect="list"
      mutationOptions={{
        onError: (error) => {
          const apiError = error as { body?: { userMessage?: string } };
          notify(
            apiError.body?.userMessage || 'Error al crear el curso',
            { type: 'error' }
          );
        },
      }}
    >
      <SimpleForm>
        <CourseForm />
      </SimpleForm>
    </Create>
  );
};
