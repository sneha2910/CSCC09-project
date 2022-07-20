import { Button, Stack } from 'react-bootstrap';

const ULDesignElementPanel = (props) => {
  const { element, updateElement } = props;

  const setColor = () => {
    const color = document.getElementById("ul-design-element-panel-color").value;
    updateElement(element, { style: { backgroundColor: color } });
  }
  return ( element &&
    <Stack className="h-100 w-25 border position-relative">
      <div>The current element is {element.id}</div>
      <input id="ul-design-element-panel-color" type="input" placeholder='color'></input>
      <Button variant="primary" onClick={setColor}>set colour</Button>
    </Stack>
  );
};

export default ULDesignElementPanel;