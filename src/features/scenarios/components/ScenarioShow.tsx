import { 
  Show, 
  SimpleShowLayout, 
  TextField,
  ArrayField,
  Datagrid,
  NumberField,
  useRecordContext
} from 'react-admin';
import { Typography, Box, Divider, Card, CardContent } from '@mui/material';
import type { ScenarioDetail } from '../types/scenario.types';

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
 * Scenario show component
 * Displays scenario configuration in read-only mode
 */
export const ScenarioShow = () => {
  return (
    <Show title={<ScenarioTitle />}>
      <SimpleShowLayout>
        <TextField source="title" label="Título" />
        <TextField source="description" label="Descripción" />

        <Divider sx={{ my: 3 }} />

        <ConsumerSection />

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
          Dimensiones del Mercado
        </Typography>
        <ArrayField source="dimensions" label={false}>
          <Datagrid bulkActionButtons={false}>
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

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
          Acciones Disponibles
        </Typography>
        <ArrayField source="actions" label={false}>
          <Datagrid bulkActionButtons={false}>
            <TextField source="name" label="Nombre" />
            <TextField source="description" label="Descripción" />
            <NumberField 
              source="cost" 
              label="Costo" 
              options={{ style: 'currency', currency: 'USD' }}
            />
            <TextField source="category" label="Categoría" />
          </Datagrid>
        </ArrayField>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
          Eventos del Mercado
        </Typography>
        <ArrayField source="events" label={false}>
          <Datagrid bulkActionButtons={false}>
            <TextField source="title" label="Título" />
            <TextField source="description" label="Descripción" />
          </Datagrid>
        </ArrayField>
      </SimpleShowLayout>
    </Show>
  );
};
