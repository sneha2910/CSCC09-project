import { useSearchParams } from "react-router-dom";
import { Stack, Button } from "react-bootstrap";
import { BsPlus, BsTrash } from "react-icons/bs";
import ULDesignCanvas from "./ULDesignCanvas";
import { useState } from "react";
import apiService from "../services/localApiService.js";
import { useEffect } from "react";
import ULDesignElementPanel from "./ULDesignElementPanel";

const ULDesignFrame = () => {
  /* Get the name of the file from the URL */
  const [searchParams] = useSearchParams();
  const filename = searchParams.get("file");

  /* State elements: all elements in this document. */
  const generateExampleElement = () => {
    return {
      id: Math.random().toString(),
      position: {
        display: "block",
        position: "absolute",
        top: Math.floor(Math.random() * 400) + "px",
        left: Math.floor(Math.random() * 400) + "px",
        width: "40px",
        height: "40px",
      },
      style: {
        backgroundColor: "black",
        borderRadius: "10px 10px",
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: "1px",
      },
      text: {
        content: "text",
      }
    };
  };
  const pElements = useState({});
  const [elements, setElements] = pElements;

  /* State selectedElement: the element that is selected by the current user. */
  const pSelectedElement = useState(null);
  const [selectedElement, setSelectedElement] = pSelectedElement;

  const updateElement = (element, updateObject) => {
    console.log("update:", element, updateObject);
    const newObject = { ...elements[element.id] };
    for (const key in updateObject) {
      newObject[key] = {
        ...newObject[key],
        ...updateObject[key],
      };
    }

    console.log("updateElement", element, newObject);
    setElements({ ...elements, [element.id]: newObject });
    apiService.updateElement(filename, newObject);
  };

  const updatePosition = (element, updateObject) => {
    return updateElement(element, { position: updateObject });
  };

  /* Connect to api service */
  const createElement = () => {
    console.log("add element");
    const newElement = generateExampleElement();
    setElements({ ...elements, [newElement.id]: newElement });
    apiService.createElement(filename, newElement);
  };
  const deleteElement = () => {
    console.log("delete element");
    const { [selectedElement]: deletedElement, ...newElements } = elements;
    setElements(newElements);
    setSelectedElement(null);
    apiService.deleteElement(filename, selectedElement);
  };

  /* When the dom is loaded, get the elements from the server. */
  useEffect(() => {
    apiService.getElements(filename).then((elements) => {
      console.log("get elements", elements);
      setElements(elements);
    });
  }, [filename, setElements]);

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
