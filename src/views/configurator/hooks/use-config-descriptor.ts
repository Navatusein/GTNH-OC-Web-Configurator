import {useMemo} from "react";
import {parse} from "yaml";
import useFetch from "@/share/hooks/use-fetch";
import type {ConfigDescriptor} from "@/entities/config-descriptor";

export function useConfigDescriptor(url: string | null) {
  const {data, isLoading, error} = useFetch(url);

  const configDescriptor = useMemo<ConfigDescriptor | null>(() => {
    return data ? parse(data).descriptor : null;
  }, [data]);

  return {configDescriptor, isLoading, error};
}