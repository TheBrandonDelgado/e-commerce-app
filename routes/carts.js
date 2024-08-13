const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('GET Carts');
});

router.post('/', (req, res) => {
    res.send('POST Carts');
});

router.put('/', (req, res) => {
    res.send('PUT Carts');
});

router.delete('/', (req, res) => {
    res.send('DELETE Carts');
});

module.exports = router;