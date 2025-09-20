const express = require('express');
const User = require('../models/models');
const { authUser } = require("../utils/middlewares/auth");

const profileRouter = express.Router();

profileRouter.get('/profile', authUser, async (req, res) => {
    try {
        res.send(req.user);
    } catch (err) {
        res.status(400).send(String(err));
    }
})

profileRouter.get('/getUsers', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
})
profileRouter.get('/getUserByName', async (req, res) => {
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

profileRouter.delete('/delete', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.body.userId);
        res.send("User delete successfully");
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
})
profileRouter.patch('/update', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.body.userId, req.body, { returnDocument: "after" });
        res.send("User updated successfully:", updatedUser);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
})

module.exports = profileRouter;