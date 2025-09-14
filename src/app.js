const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/models');

const app = express();

connectDB().then(() => {
    console.log('Database is connected successfully')
    app.listen(8080);

}).catch(() => {
    console.log('Database not connected')
})

app.post('/signup', async(req, res) => {
    const user = new User({
        firstName: "John",
        lastName: "Doe",
        city: "Hyderabad",
    });
    await user.save();
    res.send("User created successfully");
})

// app.use('/', (req, res, next) => {
//     throw new Error('Something')
//     res.send('User data');
// });
// app.use('/', (err, req, res, next) => {
//     console.log(err)
//     if (err) {
//         res.status(500).send('Something went wrong');
//     }
// });
