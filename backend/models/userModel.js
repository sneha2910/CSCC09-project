const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    isOnline: {
        type: Boolean,
        required: true
    }
}, {timestampData: true});

module.exports = mongoose.model('Users', userSchema);