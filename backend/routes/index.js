const express = require('express');
const path = require('path');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
});
router.get('/uploads/:name', (req, res) => {
    const filePath = path.join(__dirname, '../', `/uploads/${req.params.name}`);
    res.sendFile(filePath);
});
module.exports = router;
