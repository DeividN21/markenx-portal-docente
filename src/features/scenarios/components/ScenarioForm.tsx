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
  maxLength,
  FormDataConsumer
} from 'react-admin';
import { Typography, Alert, Tabs, Tab, Box, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState } from 'react';

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

// Categorías 4P
const ACTION_CATEGORIES = {
  PRODUCTION: {
    key: 'PRODUCTION',
    label: 'Producto',
    description: 'Cambios en el producto físico o sus características tangibles',
    examples: 'Mejorar calidad, cambiar materiales, añadir funcionalidades'
  },
  PRICE: {
    key: 'PRICE',
    label: 'Precio',
    description: 'Estrategias de pricing y políticas de precios',
    examples: 'Descuentos, promociones, ajustes de precio, financiamiento'
  },
  PLACEMENT: {
    key: 'PLACEMENT',
    label: 'Plaza (Distribución)',
    description: 'Canales de distribución y puntos de venta',
    examples: 'Expandir canales, venta online, distribuidores, logística'
  },
  PROMOTION: {
    key: 'PROMOTION',
    label: 'Promoción (Comunicación)',
    description: 'Comunicación y publicidad del producto',
    examples: 'Campañas publicitarias, redes sociales, eventos, relaciones públicas'
  }
};

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
      <FormTab label="4. Acciones (4P)">
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>Acciones de Marketing (4P)</strong><br/>
            Decisiones que el jugador puede tomar para modificar el producto. Cada acción tiene un costo y genera efectos (deltas) en las dimensiones.<br/>
            • Debe haber <strong>al menos 1 acción por categoría</strong><br/>
            • Cada acción debe tener <strong>al menos 1 efecto</strong> sobre alguna dimensión<br/>
            • Las acciones pueden depender de otras (prerequisitos)
          </Typography>
        </Alert>

        <FormDataConsumer>
          {({ formData }) => {
            const [activeTab, setActiveTab] = useState(0);
            
            // Obtener dimensiones y acciones actuales
            const dimensions = formData.dimensions || [];
            const allActions = [
              ...(formData.productionActions || []),
              ...(formData.priceActions || []),
              ...(formData.placeActions || []),
              ...(formData.promotionActions || [])
            ];

            // Opciones de dimensiones para los selects
            const dimensionChoices = dimensions.map((dim: any, idx: number) => ({
              id: dim.name || `dimension_${idx}`,
              name: dim.displayName || dim.name || `Dimensión ${idx + 1}`
            }));

            // Opciones de acciones prerequisito
            const actionChoices = allActions.map((action: any, idx: number) => ({
              id: action.name || `action_${idx}`,
              name: action.name || `Acción ${idx + 1}`
            }));

            return (
              <Box>
                <Tabs 
                  value={activeTab} 
                  onChange={(_, newValue) => setActiveTab(newValue)}
                  sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
                >
                  <Tab label="Producto" />
                  <Tab label="Precio" />
                  <Tab label="Plaza" />
                  <Tab label="Promoción" />
                </Tabs>

                {/* PRODUCTION ACTIONS */}
                {activeTab === 0 && (
                  <Box>
                  <Alert severity="success" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      <strong>{ACTION_CATEGORIES.PRODUCTION.label}</strong><br/>
                      {ACTION_CATEGORIES.PRODUCTION.description}<br/>
                      <em>Ejemplos: {ACTION_CATEGORIES.PRODUCTION.examples}</em>
                    </Typography>
                  </Alert>
                  
                  <ArrayInput source="productionActions" label={false} validate={validateNotEmpty}>
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
                        }
                      }}
                    >
                      <TextInput 
                        source="name" 
                        label="Nombre de la Acción" 
                        fullWidth
                        validate={validateRequired}
                        helperText="Nombre descriptivo de la acción"
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
                        fullWidth
                        validate={validatePositive}
                        step={50}
                        min={0}
                        helperText="Cuánto presupuesto consume esta acción"
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <BooleanInput 
                          source="isInitiallyLocked" 
                          label="¿Bloqueada inicialmente?" 
                          defaultValue={false}
                          helperText={false}
                        />
                        <Tooltip title="Si está bloqueada, requiere un prerequisito para desbloquearse">
                          <IconButton size="small">
                            <InfoOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <FormDataConsumer>
                        {({ scopedFormData }) => {
                          const isLocked = scopedFormData?.isInitiallyLocked;
                          return isLocked ? (
                            <SelectInput 
                              source="prerequisiteActionId" 
                              label="Acción Prerequisito" 
                              fullWidth
                              choices={actionChoices}
                            />
                          ) : null;
                        }}
                      </FormDataConsumer>
                      
                      <ArrayInput source="effects" label="Efectos sobre Dimensiones" validate={validateNotEmpty} sx={{ mt: 2 }}>
                        <SimpleFormIterator inline>
                          <SelectInput 
                            source="dimensionId" 
                            label="Dimensión Afectada" 
                            choices={dimensionChoices}
                            validate={validateRequired}
                          />
                          <NumberInput 
                            source="delta" 
                            label="Delta (cambio)" 
                            step={0.05}
                            min={-1}
                            max={1}
                            validate={validateDelta}
                            helperText="Cambio: -1.0 a 1.0"
                          />
                        </SimpleFormIterator>
                      </ArrayInput>
                    </SimpleFormIterator>
                  </ArrayInput>
                  </Box>
                )}

                {/* PRICE ACTIONS */}
                {activeTab === 1 && (
                  <Box>
                  <Alert severity="success" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      <strong>{ACTION_CATEGORIES.PRICE.label}</strong><br/>
                      {ACTION_CATEGORIES.PRICE.description}<br/>
                      <em>Ejemplos: {ACTION_CATEGORIES.PRICE.examples}</em>
                    </Typography>
                  </Alert>
                  
                  <ArrayInput source="priceActions" label={false} validate={validateNotEmpty}>
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
                        }
                      }}
                    >
                      <TextInput 
                        source="name" 
                        label="Nombre de la Acción" 
                        fullWidth
                        validate={validateRequired}
                        helperText="Nombre descriptivo de la acción"
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
                        fullWidth
                        validate={validatePositive}
                        step={50}
                        min={0}
                        helperText="Cuánto presupuesto consume esta acción"
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <BooleanInput 
                          source="isInitiallyLocked" 
                          label="¿Bloqueada inicialmente?" 
                          defaultValue={false}
                          helperText={false}
                        />
                        <Tooltip title="Si está bloqueada, requiere un prerequisito para desbloquearse">
                          <IconButton size="small">
                            <InfoOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <FormDataConsumer>
                        {({ scopedFormData }) => {
                          const isLocked = scopedFormData?.isInitiallyLocked;
                          return isLocked ? (
                            <SelectInput 
                              source="prerequisiteActionId" 
                              label="Acción Prerequisito" 
                              fullWidth
                              choices={actionChoices}
                            />
                          ) : null;
                        }}
                      </FormDataConsumer>
                      
                      <ArrayInput source="effects" label="Efectos sobre Dimensiones" validate={validateNotEmpty} sx={{ mt: 2 }}>
                        <SimpleFormIterator inline>
                          <SelectInput 
                            source="dimensionId" 
                            label="Dimensión Afectada" 
                            choices={dimensionChoices}
                            validate={validateRequired}
                          />
                          <NumberInput 
                            source="delta" 
                            label="Delta (cambio)" 
                            step={0.05}
                            min={-1}
                            max={1}
                            validate={validateDelta}
                            helperText="Cambio: -1.0 a 1.0"
                          />
                        </SimpleFormIterator>
                      </ArrayInput>
                    </SimpleFormIterator>
                  </ArrayInput>
                  </Box>
                )}

                {/* PLACE ACTIONS */}
                {activeTab === 2 && (
                  <Box>
                  <Alert severity="success" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      <strong>{ACTION_CATEGORIES.PLACEMENT.label}</strong><br/>
                      {ACTION_CATEGORIES.PLACEMENT.description}<br/>
                      <em>Ejemplos: {ACTION_CATEGORIES.PLACEMENT.examples}</em>
                    </Typography>
                  </Alert>
                  
                  <ArrayInput source="placeActions" label={false} validate={validateNotEmpty}>
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
                        }
                      }}
                    >
                      <TextInput 
                        source="name" 
                        label="Nombre de la Acción" 
                        fullWidth
                        validate={validateRequired}
                        helperText="Nombre descriptivo de la acción"
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
                        fullWidth
                        validate={validatePositive}
                        step={50}
                        min={0}
                        helperText="Cuánto presupuesto consume esta acción"
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <BooleanInput 
                          source="isInitiallyLocked" 
                          label="¿Bloqueada inicialmente?" 
                          defaultValue={false}
                          helperText={false}
                        />
                        <Tooltip title="Si está bloqueada, requiere un prerequisito para desbloquearse">
                          <IconButton size="small">
                            <InfoOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <FormDataConsumer>
                        {({ scopedFormData }) => {
                          const isLocked = scopedFormData?.isInitiallyLocked;
                          return isLocked ? (
                            <SelectInput 
                              source="prerequisiteActionId" 
                              label="Acción Prerequisito" 
                              fullWidth
                              choices={actionChoices}
                            />
                          ) : null;
                        }}
                      </FormDataConsumer>
                      
                      <ArrayInput source="effects" label="Efectos sobre Dimensiones" validate={validateNotEmpty} sx={{ mt: 2 }}>
                        <SimpleFormIterator inline>
                          <SelectInput 
                            source="dimensionId" 
                            label="Dimensión Afectada" 
                            choices={dimensionChoices}
                            validate={validateRequired}
                          />
                          <NumberInput 
                            source="delta" 
                            label="Delta (cambio)" 
                            step={0.05}
                            min={-1}
                            max={1}
                            validate={validateDelta}
                            helperText="Cambio: -1.0 a 1.0"
                          />
                        </SimpleFormIterator>
                      </ArrayInput>
                    </SimpleFormIterator>
                  </ArrayInput>
                  </Box>
                )}

                {/* PROMOTION ACTIONS */}
                {activeTab === 3 && (
                  <Box>
                  <Alert severity="success" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      <strong>{ACTION_CATEGORIES.PROMOTION.label}</strong><br/>
                      {ACTION_CATEGORIES.PROMOTION.description}<br/>
                      <em>Ejemplos: {ACTION_CATEGORIES.PROMOTION.examples}</em>
                    </Typography>
                  </Alert>
                  
                  <ArrayInput source="promotionActions" label={false} validate={validateNotEmpty}>
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
                        }
                      }}
                    >
                      <TextInput 
                        source="name" 
                        label="Nombre de la Acción" 
                        fullWidth
                        validate={validateRequired}
                        helperText="Nombre descriptivo de la acción"
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
                        fullWidth
                        validate={validatePositive}
                        step={50}
                        min={0}
                        helperText="Cuánto presupuesto consume esta acción"
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <BooleanInput 
                          source="isInitiallyLocked" 
                          label="¿Bloqueada inicialmente?" 
                          defaultValue={false}
                          helperText={false}
                        />
                        <Tooltip title="Si está bloqueada, requiere un prerequisito para desbloquearse">
                          <IconButton size="small">
                            <InfoOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <FormDataConsumer>
                        {({ scopedFormData }) => {
                          const isLocked = scopedFormData?.isInitiallyLocked;
                          return isLocked ? (
                            <SelectInput 
                              source="prerequisiteActionId" 
                              label="Acción Prerequisito" 
                              fullWidth
                              choices={actionChoices}
                            />
                          ) : null;
                        }}
                      </FormDataConsumer>
                      
                      <ArrayInput source="effects" label="Efectos sobre Dimensiones" validate={validateNotEmpty} sx={{ mt: 2 }}>
                        <SimpleFormIterator inline>
                          <SelectInput 
                            source="dimensionId" 
                            label="Dimensión Afectada" 
                            choices={dimensionChoices}
                            validate={validateRequired}
                          />
                          <NumberInput 
                            source="delta" 
                            label="Delta (cambio)" 
                            step={0.05}
                            min={-1}
                            max={1}
                            validate={validateDelta}
                            helperText="Cambio: -1.0 a 1.0"
                          />
                        </SimpleFormIterator>
                      </ArrayInput>
                    </SimpleFormIterator>
                  </ArrayInput>
                  </Box>
                )}
              </Box>
            );
          }}
        </FormDataConsumer>
      </FormTab>

      {/* TAB 5: EVENTS */}
      <FormTab label="5. Eventos">
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>Eventos del Mercado</strong><br/>
            Factores externos que alteran temporalmente la importancia de ciertas dimensiones (tendencias, crisis, noticias).<br/>
            • <strong>Multiplicador de importancia</strong>: Altera el peso de una dimensión (1.5 = aumenta 50%, 0.8 = reduce 20%)<br/>
            • Los eventos simulan cambios en el contexto del mercado
          </Typography>
        </Alert>
        
        <FormDataConsumer>
          {({ formData }) => {
            const dimensionChoices = (formData.dimensions || []).map((dim: any) => ({
              id: dim.name,
              name: dim.displayName
            }));
            
            return (
              <ArrayInput source="events" label="Eventos Aleatorios" validate={validateNotEmpty}>
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
                    }
                  }}
                >
                  <TextInput 
                    source="title" 
                    label="Título del Evento" 
                    fullWidth
                    validate={validateRequired}
                    helperText="Nombre visible del evento"
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
                  
                  <ArrayInput source="effects" label="Efectos del Evento" validate={validateNotEmpty} sx={{ mt: 2 }}>
                    <SimpleFormIterator inline>
                      <SelectInput 
                        source="dimensionId" 
                        label="Dimensión Afectada" 
                        choices={dimensionChoices}
                        validate={validateRequired}
                        fullWidth
                      />
                      <NumberInput 
                        source="weightMultiplier" 
                        label="Multiplicador de Importancia" 
                        step={0.1}
                        min={0}
                        fullWidth
                        validate={validateWeightMultiplier}
                        helperText="Ejemplo: 1.5 = +50%, 0.8 = -20%"
                      />
                    </SimpleFormIterator>
                  </ArrayInput>
                </SimpleFormIterator>
              </ArrayInput>
            );
          }}
        </FormDataConsumer>
      </FormTab>
    </TabbedForm>
  );
};
