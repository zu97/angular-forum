const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const users = require('./app/users');
const posts = require('./app/posts');
const comments = require('./app/comments');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', users);
app.use('/posts', posts);
app.use('/comments', comments);

const run = async () => {
    await mongoose.connect(config.mongoConfig.url, config.mongoConfig.options);

    app.listen(port, () =>  {
        console.log(`Server started on ${port} port`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch((e) => console.log(e));