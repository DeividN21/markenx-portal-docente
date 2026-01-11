import { 
    List, 
    Datagrid, 
    TextField, 
    ChipField,
    EditButton, 
    DeleteButton,
    Create,
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    ReferenceInput,
    ReferenceField,
    required,
    useRecordContext
} from "react-admin";

const validateRequired = [required()];

// LISTA DE CURSOS
export const CourseList = () => (
    <List title="Cursos">
        <Datagrid rowClick="edit">
            {/* Campo simple de texto */}
            <TextField source="name" label="Nombre del Curso" />
            <TextField source="code" label="Código" />
            
            {/* ReferenceField busca el ID en 'academic-terms' y muestra su 'name' */}
            <ReferenceField source="academic_term_id" reference="academic-terms" label="Periodo Académico">
                <TextField source="name" />
            </ReferenceField>

            <ChipField source="lifecycle_status" label="Estado" />

            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

// CREAR CURSO
export const CourseCreate = () => (
    <Create title="Crear Curso" redirect="list">
        <SimpleForm>
            <TextInput source="name" label="Nombre del Curso (Ej: Marketing A)" fullWidth validate={validateRequired} />
            <TextInput source="code" label="Código Interno (Ej: 101)" validate={validateRequired} />
            
            {/* SELECTOR DE PERIODO ACADÉMICO */}
            <ReferenceInput source="academic_term_id" reference="academic-terms" label="Periodo Académico">
                <SelectInput optionText="name" validate={validateRequired} fullWidth />
            </ReferenceInput>

            <SelectInput 
                source="lifecycle_status" 
                label="Estado" 
                choices={[
                    { id: 'ACTIVE', name: 'Activo' },
                    { id: 'ARCHIVED', name: 'Archivado' }
                ]} 
                defaultValue="ACTIVE" 
            />
        </SimpleForm>
    </Create>
);

// EDITAR CURSO
const CourseTitle = () => {
    const record = useRecordContext();
    return <span>Curso {record ? `"${record.name}"` : ''}</span>;
};

export const CourseEdit = () => (
    <Edit title={<CourseTitle />}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" label="Nombre del Curso" fullWidth validate={validateRequired} />
            <TextInput source="code" label="Código" validate={validateRequired} />
            
            <ReferenceInput source="academic_term_id" reference="academic-terms" label="Periodo Académico">
                <SelectInput optionText="name" validate={validateRequired} fullWidth />
            </ReferenceInput>

            <SelectInput 
                source="lifecycle_status" 
                label="Estado" 
                choices={[
                    { id: 'ACTIVE', name: 'Activo' },
                    { id: 'ARCHIVED', name: 'Archivado' }
                ]} 
            />
        </SimpleForm>
    </Edit>
);