export type TUser = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

export enum ERole {
    admin = 'admin',
    visitor = 'visitor'
}