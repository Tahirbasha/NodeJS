const express = require('express');
const User = require('../models/user-model');
const { authUser } = require("../utils/middlewares/auth");
const ConnectReqModel = require('../models/connection-model');

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
        const canBeUpdatedFields = ['firstName', 'lastName', 'city', 'age'];
        const isValidUpdate = Object.keys(req.body).every(e => canBeUpdatedFields.includes(e));
        if (!isValidUpdate) {
            throw new Error("Invalid update.")
        }
        canBeUpdatedFields.forEach(e => user[e] = req.body[e]);
        await user.save();
        res.send("User updated successfully:", user);
    } catch (err) {
        res.status(400).send("Something went wrong" + err);
    }
});

profileRouter.post('/sendConnection/:status/:toUserId', authUser, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, toUserId } = req.params;
        const toUser = await User.findById(toUserId);
        if (!toUser) {
            throw new Error("Invalid connection to be sent user.")
        }
        const connectionReq = await ConnectReqModel.findOne({ toUserId });
        console.log('connectionReq: ', connectionReq)
        if (connectionReq) {
            throw new Error(`The ${status} request already sent to ${toUser.firstName}.`)
        }
        const connectReq = new ConnectReqModel({
            fromUserId: loggedInUser._id,
            toUserId: toUserId,
            status: status
        });
        await connectReq.save();
        res.send(toUser.firstName + ' has been ' + status + ' successfully.');

    } catch (err) {
        res.status(400).send(String(err));
    }
})

module.exports = profileRouter;