
const { Team, Pokemon } = require('../models'); // Model imports
const { isAuthenticated } = require('../auth'); // Your authentication function

const pokemonResolvers = {
  Mutation: {
    createPokemon: async (_, { teamID, newPokemonData }, { req }) => {
      isAuthenticated(req); // Authenticate the user
      try {
        const team = await Team.findById(teamID);

        if (!team) {
          throw new Error('Team not found');
        }

        const newPokemon = new Pokemon(newPokemonData);
        team.pokemon.push(newPokemon);
        await team.save();

        return team;
      } catch (error) {
        console.error(error);
        throw new Error('Server Error');
      }
    },
    deletePokemon: async (_, { teamID, pokemonID }, { req }) => {
      isAuthenticated(req); // Authenticate the user
      try {
        const team = await Team.findById(teamID);

        if (!team) {
          throw new Error('Team not found');
        }

        const pokemonIndex = team.pokemon.findIndex(pokemon => pokemon._id.toString() === pokemonID);

        if (pokemonIndex === -1) {
          throw new Error('Pokemon not found');
        }

        team.pokemon.splice(pokemonIndex, 1);
        await team.save();

        return team;
      } catch (error) {
        console.error(error);
        throw new Error('Server Error');
      }
    },
  },
};

module.exports = pokemonResolvers;
