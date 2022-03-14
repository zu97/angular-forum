const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const config = require('./config');
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

const run = async () => {
    await mongoose.connect(config.mongoConfig.url, config.mongoConfig.options);
    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [anna, john] = await User.create({
        email: 'anna@gmail.com',
        password: '123',
        name: 'Anna Marie',
        token: nanoid(),
    }, {
        email: 'john@gmail.com',
        password: '123',
        name: 'John Doe',
        token: nanoid(),
    });

    const [laptop, communication, raccoon] = await Post.create({
        user: john,
        title: 'Laptop',
        description: 'What laptop do you recommended for programming in 2k22?',
        image: 'laptop.jpg',
    }, {
        user: anna,
        title: 'Free communication...',
        description: 'Just for communication',
        image: '',
    }, {
        user: anna,
        title: 'Do you like raccoons?',
        image: 'raccoon.jpg',
    });

    await Comment.create({
        post: raccoon,
        user: john,
        text: 'oh yes they are so cute',
    }, {
        post: communication,
        user: john,
        text: 'Hi everybody. How is your weekend?',
    }, {
        post: communication,
        user: anna,
        text: 'Hello, we are resting with the whole family. Where are you from, what city?',
    }, {
        post: communication,
        user: john,
        text: 'I`m from California',
    });

    await mongoose.connection.close();
};

run().catch((e) => console.log(e));