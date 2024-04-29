const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Create connection to MySQL database
const db_connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'eenglish_database'
});

// Connect to MySQL database
db_connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Handle POST requests to /register
app.post('/register', (req, res) => {
    const { user_name, user_surname, user_login, user_password, user_permition_level } = req.body;

    // Check if user_login is unique
    const checkUniqueLoginQuery = `SELECT COUNT(*) AS count FROM user_information WHERE user_login = ?`;
    db_connection.query(checkUniqueLoginQuery, [user_login], (err, result) => {
        if (err) {
            console.error("Error checking unique login:", err);
            res.status(500).send('Error registering user');
            return;
        }

        const isLoginUnique = result[0].count === 0;

        if (!isLoginUnique) {
            console.error('Login is already registered!');
            res.status(400).send('Login is already registered');
            return;
        }

        // If user_login is unique, proceed with user registration
        const getMaxUserIdQuery = `SELECT MAX(user_id) AS max_user_id FROM user_information`;
        db_connection.query(getMaxUserIdQuery, (err, results) => {
            if (err) {
                console.error("Error executing query to get max user ID:", err);
                res.status(500).send('Error registering user');
                return;
            }

            const user_ID = results && results.length > 0 ? results[0].max_user_id + 1 : 1;

            const insertUserQuery = `INSERT INTO user_information (user_id, user_name, user_surname, user_login, user_password, user_permition_level) VALUES (?, ?, ?, ?, ?, ?)`;
            db_connection.query(insertUserQuery, [user_ID, user_name, user_surname, user_login, user_password, user_permition_level], (err, result) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    res.status(500).send('Error registering user');
                    return;
                }
                console.log('User registered successfully');
                res.send('User registered successfully');
            });
        });
    });
});



app.post('/login', (req, res) => {
    const {} = req.body;

    const sql = ``;

});


// Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
