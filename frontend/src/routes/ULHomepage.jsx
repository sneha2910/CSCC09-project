import React from "react";
import { Link } from "react-router-dom";
import ULProjectCover from "../components/ULProjectCover";
import { Button, Container, Row } from "react-bootstrap";
import { BsPlus, BsGear } from "react-icons/bs";
import ULNavbar from "../components/ULNavbar";
import { UserContext } from "../contexts/UserContext";
import { useContext, useState } from "react";
import apiService from "../services/apiService.js";
import { useEffect } from "react";

//creates homeoage for user by getting all their projects
const ULHomepage = () => {
  const { username } = useContext(UserContext);
  const [projects, setProjects] = useState(null);

  const getProjects = () => {
    return apiService
      .getProjects()
      .then((retn) => {
        setProjects(retn.projects);
      })
      .catch((error) => {});
  };

  const createProject = () => {
    const projectName = prompt("Enter a name for your new project");
    return apiService
      .createProject(projectName)
      .then(getProjects)
      .catch((error) => {});
  };
  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div>
      <ULNavbar />
      <h3 className="px-3 pt-3">{`Hi, ${username}!`}</h3>
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
                <ULProjectCover key={project.title} project={project} />
              ))}
          </Row>
        </Container>
      </div>
      <div className="page-footer font-small blue pt-4 text-center pb-0">
        <Link to="/credits"> Credits </Link>
      </div>
    </div>
  );
};

export default ULHomepage;
