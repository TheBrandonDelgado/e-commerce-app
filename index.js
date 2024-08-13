const express = require('express');
const app = express();
const port = 3000;
const { Pool } = require('pg');
require('dotenv').config();
const productsRoute = require('./routes/products');
const cartsRoute = require('./routes/carts');
const ordersRoute = require('./routes/orders');
const usersRoute = require('./routes/users');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

app.use(express.json());
app.use('/products', productsRoute);
app.use('/carts', cartsRoute);
app.use('/orders', ordersRoute);
app.use('/users', usersRoute);

app.get('/', (req, res) => {
    pool.query('SELECT * FROM users', (err, res) => {
        if (err) {
          console.error('Error executing query', err.stack);
        } else {
          console.log('Query result:', res.rows);
        }
        pool.end();
    });
    res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});