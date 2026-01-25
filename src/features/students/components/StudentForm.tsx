import React from 'react';
import { 
  SimpleForm, 
  TextInput, 
  ReferenceInput, 
  SelectInput,
  required,
  email
} from 'react-admin';
import { Grid } from '@mui/material';

const validateRequired = [required()];
const validateEmail = [required(), email('Correo inválido')];

/**
 * Student form component
 * Used by both StudentCreate and StudentEdit
 */
export const StudentForm: React.FC = () => {
  return (
    <SimpleForm>
      {/* @ts-ignore - MUI v7 Grid compatibility - item and xs props are valid but TypeScript definitions may be outdated */}
      <Grid container spacing={2}>
        {/* @ts-ignore - MUI v7 Grid compatibility */}
        <Grid item xs={12} sm={6}>
          <TextInput 
            source="firstName" 
            label="Nombres" 
            fullWidth 
            validate={validateRequired} 
          />
        </Grid>
        
        {/* @ts-ignore - MUI v7 Grid compatibility */}
        <Grid item xs={12} sm={6}>
          <TextInput 
            source="lastName" 
            label="Apellidos" 
            fullWidth 
            validate={validateRequired} 
          />
        </Grid>
        
        {/* @ts-ignore - MUI v7 Grid compatibility */}
        <Grid item xs={12}>
          <TextInput 
            source="email" 
            label="Correo Institucional" 
            fullWidth 
            validate={validateEmail} 
            type="email" 
          />
        </Grid>
        
        {/* @ts-ignore - MUI v7 Grid compatibility */}
        <Grid item xs={12}>
          <ReferenceInput 
            source="courseId" 
            reference="courses" 
            label="Curso"
          >
            <SelectInput 
              optionText="name" 
              validate={validateRequired} 
              fullWidth 
            />
          </ReferenceInput>
        </Grid>
      </Grid>
    </SimpleForm>
  );
};
