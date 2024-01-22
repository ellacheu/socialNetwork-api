const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUser, getRandomThought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async() => {
    console.log('connected');

    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }

    let thougthCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thougthCheck.length) {
        await connection.dropCollection('thoughts');
    }

    const users = [];

    for (let i = 0; i < 7; i++) {

        const username = getRandomUser();
        const email = username + '@gmail.com'

        const thought = await Thought.create({
            thoughtText: getRandomThought(),
            username,
        });

        users.push({
            username,
            email,
            thoughts: [thought.thoughtText],
            _id: thought._id,
        });
    }

    await User.collection.insertMany(users);

    console.table(users);
    console.info('Seeding Successful!');
    process.exit(0);

});