import { TextInput, ReferenceInput, SelectInput, required } from 'react-admin';

/**
 * Formulario compartido para crear/editar cursos
 * Campos: name, academicTermId
 */
export const CourseForm = () => (
  <>
    <TextInput 
      source="name" 
      label="Nombre del Curso" 
      fullWidth 
      validate={required()}
    />
    <ReferenceInput 
      source="academicTermId" 
      reference="academic-terms"
    >
      <SelectInput 
        label="Período Académico"
        optionText="label" 
        validate={required()} 
        fullWidth 
        placeholder="Período académico"
      />
    </ReferenceInput>
  </>
);
