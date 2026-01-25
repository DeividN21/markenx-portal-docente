import {useNotify, useRecordContext, useRefresh} from "react-admin";
import type {Term} from "./term.types.ts";
import {Button} from "@mui/material";
import {changeTermStatus} from "./term.actions.ts";

const ChangeStatusButton = () => {
    const record = useRecordContext<Term>();
    const notify = useNotify();
    const refresh = useRefresh();

    if (!record) return null;

    const nextStatus =
        record.status === 'UPCOMING'
            ? 'ACTIVE'
            : record.status === 'ACTIVE'
                ? 'DISABLED'
                : null;

    if (!nextStatus) return null;

    const handleClick = async () => {
        try {
            await changeTermStatus(record.id, nextStatus);
            notify('Estado actualizado', { type: 'success' });
            refresh();
        } catch (e: any) {
            notify(e.message, { type: 'error' });
        }
    };

    return (
        <Button onClick={handleClick}>
            Cambiar Estado
        </Button>
    );
};

export { ChangeStatusButton }
