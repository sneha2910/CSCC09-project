import { Stack } from "react-bootstrap";
import ULDesignElementPanelItem from "./ULDesignElementPanelItem";

const ULDesignElementPanel = (props) => {
  const { element, updateElement } = props;

  const getSetter = (toUpdateObject) => (value) => {
    updateElement(element, toUpdateObject(value));
  };

  const minDim = (() => {
    if (!element) return 0;
    const { position } = element;
    return Math.min(parseInt(position.width), parseInt(position.height));
  })();

  return (
    element && (
      <Stack className="h-100 w-25 border position-relative">
        <div>The current element is {element.id}</div>
        <ULDesignElementPanelItem
          type="color"
          name="Fill Color"
          value={element.style.backgroundColor}
          update={getSetter((value) => ({
            style: { backgroundColor: value },
          }))}
        />
        <ULDesignElementPanelItem
          type="range"
          min="0"
          max={minDim / 2}
          name="Border Width"
          value={parseInt(element.style.borderWidth)}
          update={getSetter((value) => ({
            style: { borderWidth: value + "px" },
          }))}
        />
        <ULDesignElementPanelItem
          type="color"
          name="Border Color"
          value={element.style.borderColor}
          update={getSetter((value) => ({
            style: { borderColor: value },
          }))}
        />
        <ULDesignElementPanelItem
          type="range"
          min="0"
          max={minDim / 2}
          name="Border Radius"
          value={parseInt(element.style.borderRadius)}
          update={getSetter((value) => ({
            style: { borderRadius: value + "px" },
          }))}
        />
        <ULDesignElementPanelItem
          type="input"
          name="Text"
          value={element.text.content}
          update={getSetter((value) => ({
            text: { content: value },
          }))}
        />
        <ULDesignElementPanelItem
          type="range"
          min="0"
          max="100"
          name="Text Size"
          value={parseInt(element.text.fontSize)}
          update={getSetter((value) => ({
            text: { fontSize: value + "px" },
          }))}
        />
        <ULDesignElementPanelItem
          type="color"
          name="Text Color"
          value={element.text.color}
          update={getSetter((value) => ({
            text: { color: value },
          }))}
        />
      </Stack>
    )
  );
}

export default ULDesignElementPanel;
