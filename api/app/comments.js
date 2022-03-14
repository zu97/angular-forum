const express = require('express');
const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const auth = require("../middleware/auth");
const router = express.Router();

router.get('/:id', async (req, res, next) => {
    try {
        const comments = await Comment.find({post: req.params.id}).populate('user', 'name');
        res.send(comments);
    } catch(e) {
        next(e);
    }
});

router.post('/:id', auth, async (req, res, next) => {
    try {
        const postData = req.body;
        postData.user = req.user.id;
        postData.post = req.params.id;

        const comment = new Comment(postData);
        await comment.save();

        res.send(comment);
    } catch(e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        next(e);
    }
});

module.exports = router;