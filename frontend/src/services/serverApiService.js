const API_URL = window.location.origin + "/api/";
// const API_URL = "http://localhost:3001/api/";

const jsonRequest = (method) => (resource, data) => {
  return fetch(API_URL + resource, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((res) => {
      if (res.code === 401) {
        document.cookie =
          "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/login";
      }
      return res;
    });
};

const getRequest = jsonRequest("GET");
const postRequest = jsonRequest("POST");
const putRequest = jsonRequest("PUT");
const deleteRequest = jsonRequest("DELETE");

const signUp = (username, email, password) =>
  postRequest("users/signup", {
    username,
    email,
    password,
  });

const signIn = (username, password) =>
  postRequest("users/signin", {
    username,
    password,
  });

const oauth = async (token) => {
  const response = await fetch("http://localhost:3001/api/users/auth", {
    method: "POST",
    body: JSON.stringify({
      token
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  return await response.json();
}

const signOut = () => getRequest("users/signout");

const createProject = (title) =>
  postRequest("projects", {
    title,
  });
const getProjects = () => {
  return getRequest("projects");
};
const getProject = (title) => getRequest("projects/" + title);
const updateProject = (title, newTitle) =>
  putRequest("projects/" + title, {
    title: newTitle,
  });
const deleteProject = (title) => deleteRequest("projects/" + title);

const createFrame = (projectTitle, title, height, width) =>
  postRequest("projects/" + projectTitle + "/frames/", {
    title,
    height,
    width,
  });
const getFrames = (projectTitle) =>
  getRequest("projects/" + projectTitle + "/frames");
const getFrame = (projectTitle, frameTitle) =>
  getRequest("projects/" + projectTitle + "/frames/" + frameTitle);
const updateFrame = (projectTitle, frameTitle, updateObject) => {
  const attribute = Object.keys(updateObject)[0];
  return putRequest("projects/" + projectTitle + "/frames/" + frameTitle, {
    attribute,
    [attribute]: updateObject[attribute],
  });
};
const deleteFrame = (projectTitle, frameTitle) =>
  deleteRequest("projects/" + projectTitle + "/frames/" + frameTitle);

const createElement = (projectTitle, frameTitle, element) =>
  postRequest(
    "projects/" + projectTitle + "/frames/" + frameTitle + "/elements",
    element
  );
const getElements = (projectTitle, frameTitle) =>
  getRequest(
    "projects/" + projectTitle + "/frames/" + frameTitle + "/elements"
  );
const getElement = (projectTitle, frameTitle, elementId) =>
  getRequest(
    "projects/" +
      projectTitle +
      "/frames/" +
      frameTitle +
      "/elements/" +
      elementId
  );
const updateElement = (projectTitle, frameTitle, elementId, updatedElement) =>
  putRequest(
    "projects/" +
      projectTitle +
      "/frames/" +
      frameTitle +
      "/elements/" +
      elementId,
    { content: updatedElement }
  );
const deleteElement = (projectTitle, frameTitle, elementId) =>
  deleteRequest(
    "projects/" +
      projectTitle +
      "/frames/" +
      frameTitle +
      "/elements/" +
      elementId
  );

const serverApiService = {
  signUp,
  signIn,
  oauth,
  signOut,
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  createFrame,
  getFrames,
  getFrame,
  updateFrame,
  deleteFrame,
  createElement,
  getElements,
  getElement,
  updateElement,
  deleteElement,
};

export default serverApiService;