import { Stack } from "react-bootstrap";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import ULDesignElementLayerItemGap from "./ULDesignElementLayerItemGap";

//to drag and drop and element to layer them one above the other
const ULDesignElementLayerItem = (props) => {
  const { element, es, elementStack } = props;
  const { username } = useContext(UserContext);

  const [isDraggedOver, setIsDraggedOver] = useState(false);

  if (elementStack.includes(element.id)) {
    return null;
  }

  const leftPadding = 20;
  const isSelected = es.elementSelection.get(username)?.has(element.id);

  const unselectedStyle = {
    userSelect: "none",
    cursor: "pointer",
  };

  const selectedStyle = {
    outline: "2px solid black",
    ...unselectedStyle,
  };

  const draggedOverStyle = {
    backgroundColor: "lightgray",
    ...unselectedStyle,
  };

  const textStyle = {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  };

  const onDragStart = (e) => {
    e.dataTransfer.setData("text/plain", element.id);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const fromElementId = e.dataTransfer.getData("text/plain");
    const fromElement = es.elements.get(fromElementId);
    const fromElementParent = es.elements.get(fromElement.parent);

    if (
      fromElement.parent === element.id ||
      fromElementId === element.id ||
      elementStack.includes(fromElementId)
    ) {
      return;
    }
    const newfromElementObject = {
      ...fromElement,
      parent: element.id,
    };
    const newToElementObject = {
      ...element,
      children: element.children
        ? element.children.concat(fromElementId)
        : [fromElementId],
    };

    const elementsToBeUpdated = [newfromElementObject, newToElementObject];
    if (fromElementParent) {
      const newFromElementParentObject = {
        ...fromElementParent,
        children: fromElementParent.children.filter(
          (childId) => childId !== fromElementId
        ),
      };
      elementsToBeUpdated.push(newFromElementParentObject);
    }
    es.updateElements(elementsToBeUpdated);
    console.log("drop", fromElementId, fromElement);
    setIsDraggedOver(false);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDraggedOver(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDraggedOver(false);
  };

  /* Select the element onclick */
  const selectThisElement = (e) => {
    console.log("select this element", element.id);
    const isSelected = es.elementSelection.get(username)?.has(element.id);
    if (e.ctrlKey) {
      if (isSelected) {
        es.unselectElements([element.id]);
      } else {
        es.selectElements([element.id]);
      }
      return;
    }
    if (!isSelected) {
      es.unselectAllElements();
      es.selectElements([element.id]);
    }
  };

  return (
    <div style={{ paddingLeft: `${leftPadding}px` }}>
      <div
        style={
          isDraggedOver
            ? draggedOverStyle
            : isSelected
            ? selectedStyle
            : unselectedStyle
        }
        onClick={selectThisElement}
        draggable={true}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDragEnd={onDragLeave}
        onDrop={onDrop}
      >
        {element.id}
        {element.text?.content && (
          <div style={textStyle}>{element.text.content}</div>
        )}
      </div>
      <div>
        {Array.from(element.children ?? [])
          .map((elementId) => {
            return es.elements.get(elementId);
          })
          .map((elem) => {
            if (!elem) {
              return null;
            }
            return (
              <ULDesignElementLayerItem
                key={elem.id}
                element={elem}
                es={es}
                elementStack={[...elementStack, element.id]}
              />
            );
          })}
      </div>
      <ULDesignElementLayerItemGap prevElement={element} es={es} />
    </div>
  );
};

export default ULDesignElementLayerItem;
