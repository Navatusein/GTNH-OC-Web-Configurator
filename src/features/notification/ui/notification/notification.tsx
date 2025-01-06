import style from "./notification.module.css"
import {Dispatch, FC, SetStateAction} from "react";
import {Alert} from "react-bootstrap";
import {INotification} from "@/features/notification";

interface IProps {
  notifications: INotification[];
  setNotifications:  Dispatch<SetStateAction<INotification[]>>
}

const Notification: FC<IProps> = (props) => {
  return (
    <div className={style.notificationContainer}>
      {props.notifications
        .filter((notification) => notification.visible)
        .map((notification) => {
          return (
            <Alert className={style.notification} key={notification.id} variant={notification.variant}>
              {notification.message}
            </Alert>
          )
        })}
    </div>
  );
};

export default Notification;