import { useSearchParams } from "react-router-dom";
import { Stack, Button } from "react-bootstrap";
import { BsPlus, BsTrash } from "react-icons/bs";
import ULDesignCanvas from "./ULDesignCanvas";
import { useState } from "react";
import apiService from "../services/apiService.js";
import { useEffect } from "react";
import ULDesignElementPanel from "./ULDesignElementPanel";

const ULDesignFrame = () => {
  /* Get the name of the file from the URL */
  const [searchParams] = useSearchParams();
  const fileName = searchParams.get("project");
  const frameName = searchParams.get("frame");

  /* State elements: all elements in this document. */
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
        color: "#f9fcff",
      },
    };
  };
  const pElements = useState({});
  const [elements, setElements] = pElements;

  /* State selectedElement: the element that is selected by the current user. */
  const pSelectedElement = useState(null);
  const [selectedElement, setSelectedElement] = pSelectedElement;

  const [updateTask, setUpdateTask] = useState({});

  const updateElement = (element, updateObject) => {
    console.log("update:", element, updateObject);
    const newObject = { ...elements[element.id] };
    for (const key in updateObject) {
      newObject[key] = {
        ...newObject[key],
        ...updateObject[key],
      };
    }

    if (updateTask[element.id]) {
      clearTimeout(updateTask[element.id]);
    }
    setUpdateTask(
      {
        ...updateTask,
        [element.id]: setTimeout(() => {
          apiService.updateElement(fileName, frameName, element.id, newObject);
        }, 100),
      }
    );

    setElements({ ...elements, [element.id]: newObject });
  };

  const updatePosition = (element, updateObject) => {
    return updateElement(element, { position: updateObject });
  };

  /* Connect to api service */
  const getElements = () => {
    return apiService
      .getElements(fileName, frameName)
      .then((retn) => {
        const elementsObject = retn.elements.reduce((obj, element) => {
          const newElement = element.content;
          newElement.id = element._id;
          obj[newElement.id] = newElement;
          return obj;
        }, {});
        console.log("get elements:", elementsObject);
        setElements(elementsObject);
      })
      .catch((error) => {
        console.log("get elements failed:", error);
      });
  };
  const createElement = () => {
    console.log("add element");
    const newElement = generateExampleElement();
    apiService
      .createElement(fileName, frameName, newElement)
      .then(getElements)
      .then(() => {
        setSelectedElement(newElement);
      })
      .catch((error) => {
        console.log("create element failed:", error);
      });
  };
  const deleteElement = () => {
    console.log("delete element");
    
    clearTimeout(updateTask[selectedElement.id]);
    setSelectedElement(null);
    const newElements = { ...elements };
    delete newElements[selectedElement.id];
    setElements(newElements);


    apiService
      .deleteElement(fileName, frameName, selectedElement)
      .then(getElements)
      .catch((error) => {
        console.log("delete element failed:", error);
      });
  };

  /* When the dom is loaded, get the elements from the server. */
  useEffect(() => {
    getElements();
  }, []);

  /* Properties of the states */
  const properties = {
    pSelectedElement,
  };

  return (
    <Stack className="h-100">
      <Stack direction="horizontal" gap={1}>
        <Button variant="light" onClick={createElement}>
          <BsPlus />
        </Button>
        <Button variant="danger" onMouseDown={deleteElement}>
          <BsTrash />
        </Button>
      </Stack>
      <div className="flex-grow-1">
        <Stack direction="horizontal" className="h-100 w-100">
          <ULDesignCanvas
            content={elements}
            properties={properties}
            updateElement={updatePosition}
          />
          <ULDesignElementPanel
            element={elements[selectedElement]}
            updateElement={updateElement}
          />
        </Stack>
      </div>
    </Stack>
  );
};

export default ULDesignFrame;
