const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/models');

const app = express();

app.use(express.json());

connectDB().then(() => {
    console.log('Database is connected successfully')
    app.listen(8080);

}).catch(() => {
    console.log('Database not connected')
})

app.post('/signup', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send("User created successfully");
});

app.get('/getUsers', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
})
app.get('/getUserByName', async (req, res) => {
    try {
        const name = req.body.name;
        const users = await User.find({ firstName: name });
        if (!users.length) {
            res.status(400).send("User not found");
        }
        res.send(users);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
})