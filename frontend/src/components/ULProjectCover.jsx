import React from "react";
import { Card } from "react-bootstrap";
import defaultDocument from "../media/document.png";
import { Link } from "react-router-dom";

const ULProjectCover = (props) => {
  return (
    <Card className="col-2">
      <Link to={"/design?file=" + props.name}>
        <Card.Img variant="top" src={defaultDocument} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ULProjectCover;
