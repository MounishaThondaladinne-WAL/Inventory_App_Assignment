const express = require('express');
const Users = require('../controllers/users');

const router = express.Router();
const { getUsers, newUser, loginUser } = Users;
router.get('/', getUsers);
router.post('/', newUser);
router.post('/login', loginUser);
module.exports = router;
