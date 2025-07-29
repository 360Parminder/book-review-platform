const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');

exports.addReview = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const userId = req.user.id; // From auth middleware

        const review = await Review.create({
            book: bookId,
            user: userId,
            rating: req.body.rating,
            comment: req.body.comment
        });

        res.status(201).json({
            status: 'success',
            data: {
                review
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.updateReview = async (req, res, next) => {
    try {
        const review = await Review.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id // Ensure user owns the review
            },
            {
                rating: req.body.rating,
                comment: req.body.comment
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!review) {
            return next(new AppError('No review found or you are not authorized', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                review
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteReview = async (req, res, next) => {
    try {
        const review = await Review.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id // Ensure user owns the review
        });

        if (!review) {
            return next(new AppError('No review found or you are not authorized', 404));
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        next(error);
    }
};