import { 
  List, 
  Datagrid, 
  TextField, 
  EmailField,
  EditButton,
  FunctionField
} from 'react-admin';

/**
 * Student list component
 * Displays all students
 */
export const StudentList = () => (
  <List
    title="Estudiantes"
    sort={{ field: 'fullName', order: 'ASC' }}
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
      <TextField source="fullName" label="Nombre Completo" sortable={false} />
      <EmailField source="email" label="Email" sortable={false} />
      <FunctionField
        label="Acciones"
        sortable={false}
        render={() => <EditButton />}
      />
    </Datagrid>
  </List>
);
