import { 
    List, 
    Datagrid, 
    TextField, 
    EditButton, 
    DeleteButton,
    Create,
    Edit,
    TabbedForm, 
    FormTab,
    TextInput,
    NumberInput,
    ArrayInput,
    SimpleFormIterator,
    SelectInput,
    required,
    minValue,
    maxValue,
    useRecordContext
} from "react-admin";

// VALIDACIONES
const validateRequired = [required()];
const validateScore = [required(), minValue(0), maxValue(1)];

// LISTA SIMPLE
export const ScenarioList = () => (
    <List title="Biblioteca de Escenarios">
        <Datagrid rowClick="edit">
            <TextField source="title" label="Título del Escenario" />
            <TextField source="description" label="Descripción" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

// COMPONENTE DE FORMULARIO (Reutilizable para Create y Edit)
const ScenarioForm = () => (
    <TabbedForm>
        {/* PESTAÑA 1: GENERAL */}
        <FormTab label="General">
            <TextInput source="title" label="Título del Escenario" fullWidth validate={validateRequired} />
            <TextInput source="description" label="Descripción Contextual" multiline fullWidth rows={3} />
        </FormTab>

        {/* PESTAÑA 2: CONSUMIDOR */}
        <FormTab label="Consumidor">
            <TextInput source="consumer.name" label="Nombre del Arquetipo" />
            <NumberInput source="consumer.age" label="Edad" />
            <NumberInput source="consumer.budget" label="Presupuesto Inicial ($)" />
            <NumberInput 
                source="consumer.targetAcceptanceScore" 
                label="Meta de Aceptación (0.0 a 1.0)" 
                step={0.05} 
                validate={validateScore} 
                helperText="Ej: 0.8 significa que se requiere un 80% de aceptación para ganar."
            />
        </FormTab>

        {/* PESTAÑA 3: DIMENSIONES*/}
        <FormTab label="Dimensiones">
            <ArrayInput source="dimensions" label="Dimensiones del Mercado">
                <SimpleFormIterator inline>
                    <TextInput source="name" label="Nombre (ej: Precio, Calidad)" validate={validateRequired} />
                    <NumberInput source="consumerExpectation" label="Expectativa Consumidor (0-1)" step={0.1} validate={validateScore} />
                    <NumberInput source="productInitialOffer" label="Oferta Inicial Producto (0-1)" step={0.1} validate={validateScore} />
                </SimpleFormIterator>
            </ArrayInput>
        </FormTab>

        {/* PESTAÑA 4: ACCIONES */}
        <FormTab label="Acciones Disponibles">
            <ArrayInput source="actions" label="Catálogo de Acciones">
                <SimpleFormIterator>
                    <TextInput source="name" label="Nombre de la Acción" validate={validateRequired} />
                    <SelectInput source="category" label="Categoría (4P)" choices={[
                        { id: 'PRODUCTION', name: 'Producto' },
                        { id: 'PRICE', name: 'Precio' },
                        { id: 'PLACEMENT', name: 'Plaza' },
                        { id: 'PROMOTION', name: 'Promoción' },
                        { id: 'RESEARCH', name: 'Investigación' },
                    ]} />
                    <NumberInput source="cost" label="Costo ($)" validate={validateRequired} />
                    
                    {/* ANIDACIÓN: Efectos dentro de Acciones */}
                    <ArrayInput source="effects" label="Efectos en Dimensiones">
                        <SimpleFormIterator inline>
                            <TextInput source="dimensionName" label="Nombre Dimensión Exacto" helperText="Debe coincidir con una dimensión creada" />
                            <NumberInput source="delta" label="Impacto (-1.0 a 1.0)" step={0.05} />
                        </SimpleFormIterator>
                    </ArrayInput>

                </SimpleFormIterator>
            </ArrayInput>
        </FormTab>
    </TabbedForm>
);

// VISTAS
export const ScenarioCreate = () => (
    <Create title="Diseñar Nuevo Escenario" redirect="list">
        <ScenarioForm />
    </Create>
);

const ScenarioTitle = () => {
    const record = useRecordContext();
    return <span>Escenario: {record ? record.title : ''}</span>;
};

export const ScenarioEdit = () => (
    <Edit title={<ScenarioTitle />}>
        <ScenarioForm />
    </Edit>
);