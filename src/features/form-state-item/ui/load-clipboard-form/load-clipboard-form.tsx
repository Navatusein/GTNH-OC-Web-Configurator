import {App, Button, Flex, Form, type FormInstance, Input} from "antd";
import {CloseOutlined, UploadOutlined} from "@ant-design/icons";
import {decodeFormState} from "@/share/helpers/form-string-helper";

interface IProps {
  form: FormInstance;
  onClose: () => void;
}

export default function LoadClipboardForm(props: IProps) {
  const {notification} = App.useApp();

  const onFinish = ({data}: {data: string}) => {
    try {
      props.form.setFieldsValue(decodeFormState(data));
      props.onClose();
    }
    catch {
      notification.error({
        title: "Failed to load form state",
        description: "The provided code is not a valid form state."
      });
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="data"
        label="Form state code"
        extra="Paste the code you previously copied with Save → To Clipboard."
        required
        rules={[
          {required: true, message: "Please enter a form state code"}
        ]}
      >
        <Input.TextArea rows={5}/>
      </Form.Item>
      <Form.Item>
        <Flex gap="small">
          <Button block onClick={props.onClose} icon={<CloseOutlined/>}>
            Cancel
          </Button>
          <Button block type="primary" htmlType="submit" icon={<UploadOutlined/>}>
            Load
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
}