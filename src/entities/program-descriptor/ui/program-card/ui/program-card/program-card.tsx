import {Alert, Button, Card, Flex, Typography} from "antd";
import type {ProgramDescriptor} from "@/entities/program-descriptor";
import {SettingOutlined} from "@ant-design/icons";
import {createSearchParams, useNavigate} from "react-router";


interface IProps {
  program: ProgramDescriptor;
}

export default function ProgramCard(props: IProps) {
  const navigate = useNavigate();

  const navigateTo = (configDescriptorUrl: string) => {
    navigate({
      pathname: "/configurator",
      search: createSearchParams({
        url: configDescriptorUrl
      }).toString()
    });
  }

  return (
    <Card styles={{body: {padding: 16}}}>
      <Flex vertical gap="medium">
        <Typography.Title level={3} style={{marginBottom: "0"}}>
          {props.program.name}
        </Typography.Title>
        {props.program.lastSupportedGtnhVersion && (
          <Alert
            title={`Latest supported version of GTNH: ${props.program.lastSupportedGtnhVersion}`}
            type="warning"
            showIcon
          />
        )}
        <Typography.Paragraph style={{marginBottom: "0"}}>
          {props.program.description}
        </Typography.Paragraph>
        {props.program.versions.length == 1 && (
          <Button
            type="primary"
            block
            icon={<SettingOutlined/>}
            onClick={() => navigateTo(props.program.versions[0].configDescriptorUrl)}
          >
            Configure
          </Button>
        )}
        {props.program.versions.length > 1 && (
          <Flex vertical gap="small">
            <Typography.Text>
              Versions:
            </Typography.Text>
            {props.program.versions.map(version => (
              <Card size="small" type="inner">
                <Flex align="center" justify="space-between">
                  <Typography.Text>
                    For GTNH: {version.gtnhVersion}
                  </Typography.Text>
                  <Button
                    type="primary"
                    icon={<SettingOutlined/>}
                    onClick={() => navigateTo(version.configDescriptorUrl)}
                  >
                    Configure
                  </Button>
                </Flex>
              </Card>
            ))}
          </Flex>
        )}
        </Flex>
    </Card>
  )
}
