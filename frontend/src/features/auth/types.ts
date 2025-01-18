
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

export interface ResetPasswordRequest {
    email: string;
}

export interface ResetPasswordResponse {
    message: string;
    statusCode: number;
}
export interface ChangePasswordRequest {
    currentPassword:string,
    newPassword: string;
    confirmPassword: string;
    userId:number
}

export interface ChangePasswordResponse {
    message: string; 
}