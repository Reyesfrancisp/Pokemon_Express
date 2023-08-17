require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./db/connection');
const path = require('path');

// Import routes
const moveRoutes = require('./routes/move_routes');
const favoriteRoutes = require('./routes/favorite_routes');
const pokemonRoutes = require('./routes/pokemon_routes');
const teamRoutes = require('./routes/team_routes');
const userRoutes = require('./routes/user_routes');

const app = express();
const PORT = process.env.PORT || 3333;
const is_prod = process.env.PORT;


if (is_prod) {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Load middleware
app.use(cors()); // Enable CORS
app.use(express.json());
app.use(cookieParser());

// Load routes
app.use('/', moveRoutes);
app.use('/', favoriteRoutes);
app.use('/', pokemonRoutes);
app.use('/', teamRoutes);
app.use('/', userRoutes);



if (is_prod){

  app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../client/build/index.html"))

  )};


  app.use( (error,req, res, next) => {
    console.error (error.message);
    res.send(error);
  })
// Load the connection
db.once('open', () => {
  app.listen(PORT, () => console.log('Server started on port %s', PORT));
});


//New server code
// async function startServer() {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
//   });
//   // Ensure we wait for our server to start
//   await server.start();

//   app.use(express.json());
//   app.use(cors());
//   app.use(cookieParser());
//   app.use(expressMiddleware(server, {
//     context: async (apollo_request_data) => {
//       // req.cookies.token
//       // res.cookie('token', token, {httpOnly: true})
//       return {
//         req: apollo_request_data.req,
//         res: apollo_request_data.res
//       }
//     }
//   }));

//   await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
// }

// db.once('open', () => {
//   startServer()
//     .then(() => {
//       console.log('Express server started on port %s', PORT);
//       console.log('GraphQL ready on localhost:%s/graphql', PORT);
//     });
// });