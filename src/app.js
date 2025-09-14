const express = require('express');
const { adminAuth } = require('./utils/middlewares/auth');

const app = express();

app.use('/admin', adminAuth);

app.get('/admin/getUsers', (req, res) => {
    res.send('Users Data');
})

app.listen(8080);