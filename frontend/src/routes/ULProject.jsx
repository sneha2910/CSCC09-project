import { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button, Container, Row, Stack, Dropdown } from "react-bootstrap";
import { BsPlus, BsGear, BsTrash } from "react-icons/bs";
import ULNavbar from "../components/ULNavbar";
import ULFrameCover from "../components/ULFrameCover";
import apiService from "../services/apiService.js";

//create frames inside a project for a user
const ULProject = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");
  const projectName = searchParams.get("projectName");

  const [frames, setFrames] = useState(null);
  const [sharedUsers, setSharedUsers] = useState([]);

  const getFrames = useCallback(() => {
    return apiService
      .getFrames(projectId)
      .then((retn) => {
        setFrames(retn.frames);
      })
      .catch((error) => {
        console.log("get frames failed:", error);
      });
  }, [projectId]);

  const createFrame = () => {
    const frameName = prompt("Enter a name for your new frame");
    return apiService
      .createFrame(projectId, frameName, 200, 200)
      .then(getFrames)
      .catch((error) => {
        console.log("create frame failed:", error);
      });
  };

  const getUsers = useCallback(() => {
    return apiService.getUsers(projectId).then((retn) => {
      setSharedUsers(retn.users);
    });
  }, [projectId]);

  const addUser = () => {
    const email = prompt("Enter the email of the user you want to invite");
    if (!email) {
      return;
    }
    return apiService
      .addUser(projectId, email)
      .then(() => {
        alert("User added successfully");
        getUsers();
      })
      .catch((error) => {
        alert("User not added, reason: " + error);
      });
  };

  const removeUser = (username) => () => {
    return apiService
      .removeUser(projectId, username)
      .then(() => {
        alert("User removed successfully");
        getUsers();
      })
      .catch((error) => {
        alert("User not removed, reason: " + error);
      });
  };

  useEffect(() => {
    getFrames();
    getUsers();
  }, [getFrames, getUsers]);

  return (
    <div>
      <ULNavbar />
      <h3 className="px-3 pt-3">Home &gt; {projectName}</h3>
      <div>
        <div className="px-3 py-1 d-flex justify-content-between">
          <Stack gap={2} direction="horizontal">
            <Button
              className="d-flex justify-content-between"
              onClick={createFrame}
            >
              <BsPlus className="align-self-center" />
              <span className="align-self-center">New Frame</span>
            </Button>
            <Button className="d-flex" onClick={addUser}>
              <BsPlus className="align-self-center" />
              Invite other user to this project
            </Button>
            <Dropdown>
              <Dropdown.Toggle variant="danger" id="dropdown-basic">
                <BsTrash className="align-self-center" />
                Remove user from the project
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {sharedUsers && sharedUsers.map((username) => (
                  <Dropdown.Item onClick={removeUser(username)} key={username}>{username}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Stack>
          <Button className="d-flex">
            <BsGear className="align-self-center" />
          </Button>
        </div>
        <Container className="px-5 py-2">
          <Row>
            {frames &&
              frames.map((frame) => (
                <ULFrameCover
                  key={frame.title}
                  project={{ _id: projectId, title: projectName }}
                  frame={frame}
                />
              ))}
          </Row>
        </Container>
      </div>
      <Link to="/credits"> Credits </Link>
    </div>
  );
};

export default ULProject;
