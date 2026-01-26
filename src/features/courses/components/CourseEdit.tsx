import { 
  Edit, 
  SimpleForm, 
  TextInput,
  Toolbar,
  SaveButton,
  useNotify 
} from 'react-admin';

/**
 * Toolbar sin botón de eliminar
 */
const CourseEditToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

/**
 * Componente de edición de cursos
 * Restricciones:
 * - Solo se puede editar el nombre del curso
 * - El código no es editable
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
        <TextInput 
          source="code" 
          label="Código del Curso" 
          disabled 
          fullWidth 
        />
        <TextInput 
          source="name" 
          label="Nombre del Curso" 
          fullWidth 
        />
      </SimpleForm>
    </Edit>
  );
};
