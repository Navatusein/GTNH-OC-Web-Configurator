export interface INotification {
  message: string;
  variant: "primary"|"secondary"|"success"|"danger"|"warning"|"info"|"light"|"dark";
  id: string;
  visible: boolean;
}