export enum EColors {
    success = 'success',
    error = 'error'
}

export enum ENotificationLevel {
    success,
    error
}

export interface INotifier {
    isVisible: boolean;
    color: EColors;
    icon: string;
    title: string;
    message: string;
    multiLine: boolean;
    timeout: number;

    show(notificationLevel: ENotificationLevel, message: string): void;
}