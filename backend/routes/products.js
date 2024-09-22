const express = require('express');
const router = express.Router();
const { pool } = require('../lib/pool')

router.get('/', (req, res) => {
    const { category } = req.query;
    if (category) {
        pool.query('SELECT * FROM products WHERE category = $1', [category], (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(result.rows);
            }
        });
    } else {
        pool.query('SELECT * FROM products', (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(result.rows);
            }
        });
    }
    pool.end();
});

router.post('/', (req, res) => {
    const { name, price } = req.body;
    pool.query('INSERT INTO products (name, price, stock) VALUES ($1, $2, 1) ON CONFLICT (name) DO UPDATE SET stock = products.stock + 1', [name, price], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result.rows);
        }
    });
    pool.end();
});

router.get('/:productId', (req, res) => {
    const { productId } = req.params;
    pool.query('SELECT * FROM products WHERE id = $1', [productId], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result.rows);
        }
    });
    pool.end();
});

router.put('/:productId', (req, res) => {
    const { productId } = req.params;
    const { name, price, stock } = req.body;
    pool.query('UPDATE products SET price = $1, stock = $2, name = $3 WHERE id = $4', [price, stock, name, productId], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result.rows);
        }
    });
    pool.end();
});

router.delete('/:productId', (req, res) => {
    const { productId } = req.params;
    pool.query('DELETE FROM products WHERE id = $1', [productId], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result.rows);
        }
    });
    pool.end();
});

module.exports = router;