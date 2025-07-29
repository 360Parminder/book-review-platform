const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  bookId:        { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  reviewerName:  { type: String, required: true },
  rating:        { type: Number, required: true, min: 1, max: 5 },
  comment:       { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', ReviewSchema);
