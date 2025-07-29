const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');


const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const globalErrHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const app = express();

// Allow Cross-Origin requests
app.use(cors(
    {
        origin: ['http://localhost:5173','https://book-review-platform-x0ai.onrender.com'], // Adjust this to your frontend URL in production
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    }
));

// Set security HTTP headers
app.use(helmet());

// Limit request from the same API 
const limiter = rateLimit({
    max: 150,
    windowMs: 60 * 60 * 1000,
    message: 'Too Many Request from this IP, please try again in an hour'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({
    limit: '15kb'
}));

// Data sanitization against Nosql query injection
app.use(mongoSanitize());

// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());


// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/reviews', reviewRoutes);

// handle undefined Routes
app.use('*', (req, res, next) => {
    const err = new AppError(404, 'fail', 'undefined route');
    next(err, req, res, next);
});

app.use(globalErrHandler);

module.exports = app;