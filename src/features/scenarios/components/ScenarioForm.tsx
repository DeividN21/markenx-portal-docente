import { 
  TabbedForm, 
  FormTab,
  TextInput,
  NumberInput,
  ArrayInput,
  SimpleFormIterator,
  SelectInput,
  BooleanInput,
  required,
  minValue,
  maxValue,
  minLength,
  maxLength
} from 'react-admin';
import { Typography, Alert } from '@mui/material';

const validateRequired = [required()];
const validatePercentage = [required(), minValue(0), maxValue(1)];
const validateAcceptanceScore = [required(), minValue(0.1), maxValue(1)];
const validatePositive = [required(), minValue(0)];
const validateNotEmpty = [minLength(1, 'Debe agregar al menos un elemento')];
const validateConsumerName = [required(), maxLength(20, 'Máximo 20 caracteres')];
const validateAge = [required(), minValue(10), maxValue(100)];
const validateBudget = [required(), minValue(0), maxValue(10000)];
const validateDelta = [required(), minValue(-1), maxValue(1)];
const validateWeightMultiplier = [required(), minValue(0)];

/**
 * Convert text to snake_case
 * First removes accents/diacritics, then converts to snake_case
 */
const toSnakeCase = (text: string): string => {
  return text
    .normalize('NFD') // Descomponer caracteres con tildes
    .replace(/[\u0300-\u036f]/g, '') // Eliminar las tildes
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
};

/**
 * Scenario form component
 * Used for creating scenarios with tabs for organization
 * Follows exact API structure from CreateScenarioRequestDTO
 */
