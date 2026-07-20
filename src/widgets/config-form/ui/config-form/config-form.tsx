import type {ConfigDescriptor} from "@/entities/config-descriptor";
import {App, Button, Flex, Form} from "antd";
import {FieldsGroup, type IFieldData} from "@/entities/field-descriptor";
import {FormStateItem} from "@/features/form-state-item";
import FloatButtonGroup from "../float-button-group/float-button-group";
import {FileDoneOutlined} from "@ant-design/icons";
import InfoCard from "../info-card/info-card";

interface IProps {
  configDescriptor: ConfigDescriptor;
  onSubmit: (values: IFieldData) => void;
}

export default function ConfigForm(props: IProps) {
  const {notification} = App.useApp();
   const [form] = Form.useForm();

  const onFinish = (values: object) => {
    props.onSubmit(values as IFieldData);
  };

  const onFinishFailed = () => {
    notification.error({
      title: "Config Generation Failed",
      description: "Please check the required fields and try again.",
    });
  };

  return (
    <>
      <Flex vertical gap="medium">
        <Form layout="vertical" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Flex vertical gap="medium">
            <InfoCard configDescriptor={props.configDescriptor} />
            <FormStateItem formKey={props.configDescriptor.key}/>
            {props.configDescriptor.fieldGroups.map((group) => (
              <FieldsGroup
                key={group.key}
                name={group.key}
                label={group.name}
                defaultOpen={group.defaultOpen}
                fields={group.fields}
              />
            ))}
            <Button type="primary" htmlType="submit" icon={<FileDoneOutlined/>}>
              Generate config
            </Button>
          </Flex>
        </Form>
      </Flex>
      <FloatButtonGroup form={form}/>
    </>
  )
}
