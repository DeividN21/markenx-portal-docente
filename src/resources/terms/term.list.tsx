import {ChipField, Datagrid, DateField, EditButton, List, TextField} from "react-admin";

const TermList = () => (
    <List title="Periodos Académicos">
        <Datagrid rowClick="edit">
            <TextField source="name" label="Periodo" />
            <DateField source="startDate" />
            <DateField source="endDate" />
            <ChipField source="status" />
            <EditButton />
        </Datagrid>
    </List>
);

export { TermList }