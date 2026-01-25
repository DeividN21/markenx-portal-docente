import React from 'react';
import { Edit, useRecordContext } from 'react-admin';
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
  return (
    <Edit title={<ScenarioTitle />}>
      <ScenarioForm />
    </Edit>
  );
};
