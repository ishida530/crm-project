
export interface User {
    id: number;
    email: string;
    name: string;
    phoneNumber: string;
    role: string;
};

export type ResponseGetAllUsers = {
    statusCode: number;
    message: string;
    userList: User[];
};

interface Authority {
    authority: string;
}

type ResponseUser = {
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
    user: ResponseUser;
}



export type DeleteUserResponse = {
    statusCode: number,
    message: string
}