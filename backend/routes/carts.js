const express = require('express');
const router = express.Router();
const { pool } = require('../lib/pool');

router.get('/:cartId', (req, res) => {
    const { cartId } = req.params;
    pool.query('SELECT * FROM carts WHERE id = $1', [cartId], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result.rows);
        }
    });
    pool.end();
});

router.post('/', (req, res) => {
    const { userId } = req.body;
    pool.query('INSERT INTO carts (user_id) VALUES ($1) RETURNING *', [userId], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result.rows[0]);
        }
    });
    pool.end();
});

router.delete('/:cartId', (req, res) => {
    const { cartId } = req.params;
    pool.query('DELETE FROM carts WHERE id = $1', [cartId], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result.rows);
        }
    });
    pool.end();
});

module.exports = router;