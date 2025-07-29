const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');

exports.addReview = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        console.log(`Adding review for book ID: ${bookId}`);
        
        const existingReview = await Review.findOne({
            bookId: bookId,
            user: req.user.id // Ensure user can only add one review per book
        });

        if (existingReview) {
            return next(new AppError( 400, 'fail', 'You have already reviewed this book'), req, res, next);
        }

        const review = await Review.create({
            user: req.user.id, // Assuming user ID is available in req.user
            bookId: bookId,
            reviewerName: req.user.name, // Assuming user name is available
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
            return next(new AppError(404, 'fail', 'No review found or you are not authorized'), req, res, next);
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
            user: req.user.id   // Ensure user owns the review
        });

        if (!review) {
            return next(new AppError(404, 'fail', 'No review found or you are not authorized'), req, res, next);
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        next(error);
    }
};