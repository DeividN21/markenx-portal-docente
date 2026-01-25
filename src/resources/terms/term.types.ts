type TermStatus =
    | 'UPCOMING'
    | 'ACTIVE'
    | 'ENDED'
    | 'DISABLED';

interface Term {
    id: number;
    name: string;
    academicYear: number;
    sequence: number;
    startDate: string;
    endDate: string;
    status: TermStatus;
}

export type { TermStatus, Term }