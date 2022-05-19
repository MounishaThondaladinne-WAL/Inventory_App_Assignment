const express = require('express');
const Items = require('../controllers/items');

const router = express.Router();
const { getItems, addItem, updateItem, getItemByID, deleteItem } = Items;
router.get('/', getItems);
router.post('/', addItem);
router.put('/:id', updateItem);
router.get('/getItemById/:id', getItemByID);
router.delete('/delete/:id', deleteItem);
module.exports = router;
