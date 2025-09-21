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
    about: {
        type: String,
        max: 500,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: {
            values: ['male', 'female', 'others'],
            message: `{VALUE} is not valid.`
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