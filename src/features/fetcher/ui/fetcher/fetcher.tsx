import type {ReactNode} from "react";
import {Alert} from "antd";
import {LoadingSpinner} from "@/features/loading-spinner";

interface IProps {
  canShow: boolean;
  isLoading: boolean;
  error: string|null|undefined;
  loadingText?: string;
  size?: "small" | "medium" | "large";
  children: ReactNode;
  absolutePosition?: boolean;
}

export default function Fetcher(props: IProps) {
  return (
    <>
      {props.canShow && !props.isLoading && !props.error && props.children}
      {props.isLoading &&(
        <LoadingSpinner
          text={props.loadingText}
          size={props.size}
          absolutePosition={props.absolutePosition}
        />
      )}
      {props.error &&(
        <Alert title={props.error} type="error" showIcon/>
      )}
    </>
  )
}
