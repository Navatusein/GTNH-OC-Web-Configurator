import {FC} from "react";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {vscDarkPlus} from "react-syntax-highlighter/dist/esm/styles/prism";

interface IProps {
  config: string;
}

const ConfigHighlighter: FC<IProps> = (props) => {
  return (
    <SyntaxHighlighter language="lua" style={vscDarkPlus}>
      {props.config}
    </SyntaxHighlighter>
  );
};

export default ConfigHighlighter;