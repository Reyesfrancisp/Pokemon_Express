
const router = require('express').Router();
const { isAuthenticated, validateToken } = require('../auth');
const { Team, User, Favorite, Pokemon, Move } = require('../models'); // Model imports


// Create a pokemon that belongs to a team
router.post('/team/:teamID/pokemon/', isAuthenticated, async (req, res) => {
    console.log("Got into create a pokemon that belongs to a team route.");
    try {
        console.log("The team ID is : ", req.params.teamID);
        const teamId = req.params.teamID;
        const pkmnName = req.body.pokemonName;
        console.log("The new pokemon data is: ", req.body.pokemonName);
        // Find the team
        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).send('Team not found');
        }
        console.log("The pokemon to be added is is : ", pkmnName);
       
        const newPokemon = new Pokemon({ name: pkmnName });
        // Check if any of the pokemon properties is empty and add the new Pokémon
        if (!team.pokemon1) {
            console.log("pokemon 1");
            team.pokemon1 = newPokemon;
            console.log("Object returned from the team.pokemon 1 is: ", team.pokemon1);
            await newPokemon.save();
        } else if (!team.pokemon2) {
            console.log("pokemon 2");
            team.pokemon2 = newPokemon;
            await newPokemon.save();
        } else if (!team.pokemon3) {
            console.log("pokemon 3");
            team.pokemon3 = newPokemon;
            await newPokemon.save();
        } else if (!team.pokemon4) {
            console.log("pokemon 4");
            team.pokemon4 = newPokemon;
            await newPokemon.save();
        } else if (!team.pokemon5) {
            console.log("pokemon 5");
            team.pokemon5 = newPokemon;
            await newPokemon.save();
        } else if (!team.pokemon6) {
            console.log("pokemon 6");
            team.pokemon6 = newPokemon;
            await newPokemon.save();
        } else {
            // Handle the case when all slots are filled
            return res.status(400).json({ error: 'All Pokémon slots are filled' });
        }

        // Save the updated team
        await team.save();

        // Find the user and update the user's teams array
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { new: true }
        ).populate('teams');

        res.send({
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Delete a pokemon that belongs to a team
router.delete('/team/:teamID/pokemon/:pkmnName', isAuthenticated, async (req, res) => {

    console.log("Got into the delete a pokemon that belongs to a team route.");
    try {
        const teamId = req.params.teamID;
        const pkmnName = req.params.pkmnName;

        // Find the team
        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).send('Team not found');
        }

        // Find the index of the Pokémon to delete within the team's pokemon array
        const pokemonIndex = team.pokemon.findIndex(pokemon => pokemon._id.toString() === pkmnName);

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