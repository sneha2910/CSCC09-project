import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";
import { BsPlus, BsGear } from "react-icons/bs";
import ULNavbar from "../components/ULNavbar";
import ULFrameCover from "../components/ULFrameCover";
import apiService from "../services/apiService.js";

const ULProject = () => {
  const [searchParams] = useSearchParams();
  const projectName = searchParams.get("project");

  const [frames, setFrames] = useState(null);

  const getFrames = () => {
    return apiService
      .getFrames(projectName)
      .then((retn) => {
        setFrames(retn.frames);
      })
      .catch((error) => {
        console.log("get frames failed:", error);
      });
  };
  const createFrame = () => {
    const frameName = prompt("Enter a name for your new frame");
    return apiService
      .createFrame(projectName, frameName, 200, 200)
      .then(getFrames)
      .catch((error) => {
        console.log("create frame failed:", error);
      });
  };
  useEffect(() => {
    getFrames();
  }, []);
  return (
    <div>
      <ULNavbar />
      <h3 className="px-3 pt-3">Home &gt; {projectName}</h3>
      <div>
        <div className="px-3 py-1 d-flex justify-content-between">
          <Button
            className="d-flex justify-content-between"
            onClick={createFrame}
          >
            <BsPlus className="align-self-center" />
            <span className="align-self-center">New Frame</span>
          </Button>
          <Button className="d-flex">
            <BsGear className="align-self-center" />
          </Button>
        </div>
        <Container className="px-5 py-2">
          <Row>
            {frames &&
              frames.map((frame) => (
                <ULFrameCover key={frame.title} project={projectName} name={frame.title} />
              ))}
          </Row>
        </Container>
      </div>
      <Link to="/credits"> Credits </Link>
    </div>
  );
};

export default ULProject;
