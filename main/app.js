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
    user: 'admin',
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
    const { user_id, user_name, user_surname, user_login, user_password, user_permition_level } = req.body;
    
    
    // Insert new user into the database
    const sql = `INSERT INTO user_information (user_id, user_name, user_surname, user_login, user_password, user_permition_level) VALUES ('${user_id}', '${user_name}', '${user_surname}', '${user_login}', '${user_password}', '${user_permition_level}')`;
    db_connection.query(sql, (err, result) => {
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
