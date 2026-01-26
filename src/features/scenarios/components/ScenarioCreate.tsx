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
  const { reset } = useFormContext();
  
  const handleApplyTemplate = () => {
    reset(scenarioTemplate);
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

  return (
    <Create 
      title="Diseñar Nuevo Escenario" 
      redirect="list"
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
