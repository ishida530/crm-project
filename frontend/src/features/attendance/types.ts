export interface Attendance {
    id: number;
    user_name: string;
    weekdays: string[];
}
enum Status {
    PRESENT = "PRESENT",        // Employee is present
    VACATION = "VACATION",      // Paid vacation
    SICK_LEAVE = "SICK_LEAVE",  // Sick leave
    BEREAVEMENT = "BEREAVEMENT",// Bereavement leave
    ABSENT = "ABSENT"           // Employee is absent
}
