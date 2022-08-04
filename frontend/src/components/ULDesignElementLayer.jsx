import { Stack } from "react-bootstrap";
import ULDesignElementLayerItem from "./ULDesignElementLayerItem";
import ULDesignElementLayerItemGap from "./ULDesignElementLayerItemGap";

//create layers for elements
const ULDesignElementLayer = (props) => {
  const { es } = props;
  const { elements } = es;

  return (
    <Stack className="h-100 col-3 border position-relative">
      <ULDesignElementLayerItemGap prevElement={null} es={es}/>
      {Array.from(elements.values()).filter((element) => {
        return !element.parent;
      }).map((element) => {
        return (
          <ULDesignElementLayerItem
            key={element.id}
            element={element}
            es={es}
            elementStack={[]}
          />
        );
      })}
    </Stack>
  );
};

export default ULDesignElementLayer;
