import "./ULDesignElementHandle.css";
const ULDesignElementHandle = (props) => {
  const {
    setMovementCb,
    handlePos,
    elementRef,
    element,
  } = props;

  const onMouseDown = (e) => {
    const { clientX: startClientX, clientY: startClientY } = e;
    const { offsetLeft, offsetTop, offsetWidth, offsetHeight } =
      elementRef.current;
    const mouseMoveCb = (e) => {
      const { clientX, clientY } = e;
      const diffX = clientX - startClientX;
      const diffY = clientY - startClientY;
      const newLeft = offsetLeft + diffX;
      const newTop = offsetTop + diffY;
      const newWidthShrink = offsetWidth - diffX;
      const newHeightShrink = offsetHeight - diffY;
      const newWidthGrow = offsetWidth + diffX;
      const newHeightGrow = offsetHeight + diffY;
      let updateObject = {};
      if (handlePos === "tl") {
        updateObject = {
          left: `${newLeft}px`,
          top: `${newTop}px`,
          width: `${newWidthShrink}px`,
          height: `${newHeightShrink}px`,
        };
      } else if (handlePos === "tr") {
        updateObject = {
          top: `${newTop}px`,
          width: `${newWidthGrow}px`,
          height: `${newHeightShrink}px`,
        };
      } else if (handlePos === "bl") {
        updateObject = {
          left: `${newLeft}px`,
          width: `${newWidthShrink}px`,
          height: `${newHeightGrow}px`,
        };
      } else if (handlePos === "br") {
        updateObject = {
          width: `${newWidthGrow}px`,
          height: `${newHeightGrow}px`,
        };
      }
      const newElement = {
        ...element,
        position: {
          ...element.position,
          ...updateObject,
        },
      };
      return newElement;
    };
    setMovementCb(mouseMoveCb);
  };

  return (
    <div
      className={
        "ul-design-element-handle ul-design-element-handle-" + handlePos
      }
      onMouseDown={onMouseDown}
    />
  );
};
export default ULDesignElementHandle;
