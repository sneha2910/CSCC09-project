import React from "react";
import { Button, Form, Navbar } from "react-bootstrap";
import { BsSearch, BsVectorPen } from "react-icons/bs";

class ULNavbar extends React.Component {
  render() {
    return (
      <Navbar className="d-flex justify-content-between bg-light bg-gradient">
        <Navbar.Brand className="px-3" href="/">
          <BsVectorPen /> The UI Lab
        </Navbar.Brand>
        <Form className="px-3 d-flex gap-1">
          <Form.Control type="search" placeholder="Search" />
          <Button className="d-flex">
            <BsSearch className="align-self-center"/>
          </Button>
        </Form>
      </Navbar>
    );
  }
}

export default ULNavbar;
