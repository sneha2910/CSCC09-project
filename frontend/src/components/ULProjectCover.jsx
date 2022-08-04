import React from "react";
import { Card } from "react-bootstrap";
import defaultDocument from "../media/project.png";
import { Link } from "react-router-dom";
import { Box } from '@chakra-ui/react'
import { Image } from "@chakra-ui/react";

//Creates a project cover for user's projects
const ULProjectCover = (props) => {
  const { project } = props;
  return (
<<<<<<< HEAD
    <Card className="col-2">
      <Link
        to={`/project?projectId=${project._id}&projectName=${project.title}`}
      >
        <Card.Img variant="top" src={defaultDocument} />
        <Card.Body>
          <Card.Title>{project.title}</Card.Title>
        </Card.Body>
=======
    <Box maxW='sm' borderWidth='1px' borderRadius='lg'>
      <Link to={`/project?projectId=${project._id}&projectName=${project.title}`}>
        <Image variant="top" src={defaultDocument} />
        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >{project.title}</Box>
>>>>>>> c707df9f39a38c1e81f496e53db27a601007aef3
      </Link>
    </Box>
  );
};

export default ULProjectCover;
