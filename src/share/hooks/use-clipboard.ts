import {App} from "antd";

export function useClipboard() {
  const {notification} = App.useApp();

  const copy = (text: string, successMessage = "Text copied to clipboard") => {
    if (!window.isSecureContext) {
      notification.error({
        title: "Error",
        description: "Unsecure context",
      });
      return;
    }

    navigator.clipboard.writeText(text).then(() => {
      notification.success({
        title: "Success",
        description: successMessage,
      });
    });
  };

  return {copy};
}