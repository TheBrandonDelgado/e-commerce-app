const express = require('express');
const router = express.Router();
const { pool } = require('../lib/pool');

/**
 * @swagger
 * /carts/{cartId}:
 *   get:
 *     summary: Get a cart by ID
 *     description: Retrieve a cart by its unique identifier.
 *     parameters:
 *       - in: path
 *         name: cartId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 user_id:
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

/**
 * @swagger
 * /carts:
 *   post:
 *     summary: Create a new cart
 *     description: Create a new cart for a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cart created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 user_id:
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

/**
 * @swagger
 * /carts/{cartId}:
 *   delete:
 *     summary: Delete a cart by ID
 *     description: Delete a cart by its unique identifier.
 *     parameters:
 *       - in: path
 *         name: cartId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cart deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 user_id:
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

/**
 * @swagger
 * /carts/{cartId}/items:
 *   post:
 *     summary: Add an item to a cart
 *     description: Add an item to a cart by specifying the cart ID, product ID, and quantity.
 *     parameters:
 *       - in: path
 *         name: cartId
 *         schema:
 *           type: integer
 *       - in: body
 *         name: item
 *         schema:
 *           type: object
 *           properties:
 *             productId:
 *               type: integer
 *             quantity:
 *               type: integer
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
    
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

/**
 * @swagger
 * /carts/{cartId}/items/{itemId}:
 *   delete:
 *     summary: Remove an item from a cart
 *     description: Remove an item from a cart by specifying the cart ID and item ID.
 *     parameters:
 *       - in: path
 *         name: cartId
 *         schema:
 *           type: integer
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item removed from cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 cart_id:
 *                   type: integer
 *                 product_id:
 *                   type: integer
 *                 quantity:
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

/**
 * @swagger
 * /carts/{cartId}/checkout:
 *   post:
 *     summary: Checkout a cart
 *     description: Checkout a cart by specifying the cart ID.
 *     parameters:
 *       - in: path
 *         name: cartId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cart checked out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 user_id:
 *                   type: integer
 *                 status:
 *                   type: string
 *                 total_amount:
 *                   type: number
 *                 shipping_address:
 *                   type: string
 *                 payment_method:
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