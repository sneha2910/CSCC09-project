import React from "react";
import { Link } from "react-router-dom";
import ULProjectCover from "../components/ULProjectCover";
import { Button, Container, Row } from "react-bootstrap";
import { BsPlus, BsGear } from "react-icons/bs";
import ULNavbar from "../components/ULNavbar";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const ULHomepage = () => {
  const { username } = useContext(UserContext);
  return (
    <div>
      <ULNavbar />
      <h3 className="px-3 pt-3">
        {username ? `Hi, ${username}!` : "Hi, guest user!"}
      </h3>
      <div>
        <div className="px-3 py-1 d-flex justify-content-between">
          <Button className="d-flex justify-content-between">
            <BsPlus className="align-self-center" />
            <span className="align-self-center">New Project</span>
          </Button>
          <Button className="d-flex">
            <BsGear className="align-self-center" />
          </Button>
        </div>
        <Container className="px-5 py-2">
          <Row>
            <ULProjectCover name="The first project" />
            <ULProjectCover name="My first project" />
          </Row>
        </Container>
      </div>
      <Link to="/credits"> Credits </Link>
    </div>
  );
};

export default ULHomepage;
