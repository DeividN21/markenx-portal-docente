import { List, Datagrid, TextField, DateField, EditButton, FunctionField } from 'react-admin';
import { Chip } from '@mui/material';
import type { Term } from '../types/term.types';
import { TERM_STATUS_LABELS, TERM_STATUS_COLORS } from '../types/term.types';

/**
 * Componente de lista de períodos académicos
 */
export const TermList = () => (
  <List
    title="Períodos Académicos"
    sort={{ field: 'startDate', order: 'DESC' }}
    perPage={25}
  >
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="name" label="Nombre del Período" />
      <DateField source="startDate" label="Fecha Inicio" />
      <DateField source="endDate" label="Fecha Fin" />
      <FunctionField
        label="Estado"
        render={(record: Term) => (
          <Chip
            label={TERM_STATUS_LABELS[record.status]}
            color={TERM_STATUS_COLORS[record.status]}
            size="small"
          />
        )}
      />
      <EditButton />
    </Datagrid>
  </List>
);
