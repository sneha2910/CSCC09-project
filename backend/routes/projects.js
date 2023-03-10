const express = require("express");
const {
  createProject,
  deleteProject,
  getProjects,
  getProject,
  updateProject,
  createFrame,
  deleteFrame,
  getFrames,
  getFrame,
  updateFrame,
  createElement,
  deleteElement,
  getElements,
  getElement,
  updateElement,
  addUser,
  removeUser,
  getUsers,
} = require("../controllers/projectController");

// router is an instance of the express router.
// We use it to define our routes.
// The router will take control of requests starting with path /record.
const router = express.Router();

const isAuthenticated = function (req, res, next) {
  if (!req.session.username)
    return res.status(401).json({
      status: "error",
      message: "Unauthorized",
      code: 401,
    });
  next();
};

//routes to post methods
router.post("/", isAuthenticated, createProject);
router.post("/:projectId/frames/", isAuthenticated, createFrame);
router.post(
  "/:projectId/frames/:frameId/elements/",
  isAuthenticated,
  createElement
);
router.post("/:projectId/users/", isAuthenticated, addUser);

//routes to get methods
router.get("/", isAuthenticated, getProjects);
router.get("/:projectId/", isAuthenticated, getProject);
router.get("/:projectId/frames/", isAuthenticated, getFrames);
router.get("/:projectId/frames/:frameId/", isAuthenticated, getFrame);
router.get(
  "/:projectId/frames/:frameId/elements/",
  isAuthenticated,
  getElements
);
router.get(
  "/:projectId/frames/:frameId/elements/:elementId/",
  isAuthenticated,
  getElement
);
router.get("/:projectId/users/", isAuthenticated, getUsers);

//routes to delete methods
router.delete("/:projectId/", isAuthenticated, deleteProject);
router.delete("/:projectId/frames/:frameId/", isAuthenticated, deleteFrame);
router.delete(
  "/:projectId/frames/:frameId/elements/:elementId/",
  isAuthenticated,
  deleteElement
);

//routes to put/patch methods
router.patch("/:projectId/users/", isAuthenticated, removeUser);
router.patch("/:projectId/", isAuthenticated, updateProject);
router.patch("/:projectId/frames/:frameId/", isAuthenticated, updateFrame);
router.put(
  "/:projectId/frames/:frameId/elements/:elementId/",
  isAuthenticated,
  updateElement
);

module.exports = router;
