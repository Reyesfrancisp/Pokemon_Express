const deleteFunctions = require('./delete'); // Adjust the path accordingly
const { deleteAssociatedMoves } = deleteFunctions;
const router = require('express').Router();
const { isAuthenticated, validateToken } = require('../auth');
const { Team, User, Favorite, Pokemon, Move } = require('../models'); // Model imports


//get request to get the pokemon name associated with the _id passed
router.post('/getPokemonName', async (req, res) => {
  
  try{
  const { pokemonID } = req.body;

  console.log ("The pokemon ID in the backend to get the name is: ", pokemonID)

  // Find the Pokémon name based on the provided pokemonID
  const pokemon = await Pokemon.findOne( {_id: pokemonID});

  if (!pokemon) {
    return res.status(404).json({ message: 'Pokemon not found' });
  } 

  res.status(200).json({ pokemonName: pokemon.name });
}
  catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// get pokemon that belongs to a team
router.post('/fetch-pokemon', async (req, res) => {
  try {
    const pokemonIDs = req.body.pokemonIDs;

    if (!pokemonIDs || !Array.isArray(pokemonIDs)) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    // Fetch the Pokémon data from the database based on the IDs
    const pokemonData = await Pokemon.find({ _id: { $in: pokemonIDs } });

    res.json(pokemonData);
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});



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
      console.log("Cannot add pokemon, all slots are filled");
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
router.delete('/delete-pokemon', isAuthenticated, async (req, res) => {
  try {
    const { teamID, pokemonID } = req.body;

    // Find the team
    const team = await Team.findById(teamID);

    if (!team) {
      return res.status(404).send('Team not found');
    }

    // Check which column contains the Pokémon and set it to null
    if (team.pokemon1 && team.pokemon1.toString() === pokemonID) {
      team.pokemon1 = null;
    } else if (team.pokemon2 && team.pokemon2.toString() === pokemonID) {
      team.pokemon2 = null;
    } else if (team.pokemon3 && team.pokemon3.toString() === pokemonID) {
      team.pokemon3 = null;
    } else if (team.pokemon4 && team.pokemon4.toString() === pokemonID) {
      team.pokemon4 = null;
    } else if (team.pokemon5 && team.pokemon5.toString() === pokemonID) {
      team.pokemon5 = null;
    } else if (team.pokemon6 && team.pokemon6.toString() === pokemonID) {
      team.pokemon6 = null;
    } else {
      return res.status(404).send('Pokemon not found in team');
    }

   // Find the Pokémon to get the move IDs
   const pokemon = await Pokemon.findById(pokemonID);

   if (!pokemon) {
     return res.status(404).send('Pokemon not found');
   }

   deleteAssociatedMoves(pokemon);

   // Delete the Pokémon from the database
   await Pokemon.findByIdAndDelete(pokemonID);

    res.send({
      team,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});




module.exports = router;