const {Projects} = require('../models/projectModel');

//post methods
const createProject = async (req, res) => {
    const {title} = req.body;
    try {
        if(!title) {
            return res.status(404).json({error: "Please enter all parameters!"});
        }
        let project = await Projects.findOne({ title: title });
        if (project){
            return res.status(409).json({error: "project " + title + " already exists! Try a different name."});
        }

        project = await Projects.create({title});
        res.status(200).json({message: "Project created successfully!"});

    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

const createFrame = async (req, res) => {
    const {title, height, width} = req.body;
    const projectId = req.params.projectId;

    try{
        if(!title || !height || !width) {
            return res.status(404).json({error: "Please enter all parameters!"});
        }
        let project = await Projects.findOne({ _id: projectId });
        if (!project){
            return res.status(400).json({error: "project does not exist!"});
        }

        let frame = project.frames.find(item => item.title == title);
        if (frame) {
            return res.status(409).json({error: "frame " + title + " already exists! Try a different name."});
        }
        project.frames.push({title, height, width});
        await project.save();
        res.status(200).json({message: "Frame created successfully!"});

    }catch (err) {
        res.status(400).json({error: err.message});
    }
};

const createElement = async (req, res) => {
    const projectId = req.params.projectId;
    const frameId = req.params.frameId;
    const element = req.body;
    
    try{
        let project = await Projects.findOne({ _id: projectId });
        if (!project){
            return res.status(400).json({error: "project does not exist!"});
        }

        let frame = project.frames.find(frame => frame._id == frameId);
        if (!frame) {
            return res.status(400).json({error: "frame does not exist!"});
        }

        let index = project.frames.findIndex(frame => frame._id == frameId);
        project.frames[index].elements.push({content: element});
        await project.save();
        res.status(200).json({message: "Element created successfully!"});

    }catch(err) {
        res.status(400).json({error: err.message});
    }
};

//get methods
const getProjects = async (req, res) => {
    
    try{
        let projects = await Projects.find({}, { title: 1, _id: 0 });
        res.status(200).json(projects);
    }catch(err) {
        res.status(400).json({error: err.message});
    }
};

const getProject = async (req, res) => {
    const projectId = req.params.projectId;
    try{
        let project = await Projects.findOne({_id: projectId});
        if(!project) return res.status(400).json({error: "project does not exist!"});

        res.status(200).json(project);
        
    }catch(err) {
        res.status(400).json({error: err.message});
    }
};

const getFrames = async (req, res) => {
    const projectId = req.params.projectId;
    try{
        let project = await Projects.findOne({_id: projectId});
        if(!project) return res.status(400).json({error: "project does not exist!"});
        res.status(200).json(project.frames);
        
    }catch(err) {
        res.status(400).json({error: err.message});
    }
};

const getFrame = async (req, res) => {
    const projectId = req.params.projectId;
    const frameId = req.params.frameId;

    try{
        let project = await Projects.findOne({_id: projectId});
        if(!project){
            return res.status(400).json({error: "project does not exist!"});
        } 

        let frame = project.frames.find(frame => frame._id == frameId);
        if (!frame) {
            return res.status(400).json({error: "frame does not exist!"});
        }

        res.status(200).json(frame);
        
    }catch(err) {
        res.status(400).json({error: err.message});
    }
};

const getElements = async (req, res) => {
    const projectId = req.params.projectId;
    const frameId = req.params.frameId;

    try{
        let project = await Projects.findOne({_id: projectId});
        if(!project){
            return res.status(400).json({error: "project does not exist!"});
        } 

        let frame = project.frames.find(frame => frame._id == frameId);
        if (!frame) {
            return res.status(400).json({error: "frame does not exist!"});
        }

        res.status(200).json(frame.elements);
        
    }catch(err) {
        res.status(400).json({error: err.message});
    }
};

const getElement = async (req, res) => {
    const projectId = req.params.projectId;
    const frameId = req.params.frameId;
    const elementId = req.params.elementId;
    try{
        let project = await Projects.findOne({ _id: projectId });
        if (!project){
            return res.status(400).json({error: "project does not exist!"});
        }

        let frame = project.frames.find(frame => frame._id == frameId);
        if (!frame) {
            return res.status(400).json({error: "frame does not exist!"});
        }

        let index = project.frames.findIndex(frame => frame._id == frameId);
        let element = project.frames[index].elements.find(element => element._id == elementId);
        if (!element) {
            return res.status(400).json({error: "element does not exist!"});
        }
        res.status(200).json(element.content);

    }catch(err) {
        res.status(400).json({error: err.message});
    }
};



module.exports = {
    createProject,
    createFrame,
    createElement,
    getProjects,
    getProject,
    getFrames,
    getFrame,
    getElements,
    getElement
};