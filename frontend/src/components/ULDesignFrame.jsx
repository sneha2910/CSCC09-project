import { useSearchParams } from "react-router-dom";
import { Stack, Button } from "react-bootstrap";
import { BsClipboard, BsFileSlides, BsPlus, BsTrash } from "react-icons/bs";
import ULDesignCanvas from "./ULDesignCanvas";
import ULDesignElementPanel from "./ULDesignElementPanel";
import ULDesignElementLayer from "./ULDesignElementLayer";
import useElementService from "../hooks/useElementService";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const ULDesignFrame = (props) => {
  /* Get the name of the file from the URL */
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");
  const frameId = searchParams.get("frameId");

  const es = useElementService(projectId, frameId);
  const { createElements, deleteElements, elementSelection } = es;

  const { username } = useContext(UserContext);

  //creates a basic element for a user
  const generateExampleElement = () => {
    return {
      id: `elem${Math.random().toString()}`,
      position: {
        display: "block",
        position: "absolute",
        top: Math.floor(Math.random() * 200) + "px",
        left: Math.floor(Math.random() * 200) + "px",
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

  //creates a dupliucate for elements on a frame
  const duplicateElements = () => {
    const getDuplicateElements = (elementIds, parentId) => {
      if (!elementIds || elementIds.length === 0) return [];
      const elementObjects = elementIds.map((elementId) => {
        const element = es.elements.get(elementId);
        return element;
      }).map((element) => {
        const currId = `elem${Math.random().toString()}`;
        return {
          id: currId,
          position: element.position,
          style: element.style,
          text: element.text,
          parent: parentId ?? undefined,
          children: getDuplicateElements(element.children, currId).map((child) => {
            return child.id;
          }),
        };
      });
      createElements(elementObjects);
      return elementObjects;
    };
    getDuplicateElements(Array.from(elementSelection.get(username) ?? []));
  };

  /* Connect to api service */
  const createElement = () => {
    const newElement = generateExampleElement();
    createElements([newElement]);
  };

  //open presentation mode for a frame
  const openPresentationModeInNewTab = () => {
    window.open(
      `/presentation?projectId=${projectId}&frameId=${frameId}`,
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
          <Button variant="light" onClick={duplicateElements}>
            <BsClipboard />
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
            <ULDesignElementLayer es={es} />
            <ULDesignCanvas es={es} />
            <ULDesignElementPanel es={es} />
          </Stack>
        </div>
      </Stack>
    );
  } else {
    return <ULDesignCanvas es={es} presentationMode={true} />;
  }
};

export default ULDesignFrame;
