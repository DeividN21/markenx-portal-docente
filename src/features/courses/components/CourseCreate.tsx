import { Create, SimpleForm } from 'react-admin';
import { CourseForm } from './CourseForm';

/**
 * Componente de creación de cursos
 * Restricción: Solo se puede crear cursos en períodos UPCOMING (validado por backend)
 */
export const CourseCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <CourseForm />
    </SimpleForm>
  </Create>
);
