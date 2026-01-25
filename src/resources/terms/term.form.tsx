import {
    TextInput,
    NumberInput,
    DateInput,
    required,
    ChipField
} from 'react-admin';

const TermForm = () => (
    <>
        <TextInput source="name" label="Nombre" fullWidth validate={required()}/>
        <NumberInput source="academicYear" label="Año" validate={required()}/>
        <NumberInput source="sequence" label="Secuencia" validate={required()}/>
        <DateInput source="startDate" label="Fecha Inicio" validate={required()}/>
        <DateInput source="endDate" label="Fecha Fin" validate={required()}/>
        <ChipField source="status" label="Estado"/>
    </>
);

export { TermForm }