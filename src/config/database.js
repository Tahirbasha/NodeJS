const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb+srv://tahirbasha2626:lAPTOA89hc9p6vpn@cluster-mtb.l0jojlm.mongodb.net/mongo_mtb");
}

module.exports = connectDB;