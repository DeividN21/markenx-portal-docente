import { List, Datagrid, TextField, DateField, EditButton, FunctionField } from 'react-admin';
import { Chip } from '@mui/material';
import type { Term } from '../types/term.types';
import { TERM_STATUS_COLORS } from '../types/term.types';
import { canEdit } from '../utils/term.utils';

/**
 * Componente de lista de períodos académicos
 */
export const TermList = () => (
  <List
    title="Períodos Académicos"
    sort={{ field: 'startDate', order: 'DESC' }}
    perPage={25}
  >
    <Datagrid rowClick={false} bulkActionButtons={false}>
      <TextField source="label" label="Período" sortable={false} />
      <DateField
        source="startDate"
        label="Fecha de inicio"
        locales="en-US"
        options={{ year: 'numeric', month: '2-digit', day: '2-digit' }}
        sortable={false}
      />
      <DateField
        source="endDate"
        label="Fecha de fin"
        locales="en-US"
        options={{ year: 'numeric', month: '2-digit', day: '2-digit' }}
        sortable={false}
      />
      <FunctionField
        label="Estado"
        sortable={false}
        render={(record: Term) => (
          <Chip
            label={record.status.label}
            color={TERM_STATUS_COLORS[record.status.code]}
            size="small"
          />
        )}
      />
      <FunctionField
        label="Acciones"
        sortable={false}
        render={(record: Term) => (
          canEdit(record) ? <EditButton /> : null
        )}
      />
    </Datagrid>
  </List>
);
