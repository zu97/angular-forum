const mongoose = require('mongoose');
const Post = require("./Post");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    datetime: {
        type: String,
        default: new Date().toISOString(),
        required: true,
    },
});

CommentSchema.pre('save', async function(next) {
    if (!this.isModified('post')) {
        return next();
    }

    await Post.findOneAndUpdate({ _id: this.post._id }, { $inc: {'commentsCount': 1} });
    next();
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;