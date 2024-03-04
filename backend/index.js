const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 80;
app.use(cors({ origin: 'http://localhost:3000' }));

const connection = mysql.createConnection({
    host: '127.0.0.1',
    post: '3306',
    user: 'root',
    password: '@Allahisone1',
    database: 'BookAppont'
});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database: ' + err.stack);
    }
    console.log('Connected to database');
  });

app.use(bodyParser.json());


/*
* To create user
*/ 


app.post('/CreateUser', (req, res) => {
  const newUser = req.body;

  // Check if the email is already in use
  connection.query('SELECT * FROM users WHERE email = ?', newUser.email, (error, results, fields) => {
      if (error) {
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      if (results.length > 0) {
          res.status(400).json({ error: 'Email already in use' });
          return;
      }

      // add new user
      connection.query('INSERT INTO users SET ?', newUser, (error, results, fields) => {
          if (error) {
              res.status(500).json({ error: 'Internal server error' });
              return;
          }
          res.status(201).json({ message: 'User created successfully' });
      });
  });
});


/*
*To login user
*/

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // find user
    connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results, fields) => {
      if (error) {
        res.status(500).send( 'Internal server error' );
      }
  
      // If no user is found
      if (results.length === 0) {
        res.status(404).send( 'User not found' );
        return;
      }
  
      // If the user is found
      res.status(200).send('User found success');
    });
  });

/**
 * Forget Password
 */

app.post('/forget', (req, res) => {
    const { healthid } = req.body;
  
    // query the database to retrieve security
    connection.query('SELECT security_question, security_answer, password FROM users WHERE health_id = ?', healthid, (error, results, fields) => {

      if (error) {
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      // If no user is found
      if (results.length === 0) {
        res.status(404).json({ error: 'User not found with the provided health ID' });
        return;
      }
  
      // If the user is found, return the security question and answer
      const { security_question, security_answer, password } = results[0];
      res.status(200).json({ security_question, security_answer,password });
    });
  });

/**
 * the post apponimnet feature
 */

app.post('/post', (req, res) => {
  const year = req.body.date.year;
  const month = String(req.body.date.month).padStart(2, '0'); // Zero-pad month
  const day = String(req.body.date.day).padStart(2, '0'); // Zero-pad day

  const DateOf = `${year}-${month}-${day}`;

  const Time = req.body.time;
  const Reason = req.body.reason;
  const Duration = req.body.duration;
  const SelectedHospital = req.body.selectedHospital;

  console.log(req.body);
  // Insert the appointment
  connection.query('INSERT INTO Posts (UserID, Date, Time, Reason, Duration, SelectedHospital) VALUES (?, ?, ?, ?, ?, ?)', 
    [1, DateOf, Time, Reason, Duration, SelectedHospital], (error, results, fields) => {

      if (error) {
        console.error('Error posting appointment:', error);
        return res.status(500).json({ error: 'Error posting appointment' });
      }

      console.log('Appointment posted successfully');
      return res.status(201).json({ message: 'Appointment posted successfully'});
  });
});


app.get('/pick', (req, res) => {

  // Query the database to 
  connection.query('SELECT SelectedHospital AS hospital, Duration AS duration, CONCAT(Date, " ", Time) AS dateTime, Reason AS type FROM Posts', (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: 'Internal server error' }); 
    }

    // If there are no results, send an empty array
    if (results.length === 0) {
      res.status(200).json({ hospitals: [] });
      return;
    }

    // Send the retrieved data as response
    res.status(200).json({results });
  });
});

/**
 * apply funtionality
 */
app.post('/apply', (req, res) => {
  const { userid, name, reason, prev, contact } = req.body;

  // Insert data into MySQL table
  connection.query('INSERT INTO apply (userid, name, reason, prev, contact) VALUES (?, ?, ?, ?, ?)', 
      [userid, name, reason, prev, contact], 
      (error, results, fields) => {
          if (error) {
              res.status(500).send('Error inserting data');
          } else {
              res.status(200).send('Data inserted successfully');
          }
  });
});
  
// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
