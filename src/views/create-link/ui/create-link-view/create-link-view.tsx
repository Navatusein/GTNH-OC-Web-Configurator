import {Alert, Button, Card, Flex, Form, Input, Typography} from "antd";
import {useState} from "react";
import {CopyOutlined, FileDoneOutlined} from "@ant-design/icons";
import {useClipboard} from "@/share/hooks/use-clipboard.ts";
import {validateConfigDescriptor} from "@/entities/config-descriptor";

export default function CreateLinkView() {
  const {copy} = useClipboard();

  const [state, setState] = useState<{
    resultLink?: string;
    validationErrors?: string[];
    isValidating: boolean;
  }>({isValidating: false});

  const generateLink = async ({link}: {link: string}) => {
    setState({isValidating: true});

    try {
      const response = await fetch(link);

      if (!response.ok) {
        setState({isValidating: false, validationErrors: [`Failed to fetch descriptor (HTTP ${response.status}).`]});
        return;
      }

      const result = validateConfigDescriptor(await response.text());

      if (!result.success) {
        setState({isValidating: false, validationErrors: result.errors});
        return;
      }

      setState({
        isValidating: false,
        resultLink: `${window.location.origin}${import.meta.env.BASE_URL}#/configurator?url=${encodeURIComponent(link)}`,
      });
    }
    catch (error) {
      setState({isValidating: false, validationErrors: [`Failed to fetch descriptor: ${(error as Error).message}`]});
    }
  };

  return (
    <Card styles={{body: {padding: 16}}}>
      <Flex vertical gap="medium">
        <Typography.Title level={3} style={{marginBottom: 0}}>
          Link generation
        </Typography.Title>
        <Form onFinish={generateLink} layout="vertical">
          <Form.Item
            name="link"
            label="Config descriptor link"
            extra="Link to config descriptor"
            required
            rules={[
              {required: true, message: "Please enter a link to the config descriptor."},
            ]}
          >
            <Input.TextArea/>
          </Form.Item>
          <Form.Item
            style={{marginBottom: 0}}
          >
            <Button
              type="primary"
              htmlType="submit"
              loading={state.isValidating}
              block
              icon={<FileDoneOutlined/>}
            >
              Generate link and validate
            </Button>
          </Form.Item>
        </Form>
        {state.validationErrors && (
          <Alert
            type="error"
            showIcon
            title="Config descriptor is invalid"
            description={
              <ul style={{margin: 0, paddingLeft: 20}}>
                {state.validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            }
          />
        )}
        {state.resultLink && (
          <Alert
            title={state.resultLink}
            action={
              <Button
                size="small"
                color="primary"
                variant="outlined"
                icon={<CopyOutlined/>}
                onClick={() => copy(state.resultLink ?? "", "Link copied to clipboard")}
              />
            }
          />
        )}
      </Flex>
    </Card>
  )
}