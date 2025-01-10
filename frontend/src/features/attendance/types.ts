export interface Attendance {
    user_id: number;
    user_name: string;
    attendances: {
        date: string;
        status: Status;
    }[];
}

export enum Status {
    PRESENT = "PRESENT",
    VACATION = "VACATION",
    SICK_LEAVE = "SICK_LEAVE",
    BEREAVEMENT = "BEREAVEMENT",
    ABSENT = "ABSENT"
}
