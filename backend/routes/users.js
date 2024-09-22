const express = require('express');
const router = express.Router();
const { pool } = require('../lib/pool');

router.get('/', (req, res) => {
    pool.query('SELECT * FROM users', (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result.rows);
        }
    });
    pool.end();
});

router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    pool.query('SELECT * FROM users WHERE id = $1', [userId], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result.rows);
        }
    });
    pool.end();
});

router.put('/:userId', (req, res) => {
    const { userId } = req.params;
    const { name, password, email, role } = req.body;
    pool.query('UPDATE users SET password = $1, email = $2, role = $3, name = $4 WHERE id = $5', [password, email, role, name, userId], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result.rows);
        }
    });
    pool.end();
});

router.delete('/:userId', (req, res) => {
    const { userId } = req.params;
    pool.query('DELETE FROM users WHERE id = $1', [userId], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result.rows);
        }
    });
    pool.end();
});

module.exports = router;