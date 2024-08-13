const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('GET Users');
});

router.post('/', (req, res) => {
    res.send('POST Users');
});

router.put('/', (req, res) => {
    res.send('PUT Users');
});

router.delete('/', (req, res) => {
    res.send('DELETE Users');
});

module.exports = router;