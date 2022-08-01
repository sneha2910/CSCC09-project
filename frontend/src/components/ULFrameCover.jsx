import React from "react";
import { Card } from "react-bootstrap";
import defaultDocument from "../media/frame.png";
import { Link } from "react-router-dom";

const ULFrameCover = (props) => {
  return (
    <Card className="col-2">
      <Link to={`/design?project=${props.project}&frame=${props.name}`}>
        <Card.Img variant="top" src={defaultDocument} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ULFrameCover;
