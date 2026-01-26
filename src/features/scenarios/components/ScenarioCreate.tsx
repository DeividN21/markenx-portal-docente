import { Create, useNotify, Toolbar, SaveButton, Button } from 'react-admin';
import { useFormContext } from 'react-hook-form';
import { AutoFixHigh as TemplateIcon } from '@mui/icons-material';
import { ScenarioForm } from './ScenarioForm';
import { scenarioTemplate } from '../utils/scenarioTemplate';

/**
 * Custom toolbar with template button
 */
const ScenarioCreateToolbar = (props: any) => {
  const notify = useNotify();
  const { setValue } = useFormContext();
  
  const handleApplyTemplate = () => {
    // Apply all template values using setValue to mark form as dirty
    Object.entries(scenarioTemplate).forEach(([key, value]) => {
      setValue(key, value, { shouldDirty: true, shouldValidate: true });
    });
    notify('Plantilla aplicada correctamente. Revise las pestañas para ver los datos cargados.', { type: 'success' });
  };

  return (
    <Toolbar {...props}>
      <SaveButton />
      <Button
        label="Aplicar Plantilla"
        onClick={handleApplyTemplate}
        startIcon={<TemplateIcon />}
        variant="outlined"
        sx={{ ml: 2 }}
      />
    </Toolbar>
  );
};

/**
 * Scenario creation component
 */
export const ScenarioCreate = () => {
  const notify = useNotify();

  // Transform data before submit
  const transform = (data: any) => {
    // Generate temporary IDs for dimensions
    const dimensions = (data.dimensions || []).map((dim: any, index: number) => ({
      ...dim,
      id: `temp_dim_${index}_${Date.now()}`
    }));

    // Generate temporary IDs for events
    const events = (data.events || []).map((event: any, index: number) => ({
      ...event,
      id: `temp_event_${index}_${Date.now()}`
    }));

    // Generate temporary ID for consumer
    const consumer = data.consumer ? {
      ...data.consumer,
      id: `temp_consumer_${Date.now()}`
    } : undefined;

    // Combine all actions from different categories into single array with temporary IDs
    const allActions = [
      ...(data.productionActions || []).map((action: any) => ({ ...action, category: 'PRODUCTION' })),
      ...(data.priceActions || []).map((action: any) => ({ ...action, category: 'PRICE' })),
      ...(data.placeActions || []).map((action: any) => ({ ...action, category: 'PLACEMENT' })),
      ...(data.promotionActions || []).map((action: any) => ({ ...action, category: 'PROMOTION' }))
    ];

    // Create a map of action names to temporary IDs
    const nameToIdMap = new Map<string, string>();
    allActions.forEach((action, index) => {
      const tempId = `temp_action_${index}_${Date.now()}`;
      nameToIdMap.set(action.name, tempId);
      action.id = tempId;
    });

    // Replace prerequisiteActionId names with their corresponding temporary IDs
    const actions = allActions.map(action => {
      if (action.prerequisiteActionId && nameToIdMap.has(action.prerequisiteActionId)) {
        return {
          ...action,
          prerequisiteActionId: nameToIdMap.get(action.prerequisiteActionId)
        };
      }
      return action;
    });

    // Remove temporary action arrays
    const { productionActions, priceActions, placeActions, promotionActions, ...rest } = data;

    return {
      ...rest,
      consumer,
      dimensions,
      events,
      actions
    };
  };

  return (
    <Create 
      title="Diseñar Nuevo Escenario" 
      redirect="list"
      transform={transform}
      mutationOptions={{
        onError: (error) => {
          const apiError = error as { body?: { userMessage?: string } };
          notify(
            apiError.body?.userMessage || 'Error al crear el escenario',
            { type: 'error' }
          );
        },
      }}
    >
      <ScenarioForm toolbar={<ScenarioCreateToolbar />} />
    </Create>
  );
};
