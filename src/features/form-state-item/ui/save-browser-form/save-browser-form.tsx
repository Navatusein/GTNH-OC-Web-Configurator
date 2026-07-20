import {App, Button, Flex, Form, type FormInstance, Input} from "antd";
import {CloseOutlined, SaveOutlined} from "@ant-design/icons";
import {encodeFormState} from "@/share/helpers/form-string-helper";
import {addBrowserSave} from "@/features/form-state-item/helpers/browser-saves";

interface IProps {
  form: FormInstance;
  formKey: string;
  onClose: () => void;
}

export default function SaveBrowserForm(props: IProps) {
  const {notification} = App.useApp();

  const onFinish = ({name}: {name: string}) => {
    addBrowserSave(props.formKey, name, encodeFormState(props.form.getFieldsValue(true)));
    props.onClose();

    notification.success({
      title: "Saved to browser",
      description: `Form state "${name}" has been saved.`
    });
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Save name"
        extra="A label to help you recognize this state later."
        required
        rules={[
          {required: true, message: "Please enter a name"}
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item style={{marginBottom: 0}}>
        <Flex gap="small">
          <Button block onClick={props.onClose} icon={<CloseOutlined/>}>
            Cancel
          </Button>
          <Button block type="primary" htmlType="submit" icon={<SaveOutlined/>}>
            Save
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
}