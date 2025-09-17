const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLenth: 4,
        maxLength: 10
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
    },
    city: {
        type: String,
        default: "Hyderabad"
    },
    age: {
        type: Number,
        min: 10,
        max: 100,
        required: true,
        validate(value) {
            if (isNaN(value)) {
                throw new Error("Required Numeric value")
            }
        }
    },
}, { timestamps: true });

module.exports = mongoose.model("NewUser", userSchema);