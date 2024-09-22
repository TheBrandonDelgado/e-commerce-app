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

router.post('/:cartId/items', (req, res) => {
    const { cartId } = req.params;
    const { productId, quantity } = req.body;
    pool.query('INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *', [cartId, productId, quantity], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result.rows[0]);
        }
    });
    pool.end();
});

router.delete('/:cartId/items/:itemId', (req, res) => {
    const { cartId, itemId } = req.params;
    pool.query('DELETE FROM cart_items WHERE id = $1 AND cart_id = $2', [itemId, cartId], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result.rows);
        }
    });
    pool.end();
}); 

router.post('/:cartId/checkout', (req, res) => {
    const { cartId } = req.params;
    pool.query('SELECT * FROM cart_items WHERE cart_id = $1', [cartId], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result.rows);
        }
    });
});

module.exports = router;