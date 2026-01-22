import { 
    List, Datagrid, TextField, DateField, ChipField, EditButton,
    Create, Edit, SimpleForm, TextInput, DateInput, NumberInput, 
    required, useRecordContext, useNotify, useRefresh, 
    Toolbar, SaveButton
} from "react-admin";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArchiveIcon from '@mui/icons-material/Archive';
import Button from '@mui/material/Button';

const validateRequired = [required()];

const safeInt = (value: any) => {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
};

const transformData = (data: any) => ({
    ...data,
    academicYear: safeInt(data.academicYear),
    academic_year: safeInt(data.academicYear),
    year: safeInt(data.academicYear),
    sequence: safeInt(data.sequence),
    semester: safeInt(data.sequence),
    startDate: data.startDate,
    start_date: data.startDate,
    endDate: data.endDate,
    end_date: data.endDate,
    status: data.status || "UPCOMING"
});

const ChangeStatusButton = () => {
    const record = useRecordContext();
    const notify = useNotify();
    const refresh = useRefresh();
    const apiUrl = import.meta.env.VITE_JSON_SERVER_URL;

    if (!record) return null;

    let label = "";
    let newStatus = "";
    let Icon = null;
    let color: "primary" | "warning" = "primary";

    if (record.status === 'UPCOMING') {
        label = "Activar Periodo";
        newStatus = "ACTIVE";
        Icon = PlayArrowIcon;
        color = "primary";
    } else if (record.status === 'ACTIVE' || record.status === 'ENDED') {
        label = "Archivar Periodo";
        newStatus = "DISABLED";
        Icon = ArchiveIcon;
        color = "warning";
    } else {
        return null; 
    }

    const handleClick = async () => {
        try {
            const auth = JSON.parse(localStorage.getItem('auth') || "{}");
            const token = auth.access_token || auth.accessToken || auth.token;

            const response = await fetch(`${apiUrl}/academic-terms/${record.id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || `Error ${response.status}`);
            }

            notify(`Estado actualizado correctamente`, { type: 'success' });
            refresh();
        } catch (error: any) {
            notify(`${error.message}`, { type: 'error', autoHideDuration: 6000 });
        }
    };

    return (
        <Button 
            variant="contained" 
            color={color} 
            size="small" 
            onClick={handleClick} 
            startIcon={<Icon />} 
            sx={{ ml: 2 }}
        >
            {label}
        </Button>
    );
};

const AcademicTermEditToolbar = () => (
    <Toolbar>
        <SaveButton />
        <ChangeStatusButton />
    </Toolbar>
);

export const AcademicTermList = () => (
    <List title="Periodos Académicos">
        <Datagrid rowClick="edit">
            <TextField source="label" label="Periodo" /> 
            <DateField source="startDate" label="Fecha Inicio" />
            <DateField source="endDate" label="Fecha Fin" />
            <ChipField source="status" label="Estado" />
            <EditButton label="Editar" />
            {/* ELIMINADO: DeleteButton porque el backend no soporta DELETE */}
        </Datagrid>
    </List>
);

export const AcademicTermCreate = () => (
    <Create title="Crear Periodo Académico" redirect="list" transform={transformData}>
        <SimpleForm>
            <TextInput source="name" label="Nombre (Ej: 2026-1)" fullWidth validate={validateRequired} />
            <div style={{ display: 'flex', gap: '20px' }}>
                <NumberInput source="academicYear" label="Año (Ej: 2026)" validate={validateRequired} />
                <NumberInput source="sequence" label="Secuencia (Ej: 1)" validate={validateRequired} />
            </div>
            <DateInput source="startDate" label="Fecha Inicio" validate={validateRequired} />
            <DateInput source="endDate" label="Fecha Fin" validate={validateRequired} />
        </SimpleForm>
    </Create>
);

export const AcademicTermEdit = () => (
    <Edit title={<span />} transform={transformData}>
        <SimpleForm toolbar={<AcademicTermEditToolbar />}>
            <TextInput source="id" disabled label="ID" fullWidth />
            <TextInput source="name" label="Nombre" fullWidth validate={validateRequired} />
            <div style={{ display: 'flex', gap: '20px' }}>
                <NumberInput source="academicYear" label="Año" validate={validateRequired} />
                <NumberInput source="sequence" label="Secuencia" validate={validateRequired} />
            </div>
            <DateInput source="startDate" label="Fecha de Inicio" validate={validateRequired} />
            <DateInput source="endDate" label="Fecha de Fin" validate={validateRequired} />
            <ChipField source="status" label="Estado Actual" />
        </SimpleForm>
    </Edit>
);