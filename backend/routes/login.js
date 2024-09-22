const express = require('express');
const router = express.Router();
const { pool } = require('../lib/pool');
const { passport } = require('../lib/passport');

router.post('/', 
    passport.authenticate('local', { 
        failureRedirect: '/login',
        failureMessage: true
    }), 
    (req, res) => {
        res.redirect('/~' + req.user.email);
    }
);

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const { rows: users } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (users.length > 0) {
        res.status(400).send('User already exists');
    } else {
        users.push({ email, password });
        res.status(200).send('User created');
    }
    pool.end();
});

module.exports = router;