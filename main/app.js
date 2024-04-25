const express = require('express');
const mysql = require('mysql');

const app = express();

app.listen('3000', () => {
    console.log('Server started on port 3000');
});

const db_connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '',
    database: 'eenglish_database'
});

db_connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySql connected");
});



app.get('/register_request', (req, res) => {
    
    var acc_name = '123';
    var acc_surname = 123;
    var acc_login = '213';
    var acc_password = 'dsadwad2121d';

    console.log("It works!");
    let sql = `INSERT INTO justfortest (first, second, third, fourth) VALUES ('${acc_name}', '${acc_surname}', '${acc_login}', '${acc_password}');`;

    db_connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        // Assuming result is a response object, use `res.send` instead of `result.send`
        res.send('query succesful!');
    });
});
