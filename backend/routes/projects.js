const express = require('express');
const { createProject,
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

router.delete('/:projectId/', deleteProject);
router.delete('/:projectId/frames/:frameId/', deleteFrame);
router.delete('/:projectId/frames/:frameId/elements/:elementId', deleteElement);

router.patch('/:projectId/', updateProject);
router.patch('/:projectId/frames/:frameId/', updateFrame);
router.put('/:projectId/frames/:frameId/elements/:elementId', updateElement);

module.exports = router;