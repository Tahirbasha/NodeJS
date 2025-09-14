const adminAuth = (req, res, next) => {
    const isAuthenticated = 'xyzs';
    console.log('Checked authentication')
    if (isAuthenticated === 'xyz') {
        next();
    } else {
        res.status(401).send('Unauthorized Request');
    }
}

module.exports = { adminAuth }