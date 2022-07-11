import './ULHomepage.css';
import React from 'react';
import { Link } from 'react-router-dom';
import ULProjectCover from './ULProjectCover';
import { Button } from 'react-bootstrap';
import { BsPlus, BsGear } from 'react-icons/bs';
import ULNavbar from './ULNavbar';

class ULHomepage extends React.Component {
  render() {
    return (
      <div className="">
        <ULNavbar />
        <h3 className="px-3 pt-3">
          Hi, User!
        </h3>
        <div>
          <div className="px-3 py-1 d-flex justify-content-between">
            <Button className="d-flex justify-content-between">
              <BsPlus className="align-self-center"/>
              <span className="align-self-center">New Project</span>
            </Button>
            <Button className="d-flex">
              <BsGear className="align-self-center"/>
            </Button>
          </div>
          <div className="px-5 py-2 container">
            <div className="row">
              <ULProjectCover name="The first project"/>
              <ULProjectCover name="My first project"/>
            </div>
          </div>       
        </div>
        <Link to="/credits"> Credits </Link>
      </div>
    );
  }
}

export default ULHomepage;
