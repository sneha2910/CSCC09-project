const { Worker} = require('worker_threads');
const Projects = require('../models/projectModel');
const Users = require('../models/userModel');

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
        let users = [req.session.username];
        project = await Projects.create({users, title});
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
        let project = await Projects.findOne({ title: projectId });
        if (!project){
            return res.status(400).json({error: "project does not exist!"});
        }

        let frame = project.frames.find(item => item.title == title);
        if (frame) {
            return res.status(409).json({error: "frame " + title + " already exists! Try a different name."});
        }
        project.frames.push({title, height, width});
        await project.save();
        res.status(200).json({message: "Frame created successfully!",
                            frame: {title, height, width}});

    }catch (err) {
        res.status(400).json({error: err.message});
    }
};

const createElement = async (req, res) => {
    const projectId = req.params.projectId;
    const frameId = req.params.frameId;
    const element = req.body;
    
    try{
        let project = await Projects.findOne({ title: projectId });
        if (!project){
            return res.status(400).json({error: "project does not exist!"});
        }

        let frame = project.frames.find(frame => frame.title == frameId);
        if (!frame) {
            return res.status(400).json({error: "frame does not exist!"});
        }

        let index = project.frames.findIndex(frame => frame.title == frameId);
        project.frames[index].elements.push({content: element});
        await project.save();
        res.status(200).json({message: "Element created successfully!"});

    }catch(err) {
        res.status(400).json({error: err.message});
    }
};

