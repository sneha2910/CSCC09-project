import { useRef } from "react";
import { useEffect } from "react";

const ULDesignElement = (props) => {
  const { element, isSelected, onClick, filename, update } = props;

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
        width: observerEntries[0].contentRect.width,
        height: observerEntries[0].contentRect.height,
      });
    });
    resizeObserver.observe(currentElement);

    return () => {
      resizeObserver.unobserve(currentElement);
    };
  }, [elementRef]);

  return (
    <div style={getContainerStyle(element)} ref={elementRef}>
      <div
        className="h-100 w-100"
        style={getElementStyle(element)}
        onClick={onClick}
      >
        {element.content}
      </div>
    </div>
  );
};

export default ULDesignElement;
