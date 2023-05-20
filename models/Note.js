const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    phrase: {
        type: String,
        required:true,
        unique: true,
        lowercase: true,
        minLength: 32

    },
    msg: {
        type: String,
        required:false,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    created: {
        type: Date,
        required: false,
        
    },


})

module.exports = mongoose.model('Note', noteSchema)
