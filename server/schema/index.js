const fs = require('fs');
const path = require('path');
const typeDefs = fs.readFileSync(path.resolve(__dirname, 'typeDefs.graphql'), 'utf8');


module.exports = { 
    typeDefs, 
    favoriteResolvers: require("./favorite_resolvers"),
    moveResolvers: require("./move_resolvers"),
    pokemonResolvers: require("./pokemon_resolvers"),
    teamResolvers: require("./team_resolvers"),
    userResolvers: require("./user_resolvers")

};