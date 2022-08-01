const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    isOnline: {
        type: Boolean,
        required: true
    },
    picture:{
        type: String
    }
}, {timestampData: true});

module.exports = mongoose.model('Users', userSchema);