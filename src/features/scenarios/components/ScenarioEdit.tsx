import React from 'react';
import { Edit, useRecordContext, useNotify } from 'react-admin';
import { ScenarioForm } from './ScenarioForm';
import type { Scenario } from '../types/scenario.types';

/**
 * Dynamic title showing scenario name
 */
const ScenarioTitle: React.FC = () => {
  const record = useRecordContext<Scenario>();
  return <span>Escenario: {record ? record.name : ''}</span>;
};

/**
 * Scenario edit component
 */
export const ScenarioEdit: React.FC = () => {
  const notify = useNotify();

  return (
    <Edit 
      title={<ScenarioTitle />}
      mutationMode="pessimistic"
      mutationOptions={{
        onError: (error) => {
          const apiError = error as { body?: { userMessage?: string } };
          notify(
            apiError.body?.userMessage || 'Error al actualizar el escenario',
            { type: 'error' }
          );
        },
      }}
    >
      <ScenarioForm />
    </Edit>
  );
};
