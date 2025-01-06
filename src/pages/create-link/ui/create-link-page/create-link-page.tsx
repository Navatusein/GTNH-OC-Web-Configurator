import {FC, FormEvent, useState} from "react";
import {Button, Card, Form} from "react-bootstrap";
import {CopyableAlert} from "@/features/copyable-alert";

const CreateLinkPage: FC = () => {
  const [descriptorLink, setDescriptorLink] = useState("");
  const [resultLink, setResultLink] = useState("")

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setResultLink(() => "http://192.168.1.100:3000/GTNH-OC-Web-Configurator/#/configurator?url=" + encodeURIComponent(descriptorLink))
  }

  return (
    <Form onSubmit={onSubmit} autoComplete="off" className="p-0">
      <Card className="p-3 mb-3">
        <Form.Group controlId="link" className="mb-3">
          <Form.Label>Config descriptor link</Form.Label>
          <Form.Control
            type="text"
            value={descriptorLink}
            onChange={(event) => setDescriptorLink(event.target.value)}
          />
          <Form.Text className="text-muted">
            Link to config descriptor
          </Form.Text>
        </Form.Group>
        <div className="d-grid gap-2">
          <Button type="submit">Generate link</Button>
        </div>
        {resultLink != "" &&
          <CopyableAlert className="mt-3">{resultLink}</CopyableAlert>
        }
      </Card>
    </Form>
  );
};

export default CreateLinkPage;