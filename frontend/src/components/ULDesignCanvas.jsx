import ULDesignElement from "../components/ULDesignElement";
import apiService from "../services/localApiService.js";

const ULDesignCanvas = (props) => {
  const allElements = props.content;
  const { pElements, pSelectedElement } = props.properties;

  /* State selectedElement: the element that is selected. */
  const [selectedElement, setSelectedElement] = pSelectedElement;
  const selectThisElement = (element) => () => {
    console.log("select this element", element.id);
    setSelectedElement(element.id);
  };
  const unselectAllElements = () => {
    console.log("unselect all elements");
    setSelectedElement(null);
  };

  /* State elements: the elements that are displayed. */
  const [elements, setElements] = pElements;
  const updateElements = (element, updateObject) => {
    const oldSize = elements[element.id].position;
    const currentSize = {
      ...oldSize,
      ...updateObject,
    };
    element.position = currentSize;

    console.log("updateElements", element, currentSize);
    setElements({ ...elements, [element.id]: element });
    apiService.updateElement(props.filename, element);
  };

  return (
    <div className="h-100 w-100 border position-relative">
      {Object.values(allElements).map((element) => {
        return (
          <ULDesignElement
            element={element}
            isSelected={element.id === selectedElement}
            onFocus={selectThisElement(element)} 
            onBlur={unselectAllElements}
            update={updateElements}
            filename={props.filename}
            key={element.id}
          />
        );
      })}
    </div>
  );
};

export default ULDesignCanvas;
