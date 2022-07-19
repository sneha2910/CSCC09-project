import { useSearchParams } from "react-router-dom";
import ULNavbar from "../components/ULNavbar";
import { Stack, Button } from "react-bootstrap";
import { BsPlus, BsTrash } from "react-icons/bs";
import ULDesignCanvas from "../components/ULDesignCanvas";
import { useState } from "react";
import apiService from "../services/localApiService.js";
import { useEffect } from "react";

const ULDesign = () => {
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
        backgroundColor: "red",
        borderRadius: "50%",
      },
    };
  };
  const pElements = useState({});
  const [elements, setElements] = pElements;

  /* State selectedElement: the element that is selected by the current user. */
  const pSelectedElement = useState(null);
  const [selectedElement, setSelectedElement] = pSelectedElement;

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
    pElements, pSelectedElement,
  };

  return (
    <Stack className="h-100">
      <ULNavbar />
      <h2>Editing {filename}</h2>
      <Stack direction="horizontal" gap={1}>
        <Button variant="light" onClick={createElement}>
          <BsPlus />
        </Button>
        <Button variant="danger" onClick={deleteElement}>
          <BsTrash />
        </Button>
      </Stack>
      <div className="flex-grow-1">
        <ULDesignCanvas
          content={elements}
          properties={properties}
        />
      </div>
    </Stack>
  );
};

export default ULDesign;
