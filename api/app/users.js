const express = require('express');
const mongoose = require('mongoose');

const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const user = new User(req.body);
        user.generateToken();
        await user.save();

        res.send(user);
    } catch(e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.send(e);
        }

        next(e);
    }
});

router.post('/sessions', async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.send({error: 'Incorrect email or password'});
        }

        const isMatch = await user.checkPassword(req.body.password);
        if (!isMatch) {
            return res.send({error: 'Incorrect email or password'});
        }

        user.generateToken();
        await user.save()

        res.send(user);
    } catch(e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.send(e);
        }

        next(e);
    }
});

router.delete('/sessions', async (req, res, next) => {
   try {
       const message = {message: 'OK'};
       const token = req.get('Authorization');
       if (!token) return res.send(message);

       const user = await User.findOne({ token });
       if (!user) return res.send(message);

       auth.user.generateToken();
       await auth.user.save();

       res.send(message);
   } catch(e) {
       next(e);
   }
});

module.exports = router;