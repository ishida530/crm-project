
export type LoginCredentials = {
    email: string,
    password: string,
}

export type LoginResponseType = {
    status_code: number;
    message: string;
    token: string;
    refresh_token: string;
    expiration_time: string;
    role: string;
    user_id: string
}            