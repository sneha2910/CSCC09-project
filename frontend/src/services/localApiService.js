const module = {};

const UL_LOCALSTORAGE_KEY_PREFIX = 'ul-locals-';
/* Use localStorage to store and retrieve data */
const load = (key) => () => {
  const data = localStorage.getItem(UL_LOCALSTORAGE_KEY_PREFIX + key);
  if (data) {
    return JSON.parse(data);
  }
  return {};
};

const save = (key) => (data) => {
  localStorage.setItem(UL_LOCALSTORAGE_KEY_PREFIX + key, JSON.stringify(data));
};

const loadElements = load("elements");
const saveElements = save("elements");

module.createElement = (fileName_, element) => {
  const elements = loadElements();
  elements[element.id] = element;
  saveElements(elements);
  return Promise.resolve();
};

module.getElements = (fileName_) => {
  const elements = loadElements();
  return Promise.resolve(elements);
};

module.updateElement = (fileName_, element) => {
  const elements = loadElements();
  elements[element.id] = element;
  saveElements(elements);
  return Promise.resolve();
};

module.deleteElement = (fileName_, elementId) => {
  const elements = loadElements();
  delete elements[elementId];
  saveElements(elements);
  return Promise.resolve();
};

export default module;
