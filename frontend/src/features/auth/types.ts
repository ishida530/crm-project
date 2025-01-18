
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
    user_id: string;
    first_login:number
}

export interface ResetPasswordRequest {
    email: string;
}

export interface ResetPasswordResponse {
    message: string;
    statusCode: number;
}
export interface ChangePasswordRequest {
    current_password:string,
    new_password: string;
    confirm_password: string;
}

export interface ChangePasswordResponse {
    statusCode: number;
    message: string; 
}