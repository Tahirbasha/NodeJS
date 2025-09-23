const express = require('express');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const connectionRouter = require('./routes/connections');
const userRouter = require('./routes/user');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser());

app.use('/', authRouter, profileRouter, connectionRouter, userRouter);

connectDB().then(() => {
    console.log('Database is connected successfully')
    app.listen(8080);

}).catch(() => {
    console.log('Database not connected')
})