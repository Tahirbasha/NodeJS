const mongoose = require('mongoose');
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLenth: 4,
        maxLength: 15
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Please provide a valid email.")
            }
        }
    },
    password: {
        type: String,
        required: true,
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

userSchema.methods.getJwt = async function () {
    const user = this;
    const token = await jwt.sign({ userId: user._id }, "MYSECRETKEY", { expiresIn: '1d' });
    return token;
}
userSchema.methods.bcrypt = async function (password) {
    const user = this;
    const isValidPassword = await bcrypt.compare(password, user.password)
    return isValidPassword;
}
module.exports = mongoose.model("NewUser", userSchema);