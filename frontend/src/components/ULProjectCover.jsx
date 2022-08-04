import React from "react";
import { Card } from "react-bootstrap";
import defaultDocument from "../media/project.png";
import { Link } from "react-router-dom";

//Creates a project cover for user's projects
const ULProjectCover = (props) => {
  const { project } = props;
  return (
    <Card className="col-2">
      <Link
        to={`/project?projectId=${project._id}&projectName=${project.title}`}
      >
        <Card.Img variant="top" src={defaultDocument} />
        <Card.Body>
          <Card.Title>{project.title}</Card.Title>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ULProjectCover;
