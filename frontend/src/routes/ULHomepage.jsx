import React from "react";
import { Link } from "react-router-dom";
import ULProjectCover from "../components/ULProjectCover";
import { Button } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";
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
      <Text fontSize="2xl">{`Hi, ${username}!`}</Text>
      <div>
        <div className="px-3 py-1 d-flex justify-content-between">
          <Button
            className="d-flex justify-content-between"
            onClick={createProject}
          >
            <BsPlus className="align-self-center" />
            <span className="align-self-center">New Project</span>
          </Button>
          <Spacer />
          <br></br>
        </div>
        <SimpleGrid columns={[3, null, 6]} spacing="40px">
          {projects &&
            projects.map((project) => (
              <ULProjectCover key={project.title} project={project} />
            ))}
        </SimpleGrid>
        <br></br>
      </div>
      <div className="page-footer font-small blue pt-4 text-center pb-0">
        <Link to="/credits"> Credits </Link>
      </div>
    </div>
  );
};

export default ULHomepage;
