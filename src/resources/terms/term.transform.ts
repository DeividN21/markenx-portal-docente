import type {Term} from "./term.types.ts";

const safeInt = (value: any): number =>
    Number.isNaN(Number(value)) ? 0 : Number(value);

const transformTerm = (
    data: Partial<Term>
): Partial<Term> => ({
    ...data,
    academicYear: safeInt(data.academicYear),
    sequence: safeInt(data.sequence),
    status: data.status ?? 'UPCOMING',
});

export { transformTerm }