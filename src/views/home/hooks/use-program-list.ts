import useFetch from "@/share/hooks/use-fetch.ts";
import {useMemo} from "react";
import type {ProgramDescriptor} from "@/entities/program-descriptor";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {parse} from "@kilcekru/lua-table";


export function useProgramList(url: string) {
  const {data, isLoading, error} = useFetch(url);

  const programList = useMemo<ProgramDescriptor[] | null>(() => {
    const tableMatch = data.match(/\{[\s\S]*}/);

    if (tableMatch) {
      return parse(tableMatch[0]);
    }

    return null
  }, [data]);

  return {programList, isLoading, error};
}