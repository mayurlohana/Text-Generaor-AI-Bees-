const mongoose = require("mongoose");

const generatedCommentSchema = new mongoose.Schema({
    commentText: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    commentTime: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('comment', generatedCommentSchema);

