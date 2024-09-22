const express = require('express');
const router = express.Router();
const { pool } = require('../lib/pool');

router.post('/', 
    passport.authenticate('local', { 
        failureRedirect: '/login',
        failureMessage: true
    }), 
    (req, res) => {
        res.redirect('/~' + req.user.username);
    }
);

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const { rows: users } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (users.length > 0) {
        res.status(400).send('User already exists');
    } else {
        users.push({ username, password });
        res.status(200).send('User created');
    }
    pool.end();
});

module.exports = router;