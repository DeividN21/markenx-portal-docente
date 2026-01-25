import { 
  Edit, 
  SimpleForm, 
  TextInput, 
  Toolbar, 
  SaveButton,
  useNotify 
} from 'react-admin';
import { ChangeStatusButton } from '../../../components/shared/ChangeStatusButton';

/**
 * Toolbar personalizado para edición de cursos
 * - Botón de guardar para actualizar nombre
 * - Botón de cambio de estado (ACTIVE ↔ DISABLED)
 */
const CourseEditToolbar = () => (
  <Toolbar>
    <SaveButton />
    <ChangeStatusButton resource="courses" />
  </Toolbar>
);

/**
 * Componente de edición de cursos
 * Restricciones:
 * - Solo se puede editar el nombre del curso
 * - El código no es editable
 * - El período académico se cambia vía endpoint específico (no implementado en UI aún)
 */
export const CourseEdit = () => {
  const notify = useNotify();

  return (
    <Edit
      mutationMode="pessimistic"
      mutationOptions={{
        onError: (error) => {
          const apiError = error as { body?: { userMessage?: string } };
          notify(
            apiError.body?.userMessage || 'Error al actualizar el curso',
            { type: 'error' }
          );
        },
      }}
    >
      <SimpleForm toolbar={<CourseEditToolbar />}>
        <TextInput source="id" label="ID" disabled fullWidth />
        <TextInput 
          source="name" 
          label="Nombre del Curso" 
          fullWidth 
        />
        <TextInput 
          source="code" 
          label="Código del Curso" 
          disabled 
          fullWidth 
          helperText="El código no puede modificarse"
        />
        <TextInput 
          source="academicTermName" 
          label="Período Académico" 
          disabled 
          fullWidth 
          helperText="Para cambiar el período, use la acción correspondiente"
        />
      </SimpleForm>
    </Edit>
  );
};
