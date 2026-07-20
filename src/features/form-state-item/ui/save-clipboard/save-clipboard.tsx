import {Button, Flex, Input} from "antd";
import {CloseOutlined, CopyOutlined} from "@ant-design/icons";
import {useClipboard} from "@/share/hooks/use-clipboard";

interface IProps {
  value: string;
  onClose: () => void;
}

export default function SaveClipboard(props: IProps) {
  const {copy} = useClipboard();

  return (
    <Flex vertical gap="medium">
      <Input.TextArea value={props.value} autoSize readOnly/>
      <Button type="primary" icon={<CopyOutlined/>} onClick={() => copy(props.value)}>
        Copy
      </Button>
      <Button block onClick={props.onClose} icon={<CloseOutlined/>}>
        Close
      </Button>
    </Flex>
  );
}