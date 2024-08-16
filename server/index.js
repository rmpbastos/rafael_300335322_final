const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Book = require('./models/Book');



const app = express()

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// app.use(cors(
//     {
//         origin: ["https://rafael-300335322-frontend.vercel.app/"],
//         methods: ["POST", "GET"],
//         credentials: true
//     }
// ));

app.use(express.json())

// MongoDB connection
const MONGO_URI = 'mongodb+srv://finaluser:DZNSGYJNFP6gBeLl@cluster0.7rlxnxb.mongodb.net/BookDB?retryWrites=true&w=majority&appName=Cluster0'


mongoose.connect(MONGO_URI);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});


// GET all books
app.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new book
app.post('/add', async (req, res) => {
    const { bookTitle, bookAuthor, description } = req.body;

    try {
        const newBook = new Book({
            bookTitle,
            bookAuthor,
            description,
        });

        await newBook.save();
        res.json('Book added!');
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
});

// DETETE a book
app.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET a book by ID
app.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// PUT (Update) a book by ID
app.put('/:id', async (req, res) => {
    try {
        const { bookTitle, bookAuthor, description } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { bookTitle, bookAuthor, description },
            { new: true } // Return the updated book
        );
        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(updatedBook);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});





app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

