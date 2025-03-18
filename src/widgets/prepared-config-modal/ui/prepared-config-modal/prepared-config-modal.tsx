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
    setCommand(() => ({isLoading: true, command: "", error: null}));

    const data = {
      content: config
    };

    axios.post("https://cors-proxy.navatuseinlab.uk/proxy?url=https%3A%2F%2Fpasty.lus.pm%2Fapi%2Fv2%2Fpastes", data)
      .then(result => {
        setCommand(() => ({
          isLoading: false,
          command: `wget -fq https://pasty.lus.pm/${result.data.id}/raw config.lua`,
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
            <p className="text-muted text-center">
              <small>
                If Generate download command doesn't work, create an issue or ping @navatusein in the official GTNH
                Discord server
              </small>
            </p>
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