
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