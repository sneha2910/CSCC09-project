import React from "react";
import { Link, Redirect } from "react-router-dom";
import ULProjectCover from "../components/ULProjectCover";
import { Button, Container, Row } from "react-bootstrap";
import { BsPlus, BsGear } from "react-icons/bs";
import ULNavbar from "../components/ULNavbar";
import { UserContext } from "../contexts/UserContext";
import { useContext, useState } from "react";
import apiService from "../services/apiService.js";
import { useEffect } from "react";

const ULHomepage = () => {
  const { username } = useContext(UserContext);
  const [projects, setProjects] = useState(null);

  const getProjects = () => {
    return apiService
      .getProjects()
      .then((retn) => {
        setProjects(retn.projects);
      })
      .catch((error) => {
        console.log("get projects failed:", error);
      });
  };
  const createProject = () => {
    const projectName = prompt("Enter a name for your new project");
    return apiService
      .createProject(projectName)
      .then(getProjects)
      .catch((error) => {
        console.log("create project failed:", error);
      });
  };
  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div>
      <ULNavbar />
      <h3 className="px-3 pt-3">
        {`Hi, ${username}!`}
      </h3>
        <div>
          <div className="px-3 py-1 d-flex justify-content-between">
            <Button
              className="d-flex justify-content-between"
              onClick={createProject}
            >
              <BsPlus className="align-self-center" />
              <span className="align-self-center">New Project</span>
            </Button>
            <Button className="d-flex">
              <BsGear className="align-self-center" />
            </Button>
          </div>
          <Container className="px-5 py-2">
            <Row>
              {projects &&
                projects.map((project) => (
                  <ULProjectCover key={project.title} name={project.title} />
                ))}
            </Row>
          </Container>
        </div>
      <Link to="/credits"> Credits </Link>
    </div>
  );
};

export default ULHomepage;
