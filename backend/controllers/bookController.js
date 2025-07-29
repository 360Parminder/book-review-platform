const Book = require('../models/bookModel');
const AppError = require('../utils/appError');

exports.getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        
        res.status(200).json({
            status: 'success',
            results: books.length,
            data: {
                books
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.getBookById = async (req, res, next) => {
    try {
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
    } catch (error) {
        next(error);
    }
};

exports.createBook = async (req, res, next) => {
    try {
        const newBook = await Book.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                book: newBook
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.updateBook = async (req, res, next) => {
    try {
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
    } catch (error) {
        next(error);
    }
};

exports.deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return next(new AppError('No book found with that ID', 404));
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        next(error);
    }
};