export const ScenarioForm = ({ toolbar }: { toolbar?: React.ReactElement }) => {
  return (
    <TabbedForm toolbar={toolbar}>
      {/* TAB 1: GENERAL INFO */}
      <FormTab label="1. General">
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>Información Básica del Escenario</strong><br/>
            Defina el título y descripción del escenario de juego. Este será el contexto que verán los jugadores.
          </Typography>
        </Alert>
        
        <TextInput 
          source="title" 
          label="Título del Escenario" 
          fullWidth 
          validate={validateRequired} 
          helperText="Ejemplo: 'Lanzamiento de Producto Tecnológico'"
        />
        <TextInput 
          source="description" 
          label="Descripción" 
          multiline 
          fullWidth 
          rows={3}
          validate={validateRequired}
          helperText="Explique el contexto del escenario y qué se simulará"
        />
      </FormTab>

      {/* TAB 2: CONSUMER */}
      <FormTab label="2. Consumidor">
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>Consumidor Objetivo</strong><br/>
            Define el perfil del consumidor que el jugador debe satisfacer. El <strong>Porcentaje de Aceptación</strong> es el porcentaje mínimo de compatibilidad requerido para ganar (ejemplo: 0.75 = 75%).
          </Typography>
        </Alert>
        
        <TextInput 
          source="consumer.name" 
          label="Nombre del Arquetipo" 
          fullWidth 
          validate={validateConsumerName}
          helperText="Máximo 20 caracteres. Ejemplo: 'Consumidor Tech', 'Usuario Eco'"
        />
        <NumberInput 
          source="consumer.age" 
          label="Edad"
          fullWidth
          validate={validateAge}
          min={10}
          max={100}
          helperText="Edad representativa del consumidor (10-100 años)"
        />
        <NumberInput 
          source="consumer.budget" 
          label="Presupuesto ($)"
          fullWidth
          validate={validateBudget}
          step={100}
          min={0}
          max={10000}
          helperText="Presupuesto disponible para el jugador ($0 - $10,000)"
        />
        <NumberInput 
          source="consumer.targetAcceptanceScore" 
          label="Porcentaje de Aceptación"
          fullWidth
          step={0.05}
          min={0.1}
          max={1}
          validate={validateAcceptanceScore}
          helperText="Compatibilidad mínima requerida (0.1 - 1.0). Ejemplo: 0.75 = 75%"
        />
      </FormTab>

      {/* TAB 3: DIMENSIONS */}
      <FormTab label="3. Dimensiones">
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>Dimensiones del Mercado</strong><br/>
            Las dimensiones son atributos medibles que influyen en la decisión de compra (precio, calidad, ecología, etc.).<br/>
            • <strong>Expectativa del consumidor</strong>: Cuánto valora el consumidor esta dimensión (0.0 = no importa, 1.0 = muy importante)<br/>
            • <strong>Oferta inicial del producto</strong>: Lo que el producto ofrece inicialmente en esta dimensión (0.0 = nada, 1.0 = máximo)
          </Typography>
        </Alert>
        
        <ArrayInput source="dimensions" label={false} validate={validateNotEmpty} sx={{ marginTop: 3 }}>
          <SimpleFormIterator 
            inline={false}
            disableReordering={false}
            sx={{
              '& .RaSimpleFormIterator-line': {
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                padding: 2,
                marginBottom: 2,
                backgroundColor: '#fafafa'
              },
              '& .RaSimpleFormIterator-form': {
                paddingTop: 1
              }
            }}
          >
            <TextInput 
              source="displayName" 
              label="Nombre para Mostrar" 
              fullWidth
              validate={validateRequired}
              helperText="Nombre visible para el jugador: 'Precio', 'Calidad', 'Imagen de Marca'"
              onChange={(e) => {
                const displayName = e.target.value;
                const snakeCaseName = toSnakeCase(displayName);
                // Get the form context to update the name field
                const nameInput = e.target.form?.querySelector(`input[name="${e.target.name.replace('displayName', 'name')}"]`) as HTMLInputElement;
                if (nameInput) {
                  nameInput.value = snakeCaseName;
                  nameInput.dispatchEvent(new Event('input', { bubbles: true }));
                }
              }}
            />
            <TextInput 
              source="name" 
              label="Nombre Clave" 
              sx={{ display: 'none' }}
              validate={validateRequired}
            />
            <TextInput 
              source="description" 
              label="Descripción" 
              fullWidth
              multiline
              rows={2}
              validate={validateRequired}
              helperText="Explique qué representa esta dimensión para el jugador"
            />
            <NumberInput 
              source="consumerExpectation" 
              label="Expectativa del consumidor" 
              fullWidth
              step={0.05}
              min={0}
              max={1}
              validate={validatePercentage}
              helperText="Cuánto valora el consumidor esta dimensión (0.0 - 1.0)"
            />
            <NumberInput 
              source="productInitialOffer" 
              label="Oferta inicial del producto" 
              fullWidth
              step={0.05}
              min={0}
              max={1}
              validate={validatePercentage}
              helperText="Lo que el producto ofrece al inicio en esta dimensión (0.0 - 1.0)"
            />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>

      {/* TAB 4: ACTIONS */}
      <FormTab label="4. Acciones">
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>Acciones de Marketing (4P)</strong><br/>
            Decisiones que el jugador puede tomar para modificar el producto. Cada acción tiene un costo y genera efectos (deltas) en las dimensiones.<br/>
            • <strong>delta</strong>: Cambio aplicado a la dimensión (puede ser positivo o negativo)<br/>
            • <strong>prerequisiteActionId</strong>: Acción que debe ejecutarse antes (opcional)<br/>
            • Categorías: PRICE (Precio), PROMOTION (Promoción), PRODUCTION (Producto), PLACE (Plaza)
          </Typography>
        </Alert>
        
        <ArrayInput source="actions" label="Acciones Disponibles" validate={validateNotEmpty}>
          <SimpleFormIterator>
            <TextInput 
              source="id" 
              label="ID" 
              fullWidth
              validate={validateRequired}
              helperText="UUID único para esta acción"
            />
            <TextInput 
              source="name" 
              label="Nombre de la Acción" 
              fullWidth
              validate={validateRequired}
              helperText="Nombre visible: 'Aplicar Descuento', 'Campaña en Redes Sociales'"
            />
            <TextInput 
              source="description" 
              label="Descripción" 
              fullWidth
              multiline 
              rows={2}
              validate={validateRequired}
              helperText="Explique qué hace esta acción y su efecto esperado"
            />
            <NumberInput 
              source="cost" 
              label="Costo" 
              validate={validatePositive}
              step={50}
              min={0}
              helperText="Cuánto presupuesto consume esta acción"
            />
            <SelectInput 
              source="category" 
              label="Categoría (4P)" 
              choices={[
                { id: 'PRICE', name: 'Precio - Estrategias de precios' },
                { id: 'PROMOTION', name: 'Promoción - Comunicación y publicidad' },
                { id: 'PRODUCTION', name: 'Producto - Cambios en el producto físico' },
                { id: 'PLACE', name: 'Plaza - Canales de distribución' },
              ]} 
              validate={validateRequired}
            />
            <BooleanInput 
              source="isInitiallyLocked" 
              label="¿Bloqueada Inicialmente?" 
              defaultValue={false}
              helperText="Si está bloqueada, requiere un prerequisito para desbloquearse"
            />
            <TextInput 
              source="prerequisiteActionId" 
              label="ID de Acción Prerequisito" 
              fullWidth
              helperText="(Opcional) UUID de la acción que debe ejecutarse primero"
            />
            
            <ArrayInput source="effects" label="Efectos sobre Dimensiones" validate={validateNotEmpty}>
              <SimpleFormIterator inline>
                <TextInput 
                  source="dimensionId" 
                  label="ID de Dimensión" 
                  validate={validateRequired}
                  helperText="UUID de la dimensión que se verá afectada"
                />
                <NumberInput 
                  source="delta" 
                  label="Delta (cambio)" 
                  step={0.05}
                  min={-1}
                  max={1}
                  validate={validateDelta}
                  helperText="Cambio en la dimensión (-1.0 a 1.0). Puede ser positivo o negativo"
                />
              </SimpleFormIterator>
            </ArrayInput>
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>

      {/* TAB 5: EVENTS */}
      <FormTab label="5. Eventos">
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>Eventos del Mercado</strong><br/>
            Factores externos que alteran temporalmente la importancia de ciertas dimensiones (tendencias, crisis, noticias).<br/>
            • <strong>weightMultiplier</strong>: Multiplicador de importancia (1.5 = aumenta importancia 50%, 0.8 = reduce 20%)<br/>
            • Los eventos simulan cambios en el contexto del mercado
          </Typography>
        </Alert>
        
        <ArrayInput source="events" label="Eventos Aleatorios" validate={validateNotEmpty}>
          <SimpleFormIterator>
            <TextInput 
              source="id" 
              label="ID" 
              fullWidth
              validate={validateRequired}
              helperText="UUID único para este evento"
            />
            <TextInput 
              source="title" 
              label="Título del Evento" 
              fullWidth
              validate={validateRequired}
              helperText="Nombre visible: 'Competidor lanza producto similar', 'Reseña viral positiva'"
            />
            <TextInput 
              source="description" 
              label="Descripción" 
              fullWidth
              multiline 
              rows={2}
              validate={validateRequired}
              helperText="Contexto del evento y su impacto en el mercado"
            />
            
            <ArrayInput source="effects" label="Efectos del Evento" validate={validateNotEmpty}>
              <SimpleFormIterator inline>
                <TextInput 
                  source="dimensionId" 
                  label="ID de Dimensión" 
                  validate={validateRequired}
                  helperText="UUID de la dimensión afectada"
                />
                <NumberInput 
                  source="weightMultiplier" 
                  label="Multiplicador de Importancia" 
                  step={0.1}
                  min={0}
                  validate={validateWeightMultiplier}
                  helperText="Mínimo 0. Ejemplo: 1.5 = +50% importancia, 0.8 = -20% importancia"
                />
              </SimpleFormIterator>
            </ArrayInput>
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
    </TabbedForm>
  );
};
