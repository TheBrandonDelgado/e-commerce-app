const express = require('express');
const app = express();
const port = 3000;
const productsRoute = require('./routes/products');
const cartsRoute = require('./routes/carts');
const ordersRoute = require('./routes/orders');
const usersRoute = require('./routes/users');
const loginRoute = require('./routes/login');
const { pool } = require('./lib/pool');
app.use(express.json());
app.use('/products', productsRoute);
app.use('/carts', cartsRoute);
app.use('/orders', ordersRoute);
app.use('/users', usersRoute);
app.use('/login', loginRoute);
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

module.exports = {
    pool
};