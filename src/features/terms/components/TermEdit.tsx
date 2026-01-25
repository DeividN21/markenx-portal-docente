import { Edit, SimpleForm, TextInput, Toolbar, SaveButton, useRecordContext, useNotify } from 'react-admin';
import { TermForm } from './TermForm';
import { TermChangeStatusButton } from './TermChangeStatusButton';
import type { Term } from '../types/term.types';
import { canEdit } from '../utils/term.utils';

/**
 * Toolbar personalizado para edición de términos
 * - Solo muestra el botón de guardar si el término está en UPCOMING
 * - Siempre muestra el botón de cambio de estado
 */
const TermEditToolbar = () => {
  const record = useRecordContext<Term>();
  const canEditRecord = record ? canEdit(record) : false;

  return (
    <Toolbar>
      {canEditRecord && <SaveButton />}
      <TermChangeStatusButton />
    </Toolbar>
  );
};

/**
 * Componente de edición de períodos académicos
 * Restricciones:
 * - Solo los términos UPCOMING pueden editar sus campos
 * - Todos los términos pueden cambiar de estado vía PATCH /status
 */
export const TermEdit = () => {
  const notify = useNotify();

  return (
    <Edit
      mutationMode="pessimistic"
      mutationOptions={{
        onError: (error) => {
          const apiError = error as { body?: { userMessage?: string } };
          notify(
            apiError.body?.userMessage || 'Error al actualizar el período académico',
            { type: 'error' }
          );
        },
      }}
    >
      <SimpleForm toolbar={<TermEditToolbar />}>
        <TextInput source="id" label="ID" disabled fullWidth />
        <TermForm />
      </SimpleForm>
    </Edit>
  );
};
