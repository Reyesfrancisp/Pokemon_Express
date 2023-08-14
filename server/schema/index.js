const fs = require('fs');
const path = require('path');
const typeDefs = fs.readFileSync(path.resolve(__dirname, 'typeDefs.graphql'), 'utf8');
const resolvers = require('./resolvers');

module.exports = { typeDefs, resolvers };