
require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./db/connection');

const app = express();
const PORT = process.env.PORT || 3333;
const is_prod = process.env.PORT;

// import routes
const move_routes = require('./routes/move_routes');
const favorite_routes = require('./routes/favorite_routes');
const pokemon_routes = require('./routes/pokemon_routes');
const team_routes = require('./routes/team_routes');
const user_routes = require('./routes/user_routes');

// Load middleware
if (is_prod) {
  app.use(express.static(path.join(__dirname, '../browser/build')));
}

app.use(express.json());
// Add additional cookie tools to the route request object
app.use(cookieParser());

// Load routes
app.use('/', move_routes);
app.use('/', favorite_routes);
app.use('/', pokemon_routes);
app.use('/', team_routes);
app.use('/', user_routes);

// Load the connection

db.once('open', () => {
  app.listen(PORT, () => console.log('Server started on port %s', PORT));
});


