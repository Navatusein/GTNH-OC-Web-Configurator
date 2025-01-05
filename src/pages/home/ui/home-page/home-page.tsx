import {FC, useMemo} from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
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
      pathname: "/GTNH-OC-Web-Configurator/configurator",
      search: createSearchParams({
        url: configDescriptorUrl
      }).toString()
    });
  }

  return (
    <div className="my-3">
      <Fetcher isLoading={isLoading} error={error} canShow={programs != null}>

        <Col>
          {programs?.map(program => (
            <Row>
              <Card key={program.name} className="mb-4 p-0">
                <Card.Body>
                  <Card.Title>{program.name}</Card.Title>
                  <Card.Text>{program.description}</Card.Text>
                  <div className="d-grid gap-2">
                    <Button onClick={() => navigateTo(program.configDescriptorUrl)}>Configure</Button>
                  </div>
                </Card.Body>
              </Card>
            </Row>
          ))}
        </Col>

      </Fetcher>
    </div>
  );
};

export default HomePage;