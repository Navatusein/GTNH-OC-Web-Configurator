import {Prism} from "react-syntax-highlighter";
import {vscDarkPlus} from "react-syntax-highlighter/dist/esm/styles/prism";

interface IProps {
  text: string;
  language?: string;
}

export default function SyntaxHighlighter(props: IProps) {
  return (
    <Prism language={props.language ?? "lua"} style={vscDarkPlus}>
      {props.text}
    </Prism>
  )
}
