const express = require('express');

const app = express();

app.use('/express', (req, res) => {
    res.send('Welcome to express js');
});

app.use((req, res) => {
    res.send('Welcome to node js');
});

app.listen(8080);