
const router = require('express').Router();
const { isAuthenticated, validateToken } = require('../auth');
const { Team, User, Favorite, Pokemon, Move } = require('../models'); // Model imports

/*** Team routes ***/

// Create a team
router.post('/team', isAuthenticated, async (req, res) => {

  console.log("Got into the create a team route.");
  console.log(req.body);
  try {
    // Create a new team
    const team = await Team.create({ name: req.body.name});

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
    console.log("The team id to be deleted: " , teamId);
    // Find the team to delete
    const team = await Team.findById(teamId);

    console.log("team to be deleted: ", team );
    if (!team) {
      return res.status(404).send('Team not found');
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

  console.log("Got into the edit a pokemon team route.");
  try {
    const teamId = req.params.teamId;
    const newTeamName = req.body.newTeamName; // Assuming the new name is sent in the request body

    // Find the team to edit
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).send('Team not found');
    }

    // Edit the team name
    team.name = newTeamName;

    // Save the updated team
    const updatedTeam = await team.save();

    res.send({
      team: updatedTeam,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
