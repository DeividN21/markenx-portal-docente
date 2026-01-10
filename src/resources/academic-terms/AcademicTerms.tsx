import { 
    List, 
    Datagrid, 
    TextField, 
    DateField, 
    ChipField,
    EditButton, 
    DeleteButton,
    Create,
    Edit,
    SimpleForm,
    TextInput,
    DateInput,
    SelectInput,
    required,
    useRecordContext
} from "react-admin";

// VALIDACIONES & CONSTANTES
const validateRequired = [required()];

const statusChoices = [
    { id: 'UPCOMING', name: 'Próximo (Upcoming)' },
    { id: 'ACTIVE', name: 'Activo' },
    { id: 'ARCHIVED', name: 'Archivado' },
];

// COMPONENTE: LISTA
export const AcademicTermList = () => (
    <List title="Periodos Académicos">
        <Datagrid rowClick="edit">
            {/* El ID suele ser un UUID largo, mejor se muestra el Nombre como principal */}
            <TextField source="name" label="Periodo" />
            <DateField source="start_date" label="Fecha Inicio" />
            <DateField source="end_date" label="Fecha Fin" />
            
            {/* ChipField muestra el estado con estilo de "etiqueta" */}
            <ChipField source="status" label="Estado" />
            
            <EditButton label="Editar" />
            <DeleteButton label="Borrar"/>
        </Datagrid>
    </List>
);

// COMPONENTE: CREACIÓN
export const AcademicTermCreate = () => (
    <Create title="Crear Periodo Académico" redirect="list">
        <SimpleForm>
            <TextInput source="name" label="Nombre del Periodo (Ej: 1er Semestre - 2026)" fullWidth validate={validateRequired} />
            <DateInput source="start_date" label="Fecha de Inicio" validate={validateRequired} />
            <DateInput source="end_date" label="Fecha de Fin" validate={validateRequired} />
            
            {/* El estado inicial suele ser UPCOMING al crear */}
            <SelectInput source="status" label="Estado Inicial" choices={statusChoices} defaultValue="UPCOMING" validate={validateRequired} />
        </SimpleForm>
    </Create>
);

// COMPONENTE: EDICIÓN
// Se reutiliza la lógica del formulario, pero se permite editar
const AcademicTermTitle = () => {
    const record = useRecordContext();
    return <span>Periodo {record ? `"${record.name}"` : ''}</span>;
};

export const AcademicTermEdit = () => (
    <Edit title={<AcademicTermTitle />}>
        <SimpleForm>
            <TextInput source="id" disabled label="ID (UUID)" />
            <TextInput source="name" label="Nombre del Periodo" fullWidth validate={validateRequired} />
            <DateInput source="start_date" label="Fecha de Inicio" validate={validateRequired} />
            <DateInput source="end_date" label="Fecha de Fin" validate={validateRequired} />
            <SelectInput source="status" label="Estado" choices={statusChoices} validate={validateRequired} />
        </SimpleForm>
    </Edit>
);