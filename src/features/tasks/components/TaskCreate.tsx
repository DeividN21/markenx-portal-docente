import { Create, SimpleForm, useNotify } from 'react-admin';
import { TaskForm } from './TaskForm';

/**
 * Componente de creación de tareas
 */
export const TaskCreate = () => {
  const notify = useNotify();

  return (
    <Create 
      title="Nueva Tarea" 
      redirect="list"
      mutationOptions={{
        onError: (error) => {
          const apiError = error as { body?: { userMessage?: string } };
          notify(
            apiError.body?.userMessage || 'Error al crear la tarea',
            { type: 'error' }
          );
        },
      }}
    >
      <SimpleForm>
        <TaskForm />
      </SimpleForm>
    </Create>
  );
};
