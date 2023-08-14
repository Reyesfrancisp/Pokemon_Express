
const router = require('express').Router();
const { isAuthenticated, validateToken } = require('../auth');
const { Team, User, Favorite, Pokemon, Move } = require('../models'); // Model imports

// Create a move
router.post('/team/:teamID/pokemon/:pokemonID/move', isAuthenticated, async (req, res) => {
    console.log("Got into the create route for a move.");
    try {
        const teamId = req.params.teamID;
        const pokemonId = req.params.pokemonID;
        const newMoveData = req.body; // Assuming the new move data is sent in the request body

        // Find the team
        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).send('Team not found');
        }

        // Find the Pokémon within the team
        const pokemon = team.pokemon.find(p => p._id.toString() === pokemonId);

        if (!pokemon) {
            return res.status(404).send('Pokemon not found');
        }

        // Add the new move to the Pokémon's moves array
        pokemon.moves.push(newMoveData);

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


// delete a move
router.delete('/team/:teamID/pokemon/:pokemonID/move/:moveID', isAuthenticated, async (req, res) => {
    console.log("Got into the delete route for a move.");
    try {
        const teamId = req.params.teamID;
        const pokemonId = req.params.pokemonID;
        const moveId = req.params.moveID;

        // Find the team
        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).send('Team not found');
        }

        // Find the Pokémon within the team
        const pokemon = team.pokemon.find(p => p._id.toString() === pokemonId);

        if (!pokemon) {
            return res.status(404).send('Pokemon not found');
        }

        // Find the index of the move to delete
        const moveIndex = pokemon.moves.findIndex(move => move._id.toString() === moveId);

        if (moveIndex === -1) {
            return res.status(404).send('Move not found');
        }

        // Remove the move from the Pokémon's moves array
        pokemon.moves.splice(moveIndex, 1);

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


module.exports = router;