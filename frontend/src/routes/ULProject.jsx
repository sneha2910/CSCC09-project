import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";
import { BsPlus, BsGear } from "react-icons/bs";
import ULNavbar from "../components/ULNavbar";
import ULFrameCover from "../components/ULFrameCover";

const ULProject = () => {
  const [searchParams] = useSearchParams();
  const projectName = searchParams.get("project");
  return (
    <div>
      <ULNavbar />
      <h3 className="px-3 pt-3">Home &gt; {projectName}</h3>
      <div>
        <div className="px-3 py-1 d-flex justify-content-between">
          <Button className="d-flex justify-content-between">
            <BsPlus className="align-self-center" />
            <span className="align-self-center">New Frame</span>
          </Button>
          <Button className="d-flex">
            <BsGear className="align-self-center" />
          </Button>
        </div>
        <Container className="px-5 py-2">
          <Row>
            <ULFrameCover project={projectName} name="Frame 1" />
          </Row>
        </Container>
      </div>
      <Link to="/credits"> Credits </Link>
    </div>
  );
};

export default ULProject;
