import { 
  Edit, 
  SimpleForm, 
  Toolbar, 
  SaveButton,
  useRecordContext,
  useNotify 
} from 'react-admin';
import { TaskForm } from './TaskForm';
import type { Task } from '../types/task.types';

/**
 * Toolbar personalizado para edición de tareas
 */
const TaskEditToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

/**
 * Título dinámico que muestra el nombre de la tarea
 */
const TaskTitle = () => {
  const record = useRecordContext<Task>();
  return <span>Tarea: {record ? record.title : ''}</span>;
};

/**
 * Componente de edición de tareas
 */
export const TaskEdit = () => {
  const notify = useNotify();

  return (
    <Edit
      title={<TaskTitle />}
      mutationMode="pessimistic"
      mutationOptions={{
        onError: (error) => {
          const apiError = error as { body?: { userMessage?: string } };
          notify(
            apiError.body?.userMessage || 'Error al actualizar la tarea',
            { type: 'error' }
          );
        },
      }}
    >
      <SimpleForm toolbar={<TaskEditToolbar />}>
        <TaskForm />
      </SimpleForm>
    </Edit>
  );
};
