import {FloatButton, type FormInstance} from "antd";
import {ToTopOutlined, VerticalAlignBottomOutlined, FileDoneOutlined} from "@ant-design/icons";

interface IProps {
  form: FormInstance;
}

export default function FloatButtonGroup(props: IProps) {
  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"})
  }

  const scrollToBottom = () => {
    window.scrollTo({top: 9999999, behavior: "smooth"})
  }

  return (
    <FloatButton.Group shape="circle" style={{insetInlineEnd: 24}}>
      <FloatButton
        tooltip="Scroll to page start"
        icon={<ToTopOutlined/>}
        onClick={scrollToTop}
      />
      <FloatButton
        tooltip="Scroll to page bottom"
        icon={<VerticalAlignBottomOutlined/>}
        onClick={scrollToBottom}
      />
      <FloatButton
        tooltip="Generate config"
        type="primary"
        icon={<FileDoneOutlined/>}
        onClick={() => {props.form.submit()}}
      />
    </FloatButton.Group>
  )
}
