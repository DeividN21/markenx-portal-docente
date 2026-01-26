import { 
  SimpleForm, 
  TextInput,
  required,
  Toolbar,
  SaveButton
} from 'react-admin';
import { Grid } from '@mui/material';

const validateRequired = [required()];

/**
 * Custom toolbar without delete button
 */
const StudentEditToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

/**
 * Student edit form component
 * Includes only fields that can be updated: firstName, lastName
 * Email and course are not editable after student creation
 */
export const StudentEditForm = () => {
  return (
    <SimpleForm toolbar={<StudentEditToolbar />}>
      {/* @ts-ignore - MUI v7 Grid compatibility - item and xs props are valid but TypeScript definitions may be outdated */}
      <Grid container spacing={2}>
        {/* @ts-ignore - MUI v7 Grid compatibility */}
        <Grid item xs={12}>
          <TextInput 
            source="fullName" 
            label="Nombre Completo" 
            fullWidth
            disabled
          />
        </Grid>
        
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
      </Grid>
    </SimpleForm>
  );
};
