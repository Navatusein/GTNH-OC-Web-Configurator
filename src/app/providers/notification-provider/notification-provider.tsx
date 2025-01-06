import {INotificationOptions, NotificationContext} from "@/share/context/notification-context";
import {FC, ReactNode, useState} from "react";
import {INotification, Notification} from "@/features/notification";

interface IProps {
  children?: ReactNode;
}

const NotificationProvider: FC<IProps> = (props) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const showNotification = (text: string, options?: INotificationOptions) => {
    const id = Math.random().toString(36);

    setNotifications((prevState) => {
      const newState = [...prevState, {
        message: text,
        variant: options?.variant ?? "info",
        id: id,
        visible: true
      }];

      setTimeout(() => {
        setNotifications((prevState) => [...prevState.filter(x => x.id != id)]);
      }, 2000);

      return newState;
    });
  }

  return (
    <NotificationContext.Provider value={{showNotification}}>
      <Notification notifications={notifications} setNotifications={setNotifications}/>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;