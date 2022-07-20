import ULDesignElement from "../components/ULDesignElement";
import { useState } from "react";

const ULDesignCanvas = (props) => {
  const allElements = props.content;
  const { pSelectedElement } = props.properties;
  const { updateElement } = props;

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

  /* State mouseMoveCb: the callback function when the mouse is moving. */
  const [mouseMoveCb, setMouseMoveCb] = useState(null);

  const onMouseMove = (event) => {
    if (mouseMoveCb?.fn) {
      const [element, updatePositionObject] = mouseMoveCb.fn(event);
      updateElement(element, updatePositionObject);
    }
  };
  const onMouseUp = (event) => {
    setMouseMoveCb(null);
  };

  return (
    <div
      className="h-100 w-100 border position-relative"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <div className="h-100 w-100" onClick={unselectAllElements}></div>
      {Object.values(allElements).map((element) => {
        return (
          <ULDesignElement
            element={element}
            isSelected={element.id === selectedElement}
            onFocus={selectThisElement(element)}
            setMouseMoveCb={setMouseMoveCb}
            key={element.id}
          />
        );
      })}
    </div>
  );
};

export default ULDesignCanvas;
