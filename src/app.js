const express = require('express');

const app = express();

app.use('/express', (req, res) => {
    res.send('Welcome to express js');
});

app.use('/welcome', (req, res) => {
    res.send('Welcome to node js');
});

app.use('/users', (req, res) => {
    res.send('Generic');
});

app.get('/users', (req, res) => {
    res.send('Get users');
});

app.post('/users', (req, res) => {
    res.send('Post users');
});

app.delete('/users', (req, res) => {
    res.send('Delete users')
})

app.listen(8080);