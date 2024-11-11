import { TaskStatus } from "../types";


type VariantType = 'default' | 'secondary' | 'destructive' | 'outline' | null | undefined;

interface StatusProperties {
    label: string;
    color: VariantType;
}

export const getStatusProperties = (status: TaskStatus): StatusProperties => {
    switch (status) {
        case TaskStatus.COMPLETED:
            return { label: "Zakończono", color: "default" };
        case TaskStatus.IN_PROGRESS:
            return { label: "W toku", color: "secondary" };
        case TaskStatus.TO_DO:
            return { label: "Nie rozpoczęto", color: "destructive" };
        default:
            return { label: "Nieznany", color: "outline" };
    }
}
