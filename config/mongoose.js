// Require the library
const mongoose = require('mongoose');
const env = require('./environment');

// Connect to Database
mongoose.connect(`mongodb://localhost/${env.db}`, {useNewUrlParser: true, useUnifiedTopology: true});

// Acquire the connection (to check if it's up and running)
const db = mongoose.connection;

// Error
db.on('error', console.error.bind(console, 'connection error:'));

// If up and running, print a message
db.once('open', function() {
  // we're connected!
  console.log("Successfully connected to Database!");
});