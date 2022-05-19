const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Users = require('../models').Inventoryuser;
const authentication = require('../middlewares/authenticationmiddleware');

exports.getUsers = [
    authentication,
    async (req, res) => {
        try {
            const regUsers = await Users.findAll();
            res.status(200).json(regUsers);
        } catch (er) {
            res.status(400).json(er);
        }
    },
];
exports.newUser = [
    body('email')
        .trim()
        .normalizeEmail()
        .notEmpty()
        .isEmail()
        .withMessage('Invalid email'),
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 8, max: 20 })
        .withMessage('Username must be between 8 and 20 characters'),
    body('password')
        .notEmpty()
        .isStrongPassword()
        .withMessage(
            'Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, one number ,and one special character'
        ),
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 7 })
        .withMessage('Name must contain atleast 7 characters')
        .isAlpha()
        .withMessage('Special Characters and numbers are not allowed'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ message: errors });
        } else {
            const { email, username, password, name } = req.body;
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);
            try {
                const userExists = await Users.findOne({ where: { username } });
                const emailExists = await Users.findOne({ where: { email } });
                if (userExists) {
                    res.status(400).json({
                        message: 'Username already exists',
                    });
                } else if (emailExists) {
                    res.status(400).json({ message: 'Email already exists' });
                } else {
                    await Users.create({
                        email,
                        username,
                        password: hashedPassword,
                        name,
                    });
                    res.status(200).json({
                        message: 'User Registered Successfully',
                    });
                }
            } catch (er) {
                res.status(400).json(er);
            }
        }
    },
];
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const userExists = await Users.findOne({ where: { email } });
    if (userExists) {
        const isPasswordMatched = await bcrypt.compare(
            password,
            userExists.password
        );
        if (isPasswordMatched === true) {
            const payload = {
                email,
            };
            const jwtToken = jwt.sign(payload, 'MY_SECRET_TOKEN', {
                expiresIn: '50m',
            });
            res.status(200).json({ jwtToken, userExists });
        } else {
            res.status(400).json({ message: 'Invalid Password' });
        }
    } else {
        res.status(400).json({ message: 'Invalid User' });
    }
};
