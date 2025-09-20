const express = require('express');
const ConnectReqModel = require('../models/connection-model');
const { authUser } = require("../utils/middlewares/auth");

const connectionRouter = express.Router();

connectionRouter.post('/sendConnection/:status/:toUserId', authUser, async (req, res) => {
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
});

connectionRouter.post('/review/:status/:requestId', authUser, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;
        const validStatuses = ['approve', 'reject'];
        if (!validStatuses.includes(status)) {
            throw new Error("Invalid review status.")
        }
        const request = await ConnectReqModel.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: 'interested'
        });
        if (!request) {
            throw new Error("Connection request not found.")
        }
        request.status = status;
        await request.save();
        res.send(`Request has been ${status}ed successfully.`);
    } catch (err) {
        res.status(400).send(String(err));
    }
});

module.exports = connectionRouter;