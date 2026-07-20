import {Fetcher} from "@/features/fetcher";
import {useProgramList} from "@/views/home/hooks/use-program-list.ts";
import {Flex} from "antd";
import {ProgramCard} from "@/entities/program-descriptor";

export default function HomeView() {
  const {programList, isLoading, error} = useProgramList("https://raw.githubusercontent.com/Navatusein/GTNH-OC-Installer/refs/heads/main/programs.lua");

  console.log(programList);

  return (
    <Fetcher canShow={programList != null} isLoading={isLoading} error={error} absolutePosition>
      <Flex vertical gap="medium">
        {programList?.map((program) => (
          <ProgramCard key={program.name} program={program}/>
        ))}
      </Flex>
    </Fetcher>
  )
}
