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

app.post("/getuserinformationbyid", (req, res) =>{
    const { user_id } = req.body;
    const sql = `SELECT * FROM user_information WHERE user_id = ?`;
    db_connection.query(sql, [user_id], (err, result) =>{
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


app.post("/getTopicTest", (req, res) =>{
    const { topicTestId } = req.body;

    const sql = `SELECT * FROM topic_test_information WHERE topic_test_id = ?`;
    db_connection.query(sql, [topicTestId], (err, result) =>{
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.length > 0) {
            res.json(result);
        } else {
            console.log("Test not found");
            res.status(404).json({ error: 'Test not found' });
        }
    });

});

app.post("/sendTestAttempt", (req, res) => {
    const { user_id, topic_test_id, attempt_result } = req.body;
    // Query to get the maximum attempt_id
    const getMaxAttemptIdQuery = `SELECT MAX(attempt_id) AS max_attempt_id FROM attempts_to_pass_topic_test`;

    db_connection.query(getMaxAttemptIdQuery, (err, results) => {
        if (err) {
            console.error("Error executing query to get max attempt ID:", err);
            res.status(500).send('Error registering user');
            return;
        }
        const attempt_id = results && results.length > 0 && results[0].max_attempt_id !== null ? results[0].max_attempt_id + 1 : 1;

        const insertAttemptQuery = `INSERT INTO attempts_to_pass_topic_test (attempt_id, user_id, topic_test_id, attempt_result) VALUES (?, ?, ?, ?)`;
        db_connection.query(insertAttemptQuery, [attempt_id, user_id, topic_test_id, attempt_result], (err, result) => {
            if (err) {
                console.error('Error inserting attempt:', err);
                res.status(500).send('Error inserting attempt');
                return;
            } else {
            console.log('Attempt inserted successfully');
            res.status(200).send('Attempt inserted successfully');
            }
        });
    });
});


app.post("/createTopicAndTopicTest", (req, res) => {
    const { user_id, user_permition_level, topic_name, topic_description, topic_main_information, topic_question_one, topic_question_two, topic_question_three, topic_question_four, topic_question_five, topic_question_six, topic_answer_one, topic_answer_two, topic_answer_three, topic_answer_four, topic_answer_five, topic_answer_six } = req.body;

    const getmaxtopicid = `SELECT MAX(topic_test_id) AS max_topic_test_id FROM topic_test_information`;
    db_connection.query(getmaxtopicid, (err, result) => {
        if (err) {
            console.error('Error getting max topic id:', err);
            res.status(500).send('Error getting max topic id');
            return;
        }

        const topic_id = result && result.length > 0 && result[0].max_topic_test_id !== null ? result[0].max_topic_test_id + 1 : 1;

        const sql1 = `INSERT INTO topic_test_information (topic_test_id, topic_question_one, topic_answer_one, topic_question_two, topic_answer_two, topic_question_three, topic_answer_three, topic_question_four, topic_answer_four, topic_question_five, topic_answer_five, topic_question_six, topic_answer_six) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        db_connection.query(sql1, [topic_id, topic_question_one, topic_answer_one, topic_question_two, topic_answer_two, topic_question_three, topic_answer_three, topic_question_four, topic_answer_four, topic_question_five, topic_answer_five, topic_question_six, topic_answer_six], (err, result) => {
            if (err) {
                console.error('Error inserting topic test:', err);
                res.status(500).send('Error inserting topic test');
                return;
            }

            const sql2 = `INSERT INTO topic_information (topic_id, topic_name, topic_description, topic_creator_information, topic_main_information, topic_test_id) VALUES (?, ?, ?, ?, ?, ?)`;
            db_connection.query(sql2, [topic_id, topic_name, topic_description, user_id, topic_main_information, topic_id], (err, result2) => {
                if (err) {
                    console.error('Error inserting topic information:', err);
                    res.status(500).send('Error inserting topic information');
                    return;
                }

                res.status(200).send('Topic and test created successfully');
            });
        });
    });
});

app.post("/updatesomeuserinformation", (req, res) => {
    const { user_id, userNameforchange, userSurnameforchange, userGenderforchange } = req.body;
    const sql = `UPDATE user_information SET user_name = ?, user_surname = ?, user_gender = ? WHERE user_id = ? `;
    db_connection.query(sql, [userNameforchange, userSurnameforchange, userGenderforchange, user_id], (err, result) => {
        if(err){
            console.log(err);
            return;
        } else {
            console.log("User information updated successfully")
        }
    });
});

app.post("/gettopicpostscreatedby", (req, res) => {
    const { user_id } = req.body;
    const sql = `SELECT * FROM topic_information WHERE topic_creator_information = ?`;
    db_connection.query(sql, [user_id], (err, result) => {
        if(err){
            console.log(err);
            return;
        } else {
            res.json(result);
            console.log("Everything's okay!");
        }
    });
});

app.post("/gettopicinformationandtestbytopicid", (req, res) => {
    //let { topic_id } = req.body;

    // Uncomment for testing with a fixed topic_id:
     topic_id = 2;

    const sql = `SELECT * FROM topic_information WHERE topic_id = ?`;
    db_connection.query(sql, [topic_id], (err, result) => {
        if (err) {
            console.error("Error fetching topic information:", err);
            res.status(500).send("An error occurred while fetching topic information.");
        } else {
            console.log("Query result:", result);
            res.status(200).json(result);
        }
    });
});

app.post('/edittopicinformationandtest', (req, res) => {
    const {
        topic_id, topic_name, topic_description, topic_main_information,
        topic_question_one, topic_question_two, topic_question_three, topic_question_four, topic_question_five, topic_question_six,
        topic_answer_one, topic_answer_two, topic_answer_three, topic_answer_four, topic_answer_five, topic_answer_six
    } = req.body;

    
    const sql = `UPDATE topic_information SET topic_name = ?, topic_description = ?, topic_main_information = ? WHERE topic_id = ?`;
    db_connection.query(sql, [topic_name, topic_description, topic_main_information, topic_id], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        const sql2 = `UPDATE topic_test_information SET 
            topic_question_one = ?, topic_question_two = ?, topic_question_three = ?, topic_question_four = ?, topic_question_five = ?, topic_question_six = ?, 
            topic_answer_one = ?, topic_answer_two = ?, topic_answer_three = ?, topic_answer_four = ?, topic_answer_five = ?, topic_answer_six = ? 
            WHERE topic_test_id = ?`;
        
        db_connection.query(sql2, [
            topic_question_one, topic_question_two, topic_question_three, topic_question_four, topic_question_five, topic_question_six,
            topic_answer_one, topic_answer_two, topic_answer_three, topic_answer_four, topic_answer_five, topic_answer_six, topic_id
        ], (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Table topic_test_information updated!');
        });
    });
});


// Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
