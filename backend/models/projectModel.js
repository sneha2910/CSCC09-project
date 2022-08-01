const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const elementSchema = new Schema({
    content : {
        type: Object
    }
}, {timestampData: true});

const frameSchema = new Schema({
    title: {
        type: String
    },
    height: {
        type: String
    },
    width: {
        type: String
    },
    elements:[elementSchema],
}, {timestampData: true});

const projectSchema = new Schema({
    users: {
        type: [String]
    },
    title: {
        type: String,
        required: true
    },
    frames: [frameSchema]
}, {timestamps: true});

module.exports = mongoose.model('Projects', projectSchema);