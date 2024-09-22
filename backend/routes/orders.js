const express = require('express');
const router = express.Router();
const { pool } = require('../lib/pool');

router.get('/', (req, res) => {
    pool.query('SELECT * FROM orders', (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result.rows);
        }
    });
    pool.end();
});

router.post('/', (req, res) => {
    const { userId, cartId, status, total_amount, shipping_address, payment_method } = req.body;
    pool.query('INSERT INTO orders (user_id, cart_id, status, total_amount, shipping_address, payment_method) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [userId, cartId, status, total_amount, shipping_address, payment_method], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result.rows[0]);
        }
    });
    pool.end();
});

router.get('/:orderId', (req, res) => {
    const { orderId } = req.params;
    pool.query('SELECT * FROM orders WHERE id = $1', [orderId], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result.rows[0]);
        }
    });
    pool.end();
});

router.put('/:orderId', (req, res) => {
    const { orderId } = req.params;
    const { userId, cartId, status, total_amount, shipping_address, payment_method } = req.body;
    pool.query('UPDATE orders SET user_id = $1, cart_id = $2, status = $3, total_amount = $4, shipping_address = $5, payment_method = $6 WHERE id = $7', [userId, cartId, status, total_amount, shipping_address, payment_method, orderId], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result.rows[0]);
        }
    });
    pool.end();
});

router.delete('/:orderId', (req, res) => {
    const { orderId } = req.params;
    pool.query('DELETE FROM orders WHERE id = $1', [orderId], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result.rows);
        }
    });
    pool.end();
});

module.exports = router;