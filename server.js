const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
const e = require('express');
const app = express();
const port = 4000;


app.use(cors);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'comment_section',
    password: 'postgres',
    port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to the databse:'. err);
    } else {
        console.log('Database connection succesful:', res.rows[0]);
    }
});


// GET ALL comments
app.get('/comments', async (req, res) => {
    try {

    } catch(err) {
        console.error('Error fetching comments:', err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}); 

app.post('/comments', async (req, res) => {
    const {text} = req.body;

    if(!text) {
        return res.status(400).json({error: 'Comment text is required'});
    }

    try {
        const result = await pool.query(
            'INSERT INTO COMMENTS (text) VALUES ($1) RETURNING *',
            [text]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error adding comments', err);
        res.status(400).json({error: 'Internal server error'})
    }
});


app.listen(port, () => {
    console.log('Server running at https://localhost:${port}');
});