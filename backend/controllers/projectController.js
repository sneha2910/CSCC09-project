const {Projects} = require('../models/projectModel');

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
        console.log(err);
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
        console.log(err);
    }
};

const createElement = async (req, res) => {
    const projectId = req.params.projectId;
    const frameId = req.params.frameId;
    const element = req.body;
    console.log(element);
    
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
        console.log(err);
    }
};

module.exports = {
    createProject,
    createFrame,
    createElement
};