import {Create, SimpleForm} from "react-admin";
import {TermForm} from "./term.form.tsx";
import {transformTerm} from "./term.transform.ts";

const TermCreate = () => (
    <Create transform={transformTerm} redirect="list">
        <SimpleForm>
            <TermForm />
        </SimpleForm>
    </Create>
);

export { TermCreate }