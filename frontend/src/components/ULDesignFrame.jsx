import { useSearchParams } from "react-router-dom";
import { Stack, Button } from "react-bootstrap";
import { BsFileSlides, BsPlus, BsTrash } from "react-icons/bs";
import ULDesignCanvas from "./ULDesignCanvas";
import ULDesignElementPanel from "./ULDesignElementPanel";
import useElementService from "../hooks/useElementService";

const ULDesignFrame = (props) => {
  /* Get the name of the file from the URL */
  const [searchParams] = useSearchParams();
  const fileName = searchParams.get("project");
  const frameName = searchParams.get("frame");

  const es = useElementService(fileName, frameName);
  const { createElements, deleteElements } = es;

  const generateExampleElement = () => {
    return {
      id: Math.random().toString(),
      position: {
        display: "block",
        position: "absolute",
        top: Math.floor(Math.random() * 400) + "px",
        left: Math.floor(Math.random() * 400) + "px",
        width: "56px",
        height: "28px",
      },
      style: {
        backgroundColor: "#ffffff",
        borderRadius: "1px",
        borderStyle: "solid",
        borderColor: "#000000",
        borderWidth: "2px",
      },
      text: {
        content: "",
        fontSize: "16px",
        color: "#000000",
      },
    };
  };

  /* Connect to api service */
  const createElement = () => {
    const newElement = generateExampleElement();
    console.log("create element:", newElement);
    createElements([newElement]);
  };

  const openPresentationModeInNewTab = () => {
    window.open(
      `/presentation?project=${fileName}&frame=${frameName}`,
      "_blank"
    );
  };

  if (!props.presentationMode) {
    return (
      <Stack className="h-100">
        <Stack direction="horizontal" gap={1}>
          <Button variant="light" onClick={createElement}>
            <BsPlus />
          </Button>
          <Button variant="danger" onMouseDown={deleteElements}>
            <BsTrash />
          </Button>
          <Button variant="light" onMouseDown={openPresentationModeInNewTab}>
            <BsFileSlides />
          </Button>
        </Stack>
        <div className="flex-grow-1">
          <Stack direction="horizontal" className="h-100 w-100">
            <ULDesignCanvas es={es} />
            <ULDesignElementPanel es={es} />
          </Stack>
        </div>
      </Stack>
    );
  } else {
    return (
      <div className="h-100 w-100 border position-relative">
        <ULDesignCanvas es={es} presentationMode={true} />
      </div>
    );
  }
};

export default ULDesignFrame;
