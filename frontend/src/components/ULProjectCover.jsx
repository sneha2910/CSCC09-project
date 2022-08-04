import React from "react";
import defaultDocument from "../media/project.png";
import { Link } from "react-router-dom";
import { Box } from '@chakra-ui/react'
import { Image } from "@chakra-ui/react";

//Creates a project cover for user's projects
const ULProjectCover = (props) => {
  const { project } = props;
  return (
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
      </Link>
    </Box>
  );
};

export default ULProjectCover;
