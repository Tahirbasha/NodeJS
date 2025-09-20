const mongoose = require('mongoose');

const ConnectionModel = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        // Enumeration
        enum: {
            values: ['interested', 'ignored', 'approve', 'reject'],
            message: `{VALUE} is not valid.`
        }
    }
}, { timestamps: true });

// Validation before save.
ConnectionModel.pre("save", function (next) {
    const user = this;
    if (user.fromUserId.equals(user.toUserId)) {
        throw new Error("Cannot send request to oneself.")
    }
    next();
})

// Compund indexes
ConnectionModel.index({ fromUserId: 1, toUserId: 1 });

const connectReqModel = mongoose.model('ConnectionRequests', ConnectionModel);

module.exports = connectReqModel;