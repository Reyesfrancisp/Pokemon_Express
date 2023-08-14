
const router = require('express').Router();
const { isAuthenticated, validateToken } = require('../auth');
const { Team, User, Favorite, Pokemon, Move } = require('../models'); // Model imports


// Create a pokemon that belongs to a team
router.post('/team/:teamID/pokemon/', isAuthenticated, async (req, res) => {
    console.log("Got into create a pokemon that belongs to a team route.");
    try {
        const teamId = req.params.teamID;
        const newPokemonData = req.body; // Assuming the new Pokémon data is sent in the request body

        // Find the team
        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).send('Team not found');
        }

        // Create a new Pokémon using the provided data
        const newPokemon = new Pokemon(newPokemonData);

        // Add the new Pokémon to the team's pokemon array
        team.pokemon.push(newPokemon);

        // Save the updated team (and automatically the related Pokémon)
        await team.save();

        res.send({
            team,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Delete a pokemon that belongs to a team
router.delete('/team/:teamID/pokemon/:pokemonID', isAuthenticated, async (req, res) => {

    console.log("Got into the delete a pokemon that belongs to a team route.");
    try {
        const teamId = req.params.teamID;
        const pokemonId = req.params.pokemonID;

        // Find the team
        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).send('Team not found');
        }

        // Find the index of the Pokémon to delete within the team's pokemon array
        const pokemonIndex = team.pokemon.findIndex(pokemon => pokemon._id.toString() === pokemonId);

        if (pokemonIndex === -1) {
            return res.status(404).send('Pokemon not found');
        }

        // Remove the Pokémon from the team's pokemon array
        team.pokemon.splice(pokemonIndex, 1);

        // Save the updated team
        await team.save();

        res.send({
            team,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;