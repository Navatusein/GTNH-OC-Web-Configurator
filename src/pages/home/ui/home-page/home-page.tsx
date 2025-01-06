import {FC, useMemo} from "react";
import {Button, Card} from "react-bootstrap";
import useFetch from "@/share/hooks/use-fetch.ts";
import {parse} from "yaml";
import {createSearchParams, useNavigate} from "react-router";
import {Fetcher} from "@/features/fetcher";

interface IProgramDescriptor {
  name: string;
  description: string;
  archiveUrl: string;
  configDescriptorUrl: string;
}

const HomePage: FC = () => {
  const navigate = useNavigate();

  const {data, isLoading, error} = useFetch("https://raw.githubusercontent.com/Navatusein/GTNH-OC-Installer/refs/heads/main/programs.yml");

  const programs = useMemo((): IProgramDescriptor[]|null => {
    return data && parse(data).programs;
  }, [data])

  const navigateTo = (configDescriptorUrl: string) => {
    navigate({
      pathname: "/configurator",
      search: createSearchParams({
        url: configDescriptorUrl
      }).toString()
    });
  }

  return (
    <>
      <Fetcher isLoading={isLoading} error={error} canShow={programs != null}>
        {programs?.map(program => (
          <Card className="p-0 mb-3" key={program.name}>
            <Card.Body>
              <Card.Title>{program.name}</Card.Title>
              <Card.Text>{program.description}</Card.Text>
              <div className="d-grid gap-2">
                <Button onClick={() => navigateTo(program.configDescriptorUrl)}>Configure</Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Fetcher>
    </>
  );
};

export default HomePage;