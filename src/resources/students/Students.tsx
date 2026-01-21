import { 
    List, 
    Datagrid, 
    TextField, 
    EmailField,
    ChipField,
    EditButton, 
    DeleteButton,
    Create,
    Edit,
    SimpleForm,
    TextInput,
    ReferenceInput,
    SelectInput,
    ReferenceField,
    TopToolbar,
    Button,
    required,
    email,
    useRecordContext
} from "react-admin";
import UploadFileIcon from '@mui/icons-material/UploadFile';

// VALIDACIONES
const validateRequired = [required()];
const validateEmail = [required(), email("Correo inválido")];

// BOTONERA SUPERIOR PERSONALIZADA
const StudentListActions = () => (
    <TopToolbar>
        {/* Botón visual de Importar (funcionalidad pendiente) */}
        <Button label="Importar CSV" onClick={() => alert('Funcionalidad de Importación pendiente de integración')}>
            <UploadFileIcon />
        </Button>
        <CreateButton /> {/* Botón estándar de Crear */}
    </TopToolbar>
);

// Importar CreateButton de react-admin para usarlodentro de la toolbar
import { CreateButton } from 'react-admin';

// LISTA DE ESTUDIANTES
export const StudentList = () => (
    <List title="Estudiantes" actions={<StudentListActions />}>
        <Datagrid rowClick="edit">
            {/* El backend envía 'fullName', no 'firstName'/'lastName' separados */}
            <TextField source="fullName" label="Nombre Completo" />
            <EmailField source="email" label="Email" />
            
            {/* El backend NO envía 'courseId' en la lista, así que se quita esta columna o saldrá vacía */}
            {/* <ReferenceField source="courseId" reference="courses" label="Curso" /> */}

            {/* Tampoco envía 'status' */}
            {/* <ChipField source="status" label="Estado" /> */}

            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

// CREAR ESTUDIANTE
export const StudentCreate = () => (
    <Create title="Registrar Estudiante" redirect="list">
        <SimpleForm>
            <TextInput source="firstName" label="Nombres" fullWidth validate={validateRequired} />
            <TextInput source="lastName" label="Apellidos" fullWidth validate={validateRequired} />
            <TextInput source="email" label="Correo Institucional" fullWidth validate={validateEmail} type="email" />
            
            {/* Seleccionar el curso */}
            <ReferenceInput source="courseId" reference="courses" label="Curso">
                <SelectInput optionText="name" validate={validateRequired} fullWidth />
            </ReferenceInput>

            {/* Estado inicial por defecto */}
            <SelectInput 
                source="status" 
                label="Estado Inicial" 
                choices={[
                    { id: 'PENDING_IDENTITY', name: 'Pendiente (Identity)' },
                    { id: 'ACTIVE', name: 'Activo' },
                    { id: 'DISABLED', name: 'Deshabilitado' }
                ]} 
                defaultValue="PENDING_IDENTITY" 
            />
        </SimpleForm>
    </Create>
);

// EDITAR ESTUDIANTE
const StudentTitle = () => {
    const record = useRecordContext();
    return <span>Estudiante {record ? `${record.first_name} ${record.last_name}` : ''}</span>;
};

export const StudentEdit = () => (
    <Edit title={<StudentTitle />}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="firstName" label="Nombres" fullWidth validate={validateRequired} />
            <TextInput source="lastName" label="Apellidos" fullWidth validate={validateRequired} />
            <TextInput source="email" label="Correo" fullWidth validate={validateEmail} />

            <ReferenceInput source="courseId" reference="courses" label="Curso">
                <SelectInput optionText="name" validate={validateRequired} fullWidth />
            </ReferenceInput>

            <SelectInput 
                source="status" 
                label="Estado" 
                choices={[
                    { id: 'PENDING_IDENTITY', name: 'Pendiente' },
                    { id: 'ACTIVE', name: 'Activo' },
                    { id: 'DISABLED', name: 'Deshabilitado' }
                ]} 
            />
        </SimpleForm>
    </Edit>
);