
require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');

const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./db/connection');

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 3333;
const is_prod = process.env.PORT;

// import routes
// const move_routes = require('./routes/move_routes');
// const favorite_routes = require('./routes/favorite_routes');
// const pokemon_routes = require('./routes/pokemon_routes');
// const team_routes = require('./routes/team_routes');
// const user_routes = require('./routes/user_routes');

// Load middleware
// if (is_prod) {
//   app.use(express.static(path.join(__dirname, '../browser/build')));
// }

// app.use(express.json());
// Add additional cookie tools to the route request object
// app.use(cookieParser());

// // Load routes
// app.use('/', move_routes);
// app.use('/', favorite_routes);
// app.use('/', pokemon_routes);
// app.use('/', team_routes);
// app.use('/', user_routes);

// Load the connection

//New server code
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  // Ensure we wait for our server to start
  await server.start();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(expressMiddleware(server, {
    context: async (apollo_request_data) => {
      // req.cookies.token
      // res.cookie('token', token, {httpOnly: true})
      return {
        req: apollo_request_data.req,
        res: apollo_request_data.res
      }
    }
  }));

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
}

db.once('open', () => {
  startServer()
    .then(() => {
      console.log('Express server started on port %s', PORT);
      console.log('GraphQL ready on localhost:%s/graphql', PORT);
    });
});


// db.once('open', () => {
//   app.listen(PORT, () => console.log('Server started on port %s', PORT));
// });