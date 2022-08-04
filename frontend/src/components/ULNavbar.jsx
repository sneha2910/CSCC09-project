import { useContext } from "react";
import { Button, Form, Navbar } from "react-bootstrap";
import { BsSearch, BsVectorPen } from "react-icons/bs";
import {UserContext} from "../contexts/UserContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//top navigation bar
const ULNavbar = () => {
  const { username, signOut } = useContext(UserContext);
  const navigate = useNavigate();

  const onClick = () => {
    signOut()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        navigate("/login");
      });
  };
  return (
    <Navbar className="d-flex justify-content-between bg-light bg-gradient">
      <Navbar.Brand className="px-3" href="/">
        <BsVectorPen /> The UI Lab
      </Navbar.Brand>
      <Form className="px-3 d-flex gap-1">
        <Form.Control type="search" placeholder="Search" />
        <Button className="d-flex">
          <BsSearch className="align-self-center" />
        </Button>
      </Form>
      {username ? (
        <Button className="d-flex" onClick={onClick}>
          Sign out
        </Button>
       ) : (
        <Button className="d-flex">
          <Link to="/Login" className="text-light">Log in</Link>
        </Button>
      )} 
    </Navbar>
  );
};

export default ULNavbar;
