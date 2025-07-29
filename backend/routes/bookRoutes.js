const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController'); // Adjust path as needed
const authController = require('../controllers/authController');

// Define routes
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

router.use(authController.protect);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
