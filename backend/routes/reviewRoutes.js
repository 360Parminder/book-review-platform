const express = require('express');
const { addReview, updateReview, deleteReview } = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const router = express.Router();


router.use(authController.protect);
// Add a review to a book
router.post('/books/:id/reviews', addReview);

// Update a review
router.put('/:id', updateReview);

// Delete a review
router.delete('/:id', deleteReview);

module.exports = router;