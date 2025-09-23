const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user-model');
const authRouters = express.Router();

authRouters.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailId: req.body.emailId,
            password: hashedPassword,
            city: req.body.city,
            gender: req.body.gender,
            about: req.body.about,
        });
        await user.save();
        res.send("User created successfully");
    } catch (err) {
        res.status(400).send(String(err));
    }
});

authRouters.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ emailId: req.body.emailId });
        if (!user) {
            throw new Error("Invalid User, please register");
        }
        const isValidPassword = await user.bcrypt(req.body.password)
        if (!isValidPassword) {
            throw new Error("Invalid Credentials");
        }
        const token = await user.getJwt();
        res.cookie("token", token);
        res.send({ data: user })
    } catch (err) {
        res.status(400).send(String(err));
    }
});

authRouters.get('/logout', (req, res) => {
    res.cookie("token", null, { expires: new Date(new Date()) }).send('Logged out successfully.');
})
module.exports = authRouters;