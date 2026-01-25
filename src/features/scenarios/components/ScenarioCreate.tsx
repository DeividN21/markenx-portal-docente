import React from 'react';
import { Create, useNotify } from 'react-admin';
import { ScenarioForm } from './ScenarioForm';

/**
 * Scenario creation component
 */
export const ScenarioCreate: React.FC = () => {
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
      <ScenarioForm />
    </Create>
  );
};
