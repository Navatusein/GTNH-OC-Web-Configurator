import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";

interface IProps {
  text?: string;
  absolutePosition?: boolean;
  size?: "small" | "medium" | "large";
}

export default function LoadingSpinner(props: IProps) {
  return (
    <Spin
      description={props.text ?? "Loading..."}
      size={props.size}
      style={props.absolutePosition ? {position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, 0)"} : {}}
      indicator={<LoadingOutlined style={{fontSize: 48}} spin/>}
    />
  )
}
