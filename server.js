const express = require('express');
const logger = require('./middleware/logger');
const booksRouter = require('./routes/books');

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(logger);

app.use('/books', booksRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the Library API!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);

});