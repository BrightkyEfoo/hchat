export interface IUser {
    name: string;
    email: string;
    phone: string;
    password: string;
    socketId?: string;
    refreshToken?: String;
}