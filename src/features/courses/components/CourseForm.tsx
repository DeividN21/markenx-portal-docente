import { TextInput, ReferenceInput, SelectInput, required } from 'react-admin';

/**
 * Formulario compartido para crear/editar cursos
 * Campos editables: name, code, academicTermId
 */
export const CourseForm = () => (
  <>
    <TextInput 
      source="name" 
      label="Nombre del Curso" 
      fullWidth 
      validate={required()}
      helperText="Ej: Introducción a la Programación"
    />
    <TextInput 
      source="code" 
      label="Código del Curso" 
      fullWidth 
      validate={required()}
      helperText="Ej: CS101"
    />
    <ReferenceInput 
      source="academicTermId" 
      reference="academic-terms" 
      label="Período Académico"
    >
      <SelectInput 
        optionText="name" 
        validate={required()} 
        fullWidth 
      />
    </ReferenceInput>
  </>
);
