import { Create, SimpleForm } from 'react-admin';
import { TaskForm } from './TaskForm';

/**
 * Componente de creación de tareas
 */
export const TaskCreate = () => (
  <Create title="Nueva Tarea" redirect="list">
    <SimpleForm>
      <TaskForm />
    </SimpleForm>
  </Create>
);
