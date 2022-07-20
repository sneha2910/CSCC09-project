const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    frames: [frameSchema]
}, {timestamps: true});

const frameSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    width: {
        type: String,
        required: true
    },
    elements:[elementSchema],
}, {timestampData: true});

const elementSchema = new Schema({
    type : Object
}, {timestampData: true});


// const positionSchema = new Schema({
//     display: {
//         type: String
//     },
//     height: {
//         type: String
//     },
//     left: {
//         type: String
//     },
//     position: {
//         type: String
//     },
//     top: {
//         type: String
//     },
//     width: {
//         type: String,
//     },
// });

// const styleSchema = new Schema({
//     backgroundColor: {
//         type: String
//     },
//     borderColor: {
//         type: String
//     },
//     borderRadius: {
//         type: String
//     },
//     borderStyle: {
//         type: String
//     },
//     borderWidth: {
//         type: String
//     },
// });

// const textSchema = new Schema({
//     content: {
//         type: String
//     },
//     textColor: {
//         type: String
//     },
//     textSize: {
//         type: String
//     }
// });

module.exports = mongoose.model('Projects', projectSchema);