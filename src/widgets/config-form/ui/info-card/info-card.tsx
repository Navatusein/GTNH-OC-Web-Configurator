import {Alert, Card, Flex, Form, Select, Typography} from "antd";
import {createSearchParams, useNavigate} from "react-router";
import type {ConfigDescriptor} from "@/entities/config-descriptor";

interface IProps {
  configDescriptor: ConfigDescriptor;
}

export default function InfoCard(props: IProps) {
  const navigate = useNavigate();

  return (
    <Card styles={{body: {padding: 16}}}>
      <Flex vertical gap="medium">
        <Typography.Title level={3} style={{marginBottom: "0"}}>
          {props.configDescriptor.name}
        </Typography.Title>
        <Typography.Paragraph style={{marginBottom: "0"}}>
          {props.configDescriptor.description}
        </Typography.Paragraph>
        {props.configDescriptor.lastSupportedVersion && (
          <Alert
            title={`Latest supported version of GTNH: ${props.configDescriptor.lastSupportedVersion}`}
            type="warning"
            showIcon
          />
        )}
        {props.configDescriptor.versions && (
          <Form.Item
            key="descriptor-version"
            label="Version for GTNH"
            extra="Select version that corresponds to the program version"
            style={{marginBottom: 0}}
          >
            <Select
              style={{width: "100%"}}
              defaultValue={props.configDescriptor.versions.find(x => x.name == props.configDescriptor.currentVersion)?.url}
              options={props.configDescriptor.versions.map((value) => ({
                value: value.url,
                label: value.name
              }))}
              onChange={(value) => {
                navigate({
                  pathname: "/configurator",
                  search: createSearchParams({
                    url: value
                  }).toString()
                });
              }}
              disabled={props.configDescriptor.versions.length < 2}
            />
          </Form.Item>
        )}
        {props.configDescriptor.repositoryLink && (
          <Typography.Link href={props.configDescriptor.repositoryLink}>
            Link to repository
          </Typography.Link>
        )}
      </Flex>
    </Card>
  )
}
