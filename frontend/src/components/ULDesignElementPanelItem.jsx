import { toKebabCase } from "../utils/utils.js";

//create single panel for element properties
const ULDesignElementPanelItem = (props) => {
  const { type, name, value, update, min, max } = props;
  const kebabName = toKebabCase(name);
  const updateValue = (event) => {
    const value = event.target.value;
    update(value);
  };

  return (
    <form>
      <label>
        {name}:
        <input
          type={type}
          id={`ul-design-element-panel-${kebabName}`}
          value={value}
          onChange={updateValue}
          min={min}
          max={max}
        />
        {type === "range" && (
          <output htmlFor={`ul-design-element-panel-${kebabName}`}>
            {value}
          </output>
        )}
      </label>
    </form>
  );
};

export default ULDesignElementPanelItem;
