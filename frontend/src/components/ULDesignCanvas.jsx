import ULDesignElement from "../components/ULDesignElement";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const ULDesignCanvas = (props) => {
  const { username } = useContext(UserContext);

  const {
    elements,
    elementSelection,
    updateElements,
    selectElements,
    unselectElements,
    unselectAllElements,
  } = props.es;

  const { presentationMode } = props;

  const [movementCb, setMovementCb] = useState({
    fn: null,
  });

  const selectThisElement = (element) => (e) => {
    const isSelected = elementSelection.get(username)?.has(element.id);
    if (e.ctrlKey) {
      if (isSelected) {
        unselectElements([element.id]);
      } else {
        selectElements([element.id]);
      }
      return;
    }
    if (!isSelected) {
      unselectAllElements();
      selectElements([element.id]);
    }
  };

  const onMouseMove = (e) => {
    if (e.buttons !== 1) {
      return;
    }

    if (movementCb.fn) {
      const newElement = movementCb.fn(e);
      updateElements([newElement]);
      return;
    }

    const deltaX = e.movementX;
    const deltaY = e.movementY;
    const elementsToBeMoved = Array.from(elementSelection.get(username) ?? []);
    if (elementsToBeMoved?.length > 0) {
      updateElements(
        elementsToBeMoved.map((elementId) => {
          const element = elements.get(elementId);
          const newPosition = {
            ...element.position,
            left: parseInt(element.position.left) + deltaX + "px",
            top: parseInt(element.position.top) + deltaY + "px",
          };
          return {
            ...element,
            position: newPosition,
          };
        })
      );
    }
  };

  const onMouseUp = (e) => {
    if (movementCb.fn) {
      setMovementCb({ fn: null });
    }
  };

  const noop = (i) => {
    return noop;
  };

  return (
    <div
      className="h-100 w-100 border position-relative"
      onMouseMove={presentationMode ? noop : onMouseMove}
      onMouseUp={presentationMode ? noop : onMouseUp}
    >
      {!presentationMode && (
        <div className="h-100 w-100" onMouseDown={unselectAllElements}></div>
      )}
      {Array.from(elements.values())
        .filter((element) => {
          return !element.parent;
        })
        .map((element) => {
          return (
            <ULDesignElement
              element={element}
              selectThisElement={presentationMode ? noop : selectThisElement}
              setMovementCb={
                presentationMode
                  ? noop
                  : (fn) => {
                      setMovementCb({ fn });
                    }
              }
              elementStack={[]}
              es={props.es}
              presentationMode={presentationMode}
              key={element.id}
            />
          );
        })}
    </div>
  );
};

export default ULDesignCanvas;
