import {FC, ComponentProps, useContext} from "react";
import styles from "./copyable-alert.module.css";
import {Alert, Button} from "react-bootstrap";
import {BsCopy} from "react-icons/bs";
import {NotificationContext} from "@/share/context/notification-context.ts";

interface IProps extends ComponentProps<typeof Alert>{
  children?: string;
}

const CopyableAlert: FC<IProps> = (props) => {
  const {showNotification} = useContext(NotificationContext);

  const copyText = () => {
    if (window.isSecureContext) {
      navigator.clipboard.writeText(props.children ?? "").then(() => {
        showNotification("Copied!", {variant: "success"});
      })
    }
    else {
      showNotification("Unsecure context", {variant: "danger"});
    }
  }

  return (
    <Alert {...props} className={`${styles.alert} ${props.className}`}>
      <Button variant="outline-secondary" size="sm" className={styles.copyButton} onClick={() => copyText()}>
        <BsCopy/>
      </Button>
      {props.children}
    </Alert>
  );
};

export default CopyableAlert;