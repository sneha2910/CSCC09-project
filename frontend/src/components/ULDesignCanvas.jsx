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
  const updateElements = (element) => {
    const oldSize = elements[element.id].position;
    const currentSize = {
      ...oldSize,
      width: element.position.width,
      height: element.position.height,
    };
    if (
      oldSize.width !== currentSize.width ||
      oldSize.height !== currentSize.height
    ) {
      apiService.updateElement(props.filename, element);
      setElements({ ...elements, [element.id]: element });
    }
  };

  return (
    <div className="h-100 w-100 border position-relative">
      <div
        className="h-100 w-100 d-relative"
        onClick={unselectAllElements}
      ></div>
      {Object.values(allElements).map((element) => {
        return (
          <ULDesignElement
            element={element}
            isSelected={element.id === selectedElement}
            onClick={selectThisElement(element)}
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
