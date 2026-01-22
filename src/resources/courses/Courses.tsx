import { 
    List, Datagrid, TextField, ReferenceField, ChipField, EditButton,
    Create, SimpleForm, TextInput, SelectInput, ReferenceInput, required
} from "react-admin";

const validateRequired = [required()];

export const CourseList = () => (
    <List title="Cursos">
        <Datagrid rowClick="edit">
            <TextField source="name" label="Nombre del Curso" />
            <ReferenceField source="academicTermId" reference="academic-terms" label="Periodo">
                <TextField source="label" />
            </ReferenceField>
            {/* Si el backend envía estado, lo mostramos, si no, no pasa nada */}
            <ChipField source="lifecycleStatus" label="Estado" emptyText="-" />
            
            <EditButton />
            {/* ELIMINADO: DeleteButton para evitar error 405 */}
        </Datagrid>
    </List>
);

export const CourseCreate = () => (
    <Create title="Crear Curso" redirect="list">
        <SimpleForm>
            <TextInput source="name" label="Nombre del Curso" fullWidth validate={validateRequired} />
            <ReferenceInput source="academicTermId" reference="academic-terms" label="Periodo Académico">
                <SelectInput optionText="label" validate={validateRequired} fullWidth />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export const CourseEdit = () => (
    <Edit title={<span />}>
         <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" label="Nombre del Curso" fullWidth validate={validateRequired} />
            <ReferenceInput source="academicTermId" reference="academic-terms" label="Periodo Académico">
                <SelectInput optionText="label" disabled fullWidth />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);