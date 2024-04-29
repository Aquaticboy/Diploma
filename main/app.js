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
    let user_ID = 2;


/*
    const min = 2000000000;
    const max = 2999999999;
    user_ID = Math.floor(Math.random() * (max - min + 1)) + min;
*/

/*
    const sql = `SELECT MAX(user_id) AS max_user_id FROM user_information`;
    db_connection.query(sql, (err, results) => {
        user_ID = results[0].max_user_id;
    });
*/


    const sql = `SELECT MAX(user_id) AS max_user_id FROM user_information`;
    db_connection.query(sql, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            return;
        }
        console.log("Query results:", results);
        if (results && results.length > 0) {
            user_ID = results[0].max_user_id;
            console.log("max_user_id:", user_ID);
        } else {
            console.log("No results found.");
        }
    });

    user_ID++;
    const sql1 = `INSERT INTO user_information (user_id, user_name, user_surname, user_login, user_password, user_permition_level) VALUES ('${user_ID}', '${user_name}', '${user_surname}', '${user_login}', '${user_password}', '${user_permition_level}')`;
    db_connection.query(sql1, (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            res.status(500).send('Error registering user');
            return;
        }
        console.log('User registered successfully');
        res.send('User registered successfully');
    });

});




// Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
