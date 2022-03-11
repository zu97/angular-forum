const User = require('../models/User');

const auth =  async (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        return res.status(400).send({error: 'Unknown user'});
    }

    const user = await User.findOne({ token });
    if (!user) {
        return res.status(400).send({error: 'Unknown user'});
    }

    req.user = user;
    next();
};

module.exports = auth;