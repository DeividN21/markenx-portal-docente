import { 
  List, 
  Datagrid, 
  TextField,
  ShowButton
} from 'react-admin';

/**
 * Scenario list component
 * Displays all game scenarios
 */
export const ScenarioList = () => (
  <List
    title="Biblioteca de Escenarios"
    sort={{ field: 'title', order: 'ASC' }}
    perPage={25}
  >
    <Datagrid 
      rowClick={false} 
      bulkActionButtons={false}
      sx={{
        '& .RaDatagrid-headerCell': {
          textAlign: 'center',
        },
        '& .RaDatagrid-rowCell': {
          textAlign: 'center',
        }
      }}
    >
      <TextField source="title" label="Título" sortable={false} />
      <TextField source="description" label="Descripción" sortable={false} />
      <ShowButton label="Ver" />
    </Datagrid>
  </List>
);
