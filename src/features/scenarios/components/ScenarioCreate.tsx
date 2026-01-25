import React from 'react';
import { Create } from 'react-admin';
import { ScenarioForm } from './ScenarioForm';

/**
 * Scenario creation component
 */
export const ScenarioCreate: React.FC = () => {
  return (
    <Create title="Diseñar Nuevo Escenario" redirect="list">
      <ScenarioForm />
    </Create>
  );
};
