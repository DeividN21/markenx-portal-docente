import { Create, SimpleForm } from 'react-admin';
import { TermForm } from './TermForm';

/**
 * Componente de creación de períodos académicos
 * Los términos se crean con estado UPCOMING por defecto (lo maneja el backend)
 */
export const TermCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TermForm />
    </SimpleForm>
  </Create>
);
