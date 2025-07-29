const Book = require('../models/Book');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllBooks = catchAsync(async (req, res, next) => {
    const books = await Book.find();
    
    res.status(200).json({
        status: 'success',
        results: books.length,
        data: {
            books
        }
    });
});

exports.getBookById = catchAsync(async (req, res, next) => {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
        return next(new AppError('No book found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            book
        }
    });
});

exports.createBook = catchAsync(async (req, res, next) => {
    const newBook = await Book.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            book: newBook
        }
    });
});

exports.updateBook = catchAsync(async (req, res, next) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!book) {
        return next(new AppError('No book found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            book
        }
    });
});

exports.deleteBook = catchAsync(async (req, res, next) => {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
        return next(new AppError('No book found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});