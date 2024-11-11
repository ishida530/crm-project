
export interface User {
    id: number;
    email: string;
    name: string;
    phoneNumber: string;
    role: string;
};
export type RegisterUser = Omit<User, "id">

interface Authority {
    authority: string;
}

export type ResponseRegisterUser = {
    password: string;
    phoneNumber: string | null;
    enabled: boolean;
    authorities: Authority[];
    username: string;
    accountNonLocked: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
} & User

export type UpdateUserResponse = {
    statusCode: number;
    message: string;
    user: ResponseRegisterUser;
}

export type DeleteUserResponse = {
    statusCode: number,
    message: string
}

export enum UserRole {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    EMPLOYEE = "EMPLOYEE",
    INVOICE_CLERK = "INVOICE_CLERK",
}
export const userRoles = [
    { role: UserRole.ADMIN, title: "Administrator" },
    { role: UserRole.MANAGER, title: "Menadżer" },
    { role: UserRole.EMPLOYEE, title: "Pracownik" },
    { role: UserRole.INVOICE_CLERK, title: "Księgowy" },
];
export type UserListResponse = {
    statusCode: number;
    message: string;
    userList: User[];
};