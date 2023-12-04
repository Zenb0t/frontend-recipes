export interface UserModel {
    _id?: string;
    name: string;
    email: string;
    userName: string;
    email_verified: boolean;
    phone_number?: string;
    phone_number_verified?: boolean;
    role: string;
}