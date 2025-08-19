// Import mongoose library for MongoDB interactions
const mongoose = require('mongoose'); 

// Load environment variables from .env file
const dotenv = require('dotenv');
dotenv.config();

// Destructure DB credentials from environment variables
const { DB_USER, DB_PASSWORD } = process.env;

// Construct the MongoDB Atlas connection string using credentials
const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.hh0pcez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


// Establish connection to MongoDB using mongoose
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connection successful")) // Log success message if connected
  .catch(err => console.log("MongoDB connection error:", err)); // Catch and log any connection errors