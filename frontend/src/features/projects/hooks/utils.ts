import { TaskStatus } from "../types";


export const getStatusProperties = (status: TaskStatus) => {
    switch (status) {
        case TaskStatus.COMPLETED:
            return { label: "Zakończono", color: "default" };
        case TaskStatus.IN_PROGRESS:
            return { label: "W toku", color: "secondary" };
        case TaskStatus.TO_DO:
            return { label: "Nie rozpoczęto", color: "outline" };
        default:
            return { label: "Nieznany", color: "default" };
    }
}
