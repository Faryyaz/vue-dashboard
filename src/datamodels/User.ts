export type TUser = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

export enum ERole {
    admin = 'admin',
    staff = 'staff',
    visitor = 'visitor'
}