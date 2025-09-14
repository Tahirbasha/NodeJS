const { adminAuth } = require('./utils/middlewares/auth');

app.use('/admin', adminAuth);

app.get('/admin/getUsers', (req, res) => {
    res.send('Users Data');
})
