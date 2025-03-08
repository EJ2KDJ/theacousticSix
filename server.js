require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 4000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

pool.connect()
    .then(() => console.log("Connected to PostgreSQL on Render"))
    .catch(err => console.error("Database connection failed:", err));

app.use(cors());
app.use(express.json());

// GET ALL comments
app.get('/comments', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT *  FROM comments ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch(err) {
        console.error('Error fetching comments:', err);
        res.status(500).send("Server Error");
    }
}); 


app.post('/comments', async (req, res) => {
    const {text} = req.body;

    if(!text) {
        return res.status(400).json({error: 'Comment text is required'});
    }
    try {
        const result = await pool.query(
            'INSERT INTO COMMENTS (text, created_at) VALUES ($1, NOW()) RETURNING *',
            [text]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error adding comments', err);
        res.status(400).send("Server Error");
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${port}`);
});