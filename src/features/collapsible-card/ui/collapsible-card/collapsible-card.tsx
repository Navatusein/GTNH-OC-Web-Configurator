import {ComponentProps, FC, ReactNode, useMemo} from "react";
import {Accordion, Card} from "react-bootstrap";

interface IProps extends ComponentProps<typeof Card>{
  children: ReactNode;
  title: string;
  description?: string;
  defaultOpen: boolean;
}

const CollapsibleCard: FC<IProps> = (props) => {
  const cardProps = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {children, title, description, defaultOpen, ...rest} = props;

    return rest;
  }, [props]);


  return (
    <Accordion className={props.className} defaultActiveKey={props.defaultOpen ? "0" : ""}>
      <Accordion.Item eventKey="0" className="bg-secondary-subtle">
        <Accordion.Header>
          <div>
            <h5 className="m-0">{props.title}</h5>
            {props.description &&
              <p className="m-0 mt-2 text-muted">{props.description}</p>
            }
          </div>
        </Accordion.Header>
        <Accordion.Body className="p-0">
          <Card {...cardProps} className="p-3 border-0 ">
            {props.children}
          </Card>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default CollapsibleCard;