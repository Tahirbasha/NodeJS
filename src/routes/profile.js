const express = require('express');
const User = require('../models/user-model');
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
profileRouter.patch('/update', authUser, async (req, res) => {
    try {
        const user = req.user;
        const canBeUpdatedFields = ['firstName', 'lastName', 'city', 'about', 'photoUrl', 'gender'];
        const isValidUpdate = Object.keys(req.body).every(e => canBeUpdatedFields.includes(e));
        if (!isValidUpdate) {
            throw new Error("Invalid update.")
        }
        canBeUpdatedFields.forEach(e => user[e] = req.body[e]);
        await user.save();
        res.send({ message: "User updated successfully:", data: user });
    } catch (err) {
        res.status(400).send("Something went wrong" + err);
    }
});


module.exports = profileRouter;