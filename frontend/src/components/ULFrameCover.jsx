import React from "react";
import { Card } from "react-bootstrap";
import defaultDocument from "../media/frame.png";
import { Link } from "react-router-dom";

//creates a frame cover with title and image
const ULFrameCover = (props) => {
  const { project, frame } = props;
  const { _id: projectId, title: projectName } = project;
  const { _id: frameId, title: frameName } = frame;

  return (
    <Card className="col-2">
      <Link
        to={`/design?projectName=${projectName}&projectId=${projectId}&frameName=${frameName}&frameId=${frameId}`}
      >
        <Card.Img variant="top" src={defaultDocument} />
        <Card.Body>
          <Card.Title>{frameName}</Card.Title>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ULFrameCover;
