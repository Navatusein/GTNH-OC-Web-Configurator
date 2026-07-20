import {Collapse} from "antd";
import type {ReactNode} from "react";

interface IProps {
  label: string;
  defaultOpen?: boolean;
  children?: ReactNode;
}

export default function CollapsibleCard(props: IProps) {
  return (
    <Collapse
      items={[{
        key: "collapsible-card",
        label: props.label,
        children: props.children
      }]}
      defaultActiveKey={[props.defaultOpen ? "collapsible-card" : ""]}
    />
  )
}
