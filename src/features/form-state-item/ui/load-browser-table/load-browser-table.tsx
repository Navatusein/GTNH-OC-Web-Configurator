import {App, Button, Flex, type FormInstance, Table} from "antd";
import {CloseOutlined, DeleteOutlined} from "@ant-design/icons";
import {useState} from "react";
import {decodeFormState} from "@/share/helpers/form-string-helper";
import {getBrowserSaves, removeBrowserSave} from "@/features/form-state-item/helpers/browser-saves";

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-GB");
}

interface IProps {
  form: FormInstance;
  formKey: string;
  onClose: () => void;
}

export default function LoadBrowserTable(props: IProps) {
  const {notification} = App.useApp();

  const [saves, setSaves] = useState(() => getBrowserSaves(props.formKey));

  const loadSave = (state: string) => {
    try {
      props.form.setFieldsValue(decodeFormState(state));
      props.onClose();
    }
    catch {
      notification.error({
        title: "Failed to load form state",
        description: "The saved form state is corrupted."
      });
    }
  };

  const deleteSave = (id: string) => {
    setSaves(removeBrowserSave(props.formKey, id));
  };

  return (
    <Flex vertical gap="medium">
      <Table
        rowKey="id"
        size="small"
        pagination={false}
        locale={{emptyText: "No saved states yet"}}
        dataSource={saves}
        columns={[
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Date",
            key: "date",
            width: 84,
            render: (_, save) => formatDate(save.createdAt),
          },
          {
            title: "Action",
            key: "action",
            width: 96,
            render: (_, save) => (
              <Flex gap="small">
                <Button type="primary" size="small" onClick={() => loadSave(save.state)}>
                  Load
                </Button>
                <Button
                  size="small"
                  danger
                  icon={<DeleteOutlined/>}
                  onClick={() => deleteSave(save.id)}
                />
              </Flex>
            )
          },
        ]}
      />
      <Button block onClick={props.onClose} icon={<CloseOutlined/>}>
        Close
      </Button>
    </Flex>
  );
}