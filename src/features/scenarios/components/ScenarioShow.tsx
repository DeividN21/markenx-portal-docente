import { 
  Show, 
  SimpleShowLayout, 
  TextField,
  ArrayField,
  Datagrid,
  NumberField,
  useRecordContext,
  FunctionField
} from 'react-admin';
import { Typography, Box, Divider, Card, CardContent, Alert, Chip, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import type { ScenarioDetail } from '../types/scenario.types';

// Traducción de categorías
const CATEGORY_TRANSLATIONS: Record<string, string> = {
  PRODUCTION: 'Producto',
  DESIGN: 'Diseño',
  PRICE: 'Precio',
  PLACEMENT: 'Plaza (Distribución)',
  PROMOTION: 'Promoción',
  RESEARCH: 'Investigación'
};

/**
 * Dynamic title showing scenario name
 */
const ScenarioTitle = () => {
  const record = useRecordContext<ScenarioDetail>();
  return <span>Escenario: {record ? record.title : ''}</span>;
};

/**
 * Consumer section component
 */
const ConsumerSection = () => {
  const record = useRecordContext<ScenarioDetail>();
  const consumer = record?.consumer;

  if (!consumer) return null;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
        Consumidor Objetivo
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        <Typography variant="body2">
          El perfil del consumidor que el jugador debe satisfacer. La puntuación de aceptación objetivo es el porcentaje mínimo de compatibilidad requerido para ganar.
        </Typography>
      </Alert>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body1"><strong>Nombre:</strong> {consumer.name}</Typography>
          <Typography variant="body1"><strong>Edad:</strong> {consumer.age} años</Typography>
          <Typography variant="body1"><strong>Presupuesto:</strong> ${consumer.budget.toFixed(2)}</Typography>
          <Typography variant="body1"><strong>Puntuación de Aceptación Objetivo:</strong> {(consumer.targetAcceptanceScore * 100).toFixed(0)}%</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

/**
 * Actions section grouped by category with tabs
 */
const ActionsSection = () => {
  const record = useRecordContext<ScenarioDetail>();
  const actions = record?.actions || [];
  const [activeTab, setActiveTab] = useState(0);

  // Group actions by category
  const actionsByCategory = actions.reduce((acc, action) => {
    const category = action.category || 'OTHER';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(action);
    return acc;
  }, {} as Record<string, any[]>);

  // Get categories that have actions
  const categoriesWithActions = Object.entries(actionsByCategory);

  if (categoriesWithActions.length === 0) {
    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
          Acciones Disponibles
        </Typography>
        <Alert severity="warning">
          No hay acciones disponibles en este escenario.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
        Acciones Disponibles
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        <Typography variant="body2">
          Decisiones de marketing que el jugador puede tomar. Cada acción tiene un costo y genera efectos en las dimensiones del producto.
        </Typography>
      </Alert>
      
      <Tabs 
        value={activeTab} 
        onChange={(_, newValue) => setActiveTab(newValue)}
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
      >
        {categoriesWithActions.map(([category]) => (
          <Tab key={category} label={CATEGORY_TRANSLATIONS[category] || category} />
        ))}
      </Tabs>

      {categoriesWithActions.map(([category, categoryActions], index) => (
        activeTab === index && (
          <Box key={category}>
            <Card variant="outlined">
              <CardContent>
                {categoryActions.map((action, idx) => (
                  <Box 
                    key={idx} 
                    sx={{ 
                      mb: idx < categoryActions.length - 1 ? 2 : 0
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {action.name}
                      {action.isInitiallyLocked && (
                        <Chip label="Bloqueada" size="small" sx={{ ml: 1 }} />
                      )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {action.description}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Costo:</strong> ${action.cost.toFixed(2)}
                    </Typography>
                    {action.effects && action.effects.length > 0 && (
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        <strong>Efectos:</strong> {action.effects.length} {action.effects.length === 1 ? 'dimensión afectada' : 'dimensiones afectadas'}
                      </Typography>
                    )}
                    {action.prerequisiteActionId && (
                      <Typography variant="caption" sx={{ color: 'primary.main', mt: 1.5, display: 'block', fontWeight: 600 }}>
                        Requiere: Completar otra acción primero
                      </Typography>
                    )}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Box>
        )
      ))}
    </Box>
  );
};

/**
 * Scenario show component
 * Displays scenario configuration in read-only mode
 */
export const ScenarioShow = () => {
  return (
    <Show title={<ScenarioTitle />}>
      <SimpleShowLayout>
        <TextField source="title" label="Título" sx={{ '& .MuiTypography-root': { fontSize: '1.5rem', fontWeight: 600 } }} />
        <TextField source="description" label="Descripción" />

        <Divider sx={{ my: 3 }} />

        <ConsumerSection />

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
          Dimensiones del Mercado
        </Typography>
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            Atributos medibles que influyen en la decisión de compra del consumidor. La <strong>expectativa</strong> indica cuánto valora el consumidor cada dimensión, mientras que la <strong>oferta inicial</strong> es lo que el producto ofrece al inicio.
          </Typography>
        </Alert>
        <ArrayField source="dimensions" label={false}>
          <Datagrid bulkActionButtons={false} rowClick={false}>
            <TextField source="displayName" label="Nombre" />
            <TextField source="description" label="Descripción" />
            <NumberField 
              source="consumerExpectation" 
              label="Expectativa del Consumidor" 
              options={{ style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 0 }}
            />
            <NumberField 
              source="productInitialOffer" 
              label="Oferta Inicial del Producto" 
              options={{ style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 0 }}
            />
          </Datagrid>
        </ArrayField>

        <Divider sx={{ my: 3 }} />

        <ActionsSection />

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
          Eventos del Mercado
        </Typography>
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            Factores externos que pueden alterar temporalmente la importancia de ciertas dimensiones durante el juego (tendencias, crisis, cambios en el mercado).
          </Typography>
        </Alert>
        <ArrayField source="events" label={false}>
          <Datagrid bulkActionButtons={false} rowClick={false}>
            <TextField source="title" label="Título" />
            <TextField source="description" label="Descripción" />
            <FunctionField
              label="Efectos"
              render={(record: any) => 
                record.effects ? `${record.effects.length} ${record.effects.length === 1 ? 'dimensión afectada' : 'dimensiones afectadas'}` : '0'
              }
            />
          </Datagrid>
        </ArrayField>
      </SimpleShowLayout>
    </Show>
  );
};
