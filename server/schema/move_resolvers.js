const { Team } = require('../models'); // Import your models

const moveResolvers = {
    Mutation: {
        createMove: async (_, { teamID, pokemonID, moveData }) => {
            try {
                const team = await Team.findById(teamID);

                if (!team) {
                    throw new Error('Team not found');
                }

                const pokemon = team.pokemon.find(p => p._id.toString() === pokemonID);

                if (!pokemon) {
                    throw new Error('Pokemon not found');
                }

                pokemon.moves.push(moveData);
                await team.save();

                return team;
            } catch (error) {
                console.error(error);
                throw new Error('Server Error');
            }
        },
        deleteMove: async (_, { teamID, pokemonID, moveID }) => {
            try {
                const team = await Team.findById(teamID);

                if (!team) {
                    throw new Error('Team not found');
                }

                const pokemon = team.pokemon.find(p => p._id.toString() === pokemonID);

                if (!pokemon) {
                    throw new Error('Pokemon not found');
                }

                const moveIndex = pokemon.moves.findIndex(move => move._id.toString() === moveID);

                if (moveIndex === -1) {
                    throw new Error('Move not found');
                }

                pokemon.moves.splice(moveIndex, 1);
                await team.save();

                return team;
            } catch (error) {
                console.error(error);
                throw new Error('Server Error');
            }
        },
    },
};

module.exports = moveResolvers;
