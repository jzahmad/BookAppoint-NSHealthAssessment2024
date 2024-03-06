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
*To pick user
*/

app.post('/pick', (req, res) => {
  const userID = req.body.id; // Access request body to get the userID

  // Query the database to fetch appointments excluding those with the specified user ID
  connection.query('SELECT PostID, SelectedHospital AS hospital, Duration AS duration, CONCAT(Date, " ", Time) AS dateTime, Reason AS type FROM Posts WHERE UserID != ?', [userID], (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // If there are no results, send an empty array
    if (results.length === 0) {
      res.status(200).json({ hospitals: [] });
      return;
    }

    // Send the retrieved data as response
    res.status(200).json({ results });
  });
});

/**
 * all appointments
 */
app.get('/all', (req, res) => {
  // Query the database to fetch all appointments
  connection.query('SELECT p.PostID, SelectedHospital AS hospital, Duration AS duration, CONCAT(Date, " ", Time) AS dateTime, Reason AS type, COUNT(a.PostID) AS numberOfApplicants FROM Posts p LEFT JOIN apply a ON p.PostID = a.PostID GROUP BY p.PostID, hospital, duration, dateTime, type', (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // If there are no results, send an empty array
    if (results.length === 0) {
      res.status(200).json({ appointments: [] });
      return;
    }

    // Send the retrieved data as response
    res.status(200).json({ appointments: results });
  });
});

/**
 * Forget Password
 */

app.post('/forget', (req, res) => {
    const  { healthId } = req.body;
    // query the database to retrieve security
    connection.query('SELECT securityQuestion, securityAnswer, password FROM users WHERE healthid = ?', healthId, (error, results, fields) => {

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
      const { securityQuestion, securityAnswer, password } = results[0];
      res.status(200).json({ securityQuestion, securityAnswer,password });
    });
  });

/**
 * the post apponimnet feature
 */

app.post('/post', (req, res) => {
  const id=req.body.userID;
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
    [id, DateOf, Time, Reason, Duration, SelectedHospital], (error, results, fields) => {

      if (error) {
        console.error('Error posting appointment:', error);
        return res.status(500).json({ error: 'Error posting appointment' });
      }

      console.log('Appointment posted successfully');
      return res.status(201).json({ message: 'Appointment posted successfully'});
  });
});

/**
 * login functionality
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
    const userID = results[0].user_id;
    res.status(200).json({ userID });
  });
});

/**
 * apply funtionality
 */
app.post('/apply', (req, res) => {
  const { userid, name, healthId, prev, contact, postID } = req.body;

  // Insert data into MySQL table
  connection.query('INSERT INTO apply (userid, name, healthId, prev, contact, PostID) VALUES (?, ?, ?, ?, ?, ?)', 
      [userid, name, healthId, prev, contact,postID], 
      (error, results, fields) => {
          if (error) {
              res.status(500).send('Error inserting data');
          } else {
              res.status(200).send('Data inserted successfully');
          }
  });
});

app.post('/applicants', (req, res) => {
  const postId  = req.body.postId;
 
  // Insert data into MySQL table
  connection.query('SELECT name, healthId, contact, prev FROM apply WHERE postID = ?', postId, (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: 'Error retrieving applicants' });
    } else {
        res.status(200).json({ results });
      }
    });
  });

  /**
   * add approve 
   */
app.post('/approve', (req, res) => {
  const { postId, healthId, hospital, duration, dateTime } = req.body.form;

  // Execute SQL query to retrieve user_id based on healthId
  const getUserIdQuery = `SELECT user_id FROM users WHERE healthid = ${healthId}`;

  connection.query(getUserIdQuery, (error, results, fields) => {
      if (error) {
          console.error('Error fetching user_id:', error);
          res.status(500).json({ error: 'An error occurred while fetching user_id' });
          return;
      }

      if (results.length === 0) {
          console.error('No user found with the provided healthId');
          res.status(404).json({ error: 'No user found with the provided healthId' });
          return;
      }

      // Assuming only one row is returned and it contains the user_id
      const userId = results[0].user_id;

      // Construct the SQL INSERT statement with the retrieved user_id
      const insertSql = `INSERT INTO schedules (hospital, s_date, s_time, duration, user_id) VALUES (?, ?, ?, ?, ?)`;
      const values = [hospital, dateTime.split(' ')[0], dateTime.split(' ')[1], duration, userId];

      // Execute the INSERT query
      connection.query(insertSql, values, (error, results, fields) => {
          if (error) {
              console.error('Error approving appointment:', error);
              res.status(500).json({ error: 'An error occurred while approving appointment' });
              return;
          }

          console.log('Appointment approved successfully');
          console.log('postId:', postId);

          // Now, remove related records from the apply table
          const deleteApplySql = `DELETE FROM apply WHERE PostID = ?`;
          connection.query(deleteApplySql, [postId], (error, results, fields) => {
              if (error) {
                  console.error('Error deleting related records from apply table:', error);
                  res.status(500).json({ error: 'An error occurred while deleting related records from apply table' });
                  return;
              }

              console.log('Related records deleted from apply table successfully');

              // Now, delete the post from the posts table
              const deletePostSql = `DELETE FROM posts WHERE PostID = ?`;
              connection.query(deletePostSql, [postId], (error, results, fields) => {
                  if (error) {
                      console.error('Error deleting post:', error);
                      res.status(500).json({ error: 'An error occurred while deleting post' });
                      return;
                  }

                  console.log('Post deleted successfully');

                  res.status(200).json({ message: 'Appointment approved and post deleted successfully' });
              });
          });
      });
  });
});

/**
 * schedules
 */
// Add the /schedules endpoint
app.post('/schedules', (req, res) => {
  const { userID } = req.body;

  console.log(userID);
  // Query the database to fetch schedules for the given user ID
  connection.query('SELECT * FROM schedules WHERE user_id = ?', userID, (error, results, fields) => {
      if (error) {
          console.error('Error fetching schedules:', error);
          res.status(500).json({ error: 'An error occurred while fetching schedules' });
          return;
      }

      // If there are no schedules, send an empty array
      if (results.length === 0) {
          res.status(200).json({ schedules: [] });
          return;
      }

      // Send the retrieved schedules as response
      res.status(200).json({ schedules: results });
  });
});

  
// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
