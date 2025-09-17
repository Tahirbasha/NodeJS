const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/models');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

connectDB().then(() => {
    console.log('Database is connected successfully')
    app.listen(8080);

}).catch(() => {
    console.log('Database not connected')
})

app.post('/signup', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
        city: req.body.city,
        age: req.body.age,
    });
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

app.delete('/delete', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.body.userId);
        res.send("User delete successfully");
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
})
app.patch('/update', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.body.userId, req.body, { returnDocument: "after" });
        res.send("User updated successfully:", updatedUser);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
})