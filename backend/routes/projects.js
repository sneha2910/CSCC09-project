const express = require('express');
const { createProject,
        deleteProject,
        getProjects,
        getProject,
        updateProjectTitle,
        createFrame,
        deleteFrame,
        getFrames,
        getFrame, 
        updateFrameTitle, 
        createElement,
        deleteElement,
        getElements,
        getElement,
        updateElements  } = require('../controllers/projectController');

const router = express.Router();


module.exports = router;