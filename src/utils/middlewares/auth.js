const jwt = require("jsonwebtoken");
const User = require("../../models/user-model")

const authUser = async (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        res.status(401).send("Invalid Authorization Token")
    }
    const decodedToken = await jwt.verify(token, "MYSECRETKEY");
    const { userId } = decodedToken;
    console.log('User: ', User)
    const user = await User.findOne({ _id: userId });
    if (!user) {
        throw new Error("Invalid User, please register");
    }
    req.user = user;
    next();
}

module.exports = { authUser }