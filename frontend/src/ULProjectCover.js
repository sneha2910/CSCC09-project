import React from "react";
import { Card } from "react-bootstrap";
import defaultDocument from "./media/document.png";
import "./ULProjectCover.css";

class ULProjectCover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.image,
      name: this.props.name,
      link: this.props.link,
    };
  }

  render() {
    return (
      <Card className="col-2">
        <Card.Img variant="top" src={defaultDocument} />
        <Card.Body>
          <Card.Title>{this.state.name}</Card.Title>
        </Card.Body>
      </Card>
    );
  }
}

export default ULProjectCover;
