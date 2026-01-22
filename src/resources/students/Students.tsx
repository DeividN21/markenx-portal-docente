import { 
    List, Datagrid, TextField, EmailField, EditButton,
    Create, SimpleForm, TextInput, ReferenceInput, SelectInput, required, email
} from "react-admin";

const validateRequired = [required()];
const validateEmail = [required(), email("Correo inválido")];

export const StudentList = () => (
    <List title="Estudiantes">
        <Datagrid rowClick="edit">
            <TextField source="fullName" label="Nombre Completo" />
            <EmailField source="email" label="Email" />
            
            <EditButton />
            {/* DeleteButton comentado por seguridad hasta confirmar backend */}
            {/* <DeleteButton /> */}
        </Datagrid>
    </List>
);

export const StudentCreate = () => (
    <Create title="Registrar Estudiante" redirect="list">
        <SimpleForm>
            <TextInput source="firstName" label="Nombres" fullWidth validate={validateRequired} />
            <TextInput source="lastName" label="Apellidos" fullWidth validate={validateRequired} />
            <TextInput source="email" label="Correo Institucional" fullWidth validate={validateEmail} type="email" />
            
            <ReferenceInput source="courseId" reference="courses" label="Curso">
                <SelectInput optionText="name" validate={validateRequired} fullWidth />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export const StudentEdit = () => (
    <Edit title={<span />}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="firstName" label="Nombres" fullWidth validate={validateRequired} />
            <TextInput source="lastName" label="Apellidos" fullWidth validate={validateRequired} />
            <TextInput source="email" label="Correo" fullWidth disabled />
            <ReferenceInput source="courseId" reference="courses" label="Curso">
                <SelectInput optionText="name" validate={validateRequired} fullWidth />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);