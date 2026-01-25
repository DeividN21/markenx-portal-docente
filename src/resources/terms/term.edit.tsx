import {Edit, SaveButton, SimpleForm, TextInput, Toolbar} from "react-admin";
import {transformTerm} from "./term.transform.ts";
import {TermForm} from "./term.form.tsx";
import {ChangeStatusButton} from "./ChangeStatusButton.tsx";

const AcademicTermEditToolbar = () => (
    <Toolbar>
        <SaveButton />
        <ChangeStatusButton />
    </Toolbar>
);

const TermEdit = () => (
    <Edit transform={transformTerm}>
        <SimpleForm toolbar={<AcademicTermEditToolbar />}>
            <TextInput source="id" disabled />
            <TermForm />
        </SimpleForm>
    </Edit>
);

export { TermEdit }