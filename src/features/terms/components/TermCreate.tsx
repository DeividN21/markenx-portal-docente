import { Create, SimpleForm, useNotify } from 'react-admin';
import { TermForm } from './TermForm';

/**
 * Componente de creación de períodos académicos
 * Los términos se crean con estado UPCOMING por defecto (lo maneja el backend)
 */
export const TermCreate = () => {
  const notify = useNotify();

  return (
    <Create 
      redirect="list"
      mutationOptions={{
        onError: (error) => {
          const apiError = error as { body?: { userMessage?: string } };
          notify(
            apiError.body?.userMessage || 'Error al crear el período académico',
            { type: 'error' }
          );
        },
      }}
    >
      <SimpleForm>
        <TermForm />
      </SimpleForm>
    </Create>
  );
};
