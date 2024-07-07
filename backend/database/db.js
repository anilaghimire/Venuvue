// Importing necessary items
const mongoose = require('mongoose');

// Function to connect to the database
const connectDB = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to DataBase");
    }).catch(err => {
        console.error("Failed to connect to the database", err);
    });
}

// Exporting the function
module.exports = connectDB;