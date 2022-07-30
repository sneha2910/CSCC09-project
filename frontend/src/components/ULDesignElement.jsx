import { useRef } from "react";
import ULDesignElementHandle from "./ULDesignElementHandle";

const ULDesignElement = (props) => {
  const { element, isSelected, onMouseDown, setMovementCb } = props;

  /* Reference to this element. */
  const elementRef = useRef(null);

  const getContainerStyle = (element) => {
    if (isSelected) {
      return {
        ...element.position,
        outline: "2px solid blue",
      };
    } else {
      return element.position;
    }
  };
  const getElementStyle = (element) => {
    return {
      ...element.style,
      ...element.text,
      userSelect: "none",
    };
  };
  const getElementContent = (element) => {
    return element.text.content;
  };

  return (
    <div
      style={getContainerStyle(element)}
      ref={elementRef}
      onMouseDown={onMouseDown}
    >
      <div
        className="h-100 w-100 d-flex align-items-center justify-content-center"
        style={getElementStyle(element)}
      >
        {getElementContent(element)}
      </div>
      {isSelected &&
        ["tl", "tr", "bl", "br"].map((handlePos) => {
          return (
            <ULDesignElementHandle
              key={handlePos}
              handlePos={handlePos}
              elementRef={elementRef}
              element={element}
              setMovementCb={setMovementCb}
            />
          );
        })}
    </div>
  );
};

export default ULDesignElement;