const addUser = async (req, res) => {
    const projectId = req.params.projectId;
    const email = req.body.email;
    try {
        if(!email) {
            return res.status(404).json({error: "Please enter all parameters!"});
        }
        let project = await Projects.findOne({_id: projectId});
        if (!project){
            return res.status(400).json({error: "project does not exist!"});
        }
        let user = await Users.findOne({email: email});
        if(!user){
            return res.status(400).json({error: "User is not registered with UI lab. Please enter valid email."});
        }

        if(req.session.username == user.username){
            return res.status(400).json({error: "Cannot add yourself to a project!"});
        }

        if(project.users.includes(user.username)){
            return res.status(400).json({error: "User already added!"});
        }

        let workerData = {action: 'add', sessionUser: req.session.username, projectTitle: project.title, username: user.username, email: email};
        let worker = new Worker('./worker.js', {workerData: workerData});
        worker.once("message", (success) => {
            if (!success){
                res.status(400).json({error: "Email not sent!"});
                worker.terminate();
            }
            else{
                project.users.push(user.username);
                project.save();
                res.status(200).json({message: "User added successfully!"});
                worker.terminate();
            }
        });

    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

//get methods
const getProjects = async (req, res) => {
    try{
        let projects = await Projects.find({}, { title: 1, _id: 0 });
        res.status(200).json({status: "success", projects});
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
        let project = await Projects.findOne({title: projectId});
        if(!project) return res.status(400).json({error: "project does not exist!"});
        res.status(200).json({
            status: "success",
            frames: project.frames,
        });
        
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
        let project = await Projects.findOne({title: projectId});
        if(!project){
            return res.status(400).json({error: "project does not exist!"});
        } 

        let frame = project.frames.find(frame => frame.title == frameId);
        if (!frame) {
            return res.status(400).json({error: "frame does not exist!"});
        }

        res.status(200).json({
            status: "success",
            elements: frame.elements,
        });
        
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
        res.status(200).json(element);

    }catch(err) {
        res.status(400).json({error: err.message});
    }
};

const getUsers = async (req, res) => {
    const projectId = req.params.projectId;
    try{
        let project = await Projects.findOne({_id: projectId});
        if(!project) return res.status(400).json({error: "project does not exist!"});

        res.status(200).json(project.users);
        
    }catch(err) {
        res.status(400).json({error: err.message});
    }
};

//delete methods
const deleteProject = async (req, res) => {
    const projectId = req.params.projectId;
    try{
        let project = await Projects.findOne({_id: projectId});
        if(!project) return res.status(400).json({error: "project does not exist!"});
        
        await Projects.remove({_id : projectId});  
        return res.status(200).json({message: "Project deleted!"});
        
    }catch(err) {
        res.status(400).json({error: err.message});
    }
};

const deleteFrame = async (req, res) => {
    const projectId = req.params.projectId;
    const frameId = req.params.frameId;

    try{
        let project = await Projects.findOne({_id: projectId});
        if(!project) return res.status(400).json({error: "project does not exist!"});
        
        let frame = project.frames.find(frame => frame._id == frameId);
        if (!frame) {
            return res.status(400).json({error: "frame does not exist!"});
        }

        let index = project.frames.findIndex(frame => frame._id == frameId);
        project.frames.splice(index);
        project.save();
        res.status(200).json({message: "Frame deleted!"});
    }catch(err) {
        res.status(400).json({error: err.message});
    }
};

const deleteElement = async (req, res) => {
    const projectId = req.params.projectId;
    const frameId = req.params.frameId;
    const elementId = req.params.elementId;
    try{
        let project = await Projects.findOne({ title: projectId });
        if (!project){
            return res.status(400).json({error: "project does not exist!"});
        }

        let frame = project.frames.find(frame => frame.title == frameId);
        if (!frame) {
            return res.status(400).json({error: "frame does not exist!"});
        }

        let index = project.frames.findIndex(frame => frame.title == frameId);
        let element = project.frames[index].elements.find(element => element._id == elementId);
        if (!element) {
            return res.status(400).json({error: "element does not exist!"});
        }

        let i = project.frames[index].elements.findIndex(element => element._id == elementId);
        project.frames[index].elements.splice(i, 1);
        project.save();
        res.status(200).json({message: "Element deleted!"});

    }catch(err) {
        res.status(400).json({error: err.message});
    }
};


//put/patch methods
const updateProject = async (req, res) => {
    const projectId = req.params.projectId;
    const title = req.body.title;
    try{
        if(!title){
            res.status(400).json({error: "Please provide new title"});
        }
        let project = await Projects.findOneAndUpdate({_id: projectId}, {$set:{title: title}});
        if(!project) return res.status(400).json({error: "project does not exist!"});

        res.status(200).json({message: "Project title updated!"});
        
    }catch(err) {
        res.status(400).json({error: err.message});
    }
};

const updateFrame= async (req, res) => {
    const projectId = req.params.projectId;
    const frameId = req.params.frameId;
    const attribute = req.query.attribute;

    try{
        if(!attribute || !req.body){
            res.status(400).json({error: "Please provide all parameters"});
        }
        
        let project = await Projects.findOne({_id: projectId});
        if(!project) return res.status(400).json({error: "project does not exist!"});
        
        let frame = project.frames.find(frame => frame._id == frameId);
        if (!frame) {
            return res.status(400).json({error: "frame does not exist!"});
        }

        let index = project.frames.findIndex(frame => frame._id == frameId);

        switch(attribute){

            case "title":
                project.frames[index].title = req.body.title;
                break;

            case "height":
                project.frames[index].height = req.body.height;
                break;
            
            case "width":
                project.frames[index].width = req.body.width;
                break;

        }
        
        project.save();
        res.status(200).json({message: "Frame updated!"});
        
    }catch(err) {
        res.status(400).json({error: err.message});
    }
};

const updateElement = async (req, res) => {
    const projectId = req.params.projectId;
    const frameId = req.params.frameId;
    const elementId = req.params.elementId;
    const content = req.body.content;
    try{
        if(!content){
            res.status(400).json({error: "Please provide all parameters"});
        }
        
        let project = await Projects.findOne({title: projectId});
        if(!project) return res.status(400).json({error: "project does not exist!"});
        
        let frame = project.frames.find(frame => frame.title == frameId);
        if (!frame) {
            return res.status(400).json({error: "frame does not exist!"});
        }

        let index = project.frames.findIndex(frame => frame.title == frameId);
        let element = project.frames[index].elements.find(element => element._id == elementId);
        if (!element) {
            return res.status(400).json({error: "element does not exist!"});
        }


        let i = project.frames[index].elements.findIndex(element => element._id == elementId);
        project.frames[index].elements[i].content = content;
        project.save();
        res.status(200).json({message: "Element updated!"});
        
    }catch(err) {
        res.status(400).json({error: err.message});
    }
};

const removeUser = async (req, res) => {
    const projectId = req.params.projectId;
    const username = req.query.username;
    try{
        let project = await Projects.findOne({_id: projectId});
        if(!project) return res.status(400).json({error: "project does not exist!"});

        let i = project.owners.findIndex(user => user == username);
        project.users.splice(i, 1);
        project.save();

        res.status(200).json(project.users);
        
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
    getElement,
    deleteProject,
    deleteFrame,
    deleteElement,
    updateProject,
    updateFrame,
    updateElement,
    addUser,
    getUsers,
    removeUser
};