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