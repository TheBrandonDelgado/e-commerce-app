const express = require('express');
const app = express();
const port = 3000;
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

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