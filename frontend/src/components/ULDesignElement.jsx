import { useRef } from "react";
import ULDesignElementHandle from "./ULDesignElementHandle";

const ULDesignElement = (props) => {
  const { element, isSelected, onFocus, setMouseMoveCb } = props;

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
      userSelect: "none",
    };
  };
  const getElementContent = (element) => {
    return element.text.content;
  };

  const onMouseDown = (e) => {
    const { clientX: startClientX, clientY: startClientY } = e;
    const { offsetLeft, offsetTop } = elementRef.current;
    const mouseMoveCb = (e) => {
      const { clientX, clientY } = e;
      const diffX = clientX - startClientX;
      const diffY = clientY - startClientY;
      const newLeft = offsetLeft + diffX;
      const newTop = offsetTop + diffY;
      return [element, { left: `${newLeft}px`, top: `${newTop}px` }];
    };
    setMouseMoveCb({
      fn: mouseMoveCb,
    });
  };

  return (
    <div
      style={getContainerStyle(element)}
      ref={elementRef}
      onMouseDown={onFocus}
    >
      <div
        className="h-100 w-100"
        style={getElementStyle(element)}
        onMouseDown={onMouseDown}
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
              setMouseMoveCb={setMouseMoveCb}
            />
          );
        })}
    </div>
  );
};

export default ULDesignElement;
