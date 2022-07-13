import React from "react";
import { Card } from "react-bootstrap";
import defaultDocument from "../media/document.png";

const ULProjectCover = () => {
  return (
    <Card className="col-2">
      <Card.Img variant="top" src={defaultDocument} />
      <Card.Body>
        <Card.Title>{this.state.name}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default ULProjectCover;
