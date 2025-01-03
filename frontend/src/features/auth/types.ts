
export type LoginCredentials = {
    email: string,
    password: string,
}

export type LoginResponseType = {
    statusCode: number;
    message: string;
    token: string;
    refreshToken: string;
    expirationTime: string;
    role: string;
    user_id: string
}            