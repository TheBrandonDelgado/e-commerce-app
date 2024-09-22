const express = require('express');
const router = express.Router();
const { pool } = require('../lib/pool')

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of products
 *     description: Retrieve a list of products. Can be filtered by category.
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category to filter by
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   stock:
 *                     type: integer
 *                   category:
 *                     type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

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

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with a name and price. If the product already exists, its stock will be incremented.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer  
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:  
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

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

/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     summary: Retrieve a product by ID
 *     description: Retrieve a product by its unique identifier.
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:    
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 stock:
 *                   type: integer
 *                 category:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:    
 *                 error:
 *                   type: string
 */

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

/**
 * @swagger
 * /products/{productId}:
 *   put:
 *     summary: Update a product by ID
 *     description: Update a product by its unique identifier.
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 stock:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer  
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 stock:
 *                   type: integer
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

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

/**
 * @swagger
 * /products/{productId}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Delete a product by its unique identifier.
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 stock:
 *                   type: integer
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

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