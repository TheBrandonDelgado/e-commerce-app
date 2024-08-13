const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('GET Orders');
});

router.post('/', (req, res) => {
    res.send('POST Orders');
});

router.put('/', (req, res) => {
    res.send('PUT Orders');
});

router.delete('/', (req, res) => {
    res.send('DELETE Orders');
});

module.exports = router;