import React from 'react';
import { 
  List, 
  Datagrid, 
  TextField, 
  EditButton,
  DeleteButton
} from 'react-admin';

/**
 * Scenario list component
 * Displays all game scenarios
 */
export const ScenarioList: React.FC = () => {
  return (
    <List title="Biblioteca de Escenarios">
      <Datagrid rowClick="edit">
        <TextField source="name" label="Nombre" sortable={false} />
        <TextField source="description" label="Descripción" sortable={false} />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};
