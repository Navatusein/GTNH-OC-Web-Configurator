import {createContext} from "react";

export interface INotificationOptions {
  variant?: "primary"|"secondary"|"success"|"danger"|"warning"|"info"|"light"|"dark";
}

export interface INotificationContextProps {
  showNotification: (message: string, options?: INotificationOptions) => void;
}

export const NotificationContext = createContext<INotificationContextProps>({
  showNotification: () => {},
});