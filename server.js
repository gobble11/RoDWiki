const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// SQLite database setup
const dbPath = path.join(__dirname, 'assets', 'RodWiki.sqlite'); // Update the path
const db = new sqlite3.Database(dbPath);

// API endpoint to fetch data
app.get('/api/data', (req, res) => {
    const query = 'SELECT * FROM ItemsView'; // Replace with your actual query
    db.all(query, (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(rows);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
