export type TUser = {
    id: number;
    firstName: string;
    lastName: string;
    accountType: string;
}

export enum EAccountType {
    admin = 'admin',
    visitor = 'visitor'
}