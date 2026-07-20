import {App, Button, Dropdown, Flex, Form, type MenuProps, Modal, Tag, Typography} from "antd";
import {decodeFormState, encodeFormState} from "@/share/helpers/form-string-helper";
import {downloadTextFile, pickTextFile} from "@/share/helpers/file-helper";
import {
  GlobalOutlined,
  FileOutlined,
  ContainerOutlined,
  DownloadOutlined,
  UploadOutlined
} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {CollapsibleCard} from "@/features/collapsible-card";
import SaveBrowserForm from "../save-browser-form/save-browser-form";
import LoadBrowserTable from "../load-browser-table/load-browser-table";
import SaveClipboard from "../save-clipboard/save-clipboard";
import LoadClipboardForm from "../load-clipboard-form/load-clipboard-form";

const STORAGE_PREFIX = "form-state:";
const FILE_EXTENSION = "oc";

const SAVE_TO_ITEMS: MenuProps["items"] = [
  {
    label: "To Browser",
    key: "browser",
    icon: <GlobalOutlined/>
  },
  {
    label: "To Clipboard",
    key: "clipboard",
    icon: <ContainerOutlined/>
  },
  {
    label: "To File",
    key: "file",
    icon: <FileOutlined/>
  }
];

const LOAD_FROM_ITEMS: MenuProps["items"] = [
  {
    label: "From Browser",
    key: "browser",
    icon: <GlobalOutlined/>
  },
  {
    label: "From Clipboard",
    key: "clipboard",
    icon: <ContainerOutlined/>
  },
  {
    label: "From File",
    key: "file",
    icon: <FileOutlined/>
  }
];

const MODAL_TITLE: Record<string, string> = {
  ["save-browser"]: "Save to browser",
  ["load-browser"]: "Load from browser",
  ["save-clipboard"]: "Save to clipboard",
  ["load-clipboard"]: "Load from clipboard",
}

interface IProps {
  formKey: string;
}

export default function FormStateItem(props: IProps) {
  const form = Form.useFormInstance();
  const {notification} = App.useApp();

  const storageKey = STORAGE_PREFIX + props.formKey;

  const [mode, setMode] = useState("");

  const values = Form.useWatch((state) => state, form);

  useEffect(() => {
    if (!props.formKey)
      return;

    const saved = localStorage.getItem(storageKey);

    if (!saved)
      return;

    try {
      form.setFieldsValue(decodeFormState(saved));
    }
    catch {
      localStorage.removeItem(storageKey);
    }
  }, []);

  useEffect(() => {
    if (!props.formKey || values === undefined)
      return;

    localStorage.setItem(storageKey, encodeFormState(values));
  }, [props.formKey, storageKey, values]);

  const closeModal = () => {
    setMode("");
  }

  const saveToFile = () => {
    downloadTextFile(`${props.formKey}.${FILE_EXTENSION}`, encodeFormState(form.getFieldsValue(true)));
  };

  const loadFromFile = async () => {
    const content = await pickTextFile(`.${FILE_EXTENSION}`);

    if (!content)
      return;

    try {
      form.setFieldsValue(decodeFormState(content));
    }
    catch {
      notification.error({
        title: "Failed to load form state",
        description: "The selected file is not a valid form state file."
      });
    }
  };

  const onSaveClick: MenuProps["onClick"] = ({key}) => {
    switch (key) {
      case "file":
        saveToFile();
        break;
      case "browser":
        setMode("save-browser");
        break;
      case "clipboard":
        setMode("save-clipboard");
        break;
    }
  };

  const onLoadClick: MenuProps["onClick"] = ({key}) => {
    switch (key) {
      case "file":
        void loadFromFile();
        break;
      case "browser":
        setMode("load-browser");
        break;
      case "clipboard":
        setMode("load-clipboard");
        break;
    }
  };

  return (
    <>
      <CollapsibleCard defaultOpen label="Form State">
        <Typography.Paragraph>
          Your progress is saved automatically in this browser. Use <Tag color="blue">Save</Tag> to
          export the current form state to the browser, your clipboard, or a file, and{" "}
          <Tag color="blue">Load</Tag> to restore it later — or transfer it to another device.
        </Typography.Paragraph>
        <Flex gap="medium">
          <Dropdown menu={{items: SAVE_TO_ITEMS, onClick: onSaveClick}} placement="bottomRight">
            <Button block type="primary" icon={<DownloadOutlined/>}>
              Save
            </Button>
          </Dropdown>
          <Dropdown menu={{items: LOAD_FROM_ITEMS, onClick: onLoadClick}} placement="bottomRight">
            <Button block type="primary" icon={<UploadOutlined/>}>
              Load
            </Button>
          </Dropdown>
        </Flex>
      </CollapsibleCard>
      <Modal
        open={mode != ""}
        title={mode != "" ? MODAL_TITLE[mode] : undefined}
        onCancel={closeModal}
        footer={null}
      >
        {mode == "save-browser" && (
          <SaveBrowserForm
            form={form}
            formKey={props.formKey}
            onClose={closeModal}
          />
        )}
        {mode == "load-browser" && (
          <LoadBrowserTable
            form={form}
            formKey={props.formKey}
            onClose={closeModal}
          />
        )}
        {mode == "save-clipboard" && (
          <SaveClipboard
            value={encodeFormState(form.getFieldsValue(true))}
            onClose={closeModal}
          />
        )}
        {mode == "load-clipboard" && (
          <LoadClipboardForm
            form={form}
            onClose={closeModal}
          />
        )}
      </Modal>
    </>
  )
}