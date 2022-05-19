const multer = require('multer');
const { body, validationResult } = require('express-validator');
const items = require('../models').Inventoryitem;
const authentication = require('../middlewares/authenticationmiddleware');

let imageName = null;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        imageName = `${Date.now()}-${file.originalname}`;
        cb(null, imageName);
    },
});
const upload = multer({
    storage,
    limits: { fieldNameSize: 1000, fileSize: 102400000 },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png .jpg and .jpeg files are allowed'));
        }
    },
});
exports.getItems = [
    authentication,
    async (req, res) => {
        try {
            const allItems = await items.findAll();
            res.status(200).json(allItems);
        } catch (er) {
            res.status(400).json(er);
        }
    },
];
exports.addItem = [
    authentication,
    upload.single('image'),
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Image name is required')
        .isLength({ min: 7, max: 22 })
        .withMessage('Image Name must be 7 to 22 characters'),
    body('price')
        .notEmpty()
        .isNumeric()
        .withMessage('Price must be an integer value'),
    body('quantity')
        .notEmpty()
        .isNumeric()
        .withMessage('Quantity must be an integer value'),
    body('description')
        .notEmpty()
        .isLength({ min: 12, max: 35 })
        .withMessage('Description must be 12 to 35 characters'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ message: errors });
        } else {
            const { quantity, name, price, description, userId } = req.body;
            const newItem = {
                image: `/uploads/${imageName}`,
                quantity,
                name,
                price,
                description,
                userId,
            };
            try {
                const findItem = await items.findOne({ where: { name } });
                if (findItem) {
                    res.status(400).json({
                        message: 'Item Already Existed',
                    });
                } else {
                    await items.create(newItem);
                    res.status(200).json({
                        message: 'Item added Successfully',
                    });
                }
            } catch (er) {
                res.status(400).json(er);
            }
        }
    },
];
exports.updateItem = [
    authentication,
    upload.single('image'),
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Image name is required')
        .isLength({ min: 7, max: 22 })
        .withMessage('Image Name must be 7 to 22 characters'),
    body('price')
        .notEmpty()
        .isNumeric()
        .withMessage('Price must be an integer value'),
    body('quantity')
        .notEmpty()
        .isNumeric()
        .withMessage('Quantity must be an integer value'),
    body('description')
        .notEmpty()
        .isLength({ min: 12, max: 35 })
        .withMessage('Description must be 12 to 35 characters'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ message: errors });
        } else {
            const { quantity, name, price, description, userId } = req.body;
            const updateItem = {
                image: `/uploads/${imageName}`,
                quantity,
                name,
                price,
                description,
                userId,
            };
            try {
                const findItem = await items.findOne({
                    where: { id: req.params.id },
                });
                if (findItem) {
                    await items.update(updateItem, {
                        where: { id: req.params.id },
                    });
                    res.status(200).json({
                        message: 'Item Updated Successfully',
                    });
                } else {
                    res.status(400).json({
                        message: 'Item Not Found',
                    });
                }
            } catch (er) {
                res.status(400).json(er);
            }
        }
    },
];
exports.getItemByID = [
    authentication,
    async (req, res) => {
        try {
            const findItem = await items.findOne({
                where: { id: req.params.id },
            });
            if (findItem) {
                res.status(200).json({
                    findItem,
                });
            } else {
                res.status(400).json({
                    message: 'Item Not Found',
                });
            }
        } catch (er) {
            res.status(400).json(er);
        }
    },
];
exports.deleteItem = [
    authentication,
    async (req, res) => {
        try {
            const findItem = await items.findOne({
                where: { id: req.params.id },
            });
            if (findItem) {
                await items.destroy({ where: { id: req.params.id } });
                res.status(200).json({
                    message: 'Item deleted successfully',
                });
            } else {
                res.status(400).json({
                    message: 'Item Not Found',
                });
            }
        } catch (er) {
            res.status(400).json(er);
        }
    },
];
