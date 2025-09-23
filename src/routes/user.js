const express = require('express');
const userRouter = express.Router();
const ConnectionModel = require('../models/connection-model');
const User = require('../models/user-model');

const { authUser } = require('../utils/middlewares/auth')

const USER_SAFE_COLUMNS = ["firstName", "lastName", "about", "city"]
userRouter.get('/user/requests', authUser, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const requests = await ConnectionModel.find({
            toUserId: loggedInUser._id,
            status: 'interested'
        }).populate("fromUserId", USER_SAFE_COLUMNS);
        return res.send(requests);
    } catch (err) {
        res.status(400).send(String(err));
    }
});

userRouter.get('/user/connections', authUser, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connections = await ConnectionModel.find({
            $or: [
                { fromUserId: loggedInUser._id, status: 'approve' },
                { toUserId: loggedInUser._id, status: 'approve' },
            ]
        }).populate("fromUserId", USER_SAFE_COLUMNS)
            .populate("toUserId", USER_SAFE_COLUMNS);
        const data = connections.map(document => document.toUserId);
        res.send(data);
    } catch (err) {
        res.status(400).send(String(err));
    }
});

userRouter.get('/feed', authUser, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const sentOrReceivedRequests = await ConnectionModel.find({
            $or: [{
                fromUserId: loggedInUser._id
            }, { toUserId: loggedInUser._id }]
        }).select('fromUserId toUserId');
        const hideUserFromFeed = new Set();
        sentOrReceivedRequests.forEach(e => {
            hideUserFromFeed.add(e.fromUserId);
            hideUserFromFeed.add(e.toUserId);
        })
        const users = await User.find({
            $and: [{ _id: { $nin: Array.from(hideUserFromFeed) } }, {
                _id: {
                    $ne: loggedInUser._id
                }
            }]
        }).select(USER_SAFE_COLUMNS);
        res.send(users);
    } catch (err) {
        res.status(400).send(String(err));
    }
})

module.exports = userRouter;