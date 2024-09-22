const express = require('express');
const router = express.Router();
const { pool } = require('../lib/pool');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API endpoints for managing orders
 */ 

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve a list of all orders
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     description: Create a new order with the specified details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               cartId:
 *                 type: integer
 *               status:
 *                 type: string
 *               total_amount:
 *                 type: number
 *               shipping_address:
 *                 type: string
 *               payment_method:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
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

/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     summary: Get an order by ID
 *     description: Retrieve an order by its ID
 *     parameters:
 *       - name: orderId
 *         in: path
 *         description: ID of the order to retrieve
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
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

/**
 * @swagger
 * /orders/{orderId}:
 *   put:
 *     summary: Update an order by ID
 *     description: Update an existing order by its ID
 *     parameters:
 *       - name: orderId
 *         in: path
 *         description: ID of the order to update
 *         required: true
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               cartId:
 *                 type: integer
 *               status:
 *                 type: string
 *               total_amount:
 *                 type: number
 *               shipping_address:
 *                 type: string
 *               payment_method:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
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

/**
 * @swagger
 * /orders/{orderId}:
 *   delete:
 *     summary: Delete an order by ID
 *     description: Delete an existing order by its ID
 *     parameters:
 *       - name: orderId
 *         in: path
 *         description: ID of the order to delete
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
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