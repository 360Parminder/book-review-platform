const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.addReview = catchAsync(async (req, res, next) => {
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
});

exports.updateReview = catchAsync(async (req, res, next) => {
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
});

exports.deleteReview = catchAsync(async (req, res, next) => {
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
});