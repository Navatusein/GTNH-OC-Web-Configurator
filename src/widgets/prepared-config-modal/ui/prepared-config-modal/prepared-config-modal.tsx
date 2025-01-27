import {Dispatch, FC, MouseEvent, SetStateAction, useState} from "react";
import {Button, Col, Modal, Row} from "react-bootstrap";
import {ConfigHighlighter} from "@/features/config-highlighter";
import axios from "axios";
import {Fetcher} from "@/features/fetcher";
import {CopyableAlert} from "@/features/copyable-alert";
import {CollapsibleCard} from "@/features/collapsible-card";

interface IProps {
  config: string;
  setConfig: Dispatch<SetStateAction<string>>;
}

const PreparedConfigModal: FC<IProps> = (props) => {
  const [command, setCommand] = useState({
    isLoading: false,
    command: "",
    error: null
  });

  const close = () => {
    props.setConfig(() => "");
  }

  const exportConfig = (event: MouseEvent, config: string) => {
    event.preventDefault();
    event.stopPropagation();

    const blob = new Blob([config], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.download = "config.lua";
    link.href = url;
    link.click();
  }

  const generateCommand = (config: string) => {
    const data = new FormData();

    data.append("title", "config-"+Date.now().toString());
    data.append("format", "lua");
    data.append("submit", "Paste");
    data.append("paste_data", config);
    data.append("paste_expire_date", "1D");
    data.append("visibility", "1");
    data.append("pass", "");

    setCommand(() => ({isLoading: true, command: "", error: null}));

    axios.post("https://cors-proxy.navatuseinlab.uk/?url=" + encodeURIComponent("https://paste-bin.xyz/index.php"), data)
      .then(result => {
        setCommand(() => ({
          isLoading: false,
          command: `wget -fq https://paste-bin.xyz/raw/${result.headers["location"]} config.lua`,
          error: null
        }));
      })
      .catch(error => {
        setCommand(() => ({isLoading: false, command: "", error: error.toString()}));
        console.log("error", error);
      });
  }

  return (
    <Modal show={props.config != ""} onHide={close} centered size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Prepared config</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col className="d-flex flex-column gap-3">
          <Row>
            <CollapsibleCard title="Config file" defaultOpen={false}>
              <ConfigHighlighter config={props.config}/>
            </CollapsibleCard>
          </Row>

          <Row className="mx-0">
            <Button variant="secondary" onClick={(event) => exportConfig(event, props.config)}>
              Download config file
            </Button>
          </Row>

          <Row className="mx-0">
            <Button variant="primary" onClick={() => generateCommand(props.config)}>
              Generate download command
            </Button>
          </Row>

          <Row className="mx-0">
            <Fetcher isLoading={command.isLoading} error={command.error} canShow={command.command != ""}>
              <CopyableAlert variant="primary">
                {command.command}
              </CopyableAlert>
            </Fetcher>
          </Row>
        </Col>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={close}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PreparedConfigModal;