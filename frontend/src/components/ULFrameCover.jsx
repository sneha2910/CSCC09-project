import React from "react";
import defaultDocument from "../media/frame.png";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

//creates a frame cover with title and image
const ULFrameCover = (props) => {
  const { project, frame } = props;
  const { _id: projectId, title: projectName } = project;
  const { _id: frameId, title: frameName } = frame;

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg">
      <Link
        to={`/design?projectName=${projectName}&projectId=${projectId}&frameName=${frameName}&frameId=${frameId}`}
      >
        <Image variant="top" src={defaultDocument} />
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {frameName}
        </Box>
      </Link>
    </Box>
  );
};

export default ULFrameCover;
