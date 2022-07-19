import { useRef } from "react";
import { useEffect } from "react";

const ULDesignElement = (props) => {
  const { element, isSelected, onFocus, onBlur, filename, update } = props;

  /* Reference to this element. */
  const elementRef = useRef(null);

  const getContainerStyle = (element) => {
    if (isSelected) {
      return {
        ...element.position,
        resize: "both",
        overflow: "hidden",
        outline: "2px solid blue",
      };
    } else {
      return element.position;
    }
  };
  const getElementStyle = (element) => {
    return element.style;
  };

  useEffect(() => {
    const currentElement = elementRef.current;
    const resizeObserver = new ResizeObserver((observerEntries) => {
      update(element, {
        width: observerEntries[0].contentRect.width + "px",
        height: observerEntries[0].contentRect.height + "px",
      });
    });
    resizeObserver.observe(currentElement);

    /* Drag and move element */
    let isDragging = false;
    const offset = [0, 0];
    console.log(isSelected);
    const onMouseDown = (e) => {
      if (isDragging || !isSelected) {
        return;
      }
      const { clientX, clientY } = e;
      offset[0] = clientX - currentElement.offsetLeft;
      offset[1] = clientY - currentElement.offsetTop;
      isDragging = true;
    };
    const onMouseUp = (e) => {
      if (isDragging) {
        isDragging = false;
        return;
      }
    };
    const onMouseMove = (e) => {
      if (!isDragging) {
        return;
      }
      const { clientX, clientY } = e;
      const newLeft = clientX - offset[0];
      const newTop = clientY - offset[1];
      const updatedPosition = {
        left: newLeft + "px",
        top: newTop + "px",
      };
      update(element, updatedPosition);
    };
    currentElement.addEventListener("mousedown", onMouseDown);
    currentElement.addEventListener("mouseup", onMouseUp);
    currentElement.addEventListener("mousemove", onMouseMove);

    return () => {
      resizeObserver.unobserve(currentElement);
      currentElement.removeEventListener("mousedown", onMouseDown);
      currentElement.removeEventListener("mouseup", onMouseUp);
      currentElement.removeEventListener("mousemove", onMouseMove);
    };
  }, [elementRef, element, isSelected]);

  return (
    <div style={getContainerStyle(element)} ref={elementRef}>
      <div
        className="h-100 w-100"
        style={getElementStyle(element)}
        onFocus={onFocus}
        onBlur={onBlur}
        tabIndex="0"
      >
        {element.content}
      </div>
    </div>
  );
};

export default ULDesignElement;
