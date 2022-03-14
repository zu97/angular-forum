const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');
const mongoose = require("mongoose");

const config = require('../config');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const router = express.Router();
const upload = multer({ storage });

router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.find().sort({_id: -1}).populate('user', 'name');
        res.send(posts);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id).populate('user', 'name');
        if (!post) {
            return res.status(404).send({error: 'Not found'});
        }

        res.send(post);
    } catch (e) {
        next(e);
    }
});

router.post('/', auth, upload.single('image'), async (req, res, next) => {
    try {
        const postData = req.body;
        postData.user = req.user.id;

        if (req.file) {
            postData.image = req.file.filename;
        }

        const post = new Post(postData);
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