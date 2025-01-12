import {Dispatch, FC, SetStateAction, useContext, useEffect, useState} from "react";
import {CollapsibleCard} from "@/features/collapsible-card";
import {Button, Form, Stack} from "react-bootstrap";
import pako from "pako";
import {IFieldData} from "@/entities/config-descriptor";
import {NotificationContext} from "@/share/context/notification-context.ts";

interface IProps {
  formData: IFieldData;
  setFormData: Dispatch<SetStateAction<IFieldData>>;
}

const FormStringCard: FC<IProps> = (props) => {
  const {showNotification} = useContext(NotificationContext);
  const [encodedFormData, setEncodedFormData] = useState("");

  useEffect(() => {
    const jsonString = JSON.stringify(props.formData);
    const compressedData = pako.deflate(jsonString);
    const compressedBase64 = btoa(String.fromCharCode(...compressedData));

    setEncodedFormData(() => compressedBase64);
  }, [props.formData]);

  const copyText = (text: string) => {
    if (window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showNotification("Copied!", {variant: "success"});
      })
    }
    else {
      showNotification("Unsecure context", {variant: "danger"});
    }
  }

  const decodeFormData = () => {
    try {
      const compressedBuffer = Uint8Array.from(atob(encodedFormData), (c) => c.charCodeAt(0));
      const decompressedData = pako.inflate(compressedBuffer, { to: "string" });
      const parsedFormData = JSON.parse(decompressedData);

      if (decompressedData !== undefined)
        props.setFormData(() => parsedFormData as IFieldData);

      console.log(decompressedData)
    }
    catch (error) {
      showNotification("Invalid form string", {variant: "danger"});
      console.error(error);
    }
  }

  return (
    <CollapsibleCard className="p-0 mb-3" defaultOpen title="Form string">
      <Form.Group className="mb-3" controlId="form-string">
        <Form.Label>Form string</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={encodedFormData}
          onChange={(event) => setEncodedFormData(() => event.target.value)}
        />
        <Form.Text className="text-muted">
          You can copy this string to save the current state of the form.
          To restore the form state from a string, paste your form string into the field and click load form string.
        </Form.Text>
      </Form.Group>
      <Stack direction="horizontal" gap={3}>
        <Button className="w-100" onClick={() => copyText(encodedFormData)}>
          Copy form string
        </Button>
        <Button className="w-100" onClick={() => decodeFormData()}>
          Load form string
        </Button>
      </Stack>
    </CollapsibleCard>
  );
};

export default FormStringCard;