const mongoose = require('mongoose');

// BpPA9eQcNqtYzhau example from JD
const isProduction = null; //process.env.PORT;

if (isProduction) {
  //mongoose.connect('mongodb+srv://jd:BpPA9eQcNqtYzhau@cluster0.fcshcmp.mongodb.net/?retryWrites=true&w=majority')
} else mongoose.connect('mongodb://127.0.0.1:27017/pokemon_dev_api_db');


module.exports = mongoose.connection;