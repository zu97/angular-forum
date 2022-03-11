const express = require('express');
const mongoose = require("mongoose");

const Post = require('../models/Post');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.find().sort({_id: -1});
        res.send(posts);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send({error: 'Not found'});
        }

        res.send(post);
    } catch (e) {
        next(e);
    }
});

router.post('/', auth, async (req, res, next) => {
    try {
        const post = new Post(req.body);
        await post.save();

        res.send(post);
    } catch(e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        next(e);
    }
});

module.exports = router;