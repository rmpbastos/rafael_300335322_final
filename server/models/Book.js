const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    bookTitle: { type: String, required: true },
    bookAuthor: { type: String, required: true },
    description: { type: String },
}, {collection: "300335322-rafael"});

// const BookSchema = new mongoose.Schema({
//     bookTitle: { type: String, required: true },
//     bookAuthor: { type: String, required: true },
//     description: { type: String },
// });

const BookModel = mongoose.model('Book', BookSchema);
module.exports = BookModel;