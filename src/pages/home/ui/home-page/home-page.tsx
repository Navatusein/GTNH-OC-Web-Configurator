import {FC, useMemo} from "react";
import { Button, Card, ListGroup} from "react-bootstrap";
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

  const {data, isLoading, error} = useFetch("http://localhost:3000/programs.yml");

  const programs = useMemo((): IProgramDescriptor[]|null => {
    return data && parse(data).programs;
  }, [data])

  const navigateTo = (configDescriptorUrl: string) => {
    navigate({
      pathname: "configurator",
      search: createSearchParams({
        url: configDescriptorUrl
      }).toString()
    });
  }

  return (
    <div className="my-3">
      <Fetcher isLoading={isLoading} error={error} canShow={programs != null}>
        <Card>
          <ListGroup>
            {programs?.map(program => (
              <ListGroup.Item key={program.name} className="d-grid gap-2">
                <h3>{program.name}</h3>
                <p>{program.description}</p>
                <Button onClick={() => navigateTo(program.configDescriptorUrl)}>Configure</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </Fetcher>
    </div>
  );
};

export default HomePage;