const express = require('express');

const app = express();
const PORT = process.env.PORT || 3333;

const db = require('./db/connection');

// Middleware
app.use(express.json());

// Routes
// Load the connection

db.once('open', () => {
  app.listen(PORT, () => console.log('Server started on port %s', PORT));
});


