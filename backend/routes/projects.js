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
        updateElement } = require('../controllers/projectController');

const router = express.Router();

router.post('/', createProject);
router.post('/:projectId/', createFrame);
router.post('/:projectId/frames/:frameId/', createElement);

router.get('/', getProjects);
router.get('/:projectId/', getProject);
router.get('/:projectId/frames/', getFrames);
router.get('/:projectId/frames/:frameId/', getFrame);
router.get('/:projectId/frames/:frameId/elements/', getElements);
router.get('/:projectId/frames/:frameId/elements/:elementId', getElement);

// router.patch('/:projectId/', updateProjectTitle);
// router.patch('/:projectId/frames/:frameId/', updateFrameTitle);
// router.put('/:projectId/frames/:frameId/elements/:elementId', updateElement);

router.delete('/:projectId/', deleteProject);
router.delete('/:projectId/frames/:frameId/', deleteFrame);
router.delete('/:projectId/frames/:frameId/elements/:elementId', deleteElement);

module.exports = router;