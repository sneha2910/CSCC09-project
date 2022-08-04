import { useRef } from "react";
import ULDesignElementHandle from "./ULDesignElementHandle";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

//designs an element with all its properties including design, position, mode
const ULDesignElement = (props) => {
  const {
    element,
    selectThisElement,
    setMovementCb,
    elementStack,
    es,
    presentationMode,
  } = props;

  const noop = () => {
    return noop;
  };

  const onMouseDown = presentationMode
    ? noop
    : (e) => {
        selectThisElement(element)(e);
        e.stopPropagation();
      };

  const { username } = useContext(UserContext);
  const isSelected = presentationMode
    ? false
    : es.elementSelection.get(username)?.has(element.id);

  /* Reference to this element. */
  const elementRef = useRef(null);

  if (elementStack.includes(element.id)) {
    return null;
  }

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

  const getPresentationModeStyle = (element) => {
    return {
      ...element.position,
      ...element.style,
      ...element.text,
    };
  };

  if (!presentationMode) {
    return (
      <div
        style={getContainerStyle(element)}
        ref={elementRef}
        onMouseDown={onMouseDown}
      >
        <div className="h-100 w-100" style={getElementStyle(element)}>
          {getElementContent(element)}
          {element.children
            ? element.children
                .map((elemId) => {
                  return es.elements.get(elemId);
                })
                .map((elem) => {
                  return (
                    <ULDesignElement
                      element={elem}
                      selectThisElement={selectThisElement}
                      setMovementCb={setMovementCb}
                      elementStack={[...elementStack, element.id]}
                      es={es}
                      key={elem.id}
                    />
                  );
                })
            : null}
        </div>
        {isSelected &&
          ["tl", "tr", "bl", "br"].map((handlePos) => {
            return (
              <ULDesignElementHandle
                key={handlePos}
                handlePos={handlePos}
                elementRef={elementRef}
                element={element}
                es={es}
                setMovementCb={setMovementCb}
              />
            );
          })}
      </div>
    );
  } else {
    return (
      <div style={getPresentationModeStyle(element)} ref={elementRef}>
        {getElementContent(element)}
        {element.children
          ? element.children
              .map((elemId) => {
                return es.elements.get(elemId);
              })
              .map((elem) => {
                return (
                  <ULDesignElement
                    element={elem}
                    elementStack={[...elementStack, element.id]}
                    es={es}
                    presentationMode={true}
                    key={elem.id}
                  />
                );
              })
          : null}
      </div>
    );
  }
};

export default ULDesignElement;
