import {FC, ReactNode} from "react";
import {Alert, Spinner} from "react-bootstrap";

interface IProps {
  canShow: boolean;
  isLoading: boolean;
  error: string|null|undefined;
  children: ReactNode;
}

const Fetcher: FC<IProps> = (props) => {
  return (
    <>
      {props.canShow && !props.isLoading && !props.error && props.children}
      {props.isLoading &&
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      }
      {props.error &&
        <Alert variant="danger">
          {props.error}
        </Alert>
      }
    </>
  );
};

export default Fetcher;