const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: function() {
            return !this.description && !this.image;
        },
    },
    image: {
        type: String,
        required: function() {
            return !this.description && !this.image;
        },
    },
    commentsCount: {
        type: Number,
        default: 0,
        required: true,
    },
    datetime: {
        type: String,
        default: new Date().toISOString(),
        required: true,
    },
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;