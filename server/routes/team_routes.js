
const deleteFunctions = require('./delete'); // Adjust the path accordingly
const { deleteAssociatedMoves, deletePokemonAndRemoveFromTeam } = deleteFunctions;

const router = require('express').Router();
const { isAuthenticated, validateToken } = require('../auth');
const { Team, User, Favorite, Pokemon, Move } = require('../models'); // Model imports

/*** Team routes ***/

// GET route to fetch team data by team ID
router.get('/team/:teamId', async (req, res) => {
  try {
    const teamId = req.params.teamId;

    // Find the team by its ID
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    // Return the team data
    res.json(team);
  } catch (error) {
    console.error('Error fetching team data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a team
router.post('/team', isAuthenticated, async (req, res) => {

  console.log("Got into the create a team route.");
  console.log(req.body);
  try {
    // Create a new team
    const team = await Team.create({ name: req.body.name });

    // Find the user and update the user's teams array
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { teams: team.id }, // Push the newly created team's ID
      },
      { new: true }
    ).populate('teams'); // Populate the 'teams' field for the user

    res.send({
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Delete a team
router.delete('/team/:teamId', isAuthenticated, async (req, res) => {
  console.log("Got into the delete a team route.");
  try {
    const teamId = req.params.teamId;
    console.log("The team id to be deleted: ", teamId);

    // Find the team to delete
    const team = await Team.findById(teamId);

    console.log("team to be deleted: ", team);
    if (!team) {
      return res.status(404).send('Team not found');
    }

    // Extract the _id values of the Pokémon associated with the team
    const pokemonIds = [
      team.pokemon1,
      team.pokemon2,
      team.pokemon3,
      team.pokemon4,
      team.pokemon5,
      team.pokemon6
    ].filter(pokemonId => pokemonId); // Filter out any empty IDs

     // Call the function to delete Pokémon and associated moves for each Pokémon
     for (const pokemonId of pokemonIds) {
      const pokemon = await Pokemon.findById(pokemonId);
      if (pokemon) {
        await deletePokemonAndRemoveFromTeam(team, pokemonId);
        await deleteAssociatedMoves(pokemon);
      }
    }

    // Delete the team (triggers team schema's pre-remove middleware)
    await team.deleteOne();

    // Find the user and update the user's teams array to remove the deleted team's ID
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { teams: teamId }, // Remove the deleted team's ID
      },
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


//Edit a team name

  router.put('/team/:teamId', isAuthenticated, async (req, res) => {
    
  console.log("Got into the edit a pokemon team name route.");
    const teamId = req.params.teamId;
    const updatedTeam = req.body;
  
    try {
      // Find the team by ID and update its name
      const updatedTeamData = await Team.findByIdAndUpdate(teamId, { name: updatedTeam.name }, { new: true });
  
      res.status(200).json(updatedTeamData);
    } catch (error) {
      console.error('Error updating team name:', error);
      res.status(500).send('Server Error');
    }
  });


module.exports = router;
