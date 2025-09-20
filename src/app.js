const express = require('express');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/', authRouter, profileRouter);

connectDB().then(() => {
    console.log('Database is connected successfully')
    app.listen(8080);

}).catch(() => {
    console.log('Database not connected')
})