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





app.post('/register', (req, res) => {
    const { user_name, user_surname, user_gender, user_login, user_password, user_permition_level } = req.body;

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

            const insertUserQuery = `INSERT INTO user_information (user_id, user_name, user_surname, user_gender, user_login, user_password, user_permition_level) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            db_connection.query(insertUserQuery, [user_ID, user_name, user_surname, user_gender, user_login, user_password, user_permition_level], (err, result) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    res.status(500).send('Error registering user');
                    return;
                }
                console.log('User registered successfully');
                res.send("true");
            });
        });
    });
});



app.post('/login', (req, res) => {
    const { user_login, user_password } = req.body;

    // Check if user_login is unique
    const checkUniqueLoginQuery = `SELECT COUNT(*) AS count FROM user_information WHERE user_login = '${user_login}'`;
    db_connection.query(checkUniqueLoginQuery, (err, result) => {
        if (err) {
            console.error("Error checking unique login:", err);
            res.status(500).send('Error registering user');
            return;
        }

        const isLoginUnique = result[0].count === 0;
        if (!isLoginUnique) {
            const sql2 = `SELECT user_password AS user_password_from_db FROM user_information WHERE user_login = '${user_login}'`;
            db_connection.query(sql2, (err1, result1) => {
                if (err1) {
                    console.error('Error:', err1);
                    res.status(500).send('Error!');
                    return;
                }
                if (result1[0].user_password_from_db == user_password){
                    let is_password_correct = true;
                    res.send(is_password_correct);
                } else {
                    console.log("Something is incorrect!");
                    is_password_correct = true;
                }
            });
        } else {
            console.error('Login is not registered!');
            res.status(400).send('Login is not registered!');
        }

    });
});

app.post("/getuserinformation", (req, res) =>{
    const { user_login } = req.body;
    const sql = `SELECT * FROM user_information WHERE user_login = ?`;
    db_connection.query(sql, [user_login], (err, result) =>{
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.length > 0) {
            res.json(result[0]); // Sending back the user information
        } else {
            console.log("User not found");
            res.status(404).json({ error: 'User not found' });
        }
    });
});

app.post("/getUserAttemptsToPassTopicTestInformation", (req, res) => {
    const { user_ID } = req.body;
    const sql = `SELECT * FROM attempts_to_pass_topic_test WHERE user_id = ?`;
    db_connection.query(sql, [user_ID], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.length > 0) {
            res.json(result);
        } else {
            console.log("Attempts not found");
            res.status(404).json({ error: 'Attempts not found' });
        }

    });

});

app.post("/getAllTopicInformation", (req, res) => {
    const sql = `SELECT * FROM topic_information`;
    db_connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.length > 0) {
            res.json(result);
        } else {
            console.log("Topics not found");
            res.status(404).json({ error: 'Attempts not found' });
        }

    });


});

app.post("/getInformationForTopicPage", (req, res) =>{
    const { topicId } = req.body;
    const sql = `SELECT * FROM topic_information WHERE topic_id = ?`;
    db_connection.query(sql, [topicId], (err, result) =>{
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.length > 0) {
            res.json(result);
        } else {
            console.log("Topics not found");
            res.status(404).json({ error: 'Attempts not found' });
        }
    });


    
});

// Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
