import {Alert, Button, Flex, Modal, Typography} from "antd";
import {type Dispatch, type SetStateAction, useState, type MouseEvent} from "react";
import {CollapsibleCard} from "@/features/collapsible-card";
import {SyntaxHighlighter} from "@/features/syntax-highlighter";
import {Fetcher} from "@/features/fetcher";
import {CloseOutlined, CloudDownloadOutlined, CodeOutlined, CopyOutlined} from "@ant-design/icons";
import {useClipboard} from "@/share/hooks/use-clipboard";

interface IProps {
  config: string|undefined;
  setConfig: Dispatch<SetStateAction<string|undefined>>;
}

export default function ConfigModal(props: IProps) {
  const {copy} = useClipboard();

  const [command, setCommand] = useState({
    isLoading: false,
    command: "",
    error: null
  });

  const close = () => {
    props.setConfig(() => undefined);

    setCommand({
      isLoading: false,
      command: "",
      error: null
    });
  }

  const exportConfig = (event: MouseEvent, config: string) => {
    event.preventDefault();
    event.stopPropagation();

    const blob = new Blob([config], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.download = "config.lua";
    link.href = url;
    link.click();
  }

  const generateCommand = (config: string) => {
    setCommand(() => ({isLoading: true, command: "", error: null}));

    fetch("https://cloudflare-cors-anywhere.boghdan-kutsulima.workers.dev/?https://xi.pe/", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain"
      },
      body: config
    })
      .then(response => {
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        return response.text();
      })
      .then(text => {
        setCommand(() => ({
          isLoading: false,
          command: `wget -fq ${text.trim()}?raw config.lua`,
          error: null
        }));
      })
      .catch(error => {
        setCommand(() => ({isLoading: false, command: "", error: error.toString()}));
        console.log("error", error);
      });
  }

  return (
    <Modal
      title="Generated config"
      open={props.config != undefined}
      onCancel={close}
      width={1000}
      centered
      footer={[
        <Button key="close" type="primary" onClick={close} icon={<CloseOutlined/>}>
          Close
        </Button>
      ]}
    >
      <Flex vertical gap="medium">
        <CollapsibleCard label="Config file" defaultOpen={false}>
          <SyntaxHighlighter text={props.config ?? ""} language="lua"/>
        </CollapsibleCard>

        <Button
          type="default"
          style={{fontSize: 14}}
          onClick={(event) => {exportConfig(event, props.config ?? "")}}
          icon={<CloudDownloadOutlined/>}
        >
          Download config file
        </Button>

        <Button
          type="primary"
          style={{fontSize: 14}}
          onClick={() => {generateCommand(props.config ?? "")}}
          icon={<CodeOutlined/>}
        >
          Generate download command
        </Button>

        <Typography.Paragraph type="secondary">
           If Generate download command doesn't work, create an issue or ping @navatusein in the official GTNH Discord server
        </Typography.Paragraph>

        <Fetcher
          isLoading={command.isLoading}
          error={command.error}
          canShow={command.command != ""}
          loadingText="Command loading..."
          size="medium"
        >
          <Alert
            title={command.command}
            action={
              <Button
                size="small"
                color="primary"
                variant="outlined"
                icon={<CopyOutlined/>}
                onClick={() => copy(command.command ?? "", "Command copied to clipboard")}
              />
            }
          />
        </Fetcher>
      </Flex>
    </Modal>
  )
}
