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
import { SimpleGrid, Text, Spacer } from "@chakra-ui/react";

const ULHomepage = () => {
  const { username } = useContext(UserContext);
  const [projects, setProjects] = useState(null);

  const getProjects = () => {
    return apiService
      .getProjects()
      .then((retn) => {
        setProjects(retn.projects);
      })
<<<<<<< HEAD
      .catch((error) => {});
=======
      .catch((error) => {
        console.log("get projects failed:", error);
      });
>>>>>>> c707df9f39a38c1e81f496e53db27a601007aef3
  };

  const createProject = () => {
    const projectName = prompt("Enter a name for your new project");
    return apiService
      .createProject(projectName)
      .then(getProjects)
<<<<<<< HEAD
      .catch((error) => {});
=======
      .catch((error) => {
        console.log("create project failed:", error);
      });
>>>>>>> c707df9f39a38c1e81f496e53db27a601007aef3
  };
  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div>
      <ULNavbar />
<<<<<<< HEAD
      <h3 className="px-3 pt-3">{`Hi, ${username}!`}</h3>
=======
      <Text fontSize="2xl">{`Hi, ${username}!`}</Text>
>>>>>>> c707df9f39a38c1e81f496e53db27a601007aef3
      <div>
        <div className="px-3 py-1 d-flex justify-content-between">
          <Button
            className="d-flex justify-content-between"
            onClick={createProject}
          >
            <BsPlus className="align-self-center" />
            <span className="align-self-center">New Project</span>
          </Button>
<<<<<<< HEAD
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
=======
          <Spacer />
          <Button className="d-flex">
            <BsGear className="align-self-center" />
          </Button>
          <br></br>
        </div>
        <SimpleGrid columns={[3, null, 6]} spacing="40px">
          {projects &&
            projects.map((project) => (
              <ULProjectCover key={project.title} project={project} />
            ))}
        </SimpleGrid>
        <br></br>
>>>>>>> c707df9f39a38c1e81f496e53db27a601007aef3
      </div>
      <div className="page-footer font-small blue pt-4 text-center pb-0">
        <Link to="/credits"> Credits </Link>
      </div>
    </div>
  );
};

export default ULHomepage;
