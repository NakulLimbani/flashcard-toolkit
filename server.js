const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your MySQL username
    password: 'NakulLimbani', // replace with your MySQL password
    database: 'flashcards_db'
});

app.get('/flashcards', (req, res) => {
    db.query('SELECT * FROM flashcards', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/flashcards', (req, res) => {
    const { question, answer } = req.body;
    db.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [question, answer], (err) => {
        if (err) throw err;
        res.send('Flashcard added');
    });
});

app.put('/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    db.query('UPDATE flashcards SET question = ?, answer = ? WHERE id = ?', [question, answer, id], (err) => {
        if (err) throw err;
        res.send('Flashcard updated');
    });
});

app.delete('/flashcards/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM flashcards WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.send('Flashcard deleted');
    });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});