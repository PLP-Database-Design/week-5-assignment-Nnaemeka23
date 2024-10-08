// Import some independencies/ package

// HTTP FRAMEWORK FOR HANDLING REQUEST
const express = require('express');
// INSTANCE OF EXPRESS FRAMEWORK
const app = express();
//DATABASE MANAGEMENT SYSTEM
const mysql = require('mysql2');
// CROSS ORIGIN RESOURSE SHARING
const cors = require('cors');
// EMVIRONMENT VARIABLE DOC
const dotenv = require('dotenv');

//
app.use(express.json());
app.use(cors());
dotenv.config();

// connecting to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// checking if there is a connection
db.connect((err) => {
    // If no connection 
    if(err) return console.log("Error connecting to MYSQL");

        // IF connection works sucessfully
        console.log("Connected to MYSQL as id: ", db.threadId);
});

// <YOUR code goes down here 

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Question 1
app.get('', (req,res) => {
    const getPatients = "SELECT patient_id ,first_name, last_name, date_of_birth FROM patients"
    db.query(getPatients, (err, data) => {
        // if error occurs
        if(err) {
            return res.status(400).send("Failed to get patients", err)
        }

        res.status(200).send(data)
    });
});

// Question 2
app.get('/data', (req,res) => {
    const getPatients = "SELECT first_name, last_name, provider_speciality FROM providers"
    db.query(getPatients, (err, data) => {
        // if error occurs
        if(err) {
            return res.status(500).send("Failed to get patients", err)
        }

        res.status(200).send(data)
    });
});

// Question 3
app.get('/first_name', (req,res) => {
    const getPatients = "SELECT first_name FROM patients"
    db.query(getPatients, (err, data) => {
        // if error occurs
        if(err) {
            return res.status(400).send("Failed to get patients", err)
        }

        res.status(200).send(data)
    });
});

// Question 4
app.get('/specialty', (req,res) => {
    const getPatients = "SELECT provider_specialty FROM patients"
    db.query(getPatients, (err, data) => {
        // if error occurs
        if(err) {
            return res.status(500).send("Failed to get patients", err)
        }

        res.status(200).send(data)
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);

    // Sending a message to the browser
    console.log('Sending message to the browser...');
    app.get('/', (req,res) => {
        res.send('Server Started Sucessfully');
    });
});


