const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String,
    content: String,
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Note', noteSchema);