import { 
    List, 
    Datagrid, 
    TextField, 
    DateField, 
    NumberField,
    ChipField,
    ReferenceField,
    EditButton, 
    DeleteButton,
    Create,
    Edit,
    SimpleForm,
    TextInput,
    DateInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
    FormDataConsumer,
    required,
    minValue,
    useRecordContext
} from "react-admin";

const validateRequired = [required()];

// LISTA DE TAREAS
export const TaskList = () => (
    <List title="Gestión de Tareas">
        <Datagrid rowClick="edit">
            <TextField source="title" label="Título" />
            
            {/* A qué curso pertenece */}
            <ReferenceField source="course_id" reference="courses" label="Curso">
                <ChipField source="name" />
            </ReferenceField>

            {/* Qué escenario se juega */}
            <ReferenceField source="scenario_id" reference="scenarios" label="Escenario Vinculado">
                <TextField source="title" />
            </ReferenceField>

            <DateField source="deadline" label="Fecha Límite" showTime />
            <NumberField source="max_attempts" label="Intentos" />
            
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

// FORMULARIO COMÚN
const TaskForm = () => (
    <SimpleForm>
        <TextInput source="title" label="Título de la Tarea" fullWidth validate={validateRequired} />
        <TextInput source="summary" label="Instrucciones para el estudiante" multiline fullWidth rows={3} />
        
        {/* Selección de curso */}
        <ReferenceInput source="course_id" reference="courses" label="Asignar al Curso">
            <SelectInput optionText="name" validate={validateRequired} fullWidth />
        </ReferenceInput>

        {/* Selección de escenario */}
        <ReferenceInput source="scenario_id" reference="scenarios" label="Escenario de Juego">
            <SelectInput optionText="title" validate={validateRequired} fullWidth helperText="Selecciona el escenario que los estudiantes deberán jugar" />
        </ReferenceInput>

        <DateInput source="deadline" label="Fecha y Hora Límite" validate={validateRequired} />
        
        <NumberInput 
            source="min_score_to_pass" 
            label="Nota Mínima para Aprobar (0.0 - 1.0)" 
            defaultValue={0.7} 
            step={0.1}
            max={1}
            min={0}
            validate={validateRequired}
        />

        {/* Lógica de intentos: ASIGNACIÓN VS EVALUACIÓN */}
        <NumberInput 
            source="max_attempts" 
            label="Número de Intentos Permitidos" 
            defaultValue={1} 
            min={1} 
            validate={[required(), minValue(1)]} 
        />

        {/* Feedback visual dinámico */}
        <FormDataConsumer>
            {({ formData }) => (
                <div style={{ 
                    padding: '10px', 
                    marginTop: '-10px', 
                    marginBottom: '20px', 
                    backgroundColor: formData.max_attempts === 1 ? '#e3f2fd' : '#fff3e0',
                    borderRadius: '4px',
                    color: '#333'
                }}>
                    <strong>Tipo de Tarea: </strong>
                    {formData.max_attempts === 1 
                        ? "EVALUACIÓN (Examen de oportunidad única)" 
                        : "ASIGNACIÓN (Práctica con múltiples intentos)"}
                </div>
            )}
        </FormDataConsumer>

    </SimpleForm>
);

// VISTAS 
export const TaskCreate = () => (
    <Create title="Nueva Tarea" redirect="list">
        <TaskForm />
    </Create>
);

const TaskTitle = () => {
    const record = useRecordContext();
    return <span>Tarea: {record ? record.title : ''}</span>;
};

export const TaskEdit = () => (
    <Edit title={<TaskTitle />}>
        <TaskForm />
    </Edit>
);