const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('GET Products');
});

router.post('/', (req, res) => {
    res.send('POST Products');
});

router.put('/', (req, res) => {
    res.send('PUT Products');
});

router.delete('/', (req, res) => {
    res.send('DELETE Products');
});

module.exports = router;